"use server";

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
    // Log the contact submission (replace with email service in production)
    console.info("[contact]", {
      name,
      email,
      firm: firm || null,
      subject: subject || "General enquiry",
      messageLength: message.length,
      timestamp: new Date().toISOString(),
    });

    return { status: "success", message: "Message received. We will respond within 24 hours." };
  } catch {
    return { status: "error", message: "Failed to process your message. Please try again." };
  }
}
