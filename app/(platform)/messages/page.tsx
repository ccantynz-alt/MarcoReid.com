"use client";

import { useState } from "react";
import type { Thread, Message } from "@/lib/messaging";

/* ------------------------------------------------------------------ */
/*  Mock data — replaced with real API calls once backend is wired     */
/* ------------------------------------------------------------------ */

const MOCK_THREADS: Thread[] = [
  {
    id: "t1",
    subject: "Patel Immigration - Visa Application Update",
    matterId: "m-patel-imm",
    participants: [
      { id: "u1", name: "You", role: "lawyer" },
      { id: "u2", name: "Aroha Patel", role: "client" },
    ],
    lastMessage: "I have uploaded the additional documents you requested for the visa application.",
    lastMessageAt: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
    unreadCount: 2,
    encrypted: true,
  },
  {
    id: "t2",
    subject: "Thornton Acquisition - Tax Implications",
    matterId: "m-thornton-acq",
    participants: [
      { id: "u1", name: "You", role: "lawyer" },
      { id: "u3", name: "James Chen", role: "accountant" },
    ],
    lastMessage: "The section 1031 exchange analysis is complete. I am attaching the memo for your review.",
    lastMessageAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    unreadCount: 1,
    encrypted: true,
  },
  {
    id: "t3",
    subject: "Trust Account Reconciliation - March",
    matterId: undefined,
    participants: [
      { id: "u1", name: "You", role: "lawyer" },
      { id: "u4", name: "Sarah Mitchell", role: "admin" },
    ],
    lastMessage: "March reconciliation is complete. All balances verified. Report attached.",
    lastMessageAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    unreadCount: 0,
    encrypted: false,
  },
  {
    id: "t4",
    subject: "Henderson Family Trust - Settlement Documents",
    matterId: "m-henderson-trust",
    participants: [
      { id: "u1", name: "You", role: "lawyer" },
      { id: "u5", name: "Margaret Henderson", role: "client" },
    ],
    lastMessage: "Thank you for the update. When do you expect the settlement to be finalised?",
    lastMessageAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    unreadCount: 0,
    encrypted: true,
  },
];

