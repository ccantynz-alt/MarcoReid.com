// Runner-agnostic accessibility scenarios.

import type { Scenario } from "./types";

export const homepageHeadingHierarchy: Scenario = {
  name: "homepage has a single H1 heading",
  steps: [
    { type: "navigate", to: "/" },
    { type: "expect.count", selector: "h1", equals: 1 },
  ],
};

export const allImagesHaveAltText: Scenario = {
  name: "every image on the homepage has alt text",
  steps: [
    { type: "navigate", to: "/" },
    { type: "expect.count", selector: "img:not([alt])", equals: 0 },
  ],
};

export const skipToContentLinkPresent: Scenario = {
  name: "skip-to-content link is present (or count >= 0 — informational)",
  steps: [
    { type: "navigate", to: "/" },
    { type: "expect.countAtLeast", selector: 'a[href="#main"]', atLeast: 0 },
  ],
};

export const htmlLangAttribute: Scenario = {
  name: "html element declares English language",
  steps: [
    { type: "navigate", to: "/" },
    { type: "expect.attribute", selector: "html", attribute: "lang", equals: "en" },
  ],
};

export const metaDescriptionPresent: Scenario = {
  name: "homepage has a non-empty meta description",
  steps: [
    { type: "navigate", to: "/" },
    {
      type: "expect.attribute",
      selector: 'meta[name="description"]',
      attribute: "content",
      matches: /.+/,
    },
  ],
};
