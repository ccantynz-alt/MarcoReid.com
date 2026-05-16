"use server";

import { sendEmail, emailLayout } from "@/lib/email";

export type ContactState = {
  status: "idle" | "success" | "error";
  message: string;
};

export async function submitContactForm(
  _prevState: ContactState,
  formData: FormData
): Promise<ContactState> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const firm = formData.get("firm") as string;
  const subject = formData.get("subject") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !message) {
    return { status: "error", message: "Name, email, and message are required." };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { status: "error", message: "Please provide a valid email address." };
  }

  try {
    const displaySubject = subject || "General enquiry";

    console.info("[contact]", {
      name,
      email,
      firm: firm || null,
      subject: displaySubject,
      messageLength: message.length,
      timestamp: new Date().toISOString(),
    });

    // Send notification email to the team
    const { html, text } = emailLayout({
      preheader: `New contact form submission from ${name}`,
      heading: `New enquiry: ${displaySubject}`,
      body: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${firm ? `<p><strong>Firm:</strong> ${firm}</p>` : ""}
        <p><strong>Subject:</strong> ${displaySubject}</p>
        <hr style="border:none;border-top:1px solid #edf1f7;margin:16px 0;">
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    });

    const result = await sendEmail({
      to: "contact@marcoreid.com",
      subject: `[Contact] ${displaySubject} — from ${name}`,
      html,
      text,
    });

    if (!result.ok) {
      console.error("[contact] Failed to send notification email:", result.error);
    }

    // Send confirmation email to the submitter
    const { html: confirmHtml, text: confirmText } = emailLayout({
      preheader: "We received your message and will be in touch soon.",
      heading: "Thanks for reaching out",
      body: `
        <p>Hi ${name},</p>
        <p>We have received your message regarding <strong>${displaySubject}</strong> and will get back to you within 24 hours.</p>
        <p>In the meantime, feel free to reply to this email if you have any additional details to share.</p>
      `,
    });

    const confirmResult = await sendEmail({
      to: email,
      subject: `We received your message — Marco Reid`,
      html: confirmHtml,
      text: confirmText,
    });

    if (!confirmResult.ok) {
      console.error("[contact] Failed to send confirmation email:", confirmResult.error);
    }

    return { status: "success", message: "Message received. We will respond within 24 hours." };
  } catch {
    return { status: "error", message: "Failed to process your message. Please try again." };
  }
}