const MOCK_MESSAGES: Record<string, Message[]> = {
  t1: [
    {
      id: "m1",
      threadId: "t1",
      senderId: "u1",
      senderName: "You",
      senderRole: "lawyer",
      recipientId: "u2",
      recipientName: "Aroha Patel",
      recipientRole: "client",
      matterId: "m-patel-imm",
      subject: "Patel Immigration - Visa Application Update",
      body: "Good morning Aroha. I have reviewed your visa application and we need a few additional supporting documents. Could you please provide your most recent bank statements from the last three months and an updated employment letter?",
      encrypted: true,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    },
    {
      id: "m2",
      threadId: "t1",
      senderId: "u2",
      senderName: "Aroha Patel",
      senderRole: "client",
      recipientId: "u1",
      recipientName: "You",
      recipientRole: "lawyer",
      matterId: "m-patel-imm",
      subject: "Patel Immigration - Visa Application Update",
      body: "Good afternoon. I have uploaded the additional documents you requested for the visa application. The bank statements cover January through March and the employment letter is dated this week.",
      encrypted: true,
      createdAt: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
    },
  ],
  t2: [
    {
      id: "m3",
      threadId: "t2",
      senderId: "u3",
      senderName: "James Chen",
      senderRole: "accountant",
      recipientId: "u1",
      recipientName: "You",
      recipientRole: "lawyer",
      matterId: "m-thornton-acq",
      subject: "Thornton Acquisition - Tax Implications",
      body: "The section 1031 exchange analysis is complete. I am attaching the memo for your review. The key finding is that the proposed structure qualifies under the safe harbour provisions, which will defer approximately $2.4M in capital gains tax. Happy to discuss on a call if you need me to walk through the calculations.",
      encrypted: true,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    },
  ],
  t3: [
    {
      id: "m4",
      threadId: "t3",
      senderId: "u4",
      senderName: "Sarah Mitchell",
      senderRole: "admin",
      recipientId: "u1",
      recipientName: "You",
      recipientRole: "lawyer",
      subject: "Trust Account Reconciliation - March",
      body: "March reconciliation is complete. All balances verified. Report attached. The total trust balance across all accounts is $487,230.00. No discrepancies found.",
      encrypted: false,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    },
  ],
  t4: [
    {
      id: "m5",
      threadId: "t4",
      senderId: "u1",
      senderName: "You",
      senderRole: "lawyer",
      recipientId: "u5",
      recipientName: "Margaret Henderson",
      recipientRole: "client",
      matterId: "m-henderson-trust",
      subject: "Henderson Family Trust - Settlement Documents",
      body: "Good afternoon Margaret. The settlement documents have been prepared and are ready for your review. I have uploaded them to your client portal. Please review at your convenience and let me know if you have any questions.",
      encrypted: true,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 50).toISOString(),
    },
    {
      id: "m6",
      threadId: "t4",
      senderId: "u5",
      senderName: "Margaret Henderson",
      senderRole: "client",
      recipientId: "u1",
      recipientName: "You",
      recipientRole: "lawyer",
      matterId: "m-henderson-trust",
      subject: "Henderson Family Trust - Settlement Documents",
      body: "Thank you for the update. When do you expect the settlement to be finalised?",
      encrypted: true,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    },
  ],
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function formatMessageTime(iso: string): string {
  const date = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);

  if (diffMin < 1) return "Just now";
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHrs = Math.floor(diffMin / 60);
  if (diffHrs < 24) return `${diffHrs}h ago`;
  const diffDays = Math.floor(diffHrs / 24);
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays}d ago`;
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(date);
}

function formatFullTime(iso: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(iso));
}

function getRoleBadge(role: string): { label: string; className: string } {
  switch (role) {
    case "lawyer":
      return { label: "Attorney", className: "bg-forest-50 text-forest-700 dark:bg-forest-900/40 dark:text-forest-300" };
    case "accountant":
      return { label: "CPA", className: "bg-plum-50 text-plum-700 dark:bg-plum-900/40 dark:text-plum-300" };
    case "client":
      return { label: "Client", className: "bg-gold-50 text-gold-700 dark:bg-gold-900/40 dark:text-gold-300" };
    case "admin":
      return { label: "Admin", className: "bg-navy-50 text-navy-600 dark:bg-navy-800 dark:text-navy-300" };
    case "hr":
      return { label: "HR", className: "bg-navy-50 text-navy-600 dark:bg-navy-800 dark:text-navy-300" };
    default:
      return { label: role, className: "bg-navy-50 text-navy-600" };
  }
}

/* ------------------------------------------------------------------ */
/*  Icons                                                              */
/* ------------------------------------------------------------------ */

function IconLock({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3.5" y="7" width="9" height="7" rx="1.5" />
      <path d="M5.5 7V5a2.5 2.5 0 015 0v2" />
    </svg>
  );
}

function IconSend({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2L9 11" />
      <path d="M18 2l-6 16-3-7-7-3 16-6z" />
    </svg>
  );
}

function IconPlus({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M10 4v12M4 10h12" />
    </svg>
  );
}

function IconBack({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 10H5M5 10l4-4M5 10l4 4" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function MessagesPage() {
  const [selectedThreadId, setSelectedThreadId] = useState<string | null>(null);
  const [showCompose, setShowCompose] = useState(false);
  const [composeRecipient, setComposeRecipient] = useState("");
  const [composeSubject, setComposeSubject] = useState("");
  const [composeMatter, setComposeMatter] = useState("");
  const [composeBody, setComposeBody] = useState("");
  const [replyText, setReplyText] = useState("");

  const totalUnread = MOCK_THREADS.reduce((sum, t) => sum + t.unreadCount, 0);
  const selectedThread = MOCK_THREADS.find((t) => t.id === selectedThreadId);
  const threadMessages = selectedThreadId ? (MOCK_MESSAGES[selectedThreadId] ?? []) : [];

  /* Determine if the selected thread is privileged */
  const isPrivileged = selectedThread
    ? selectedThread.participants.some((p) => p.role === "client") &&
      selectedThread.participants.some((p) => p.role === "lawyer" || p.role === "accountant")
    : false;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-12">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <h1 className="font-serif text-display text-navy-800 dark:text-white">Messages</h1>
          {totalUnread > 0 && (
            <span className="inline-flex h-7 min-w-[28px] items-center justify-center rounded-full bg-red-500 px-2 text-xs font-bold text-white">
              {totalUnread}
            </span>
          )}
        </div>
        <button
          onClick={() => {
            setShowCompose(true);
            setSelectedThreadId(null);
          }}
          className="inline-flex min-h-touch items-center gap-2 rounded-lg bg-navy-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-navy-600 hover:shadow-md dark:bg-navy-500 dark:hover:bg-navy-400"
        >
          <IconPlus className="h-4 w-4" />
          New Message
        </button>
      </div>

      {/* Main layout: thread list + message view */}
      <div className="mt-8 grid gap-6 lg:grid-cols-[360px_1fr]">
        {/* ────── Thread list ────── */}
        <div className={`overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-card dark:border-navy-700 dark:bg-navy-900 ${selectedThreadId || showCompose ? "hidden lg:block" : ""}`}>
          <div className="border-b border-navy-100 px-5 py-4 dark:border-navy-700">
            <p className="text-xs font-semibold uppercase tracking-wider text-navy-400 dark:text-navy-500">
              All threads
            </p>
          </div>
          <ul className="divide-y divide-navy-50 dark:divide-navy-800">
            {MOCK_THREADS.map((thread) => {
              const otherParticipant = thread.participants.find((p) => p.id !== "u1");
              const isActive = thread.id === selectedThreadId;

              return (
                <li key={thread.id}>
                  <button
                    onClick={() => {
                      setSelectedThreadId(thread.id);
                      setShowCompose(false);
                    }}
                    className={`flex w-full items-start gap-3 px-5 py-4 text-left transition-colors ${
                      isActive
                        ? "bg-navy-50 dark:bg-navy-800"
                        : "hover:bg-navy-50/50 dark:hover:bg-navy-800/40"
                    }`}
                  >
                    {/* Avatar */}
                    <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-navy-100 font-serif text-sm font-semibold text-navy-600 dark:bg-navy-700 dark:text-navy-200">
                      {otherParticipant?.name
                        .split(" ")
                        .map((w) => w[0])
                        .join("")
                        .slice(0, 2) ?? "?"}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className={`truncate text-sm ${thread.unreadCount > 0 ? "font-bold text-navy-800 dark:text-white" : "font-medium text-navy-700 dark:text-navy-200"}`}>
                          {otherParticipant?.name ?? "Unknown"}
                        </p>
                        <span className="flex-shrink-0 text-[11px] tabular-nums text-navy-400 dark:text-navy-500">
                          {formatMessageTime(thread.lastMessageAt)}
                        </span>
                      </div>
                      <p className="mt-0.5 truncate text-xs font-medium text-navy-600 dark:text-navy-300">
                        {thread.subject}
                      </p>
                      <div className="mt-1 flex items-center gap-2">
                        <p className="min-w-0 flex-1 truncate text-xs text-navy-400 dark:text-navy-500">
                          {thread.lastMessage}
                        </p>
                        <div className="flex items-center gap-1.5">
                          {thread.encrypted && (
                            <IconLock className="h-3 w-3 flex-shrink-0 text-forest-500 dark:text-forest-400" />
                          )}
                          {thread.unreadCount > 0 && (
                            <span className="inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-500 px-1.5 text-[10px] font-bold text-white">
                              {thread.unreadCount}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* ────── Message view / Compose ────── */}
        <div className="overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-card dark:border-navy-700 dark:bg-navy-900">
          {showCompose ? (
            /* ── Compose new message ── */
            <div className="flex h-full flex-col">
              <div className="flex items-center gap-3 border-b border-navy-100 px-5 py-4 dark:border-navy-700">
                <button
                  onClick={() => setShowCompose(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-navy-400 hover:bg-navy-50 hover:text-navy-600 dark:hover:bg-navy-800 dark:hover:text-navy-200 lg:hidden"
                  aria-label="Back to threads"
                >
                  <IconBack className="h-5 w-5" />
                </button>
                <h2 className="font-serif text-lg text-navy-800 dark:text-white">New Message</h2>
              </div>
              <div className="flex-1 space-y-4 p-5">
                <div>
                  <label htmlFor="compose-to" className="block text-xs font-semibold uppercase tracking-wider text-navy-400 dark:text-navy-500">
                    To
                  </label>
                  <input
                    id="compose-to"
                    type="text"
                    value={composeRecipient}
                    onChange={(e) => setComposeRecipient(e.target.value)}
                    placeholder="Search by name or email"
                    className="mt-1 w-full rounded-lg border border-navy-200 bg-white px-4 py-2.5 text-sm text-navy-700 placeholder:text-navy-300 focus:border-navy-400 focus:outline-none focus:ring-2 focus:ring-navy-200 dark:border-navy-600 dark:bg-navy-800 dark:text-navy-200 dark:placeholder:text-navy-500 dark:focus:ring-navy-700"
                  />
                </div>
                <div>
                  <label htmlFor="compose-subject" className="block text-xs font-semibold uppercase tracking-wider text-navy-400 dark:text-navy-500">
                    Subject
                  </label>
                  <input
                    id="compose-subject"
                    type="text"
                    value={composeSubject}
                    onChange={(e) => setComposeSubject(e.target.value)}
                    placeholder="Message subject"
                    className="mt-1 w-full rounded-lg border border-navy-200 bg-white px-4 py-2.5 text-sm text-navy-700 placeholder:text-navy-300 focus:border-navy-400 focus:outline-none focus:ring-2 focus:ring-navy-200 dark:border-navy-600 dark:bg-navy-800 dark:text-navy-200 dark:placeholder:text-navy-500 dark:focus:ring-navy-700"
                  />
                </div>
                <div>
                  <label htmlFor="compose-matter" className="block text-xs font-semibold uppercase tracking-wider text-navy-400 dark:text-navy-500">
                    Link to matter <span className="normal-case tracking-normal text-navy-300 dark:text-navy-600">(optional)</span>
                  </label>
                  <input
                    id="compose-matter"
                    type="text"
                    value={composeMatter}
                    onChange={(e) => setComposeMatter(e.target.value)}
                    placeholder="Search for a matter"
                    className="mt-1 w-full rounded-lg border border-navy-200 bg-white px-4 py-2.5 text-sm text-navy-700 placeholder:text-navy-300 focus:border-navy-400 focus:outline-none focus:ring-2 focus:ring-navy-200 dark:border-navy-600 dark:bg-navy-800 dark:text-navy-200 dark:placeholder:text-navy-500 dark:focus:ring-navy-700"
                  />
                </div>
                <div className="flex-1">
                  <label htmlFor="compose-body" className="block text-xs font-semibold uppercase tracking-wider text-navy-400 dark:text-navy-500">
                    Message
                  </label>
                  <textarea
                    id="compose-body"
                    value={composeBody}
                    onChange={(e) => setComposeBody(e.target.value)}
                    rows={8}
                    placeholder="Write your message..."
                    className="mt-1 w-full resize-none rounded-lg border border-navy-200 bg-white px-4 py-2.5 text-sm leading-relaxed text-navy-700 placeholder:text-navy-300 focus:border-navy-400 focus:outline-none focus:ring-2 focus:ring-navy-200 dark:border-navy-600 dark:bg-navy-800 dark:text-navy-200 dark:placeholder:text-navy-500 dark:focus:ring-navy-700"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-navy-100 px-5 py-4 dark:border-navy-700">
                <div className="flex items-center gap-2 text-xs text-navy-400 dark:text-navy-500">
                  <IconLock className="h-3.5 w-3.5 text-forest-500 dark:text-forest-400" />
                  End-to-end encrypted
                </div>
                <button
                  type="button"
                  className="inline-flex min-h-touch items-center gap-2 rounded-lg bg-navy-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-navy-600 hover:shadow-md dark:bg-navy-500 dark:hover:bg-navy-400"
                >
                  <IconSend className="h-4 w-4" />
                  Send
                </button>
              </div>
            </div>
          ) : selectedThread ? (
            /* ── Thread view ── */
            <div className="flex h-full flex-col">
              {/* Thread header */}
              <div className="border-b border-navy-100 px-5 py-4 dark:border-navy-700">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSelectedThreadId(null)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-navy-400 hover:bg-navy-50 hover:text-navy-600 dark:hover:bg-navy-800 dark:hover:text-navy-200 lg:hidden"
                    aria-label="Back to threads"
                  >
                    <IconBack className="h-5 w-5" />
                  </button>
                  <div className="min-w-0 flex-1">
                    <h2 className="truncate font-serif text-lg text-navy-800 dark:text-white">
                      {selectedThread.subject}
                    </h2>
                    <div className="mt-1 flex flex-wrap items-center gap-2">
                      {selectedThread.participants.map((p) => {
                        const badge = getRoleBadge(p.role);
                        return (
                          <span
                            key={p.id}
                            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${badge.className}`}
                          >
                            {p.name} &middot; {badge.label}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {selectedThread.encrypted && (
                      <span className="flex items-center gap-1 rounded-full bg-forest-50 px-2.5 py-1 text-[10px] font-semibold text-forest-700 dark:bg-forest-900/40 dark:text-forest-300" title="End-to-end encrypted">
                        <IconLock className="h-3 w-3" />
                        Encrypted
                      </span>
                    )}
                    {selectedThread.matterId && (
                      <span className="rounded-full bg-plum-50 px-2.5 py-1 text-[10px] font-semibold text-plum-700 dark:bg-plum-900/40 dark:text-plum-300">
                        Linked to matter
                      </span>
                    )}
                  </div>
                </div>

                {/* Privileged banner */}
                {isPrivileged && (
                  <div className="mt-3 flex items-center gap-2 rounded-lg border border-gold-200 bg-gold-50 px-4 py-2.5 dark:border-gold-700/40 dark:bg-gold-900/20">
                    <svg viewBox="0 0 16 16" className="h-4 w-4 flex-shrink-0 text-gold-600 dark:text-gold-400" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M8 14s5.5-3 5.5-7V3.5L8 1.5 2.5 3.5V7c0 4 5.5 7 5.5 7z" />
                    </svg>
                    <p className="text-xs font-medium text-gold-800 dark:text-gold-300">
                      Privileged Communication &mdash; Attorney-client or CPA-client confidentiality applies. All messages are end-to-end encrypted and logged to the immutable audit trail.
                    </p>
                  </div>
                )}
              </div>

              {/* Messages */}
              <div className="flex-1 space-y-4 overflow-y-auto px-5 py-6">
                {threadMessages.map((msg) => {
                  const isMe = msg.senderId === "u1";
                  return (
                    <div
                      key={msg.id}
                      className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-5 py-3.5 ${
                          isMe
                            ? "rounded-br-md bg-navy-500 text-white dark:bg-navy-600"
                            : "rounded-bl-md border border-navy-100 bg-navy-50 text-navy-700 dark:border-navy-700 dark:bg-navy-800 dark:text-navy-200"
                        }`}
                      >
                        {!isMe && (
                          <p className={`mb-1 text-[11px] font-semibold ${isMe ? "text-white/70" : "text-navy-500 dark:text-navy-400"}`}>
                            {msg.senderName}
                          </p>
                        )}
                        <p className="text-sm leading-relaxed">{msg.body}</p>
                        <p
                          className={`mt-2 text-right text-[10px] ${
                            isMe ? "text-white/50" : "text-navy-400 dark:text-navy-500"
                          }`}
                        >
                          {formatFullTime(msg.createdAt)}
                          {isMe && msg.readAt && " · Read"}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Reply bar */}
              <div className="border-t border-navy-100 px-5 py-4 dark:border-navy-700">
                <div className="flex items-end gap-3">
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    rows={2}
                    placeholder="Type your reply..."
                    className="flex-1 resize-none rounded-lg border border-navy-200 bg-white px-4 py-2.5 text-sm leading-relaxed text-navy-700 placeholder:text-navy-300 focus:border-navy-400 focus:outline-none focus:ring-2 focus:ring-navy-200 dark:border-navy-600 dark:bg-navy-800 dark:text-navy-200 dark:placeholder:text-navy-500 dark:focus:ring-navy-700"
                  />
                  <button
                    type="button"
                    className="inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg bg-navy-500 text-white shadow-sm transition-all hover:bg-navy-600 hover:shadow-md dark:bg-navy-500 dark:hover:bg-navy-400"
                    aria-label="Send reply"
                  >
                    <IconSend className="h-4 w-4" />
                  </button>
                </div>
                {selectedThread.encrypted && (
                  <p className="mt-2 flex items-center gap-1.5 text-[11px] text-navy-400 dark:text-navy-500">
                    <IconLock className="h-3 w-3 text-forest-500 dark:text-forest-400" />
                    End-to-end encrypted
                  </p>
                )}
              </div>
            </div>
          ) : (
            /* ── Empty state ── */
            <div className="flex h-96 flex-col items-center justify-center px-6 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-navy-50 dark:bg-navy-800">
                <svg viewBox="0 0 24 24" fill="none" className="h-8 w-8 text-navy-300 dark:text-navy-500" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                </svg>
              </div>
              <p className="mt-4 font-serif text-lg text-navy-700 dark:text-navy-200">
                Select a conversation
              </p>
              <p className="mt-1 max-w-sm text-sm text-navy-400 dark:text-navy-500">
                Choose a thread from the list to view the conversation, or start a new message to connect with a colleague or client.
              </p>
              <button
                onClick={() => setShowCompose(true)}
                className="mt-6 inline-flex min-h-touch items-center gap-2 rounded-lg bg-navy-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-navy-600 hover:shadow-md dark:bg-navy-500 dark:hover:bg-navy-400"
              >
                <IconPlus className="h-4 w-4" />
                New Message
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
