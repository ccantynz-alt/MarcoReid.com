import { NextResponse } from "next/server";
import { sendEmail, emailLayout } from "@/lib/email";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";
  const rl = await rateLimit({ key: `contact:${ip}`, limit: 3, windowSeconds: 60 });
  if (!rl.ok) return NextResponse.json({ error: "Too many requests" }, { status: 429 });

  try {
    const body = await request.json();
    const { name, email, firm, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    console.info("[contact]", {
      name,
      email,
      firm: firm || null,
      subject: subject || "General enquiry",
      messageLength: message.length,
      timestamp: new Date().toISOString(),
    });

    // Send notification email to the team
    const displaySubject = subject || "General enquiry";
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

    return NextResponse.json(
      { success: true, message: "Message received. We will respond within 24 hours." },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Failed to process your message. Please try again." },
      { status: 500 }
    );
  }
}
