"use client";

import { useEffect, useRef, useState } from "react";
import {
  Bot,
  LoaderCircle,
  RotateCcw,
  Send,
  Sparkles,
  UserRound,
} from "lucide-react";
import { FadeIn } from "@/components/motion/fade-in";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const starterMessages: ChatMessage[] = [
  {
    role: "assistant",
    content:
      "Ask me anything about my career, engineering background, AI work, leadership style, or the path that led me into principal engineering.",
  },
];

const quickPrompts = [
  "What kind of problems do you solve best?",
  "How did you move from security into AI infrastructure?",
  "What is your experience with Kubernetes, OpenShift, and hybrid cloud?",
];

export function DigitalTwinChat() {
  const [messages, setMessages] = useState<ChatMessage[]>(starterMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  // Mirrors `messages` synchronously (state updates are batched/async), so a
  // second sendMessage call queued before React re-renders still sees every
  // prior message instead of a stale closure snapshot.
  const messagesRef = useRef<ChatMessage[]>(starterMessages);
  const isSendingRef = useRef(false);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isLoading]);

  const resetChat = () => {
    messagesRef.current = starterMessages;
    setMessages(starterMessages);
    setInput("");
    setError(null);
  };

  const sendMessage = async (messageText?: string) => {
    const prompt = (messageText ?? input).trim();

    if (!prompt || isSendingRef.current) {
      return;
    }

    isSendingRef.current = true;
    setError(null);
    setInput("");

    const nextMessages: ChatMessage[] = [
      ...messagesRef.current,
      { role: "user", content: prompt },
    ];
    messagesRef.current = nextMessages;
    setMessages(nextMessages);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: nextMessages }),
      });

      const data = (await response.json()) as { reply?: string; error?: string };

      if (!response.ok) {
        throw new Error(data.error ?? "The digital twin request failed.");
      }

      const withReply: ChatMessage[] = [
        ...messagesRef.current,
        {
          role: "assistant",
          content: data.reply ?? "I’m not sure how to answer that right now.",
        },
      ];
      messagesRef.current = withReply;
      setMessages(withReply);
    } catch (cause) {
      const fallback =
        cause instanceof Error ? cause.message : "Something went wrong while contacting the model.";

      setError(fallback);

      const withError: ChatMessage[] = [
        ...messagesRef.current,
        {
          role: "assistant",
          content:
            "I hit a snag reaching the model. Please try again in a moment, or ask a narrower question about my career history.",
        },
      ];
      messagesRef.current = withError;
      setMessages(withError);
    } finally {
      setIsLoading(false);
      isSendingRef.current = false;
    }
  };

  return (
    <section
      id="digital-twin"
      className="relative border-y border-border/60 py-24 md:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 40% at 15% 10%, color-mix(in oklch, var(--accent-cyan), transparent 90%), transparent), radial-gradient(45% 50% at 85% 80%, color-mix(in oklch, var(--accent-violet), transparent 92%), transparent)",
        }}
      />

      <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-[0.9fr_1.1fr] md:px-8">
        <div>
          <SectionHeading
            kicker="// Digital Twin"
            title="Talk to the career model"
            description="Ask questions about Peter Tah's background, technical strengths, leadership style, or the path from enterprise infrastructure into AI and cloud architecture."
          />

          <FadeIn delay={0.15} className="mt-8 space-y-4">
            <div className="rounded-2xl border border-border/70 bg-card/80 p-5 shadow-lg shadow-black/5 backdrop-blur">
              <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                <Sparkles className="size-4 text-accent-cyan" />
                Grounded answers
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                The twin is instructed to answer from the site&apos;s career data, skills,
                and project history, so it stays useful for interview prep, introductions,
                and career summaries.
              </p>
            </div>

            <div className="rounded-2xl border border-border/70 bg-card/70 p-5">
              <p className="text-sm font-medium text-foreground">Try asking:</p>
              <div className="mt-4 flex flex-col gap-2">
                {quickPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => void sendMessage(prompt)}
                    className="rounded-xl border border-border/70 bg-background/60 px-4 py-3 text-left text-sm text-muted-foreground transition-colors hover:border-accent-cyan/50 hover:text-foreground"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.2}>
          <div className="overflow-hidden rounded-3xl border border-border/70 bg-card/85 shadow-2xl shadow-black/10 backdrop-blur">
            <div className="flex items-center justify-between border-b border-border/60 px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-full bg-accent-cyan/10 text-accent-cyan">
                  <Bot className="size-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Peter Tah Digital Twin</p>
                  <p className="text-xs text-muted-foreground">
                    OpenRouter · openai/gpt-oss-120b
                  </p>
                </div>
              </div>

              <Button variant="ghost" size="sm" onClick={resetChat} type="button">
                <RotateCcw className="size-4" />
                Reset
              </Button>
            </div>

            <div
              aria-live="polite"
              aria-atomic="false"
              className="max-h-[36rem] space-y-4 overflow-y-auto px-5 py-5"
            >
              {messages.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={cn(
                    "flex items-end gap-3",
                    message.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  {message.role === "assistant" ? (
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border/70 bg-background text-accent-cyan">
                      <Bot className="size-4" />
                    </div>
                  ) : null}

                  <div
                    className={cn(
                      "max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed md:max-w-[75%]",
                      message.role === "user"
                        ? "rounded-br-md bg-accent-cyan text-primary-foreground"
                        : "rounded-bl-md border border-border/70 bg-background/80 text-foreground"
                    )}
                  >
                    <div className="mb-1 flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.16em] opacity-70">
                      {message.role === "user" ? (
                        <>
                          <UserRound className="size-3.5" />
                          You
                        </>
                      ) : (
                        <>
                          <Sparkles className="size-3.5" />
                          Peter
                        </>
                      )}
                    </div>
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  </div>

                  {message.role === "user" ? (
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border/70 bg-background text-muted-foreground">
                      <UserRound className="size-4" />
                    </div>
                  ) : null}
                </div>
              ))}

              {isLoading ? (
                <div className="flex items-end gap-3">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border/70 bg-background text-accent-cyan">
                    <LoaderCircle className="size-4 animate-spin" />
                  </div>
                  <div className="rounded-2xl rounded-bl-md border border-border/70 bg-background/80 px-4 py-3 text-sm text-muted-foreground">
                    Thinking through the career context...
                  </div>
                </div>
              ) : null}

              <div ref={bottomRef} />
            </div>

            <form
              className="border-t border-border/60 bg-background/50 p-4"
              onSubmit={(event) => {
                event.preventDefault();
                void sendMessage();
              }}
            >
              <label htmlFor="digital-twin-prompt" className="sr-only">
                Ask the digital twin
              </label>
              <textarea
                id="digital-twin-prompt"
                rows={3}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask about a role, project, skill, or career milestone..."
                className="min-h-24 w-full resize-none rounded-2xl border border-border/70 bg-card px-4 py-3 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground focus:glow-border-active"
              />

              <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-muted-foreground">
                  Answers are generated from site content and may omit details not listed
                  publicly.
                </p>

                <div className="flex items-center gap-2">
                  <Button variant="outline" type="button" onClick={resetChat}>
                    Clear
                  </Button>
                  <Button type="submit" disabled={isLoading || input.trim().length === 0}>
                    <Send className="size-4" />
                    Send
                  </Button>
                </div>
              </div>

              {error ? (
                <p className="mt-3 text-sm text-status-amber">{error}</p>
              ) : null}
            </form>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

