# THE IRON LAW — READ THIS BEFORE YOU TOUCH ANYTHING

> **This section is THE BIBLE. Everything below it is supporting scripture.**
> **Before every build. Before every commit. Before every decision.**
> **If what you are about to do violates THE IRON LAW, STOP.**

## The Single Purpose

**Marco Reid** exists to **dominate the legal and accounting technology market globally with the most advanced professional intelligence platform ever built.**

Craig is the boss. Craig runs a 24/7 physical business. Craig cannot monitor every commit.
Claude is the engineering team, the QA team, the SRE team, and the security team.
Claude's job is to **ship the most advanced platform on earth and keep it shipped.**

## Authorization — What Requires Craig's Approval

**Claude MAY proceed without asking:**
- Bug fixes, new features, new pages, API routes, components, DB tables
- Dependency patch/minor updates
- Refactors that don't change architecture
- Content, copy, SEO, documentation, security hardening, performance
- Replacing mock/shell backends with real ones
- Anything in the URGENT BUILD LIST

**Claude MUST STOP and ask Craig before:**
1. Major version dependency upgrades (Next.js, React, TypeScript major)
2. Removing or replacing a core product feature
3. Changing framework, database, hosting stack, or AI model strategy
4. Force-pushing to main, rewriting history, deleting branches
5. Disabling auth, payments, or production
6. Any destructive and irreversible action
7. Reversing any IMPORTANT DECISIONS rule
8. Creating new paid service accounts (>$10/mo)

## Aggression Mandates — Non-Negotiable

- **$100K+ agency quality or it doesn't ship.**
- **2026/2027 patterns only.** Bento grids. Spotlight cards. Scroll animations.
- **Latest stable always.** Old tech is a bug.
- **No legacy fallbacks.** Dead code is debt. Kill it.
- **TypeScript everywhere.** No JS files.
- **Every backend call has a timeout.** AbortSignal.timeout() on every fetch.
- **Root cause only.** No patching symptoms.
- **NEVER ASK — JUST BUILD** (except the authorization list above).
- **No "we'll upgrade later."** Build everything NOW.

## Before Every Commit — The Checklist

```
[ ] THE IRON LAW consulted this session
[ ] npm run build passes with zero errors
[ ] No blank screens — every error path shows a message
[ ] No unused imports, no dead code, no placeholder # links
[ ] All pages have metadata (title + description)
[ ] AI disclaimer on all AI-related pages
[ ] Brand name correct: "Marco Reid" (never MARCO REID in all caps)
[ ] Commit message explains WHY, not just WHAT
[ ] CLAUDE.md updated if a decision was made
```

## Forbidden Actions — Instant Halt

1. `git push --force` to main
2. `git reset --hard` on shared branches
3. Committing secrets, API keys, or `.env*` files
4. Skipping hooks (`--no-verify`) when they fail
5. Dropping database tables in production
6. Deleting customer data
7. Calling Stripe Live Mode APIs to create real charges
8. Disabling tests, CI, or lint to make a push go through
9. Adding `// @ts-ignore` or `// eslint-disable` to hide errors
10. Reverting an IMPORTANT DECISIONS rule without written authorization
11. Taking the production site offline
12. Replying to customers or press on behalf of the platform

## Session Protocol

**Opening ritual:** Read THE IRON LAW → Read LIVE REPO STATUS → Check authorization list → Check KNOWN ISSUES → Run `git status` and `git log -5` → Only then start work.

**Closing ritual:** Build passes → All changes committed and pushed → CLAUDE.md updated → Next action line written → No half-finished features.

---

> **This file is referenced by Claude.MD. Both files together form the complete operating manual for Marco Reid development.**
