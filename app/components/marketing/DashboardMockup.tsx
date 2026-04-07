"use client";

export default function DashboardMockup() {
  return (
    <div className="mockup-window mx-auto w-full">
      <div className="mockup-titlebar">
        <div className="mockup-dot bg-[#ff5f57]" />
        <div className="mockup-dot bg-[#febc2e]" />
        <div className="mockup-dot bg-[#28c840]" />
        <div className="ml-4 flex-1">
          <div className="mx-auto w-48 rounded-md bg-navy-100 px-3 py-1 text-center text-xs text-navy-400">
            app.marcoreid.com
          </div>
        </div>
      </div>

      <div className="flex min-h-[380px] sm:min-h-[440px]">
        {/* Sidebar */}
        <div className="hidden w-52 shrink-0 border-r border-navy-100 bg-navy-50 p-4 sm:block">
          <div className="mb-4 font-serif text-lg text-navy-500">Marco Reid</div>
          <div className="space-y-0.5">
            {[
              { icon: "◎", label: "Dashboard", active: true },
              { icon: "⚖", label: "Matters", count: "24" },
              { icon: "◈", label: "Clients", count: "86" },
              { icon: "◉", label: "Marco" },
              { icon: "⊕", label: "Documents" },
              { icon: "⏱", label: "Billing" },
              { icon: "✦", label: "Calendar" },
              { icon: "✉", label: "Messages", count: "5" },
              { icon: "⊞", label: "Reports" },
            ].map((item) => (
              <div
                key={item.label}
                className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm ${
                  item.active
                    ? "bg-navy-500 font-medium text-white"
                    : "text-navy-400 hover:bg-navy-100"
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <span className="w-4 text-center text-xs">{item.icon}</span>
                  {item.label}
                </span>
                {item.count && !item.active && (
                  <span className="rounded-full bg-navy-100 px-2 py-0.5 text-xs font-medium text-navy-500">
                    {item.count}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 p-5 sm:p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-lg font-semibold text-navy-700">
                Good morning, Sarah
              </p>
              <p className="mt-0.5 text-sm text-navy-400">
                Wednesday, March 31 &middot; 3 deadlines today
              </p>
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-navy-100 bg-navy-50 px-3 py-1.5 text-xs text-navy-400">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              <span>&#8984;K</span>
            </div>
          </div>

          {/* Stats row */}
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: "Active matters", value: "24", color: "text-navy-700" },
              { label: "Hours this week", value: "32.5", color: "text-forest-500" },
              { label: "Revenue (MTD)", value: "$47,200", color: "text-navy-700" },
              { label: "Trust balance", value: "$128,400", color: "text-plum-500" },
            ].map((s) => (
              <div key={s.label} className="rounded-xl border border-navy-100 bg-navy-50 p-3">
                <p className="text-xs text-navy-400">{s.label}</p>
                <p className={`mt-1 text-xl font-bold ${s.color}`}>{s.value}</p>
              </div>
            ))}
          </div>

          {/* Deadlines */}
          <div className="mt-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">
              Today&rsquo;s deadlines
            </p>
            <div className="mt-3 space-y-2">
              {[
                { matter: "Rodriguez \u2014 H-1B Filing", deadline: "I-129 due today", urgent: true, time: "9:00 AM" },
                { matter: "Thornton Corp \u2014 Acquisition", deadline: "Due diligence review complete", urgent: false, time: "2:00 PM" },
                { matter: "Chen \u2014 Employment Contract", deadline: "Client sign-off meeting", urgent: false, time: "4:30 PM" },
              ].map((item) => (
                <div
                  key={item.matter}
                  className="flex items-center justify-between rounded-xl border border-navy-100 bg-white p-3 transition-colors hover:bg-navy-50"
                >
                  <div className="flex items-center gap-3">
                    <div className={`h-2 w-2 rounded-full ${item.urgent ? "bg-red-500" : "bg-forest-500"}`} />
                    <div>
                      <p className="text-sm font-medium text-navy-700">{item.matter}</p>
                      <p className="text-xs text-navy-400">{item.deadline}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-navy-400">{item.time}</span>
                    {item.urgent && (
                      <span className="rounded-full bg-red-50 px-2 py-0.5 text-[10px] font-bold text-red-600">
                        URGENT
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
