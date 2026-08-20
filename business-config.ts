// Central business configuration for the booking system.
// Change these via environment variables in production — do not hard-code
// per-business values elsewhere in the codebase.

export const BUSINESS_NAME = process.env.BUSINESS_NAME || "Bukwin AI";

// IANA timezone name. All appointment wall-clock times are interpreted in
// this timezone unless the customer's request explicitly overrides it.
export const BUSINESS_TIMEZONE = process.env.BUSINESS_TIMEZONE || "Asia/Karachi";

// 24h "HH:mm" local time, inclusive start / exclusive end.
export const BUSINESS_HOURS_START = process.env.BUSINESS_HOURS_START || "09:00";
export const BUSINESS_HOURS_END = process.env.BUSINESS_HOURS_END || "18:00";

// 0 = Sunday ... 6 = Saturday. Default: closed Sunday.
export const WORKING_DAYS = (process.env.BUSINESS_WORKING_DAYS || "1,2,3,4,5,6")
  .split(",")
  .map((d) => parseInt(d.trim(), 10))
  .filter((d) => !Number.isNaN(d));

// Default slot length used for both slot generation and event duration
// unless a specific service overrides it.
export const DEFAULT_APPOINTMENT_DURATION_MINUTES = parseInt(
  process.env.DEFAULT_APPOINTMENT_DURATION_MINUTES || "30",
  10
);

// How far in the future customers can book.
export const MAX_BOOKING_HORIZON_DAYS = parseInt(
  process.env.MAX_BOOKING_HORIZON_DAYS || "30",
  10
);

// Minimum lead time before a booking (prevents booking a slot 2 minutes away).
export const MIN_BOOKING_NOTICE_MINUTES = parseInt(
  process.env.MIN_BOOKING_NOTICE_MINUTES || "60",
  10
);

export type Service = {
  id: string;
  name: string;
  durationMinutes: number;
};

// Edit this list to match what Bukwin actually offers. Keep `id` stable —
// it's what the agent/tool calls will reference.
export const SERVICES: Service[] = [
  { id: "consultation", name: "Consultation Call", durationMinutes: 30 },
  { id: "setup-call", name: "AI Receptionist Setup Call", durationMinutes: 45 },
  { id: "demo", name: "Live Product Demo", durationMinutes: 30 },
];

export function getServiceById(id: string): Service | undefined {
  return SERVICES.find((s) => s.id === id);
}
