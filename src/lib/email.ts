import { BUSINESS_NAME } from "@/lib/business-config";

export type BookingConfirmationInput = {
  toEmail: string;
  customerName: string;
  service: string;
  startLabel: string;
  timezone: string;
  calendarLink?: string | null;
};

export async function sendBookingConfirmationEmail(
  input: BookingConfirmationInput
): Promise<{ sent: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.BUSINESS_EMAIL_FROM;

  if (!apiKey || !from) {
    console.warn("[email] RESEND_API_KEY or BUSINESS_EMAIL_FROM not set — skipping email.");
    return { sent: false, error: "email not configured" };
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);

    const html = `
      <div style="font-family: -apple-system, sans-serif; max-width: 480px; margin: 0 auto;">
        <h2 style="color:#0F172A;">Your appointment is confirmed</h2>
        <p>Hi ${escapeHtml(input.customerName)},</p>
        <p>Your <strong>${escapeHtml(input.service)}</strong> with ${escapeHtml(BUSINESS_NAME)} is confirmed for:</p>
        <p style="font-size:18px; font-weight:600; color:#0F172A;">
          ${escapeHtml(input.startLabel)} (${escapeHtml(input.timezone)})
        </p>
        ${input.calendarLink ? `<p><a href="${input.calendarLink}" style="color:#D4A853;">View in Google Calendar</a></p>` : ""}
        <p>If you need to reschedule or cancel, just reply to this email.</p>
        <p style="color:#64748B; font-size:13px;">— ${escapeHtml(BUSINESS_NAME)}</p>
      </div>
    `;

    const { error } = await resend.emails.send({
      from,
      to: input.toEmail,
      subject: `Appointment confirmed — ${input.service}`,
      html,
    });

    if (error) {
      console.error("[email] Resend error:", error);
      return { sent: false, error: String(error) };
    }
    return { sent: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown email error";
    console.error("[email] Failed:", message);
    return { sent: false, error: message };
  }
}

export async function sendRescheduleEmail(
  input: BookingConfirmationInput
): Promise<{ sent: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.BUSINESS_EMAIL_FROM;

  if (!apiKey || !from) {
    console.warn("[email] Skipping reschedule email — not configured.");
    return { sent: false, error: "email not configured" };
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);

    const html = `
      <div style="font-family: -apple-system, sans-serif; max-width: 480px; margin: 0 auto;">
        <h2 style="color:#0F172A;">Your appointment has been rescheduled</h2>
        <p>Hi ${escapeHtml(input.customerName)},</p>
        <p>Your <strong>${escapeHtml(input.service)}</strong> with ${escapeHtml(BUSINESS_NAME)} has been moved to:</p>
        <p style="font-size:18px; font-weight:600; color:#0F172A;">
          ${escapeHtml(input.startLabel)} (${escapeHtml(input.timezone)})
        </p>
        ${input.calendarLink ? `<p><a href="${input.calendarLink}" style="color:#D4A853;">View in Google Calendar</a></p>` : ""}
        <p>If you need to make further changes, just reply to this email.</p>
        <p style="color:#64748B; font-size:13px;">— ${escapeHtml(BUSINESS_NAME)}</p>
      </div>
    `;

    const { error } = await resend.emails.send({
      from,
      to: input.toEmail,
      subject: `Appointment rescheduled — ${input.service}`,
      html,
    });

    if (error) {
      console.error("[email] Resend error:", error);
      return { sent: false, error: String(error) };
    }
    return { sent: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown email error";
    console.error("[email] Failed:", message);
    return { sent: false, error: message };
  }
}

export type CancellationInput = {
  toEmail: string;
  customerName: string;
  service: string;
  startLabel: string;
  timezone: string;
};

export async function sendCancellationEmail(
  input: CancellationInput
): Promise<{ sent: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.BUSINESS_EMAIL_FROM;

  if (!apiKey || !from) {
    console.warn("[email] Skipping cancellation email — not configured.");
    return { sent: false, error: "email not configured" };
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);

    const html = `
      <div style="font-family: -apple-system, sans-serif; max-width: 480px; margin: 0 auto;">
        <h2 style="color:#0F172A;">Your appointment has been cancelled</h2>
        <p>Hi ${escapeHtml(input.customerName)},</p>
        <p>Your <strong>${escapeHtml(input.service)}</strong> with ${escapeHtml(BUSINESS_NAME)} scheduled for <strong>${escapeHtml(input.startLabel)}</strong> has been cancelled.</p>
        <p>If this was a mistake or you'd like to rebook, just reply to this email.</p>
        <p style="color:#64748B; font-size:13px;">— ${escapeHtml(BUSINESS_NAME)}</p>
      </div>
    `;

    const { error } = await resend.emails.send({
      from,
      to: input.toEmail,
      subject: `Appointment cancelled — ${input.service}`,
      html,
    });

    if (error) {
      console.error("[email] Resend error:", error);
      return { sent: false, error: String(error) };
    }
    return { sent: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown email error";
    console.error("[email] Failed:", message);
    return { sent: false, error: message };
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
