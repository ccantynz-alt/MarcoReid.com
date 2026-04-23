// Gatetest configuration — wire-ready stub for when the Marco Reid tenant
// is provisioned on the Gatetest platform (part of the Crontech family).
//
// Gatetest is Marco Reid's end-to-end testing surface. It consumes the
// runner-agnostic scenarios in `./e2e/*.scenario.ts` and handles headless
// browser orchestration, visual diffing, and AI auto-fix upstream of us.
//
// No API calls are made from this file. It declares intent and pulls
// credentials from the environment — the runner (scripts/gatetest-run.mjs)
// is the only thing that actually talks to the service.

export interface GatetestConfig {
  apiUrl: string;
  apiKey: string | null;
  projectId: string | null;
  /** Base URL the scenarios should hit when running locally. */
  baseUrl: string;
  /** Where to look for scenario files. */
  scenariosDir: string;
  /** Whether the tenant is considered provisioned — gates the runner. */
  provisioned: boolean;
}

const apiUrl = process.env.GATETEST_API_URL ?? "https://api.gatetest.io/v1";
const apiKey = process.env.GATETEST_API_KEY ?? null;
const projectId = process.env.GATETEST_PROJECT_ID ?? null;

const config: GatetestConfig = {
  apiUrl,
  apiKey,
  projectId,
  baseUrl: process.env.GATETEST_BASE_URL ?? "http://localhost:3000",
  scenariosDir: "./e2e",
  // A tenant is provisioned only when we have both an API key and a project
  // ID in the environment. The placeholder runner checks this flag.
  provisioned: Boolean(apiKey && projectId),
};

export default config;
