"use client";

export default function DashboardMockup() {
  return (
    <div className="mockup-window mx-auto max-w-2xl">
      <div className="mockup-titlebar">
        <div className="mockup-dot bg-red-500/80" />
        <div className="mockup-dot bg-yellow-500/80" />
        <div className="mockup-dot bg-green-500/80" />
        <span className="ml-3 text-xs text-text-tertiary">
          AlecRae Law &mdash; Dashboard
        </span>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="hidden w-44 shrink-0 border-r border-surface-border bg-surface-raised p-3 sm:block">
          <div className="space-y-1">
            {[
              { icon: "◎", label: "Dashboard", active: true },
              { icon: "⚖", label: "Matters" },
              { icon: "◈", label: "Clients" },
              { icon: "◉", label: "Oracle" },
              { icon: "⊕", label: "Documents" },
              { icon: "⏱", label: "Billing" },
              { icon: "✉", label: "Messages" },
            ].map((item) => (
              <div
                key={item.label}
                className={`flex items-center gap-2 rounded-lg px-2.5 py-2 text-xs ${
                  item.active
                    ? "bg-accent/10 text-accent"
                    : "text-text-tertiary hover:text-text-secondary"
                }`}
              >
                <span className="text-xs">{item.icon}</span>
                {item.label}
              </div>
            ))}
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-text-primary">
                Good morning, Sarah
              </p>
              <p className="text-xs text-text-tertiary">
                3 deadlines today &middot; 5 unread messages
              </p>
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-surface-border bg-surface-subtle px-3 py-1.5 text-xs text-text-tertiary">
              <span>⌘K</span>
            </div>
          </div>

          {/* Stats row */}
          <div className="mt-4 grid grid-cols-3 gap-3">
            <div className="rounded-lg border border-surface-border bg-surface-subtle p-3">
              <p className="text-xs text-text-tertiary">Active matters</p>
              <p className="mt-1 text-lg font-semibold text-text-primary">24</p>
            </div>
            <div className="rounded-lg border border-surface-border bg-surface-subtle p-3">
              <p className="text-xs text-text-tertiary">Hours this week</p>
              <p className="mt-1 text-lg font-semibold text-accent">32.5</p>
            </div>
            <div className="rounded-lg border border-surface-border bg-surface-subtle p-3">
              <p className="text-xs text-text-tertiary">Revenue (MTD)</p>
              <p className="mt-1 text-lg font-semibold text-text-primary">$47,200</p>
            </div>
          </div>

          {/* Recent matters */}
          <div className="mt-4 space-y-2">
            <p className="text-xs font-medium text-text-tertiary">
              Today&rsquo;s deadlines
            </p>
            {[
              { matter: "Rodriguez — H-1B Filing", deadline: "I-129 due today", urgent: true },
              { matter: "Thornton Corp — Acquisition", deadline: "Due diligence review", urgent: false },
              { matter: "Chen — Employment Contract", deadline: "Client sign-off", urgent: false },
            ].map((item) => (
              <div
                key={item.matter}
                className="flex items-center justify-between rounded-lg border border-surface-border bg-surface-subtle p-3"
              >
                <div>
                  <p className="text-xs font-medium text-text-primary">
                    {item.matter}
                  </p>
                  <p className="text-xs text-text-tertiary">{item.deadline}</p>
                </div>
                {item.urgent && (
                  <span className="rounded-full bg-red-500/10 px-2 py-0.5 text-[10px] font-semibold text-red-400">
                    Urgent
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
