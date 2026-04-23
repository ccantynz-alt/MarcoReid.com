# Marco Reid

AI-native legal and accounting platform with mandatory human sign-off on every consumer-facing output. Soft-launch jurisdictions: New Zealand and Australia, with the United Kingdom and United States to follow.

The platform combines:

- A two-sided marketplace connecting citizens with verified, licensed professionals
- An autonomous research and drafting layer powered by Anthropic Claude
- Trust-account, AML/CDD, and general-ledger primitives built jurisdiction-aware from day one
- Voice dictation, morning-briefing intelligence, and a unified workspace for matters, clients, time, and documents

Marco Reid is part of the Crontech family. Production hosting, transactional email, source control, and end-to-end testing flow through Crontech, AlecRae, Gluecron, and Gatetest respectively. The repository never depends on any service that competes with a family product.

## Run locally

```bash
npm install
cp .env.example .env.local            # fill in DATABASE_URL + secrets
npx prisma generate
npm run dev
```

The dev server runs at http://localhost:3000. Email sends are logged to the console when `ALECRAE_API_KEY` is unset. Document uploads are written to `./.dev-uploads/` until R2 credentials are provisioned.

## Project layout

```
app/                  Next.js 16 app router
  (marketing)/        Public marketing surfaces
  (auth)/             Sign in, register, verify, reset
  (platform)/         Authed product surfaces (matters, trust, AML, accounting, marketplace, admin)
  api/                Route handlers — REST endpoints + AlecRae webhook + platform-status
  components/         Shared React components
lib/                  Domain libraries (oracle, trust, aml, ledger, bankfeeds, email, auth, stripe)
prisma/               Schema + seed
e2e/                  Test scenarios (executed by Gatetest when configured)
```

## Operating manual

- `IRON-LAW.md` — non-negotiable rules for every commit. Read first.
- `SESSION-STATE.md` — working memory across Claude sessions. Updated at the end of every session.
- `Claude.MD` — long-form decisions and doctrine.

Every commit must satisfy the IRON-LAW checklist: build passes, no dead code, no placeholder links, AI disclaimer on AI surfaces, brand name correct, commit message explains why.
