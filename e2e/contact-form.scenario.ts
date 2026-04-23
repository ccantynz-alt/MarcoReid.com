// Runner-agnostic scenarios for the /contact form.

import type { Scenario } from "./types";

export const contactFormRenders: Scenario = {
  name: "contact form renders all required fields",
  steps: [
    { type: "navigate", to: "/contact" },
    { type: "expect.visible", label: "Name" },
    { type: "expect.visible", label: "Email" },
    { type: "expect.visible", label: "Firm name" },
    { type: "expect.visible", label: "Subject" },
    { type: "expect.visible", label: "Message" },
    { type: "expect.visible", role: "button", name: "Send message" },
  ],
};

export const contactFormRequiredFields: Scenario = {
  name: "contact form requires name, email, and message",
  steps: [
    { type: "navigate", to: "/contact" },
    { type: "expect.attribute", label: "Name", attribute: "required" },
    { type: "expect.attribute", label: "Email", attribute: "required" },
    { type: "expect.attribute", label: "Message", attribute: "required" },
  ],
};

export const contactFormLoadingState: Scenario = {
  name: "contact form shows loading state while submitting",
  steps: [
    { type: "navigate", to: "/contact" },
    { type: "fill", label: "Name", value: "Test User" },
    { type: "fill", label: "Email", value: "test@example.com" },
    { type: "fill", label: "Message", value: "Test message" },
    {
      type: "mock.response",
      url: "/api/contact",
      delayMs: 500,
      status: 200,
      body: { success: true },
    },
    { type: "click", role: "button", name: "Send message" },
    { type: "expect.visible", text: "Sending" },
  ],
};

export const contactFormSuccessState: Scenario = {
  name: "contact form shows success state after submission",
  steps: [
    { type: "navigate", to: "/contact" },
    { type: "fill", label: "Name", value: "Test User" },
    { type: "fill", label: "Email", value: "test@example.com" },
    { type: "fill", label: "Message", value: "Test message" },
    {
      type: "mock.response",
      url: "/api/contact",
      status: 200,
      body: { success: true, message: "Received" },
    },
    { type: "click", role: "button", name: "Send message" },
    { type: "expect.visible", text: "Message sent." },
  ],
};
