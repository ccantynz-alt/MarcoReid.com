// Transactional email adapter.
// Uses the Crontech Mailgun-shape API in production (CRONTECH_API_URL +
// CRONTECH_API_KEY). Falls back to a console.log mock when the env vars
// are not set, so local development works without credentials.

interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
  text?: string;
  from?: string;
}

interface EmailResult {
  ok: boolean;
  id?: string;
  error?: string;
}

export async function sendEmail(params: SendEmailParams): Promise<EmailResult> {
  const apiUrl = process.env.CRONTECH_API_URL;
  const apiKey = process.env.CRONTECH_API_KEY;
  const from = params.from || "Marco Reid <noreply@marcoreid.com>";

  // Development / unconfigured mode: log to console so you can copy the link
  if (!apiUrl || !apiKey) {
    // eslint-disable-next-line no-console
    console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    // eslint-disable-next-line no-console
    console.log(`Email (dev mode — CRONTECH_API_URL / CRONTECH_API_KEY not set)`);
    // eslint-disable-next-line no-console
    console.log(`To:      ${params.to}`);
    // eslint-disable-next-line no-console
    console.log(`From:    ${from}`);
    // eslint-disable-next-line no-console
    console.log(`Subject: ${params.subject}`);
    // eslint-disable-next-line no-console
    console.log("---");
    // eslint-disable-next-line no-console
    console.log(params.text || params.html);
    // eslint-disable-next-line no-console
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
    return { ok: true, id: "dev-" + Date.now() };
  }

  try {
    const response = await fetch(`${apiUrl}/api/v1/email/send`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: params.to,
        subject: params.subject,
        html: params.html,
        text: params.text,
      }),
    });

    if (!response.ok) {
      const body = await response.text();
      console.error(`[email] Crontech API error ${response.status}: ${body}`);
      return { ok: false, error: `Crontech API error ${response.status}: ${body}` };
    }

    const data = (await response.json()) as { id?: string };
    return { ok: true, id: data.id };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[email] Failed to send:", message);
    return { ok: false, error: message };
  }
}

// Shared branded email wrapper
export function emailLayout(opts: {
  preheader: string;
  heading: string;
  body: string;
  cta?: { href: string; label: string };
  footer?: string;
}): { html: string; text: string } {
  const { preheader, heading, body, cta, footer } = opts;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>${heading}</title>
</head>
<body style="margin:0;padding:0;background:#f5f7fa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#2d3748;">
  <div style="display:none;max-height:0;overflow:hidden;">${preheader}</div>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f5f7fa;padding:48px 0;">
    <tr>
      <td align="center">
        <table role="presentation" width="560" cellspacing="0" cellpadding="0" style="background:#ffffff;border-radius:16px;box-shadow:0 1px 2px rgba(0,0,0,0.04);overflow:hidden;">
          <tr>
            <td style="padding:40px 40px 24px;">
              <p style="margin:0;font-family:Georgia,serif;font-size:24px;color:#1a2545;letter-spacing:-0.5px;">Marco Reid</p>
            </td>
          </tr>
          <tr>
            <td style="padding:0 40px 8px;">
              <h1 style="margin:0;font-family:Georgia,serif;font-size:28px;line-height:1.25;color:#1a2545;font-weight:normal;">${heading}</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:16px 40px 32px;font-size:16px;line-height:1.6;color:#4a5568;">
              ${body}
            </td>
          </tr>
          ${cta
            ? `<tr><td style="padding:0 40px 40px;">
                 <a href="${cta.href}" style="display:inline-block;padding:14px 28px;background:#1a2545;color:#ffffff;text-decoration:none;border-radius:10px;font-weight:600;font-size:15px;">${cta.label}</a>
               </td></tr>`
            : ""}
          <tr>
            <td style="padding:24px 40px 40px;border-top:1px solid #edf1f7;font-size:13px;color:#9aa4b8;">
              ${footer || "Reid &amp; Associates Ltd · Auckland, New Zealand"}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const text = [
    heading,
    "",
    body.replace(/<[^>]+>/g, ""),
    cta ? `\n${cta.label}: ${cta.href}\n` : "",
    footer || "Reid & Associates Ltd, Auckland, New Zealand",
  ].join("\n");

  return { html, text };
}
