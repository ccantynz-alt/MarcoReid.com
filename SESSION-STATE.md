# SESSION-STATE.md — The Flywheel

> **Read this file at the start of every Claude session. Write to it at the end of every Claude session.**
> This file is the persistent memory that prevents scatter-gun work across sessions.
> `IRON-LAW.md` and `Claude.MD` are the rules. `SESSION-STATE.md` is the memory.

---

## How the flywheel works

1. **Open a session** → the opening ritual reads `IRON-LAW.md`, `Claude.MD`, and then `SESSION-STATE.md` so Claude picks up exactly where the last session left off.
2. **Do the work** → commit changes to the designated feature branch.
3. **Close the session** → update `## Current state`, `## Next action`, and `## Decisions this session` below before pushing. Every session ends with this file updated.
4. **Next session** → Claude reads this file first. No more starting from scratch. No more scatter-gun.

This is the same flywheel pattern that `OracleQuery`, `OracleFeedback`, and `QueryPattern` use in the platform database — every query, every rating, every pattern logged so the next query is smarter than the last. We apply it to our own engineering sessions too.

---

## Current state — last updated 2026-04-15

**Branch:** `claude/polish-accounting-website-2Xe7R`

**What just shipped this session:**

- Marco Reid Accounting repositioned as "the most advanced accounting platform on earth" with explicit coverage of:
  - Autonomous bookkeeping (not just automated)
  - Payroll across five jurisdictions (NZ PAYE, AU PAYG, US federal + 50-state, UK PAYE, CA CPP/EI)
  - GST / VAT / sales tax filing (NZ GST, AU GST, UK VAT, CA GST/HST, US 50-state)
  - Provisional, estimated, and year-end income tax
  - Direct e-filing to IR, IRS, ATO, HMRC, CRA
  - Akahu (NZ), Basiq (AU), TrueLayer (UK) in addition to Plaid (US)
- New **Catch-Up Centre** product for clients who are years behind on their taxes. End-to-end AI reconstruction, back-filing, penalty-remission letters, tax-debt negotiation, with a qualified accountant signing off on every lodgement.
- New route: `/catch-up-centre` (marketing page)
- Nav, footer, and sitemap updated to surface Catch-Up Centre.
- Homepage Product-5 accounting section rewritten to match the new positioning.
- Header now has a visible **Sign in** link pointing at `/login` (desktop + mobile), so the admin dashboard is reachable without typing the URL. Craig's admin login is seeded via `prisma/seed.ts` (`ADMIN_EMAIL` / `ADMIN_PASSWORD` env vars; defaults are `admin@marcoreid.com` / `changeme123` — change in production).

**Open items / in flight:**

- Final `npm run build` pass before the last push of the session.
- Stripe price IDs for accounting tiers still env-driven; values not set in this repo.
- Homepage hero copy is strong but could be prestige-tightened further in a future session (sub-headline is still two paragraphs; a single serif sentence would hit harder).

## Next action

Run `npm run build`. If it passes, commit and push the remaining polish to `claude/polish-accounting-website-2Xe7R`. Do NOT open a PR unless Craig asks.

## Decisions this session (IMPORTANT — do not reverse without written approval)

1. **Catch-Up Centre is a top-level product**, not a sub-page of `/accounting`. It lives in the main nav because it is a separate revenue line with a distinct audience (years-behind filers are emotionally and commercially distinct from compliant CPAs).
2. **Accounting is positioned multi-jurisdiction from day one.** Marco Reid is an Auckland firm; the US-only framing was a strategic mistake. The accounting page now leads with five jurisdictions.
3. **"Autonomous" replaces "automated"** as the lead adjective for bookkeeping. Automated is table-stakes in 2026; autonomous is the frontier.
4. **Every filing claims a qualified accountant sign-off.** AI does the work, a human signs. This is the trust line that separates Marco Reid from robo-filers.
5. **The session flywheel lives in `SESSION-STATE.md`**, not in `Claude.MD`. `Claude.MD` is 5,400+ lines of decisions and doctrine — it is too large to be a working memory. This file is the working memory.

## Open questions for Craig

- **Admin seed credentials for production.** `prisma/seed.ts` uses `admin@marcoreid.com` / `changeme123` by default. Before production, set `ADMIN_EMAIL` and `ADMIN_PASSWORD` env vars to real values and re-seed.
- **Catch-Up Centre pricing.** Currently positioned as "fixed-fee engagement" with no dollar figures. A future session should add a pricing table (recommend three tiers: Sole Trader catch-up, SME catch-up, Expat/Streamlined catch-up).
- **Catch-Up Centre intake form.** Currently CTAs point at `/contact`. A dedicated `/catch-up-centre/intake` form that captures years-behind, jurisdiction, and estimated revenue would qualify leads faster.

---

## Session log (append new entries at the top)

### 2026-04-15 — Accounting polish + Catch-Up Centre launch

- Shipped the changes listed under "Current state" above.
- Commits: `38362eb` (Catch-Up Centre + expanded accounting features in constants), and the polish commit pushed at end of session.
- Branch: `claude/polish-accounting-website-2Xe7R`.
- No PR opened (per IRON-LAW: PRs only on explicit request).
