"use client";

// Client side of the /try demo.
//
// Responsibilities:
//   - Single big text input with a clear CTA.
//   - POST to /api/try/draft and render the streamed text incrementally.
//   - Show a conversion card once the stream completes successfully.
//   - Surface 429 / 400 errors as gentle inline messages, not scary banners.
//   - Stay usable at 375px width.

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Button from "@/app/components/shared/Button";
import { TRY_DEMO_INPUT_MAX } from "@/lib/ai/demo-draft";

type Status = "idle" | "streaming" | "done" | "error";

const EXAMPLES = [
  "My landlord won't return my $2,400 bond 3 weeks after I moved out in Auckland.",
  "I'm a sole trader in Wellington and I haven't filed GST for 18 months.",
  "I was dismissed from my Brisbane job last week after 3 years with no warnings.",
  "My father died in Christchurch without a will and has a house and KiwiSaver.",
];

export default function TryDemo() {
  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const outputRef = useRef<HTMLDivElement | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    // Cancel any in-flight stream on unmount.
    return () => abortRef.current?.abort();
  }, []);

  useEffect(() => {
    // Auto-scroll the output region as new tokens arrive.
    if (status === "streaming" && outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output, status]);

  const handleSubmit = useCallback(
    async (event?: React.FormEvent<HTMLFormElement>) => {
      event?.preventDefault();
      const trimmed = prompt.trim();
      if (!trimmed || status === "streaming") return;

      setOutput("");
      setErrorMessage(null);
      setStatus("streaming");

      const controller = new AbortController();
      abortRef.current?.abort();
      abortRef.current = controller;

      try {
        const res = await fetch("/api/try/draft", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: trimmed }),
          signal: controller.signal,
        });

        if (!res.ok) {
          let message = "Something went wrong. Try again in a moment.";
          try {
            const data = (await res.json()) as { error?: string };
            if (data.error) message = data.error;
          } catch {
            // ignore JSON parse failures; fall through to the generic message
          }
          setErrorMessage(message);
          setStatus("error");
          return;
        }

        const body = res.body;
        if (!body) {
          setErrorMessage("Your browser doesn't support streaming responses.");
          setStatus("error");
          return;
        }

        const reader = body.getReader();
        const decoder = new TextDecoder();
        let acc = "";
        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          if (value) {
            acc += decoder.decode(value, { stream: true });
            setOutput(acc);
          }
        }
        acc += decoder.decode();
        setOutput(acc);
        setStatus("done");
      } catch (err) {
        if ((err as { name?: string })?.name === "AbortError") return;
        console.error(err);
        setErrorMessage(
          "Connection dropped mid-draft. Check your network and try again.",
        );
        setStatus("error");
      }
    },
    [prompt, status],
  );

  const reset = useCallback(() => {
    abortRef.current?.abort();
    setPrompt("");
    setOutput("");
    setStatus("idle");
    setErrorMessage(null);
  }, []);

  const charsLeft = TRY_DEMO_INPUT_MAX - prompt.length;
  const isOver = charsLeft < 0;
  const disabled = status === "streaming" || !prompt.trim() || isOver;

  return (
    <div className="mx-auto max-w-3xl">
      <form onSubmit={handleSubmit} className="space-y-4">
        <label htmlFor="try-prompt" className="block text-sm font-semibold text-navy-700">
          Describe your legal or accounting situation in plain English.
        </label>
        <div className="rounded-2xl border border-navy-200 bg-white shadow-card transition-colors focus-within:border-gold-400 focus-within:shadow-card-hover">
          <textarea
            id="try-prompt"
            name="prompt"
            rows={4}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            maxLength={TRY_DEMO_INPUT_MAX + 40 /* soft cap; server enforces hard */}
            placeholder="e.g. My landlord won't return my bond 3 weeks after move-out in Auckland."
            className="block w-full resize-none rounded-2xl bg-transparent px-5 py-4 text-base text-navy-800 placeholder:text-navy-300 focus:outline-none sm:text-lg"
            disabled={status === "streaming"}
            aria-describedby="try-prompt-help"
          />
          <div className="flex items-center justify-between border-t border-navy-100 px-5 py-3">
            <p
              id="try-prompt-help"
              className={`text-xs ${isOver ? "text-red-600" : "text-navy-400"}`}
            >
              {isOver
                ? `${-charsLeft} over the ${TRY_DEMO_INPUT_MAX}-char demo limit`
                : `${charsLeft} / ${TRY_DEMO_INPUT_MAX} characters`}
            </p>
            <button
              type="submit"
              disabled={disabled}
              className="inline-flex min-h-touch items-center justify-center rounded-lg bg-navy-500 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-navy-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-navy-200"
            >
              {status === "streaming" ? "Drafting…" : "Draft my memo"}
            </button>
          </div>
        </div>

        {status === "idle" && (
          <div className="flex flex-wrap gap-2 pt-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-navy-400">
              Try one:
            </span>
            {EXAMPLES.map((ex) => (
              <button
                key={ex}
                type="button"
                onClick={() => setPrompt(ex)}
                className="rounded-full border border-navy-200 bg-white px-3 py-1 text-xs text-navy-600 transition-colors hover:border-gold-400 hover:text-navy-800"
              >
                {ex.length > 60 ? `${ex.slice(0, 58)}…` : ex}
              </button>
            ))}
          </div>
        )}
      </form>

      {errorMessage && (
        <div
          role="alert"
          className="mt-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-800"
        >
          {errorMessage}
        </div>
      )}

      {(status === "streaming" || status === "done" || output) && (
        <div className="mt-10">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-plum-600">
              {status === "streaming" ? "Drafting…" : "First-pass memo"}
            </p>
            {status === "done" && (
              <button
                type="button"
                onClick={reset}
                className="text-xs text-navy-500 underline underline-offset-4 hover:text-navy-700"
              >
                Start over
              </button>
            )}
          </div>
          <div
            ref={outputRef}
            aria-live="polite"
            aria-busy={status === "streaming"}
            className="mt-4 max-h-[60vh] overflow-y-auto rounded-2xl border border-navy-100 bg-navy-50 px-5 py-6 font-serif text-base leading-relaxed text-navy-800 sm:px-8 sm:py-8 sm:text-lg"
          >
            <pre className="whitespace-pre-wrap break-words font-serif">
              {output}
              {status === "streaming" && (
                <span className="ml-0.5 inline-block h-5 w-[2px] translate-y-1 animate-pulse bg-navy-500 align-middle" />
              )}
            </pre>
          </div>
        </div>
      )}

      {status === "done" && (
        <div className="mt-10 rounded-2xl border border-gold-200 bg-white p-6 shadow-card sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-600">
            This is an AI draft
          </p>
          <h2 className="mt-3 font-serif text-2xl text-navy-800 sm:text-3xl">
            A verified NZ/AU lawyer or accountant can review, amend, and sign
            off — from <span className="text-gold-600">$149</span>.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-navy-500 sm:text-base">
            Typically in your hands within 24 hours. Every matter on Marco Reid
            is reviewed by a licensed professional admitted in your jurisdiction.
            Nothing is filed or sent on your behalf without their sign-off.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <Button href="/post-matter" size="lg">
              Post this matter to a pro
            </Button>
            <Link
              href="/for-citizens"
              className="text-sm font-medium text-navy-600 underline underline-offset-4 hover:text-navy-800"
            >
              How it works &rarr;
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
