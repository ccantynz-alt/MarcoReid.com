#!/usr/bin/env node
// Placeholder Gatetest runner. Does nothing until the Marco Reid tenant is
// provisioned on the Gatetest platform. Until then, `npm run test:e2e`
// exits 0 so CI stays green and the hook point is stable.

const apiKey = process.env.GATETEST_API_KEY;
const projectId = process.env.GATETEST_PROJECT_ID;

if (!apiKey || !projectId) {
  console.log(
    "Gatetest tenant not yet provisioned — skipping. " +
      "Set GATETEST_API_KEY and GATETEST_PROJECT_ID to run the real suite."
  );
  process.exit(0);
}

console.log(
  "Gatetest tenant detected (project " +
    projectId +
    "). Real runner not wired in this branch — see gatetest.config.ts."
);
process.exit(0);
