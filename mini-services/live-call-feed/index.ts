import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer((req, res) => {
  // Simple health-check endpoint
  if (req.url === "/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ ok: true, service: "bukwin-live-call-feed", uptime: process.uptime() }));
    return;
  }
  res.writeHead(404);
  res.end("Not found");
});

const io = new Server(httpServer, {
  path: "/",
  cors: { origin: "*", methods: ["GET", "POST"] },
  pingTimeout: 60000,
  pingInterval: 25000,
});

type CallEvent = {
  id: string;
  callerName: string;
  callerNumber: string;
  scenario: string;
  outcome: "ringing" | "answered" | "booked" | "transferred" | "qualified";
  duration?: number;
  language?: string;
  sentiment?: "positive" | "neutral" | "negative";
  timestamp: string;
};

const NAMES = [
  "Sarah Mitchell", "James Park", "Maria Rodriguez", "David Cohen",
  "Aria Patel", "Liam O'Brien", "Yuki Tanaka", "Carlos Mendez",
  "Priya Sharma", "Benjamin Lee", "Sofia Rossi", "Omar Hassan",
  "Emma Wilson", "Lucas Silva", "Nina Petrov", "Hassan Ali",
];

const NUMBERS = [
  "+1 (415) 555-0192", "+1 (628) 555-0148", "+1 (510) 555-0173",
  "+1 (408) 555-0124", "+1 (925) 555-0187", "+1 (650) 555-0167",
  "+1 (415) 555-0184", "+1 (628) 555-0156",
];

const SCENARIOS = [
  { name: "Dental cleaning", outcome: "booked" as const },
  { name: "Property viewing", outcome: "booked" as const },
  { name: "Restaurant reservation", outcome: "booked" as const },
  { name: "Service inquiry", outcome: "qualified" as const },
  { name: "Urgent — transfer to provider", outcome: "transferred" as const },
  { name: "Quote request", outcome: "qualified" as const },
  { name: "Hours & directions", outcome: "answered" as const },
];

const LANGUAGES = ["English", "English", "English", "Spanish", "Mandarin", "Arabic"];
const SENTIMENTS = ["positive", "positive", "positive", "neutral", "negative"];

const rng = () => Math.floor(Math.random() * 1_000_000_000).toString(36);

function generateCallEvent(): CallEvent {
  const scenario = SCENARIOS[Math.floor(Math.random() * SCENARIOS.length)];
  const name = NAMES[Math.floor(Math.random() * NAMES.length)];
  const number = NUMBERS[Math.floor(Math.random() * NUMBERS.length)];
  const language = LANGUAGES[Math.floor(Math.random() * LANGUAGES.length)];
  const sentiment = SENTIMENTS[Math.floor(Math.random() * SENTIMENTS.length)];
  return {
    id: rng(),
    callerName: name,
    callerNumber: number,
    scenario: scenario.name,
    outcome: scenario.outcome,
    duration: Math.floor(Math.random() * 300) + 30,
    language,
    sentiment,
    timestamp: new Date().toISOString(),
  };
}

console.log("[live-call-feed] service starting on port 3004");

io.on("connection", (socket) => {
  console.log(`[live-call-feed] client connected: ${socket.id}`);

  // Send a burst of 3 past events immediately so the dashboard isn't empty
  for (let i = 0; i < 3; i++) {
    const event = generateCallEvent();
    const backdated = new Date(Date.now() - (i + 1) * 60_000);
    socket.emit("call-event", { ...event, timestamp: backdated.toISOString() });
  }

  socket.on("disconnect", () => {
    console.log(`[live-call-feed] client disconnected: ${socket.id}`);
  });
});

// Broadcast a new call event every ~12-25 seconds to all connected clients
let nextDelay = 18_000;
function scheduleNext() {
  nextDelay = 12_000 + Math.floor(Math.random() * 13_000);
  setTimeout(() => {
    const event = generateCallEvent();
    io.emit("call-event", event);
    console.log(`[live-call-feed] broadcast: ${event.callerName} — ${event.scenario} (${event.outcome})`);
    scheduleNext();
  }, nextDelay);
}
scheduleNext();

const PORT = 3004;
httpServer.listen(PORT, () => {
  console.log(`[live-call-feed] WebSocket server running on port ${PORT}`);
});

process.on("SIGTERM", () => {
  console.log("[live-call-feed] SIGTERM received, shutting down");
  httpServer.close(() => process.exit(0));
});
process.on("SIGINT", () => {
  console.log("[live-call-feed] SIGINT received, shutting down");
  httpServer.close(() => process.exit(0));
});
