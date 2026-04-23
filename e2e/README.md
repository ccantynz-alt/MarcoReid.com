# End-to-end test scenarios

These are **runner-agnostic** behavioural scenarios. They describe what the
Marco Reid marketing and platform surfaces must do; they do not bind us to
any specific test runner.

When the Gatetest tenant is provisioned for Marco Reid (see `gatetest.config.ts`
at the repo root) the scenarios in this folder are consumed by the Gatetest
runner. Until then, `npm run test:e2e` is a no-op placeholder that exits 0 —
see `scripts/gatetest-run.mjs`.

Scenario files use a plain-JS/TS shape:

```ts
export const scenario = {
  name: "Homepage loads with Marco Reid title",
  route: "/",
  steps: [
    { type: "navigate", to: "/" },
    { type: "expect.title", matches: /Marco Reid/ },
  ],
};
```

No imports from any tooling SDK. No `test.describe`, no `page.locator`. The
runner consumes the scenario shape and maps steps to its own primitives.
