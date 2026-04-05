"use client";

import { useState } from "react";

type FormStatus = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.error || "Something went wrong.");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <div className="mt-12 rounded-2xl border border-forest-200 bg-forest-50 p-8 text-center">
        <p className="font-serif text-xl text-forest-600">Message sent.</p>
        <p className="mt-2 text-forest-500">
          Thank you. We will respond within 24 hours.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-medium text-forest-600 underline underline-offset-4 hover:text-forest-700"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-12 space-y-6">
      {status === "error" && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {errorMessage}
        </div>
      )}

      <div>
        <label htmlFor="contact-name" className="block text-sm font-medium text-navy-600">
          Name
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          className="mt-2 block w-full rounded-lg border border-navy-200 bg-white px-4 py-3 text-sm text-navy-700 placeholder-navy-300 transition-colors focus:border-navy-500 focus:outline-none focus:ring-1 focus:ring-navy-500"
          placeholder="Your name"
        />
      </div>

      <div>
        <label htmlFor="contact-email" className="block text-sm font-medium text-navy-600">
          Email
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          className="mt-2 block w-full rounded-lg border border-navy-200 bg-white px-4 py-3 text-sm text-navy-700 placeholder-navy-300 transition-colors focus:border-navy-500 focus:outline-none focus:ring-1 focus:ring-navy-500"
          placeholder="you@yourfirm.com"
        />
      </div>

      <div>
        <label htmlFor="contact-firm" className="block text-sm font-medium text-navy-600">
          Firm name
        </label>
        <input
          id="contact-firm"
          name="firm"
          type="text"
          className="mt-2 block w-full rounded-lg border border-navy-200 bg-white px-4 py-3 text-sm text-navy-700 placeholder-navy-300 transition-colors focus:border-navy-500 focus:outline-none focus:ring-1 focus:ring-navy-500"
          placeholder="Your firm (optional)"
        />
      </div>

      <div>
        <label htmlFor="contact-subject" className="block text-sm font-medium text-navy-600">
          Subject
        </label>
        <select
          id="contact-subject"
          name="subject"
          className="mt-2 block w-full rounded-lg border border-navy-200 bg-white px-4 py-3 text-sm text-navy-700 transition-colors focus:border-navy-500 focus:outline-none focus:ring-1 focus:ring-navy-500"
        >
          <option>General enquiry</option>
          <option>Pricing question</option>
          <option>Security question</option>
          <option>Partnership opportunity</option>
          <option>Early access request</option>
          <option>Press / media</option>
        </select>
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium text-navy-600">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          required
          className="mt-2 block w-full rounded-lg border border-navy-200 bg-white px-4 py-3 text-sm text-navy-700 placeholder-navy-300 transition-colors focus:border-navy-500 focus:outline-none focus:ring-1 focus:ring-navy-500"
          placeholder="How can we help?"
        />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="flex w-full min-h-touch items-center justify-center rounded-lg bg-navy-500 px-4 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-navy-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-500 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "submitting" ? "Sending\u2026" : "Send message"}
      </button>
    </form>
  );
}
