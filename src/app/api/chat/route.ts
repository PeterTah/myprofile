import { NextRequest, NextResponse } from "next/server";
import { buildDigitalTwinSystemPrompt } from "@/data/digital-twin";
import { checkRateLimit } from "@/lib/rate-limit";

const RATE_LIMIT = 8;
const RATE_LIMIT_WINDOW_MS = 5 * 60 * 1000;
const UPSTREAM_TIMEOUT_MS = 20_000;

function getClientIp(req: NextRequest) {
  const realIp = req.headers.get("x-real-ip")?.trim();
  if (realIp) {
    return realIp;
  }

  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) {
    const ips = forwardedFor
      .split(",")
      .map((part) => part.trim())
      .filter(Boolean);

    // The client can set this header to anything, so only the entry appended
    // by our own reverse proxy/edge network (the last one) can be trusted.
    // Earlier entries are attacker-controlled and unsuitable for rate limiting.
    return ips[ips.length - 1] ?? "unknown";
  }

  return "unknown";
}

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

function normalizeMessages(messages: unknown): ChatMessage[] {
  if (!Array.isArray(messages)) {
    return [];
  }

  return messages
    .filter(
      (message): message is ChatMessage => {
        if (!message || typeof message !== "object") {
          return false;
        }

        const role = "role" in message ? (message as { role?: unknown }).role : undefined;
        const content = "content" in message ? (message as { content?: unknown }).content : undefined;

        return (
          (role === "user" || role === "assistant") &&
          typeof content === "string" &&
          content.trim().length > 0
        );
      }
    )
    .map((message) => ({
      role: message.role,
      content: message.content.trim(),
    }))
    .slice(-12);
}

function extractText(content: unknown) {
  if (typeof content === "string") {
    return content;
  }

  if (Array.isArray(content)) {
    return content
      .map((chunk) => {
        if (typeof chunk === "string") {
          return chunk;
        }

        if (chunk && typeof chunk === "object" && "text" in chunk) {
          return typeof chunk.text === "string" ? chunk.text : "";
        }

        return "";
      })
      .join("");
  }

  return "";
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  const { allowed, retryAfterMs } = checkRateLimit(ip, RATE_LIMIT, RATE_LIMIT_WINDOW_MS);

  if (!allowed) {
    return NextResponse.json(
      { error: "Too many requests, please try again shortly." },
      { status: 429, headers: { "Retry-After": Math.ceil(retryAfterMs / 1000).toString() } }
    );
  }

  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "OPENROUTER_API_KEY is not configured." },
      { status: 500 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const messages = normalizeMessages((body as { messages?: unknown })?.messages);

  if (messages.length === 0) {
    return NextResponse.json(
      { error: "At least one user message is required." },
      { status: 400 }
    );
  }

  let response: Response;
  try {
    response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": req.headers.get("origin") ?? "http://localhost:3007",
        "X-Title": "Peter Tah Digital Twin",
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-120b",
        messages: [
          { role: "system", content: buildDigitalTwinSystemPrompt() },
          ...messages,
        ],
        temperature: 0.4,
        top_p: 0.9,
        max_tokens: 700,
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
    });
  } catch (cause) {
    const timedOut = cause instanceof Error && cause.name === "TimeoutError";
    return NextResponse.json(
      {
        error: timedOut
          ? "The model took too long to respond. Please try again."
          : "Could not reach OpenRouter.",
      },
      { status: timedOut ? 504 : 502 }
    );
  }

  if (!response.ok) {
    const errorText = await response.text();
    return NextResponse.json(
      {
        error: "OpenRouter request failed.",
        status: response.status,
        detail: errorText.slice(0, 400),
      },
      { status: 502 }
    );
  }

  const data = (await response.json()) as {
    choices?: Array<{ message?: { content?: unknown } }>;
    model?: string;
  };

  const reply = extractText(data.choices?.[0]?.message?.content).trim();

  if (!reply) {
    return NextResponse.json(
      { error: "The model returned an empty response." },
      { status: 502 }
    );
  }

  return NextResponse.json({
    reply,
    model: data.model ?? "openai/gpt-oss-120b",
  });
}
