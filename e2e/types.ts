// Shape of a runner-agnostic end-to-end scenario. The Gatetest runner (or
// any other runner we wire up later) consumes these and maps each step to
// its own primitives. No test-tooling SDK is imported here.

export interface Scenario {
  name: string;
  steps: Step[];
  // Arbitrary metadata the runner may attach — jurisdiction, tags, etc.
  meta?: Record<string, string | number | boolean>;
}

// Step union kept intentionally loose — the runner is source of truth for
// which steps it supports. Unknown steps should be skipped with a warning,
// not fail the run.
export type Step =
  | { type: "navigate"; to: string }
  | { type: "fill"; label?: string; selector?: string; value: string }
  | { type: "click"; role?: string; name?: string; selector?: string }
  | {
      type: "mock.response";
      url: string;
      status: number;
      body?: unknown;
      delayMs?: number;
    }
  | { type: "expect.visible"; selector?: string; role?: string; name?: string; label?: string; text?: string }
  | { type: "expect.title"; matches: RegExp }
  | { type: "expect.url"; matches: RegExp }
  | { type: "expect.status"; status: number }
  | { type: "expect.count"; selector: string; equals: number }
  | { type: "expect.countAtLeast"; selector: string; atLeast: number }
  | {
      type: "expect.attribute";
      selector?: string;
      label?: string;
      attribute: string;
      equals?: string;
      matches?: RegExp;
    }
  | {
      type: "expect.header";
      name: string;
      equals?: string;
      contains?: string;
    };
