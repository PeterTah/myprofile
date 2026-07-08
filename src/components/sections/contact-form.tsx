"use client";

import { useState, type FormEvent } from "react";
import { LoaderCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

const FORM_ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT;

type Status = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!FORM_ENDPOINT) {
      setStatus("error");
      setError(
        "The contact form isn't configured yet — reach out directly using the options below."
      );
      return;
    }

    setStatus("loading");
    setError(null);

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (!response.ok) {
        throw new Error("The message could not be sent. Please try again.");
      }

      setStatus("success");
      form.reset();
    } catch (cause) {
      setStatus("error");
      setError(
        cause instanceof Error ? cause.message : "Something went wrong sending your message."
      );
    }
  };

  const fieldClassName =
    "w-full rounded-2xl border border-border/70 bg-card px-4 py-3 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground focus:glow-border-active";

  return (
    <form onSubmit={handleSubmit} className="max-w-xl space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="sr-only">
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            placeholder="Your name"
            className={fieldClassName}
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="sr-only">
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            placeholder="Your email"
            className={fieldClassName}
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-message" className="sr-only">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          required
          placeholder="What would you like to talk about?"
          className={`min-h-28 resize-none ${fieldClassName}`}
        />
      </div>

      <div className="flex items-center gap-3">
        <Button type="submit" size="lg" disabled={status === "loading"}>
          {status === "loading" ? (
            <LoaderCircle className="size-4 animate-spin" />
          ) : (
            <Send className="size-4" />
          )}
          Send message
        </Button>

        {status === "success" ? (
          <p className="text-sm text-accent-cyan">Thanks — your message is on its way.</p>
        ) : null}
      </div>

      {status === "error" && error ? (
        <p className="text-sm text-status-amber">{error}</p>
      ) : null}
    </form>
  );
}
