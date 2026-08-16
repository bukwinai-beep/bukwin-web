"use client";

import { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  BarChart,
  Bar,
  Cell,
} from "recharts";
import {
  Phone,
  PhoneCall,
  CalendarCheck,
  Users,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  Settings,
  CheckCircle2,
  Clock,
  ChevronRight,
} from "lucide-react";
import { Container, Eyebrow, Section } from "../shared/container";
import { FadeIn, StaggerContainer, StaggerItem } from "../shared/fade-in";
import { TextReveal } from "../shared/text-reveal";
import { BukwinButton } from "../shared/button";
import { LivePulse } from "../shared/live-pulse";
import { LiveCallFeed } from "../shared/live-call-feed";
import { cn } from "@/lib/utils";

const CALL_VOLUME = [
  { day: "Mon", calls: 42, booked: 18 },
  { day: "Tue", calls: 38, booked: 21 },
  { day: "Wed", calls: 51, booked: 27 },
  { day: "Thu", calls: 47, booked: 24 },
  { day: "Fri", calls: 63, booked: 35 },
  { day: "Sat", calls: 28, booked: 16 },
  { day: "Sun", calls: 14, booked: 9 },
];

const LANGUAGE_BREAKDOWN = [
  { lang: "English", count: 184, color: "#0F172A" },
  { lang: "Spanish", count: 42, color: "#D4A853" },
  { lang: "Mandarin", count: 18, color: "#64748B" },
  { lang: "Arabic", count: 11, color: "#10B981" },
  { lang: "Other", count: 8, color: "#94A3B8" },
];

const RECENT_CALLS = [
  {
    name: "Sarah Mitchell",
    number: "+1 (415) 555-0192",
    outcome: "Booked",
    duration: "2:14",
    sentiment: "positive",
    service: "Dental Cleaning",
    time: "2 min ago",
  },
  {
    name: "James Park",
    number: "+1 (628) 555-0148",
    outcome: "Booked",
    duration: "3:47",
    sentiment: "positive",
    service: "Property Viewing",
    time: "11 min ago",
  },
  {
    name: "Unknown caller",
    number: "+1 (510) 555-0173",
    outcome: "Transferred",
    duration: "1:22",
    sentiment: "neutral",
    service: "→ Dr. Chen (urgent)",
    time: "23 min ago",
  },
  {
    name: "Maria Rodriguez",
    number: "+1 (408) 555-0124",
    outcome: "Booked",
    duration: "4:02",
    sentiment: "positive",
    service: "Reservation · 4 guests",
    time: "38 min ago",
  },
  {
    name: "David Cohen",
    number: "+1 (925) 555-0187",
    outcome: "Qualified",
    duration: "5:31",
    sentiment: "positive",
    service: "Legal Consultation",
    time: "1 hr ago",
  },
];

const TABS = ["Overview", "Calls", "Analytics"] as const;
type Tab = (typeof TABS)[number];

type LiveStats = {
  leads: number;
  subscribers: number;
  chatSessions: number;
  callsToday: number;
  recentLeads: {
    id: string;
    name: string;
    email: string;
    businessName: string | null;
    industry: string | null;
    status: string;
    timeAgo: string;
  }[];
};

export function DashboardPreviewSection() {
  const [tab, setTab] = useState<Tab>("Overview");
  const [liveStats, setLiveStats] = useState<LiveStats | null>(null);

  // Fetch real DB stats on mount + refresh every 30s
  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const res = await fetch("/api/dashboard/stats", { cache: "no-store" });
        if (!res.ok) return;
        const data = (await res.json()) as LiveStats;
        if (!cancelled) setLiveStats(data);
      } catch {
        /* ignore — keep mock data */
      }
    };
    load();
    const id = setInterval(load, 30_000);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  return (
    <Section bg="default" id="dashboard">
      <Container size="xl">
        <div className="max-w-3xl">
          <FadeIn>
            <Eyebrow>Product Preview</Eyebrow>
          </FadeIn>
          <TextReveal
            as="h2"
            text="See exactly what Bukwin is doing — in real time."
            className="mt-5 font-display text-4xl md:text-5xl lg:text-[3.25rem] font-semibold leading-[1.12] tracking-[-0.01em] text-primary"
          />
          <FadeIn delay={0.3}>
            <p className="mt-5 text-lg text-text-secondary leading-relaxed">
              Every call transcribed. Every booking tracked. Every missed lead
              recovered. The dashboard ships with your agent — not as a paid
              add-on.
            </p>
          </FadeIn>
        </div>

        <FadeIn delay={0.2}>
          <div className="mt-12 rounded-2xl border border-border bg-surface shadow-xl overflow-hidden">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 border-b border-border bg-secondary/40 px-4 py-2.5">
              <div className="flex gap-1.5">
                <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
                <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
                <span className="h-3 w-3 rounded-full bg-[#28C840]" />
              </div>
              <div className="ml-3 flex-1 max-w-md mx-auto">
                <div className="rounded-md bg-background border border-border px-3 py-1 text-center text-[11px] font-mono text-text-muted">
                  app.bukwin.ai/dashboard
                  {liveStats && (
                    <span className="ml-2 text-accent">
                      · {liveStats.leads} leads · {liveStats.chatSessions} chats
                    </span>
                  )}
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 text-[10px] text-success" title={liveStats ? `Last refreshed ${new Date().toLocaleTimeString()}` : undefined}>
                <LivePulse color="bg-success" />
                {liveStats ? "Live" : "Loading"}
              </span>
            </div>

            {/* App body */}
            <div className="grid lg:grid-cols-[200px_1fr] min-h-[640px]">
              {/* Sidebar */}
              <aside className="hidden lg:flex flex-col border-r border-border bg-secondary/20 p-3">
                <div className="flex items-center gap-2 px-2 py-2 mb-3">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-primary text-accent font-display text-sm font-semibold">
                    B
                  </span>
                  <span className="font-display text-sm font-medium text-primary">
                    Bukwin AI
                  </span>
                </div>
                <nav className="space-y-0.5 text-sm">
                  {[
                    { icon: TrendingUp, label: "Overview", active: true },
                    { icon: PhoneCall, label: "Calls", active: false },
                    { icon: CalendarCheck, label: "Calendar", active: false },
                    { icon: Users, label: "Contacts", active: false },
                    { icon: Sparkles, label: "Analytics", active: false },
                    { icon: Settings, label: "Settings", active: false },
                  ].map((item) => (
                    <button
                      key={item.label}
                      className={cn(
                        "flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-left transition",
                        item.active
                          ? "bg-primary text-primary-foreground"
                          : "text-text-secondary hover:bg-secondary hover:text-primary"
                      )}
                    >
                      <item.icon className="h-4 w-4" strokeWidth={1.5} />
                      {item.label}
                    </button>
                  ))}
                </nav>
                <div className="mt-auto rounded-lg border border-accent/30 bg-accent/5 p-3">
                  <p className="text-[11px] uppercase tracking-[0.15em] text-accent">
                    Plan
                  </p>
                  <p className="mt-0.5 text-sm font-medium text-primary">
                    Professional
                  </p>
                  <p className="mt-1 text-[11px] text-text-secondary">
                    487 / 800 min used
                  </p>
                  <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                    <div
                      className="h-full rounded-full bg-accent"
                      style={{ width: "61%" }}
                    />
                  </div>
                </div>
              </aside>

              {/* Main */}
              <div className="p-5 md:p-6">
                {/* Topbar */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex gap-1">
                    {TABS.map((t) => (
                      <button
                        key={t}
                        onClick={() => setTab(t)}
                        className={cn(
                          "rounded-md px-3 py-1.5 text-xs font-medium transition",
                          tab === t
                            ? "bg-primary text-primary-foreground"
                            : "text-text-secondary hover:bg-secondary"
                        )}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="hidden md:inline-flex items-center gap-1.5 rounded-full bg-success/10 border border-success/30 px-2.5 py-1 text-[11px] font-medium text-success">
                      <LivePulse color="bg-success" />
                      Agent active
                    </span>
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-accent/15 border border-accent/30 text-[11px] font-medium text-accent">
                      AC
                    </span>
                  </div>
                </div>

                {tab === "Overview" && <OverviewPanel liveStats={liveStats} />}
                {tab === "Calls" && <CallsPanel />}
                {tab === "Analytics" && <AnalyticsPanel />}
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="mt-8 text-center">
            <BukwinButton asChild size="lg" variant="secondary">
              <a href="/contact">
                Get your own dashboard
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </BukwinButton>
            <p className="mt-3 text-xs text-text-muted">
              Every plan includes full dashboard access — no upsell.
            </p>
          </div>
        </FadeIn>
      </Container>
    </Section>
  );
}

function StatCard({
  label,
  value,
  delta,
  trend,
  icon: Icon,
}: {
  label: string;
  value: string;
  delta: string;
  trend: "up" | "down";
  icon: typeof Phone;
}) {
  return (
    <div className="rounded-xl border border-border bg-background p-4 md:p-5">
      <div className="flex items-start justify-between">
        <div className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-accent/10 text-accent">
          <Icon className="h-4 w-4" strokeWidth={1.5} />
        </div>
        <span
          className={cn(
            "inline-flex items-center gap-1 text-[11px] font-medium",
            trend === "up" ? "text-success" : "text-error"
          )}
        >
          {trend === "up" ? (
            <ArrowUpRight className="h-3 w-3" />
          ) : (
            <ArrowDownRight className="h-3 w-3" />
          )}
          {delta}
        </span>
      </div>
      <p className="mt-3 font-display text-2xl md:text-3xl font-medium text-primary">
        {value}
      </p>
      <p className="mt-1 text-xs text-text-secondary">{label}</p>
    </div>
  );
}

function OverviewPanel({ liveStats }: { liveStats: LiveStats | null }) {
  return (
    <div className="space-y-5">
      {/* Stats — swap in real DB numbers when available */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard
          label="Calls answered today"
          value={liveStats ? liveStats.callsToday.toLocaleString() : "47"}
          delta="+12%"
          trend="up"
          icon={PhoneCall}
        />
        <StatCard
          label="Demo chats saved"
          value={liveStats ? String(liveStats.chatSessions) : "0"}
          delta="+new"
          trend="up"
          icon={CalendarCheck}
        />
        <StatCard
          label="Leads captured"
          value={liveStats ? String(liveStats.leads) : "0"}
          delta="+new"
          trend="up"
          icon={Users}
        />
        <StatCard
          label="Newsletter subs"
          value={liveStats ? String(liveStats.subscribers) : "0"}
          delta="+new"
          trend="up"
          icon={TrendingUp}
        />
      </div>

      {/* Chart */}
      <div className="grid lg:grid-cols-[1.6fr_1fr] gap-3">
        <div className="rounded-xl border border-border bg-background p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-xs uppercase tracking-[0.15em] text-text-secondary">
                Calls vs. Bookings · 7 days
              </p>
              <p className="mt-0.5 font-display text-xl font-medium text-primary">
                283 calls · 150 booked
              </p>
            </div>
            <span className="inline-flex items-center gap-1 text-[11px] text-success">
              <ArrowUpRight className="h-3 w-3" />
              53% conversion
            </span>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={CALL_VOLUME} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
              <defs>
                <linearGradient id="g-calls" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0F172A" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="#0F172A" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="g-booked" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#D4A853" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#D4A853" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
              <XAxis
                dataKey="day"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 11, fill: "#94A3B8" }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 11, fill: "#94A3B8" }}
              />
              <Tooltip
                contentStyle={{
                  background: "#FFFFFF",
                  border: "1px solid #E2E8F0",
                  borderRadius: 8,
                  fontSize: 12,
                  color: "#0F172A",
                }}
              />
              <Area
                type="monotone"
                dataKey="calls"
                stroke="#0F172A"
                strokeWidth={2}
                fill="url(#g-calls)"
              />
              <Area
                type="monotone"
                dataKey="booked"
                stroke="#D4A853"
                strokeWidth={2}
                fill="url(#g-booked)"
              />
            </AreaChart>
          </ResponsiveContainer>
          <div className="mt-2 flex gap-4 text-[11px]">
            <span className="inline-flex items-center gap-1.5 text-text-secondary">
              <span className="h-2 w-2 rounded-full bg-primary" /> Calls
            </span>
            <span className="inline-flex items-center gap-1.5 text-text-secondary">
              <span className="h-2 w-2 rounded-full bg-accent" /> Booked
            </span>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-background p-4">
          <p className="text-xs uppercase tracking-[0.15em] text-text-secondary mb-1">
            Language mix · 30 days
          </p>
          <p className="font-display text-xl font-medium text-primary mb-3">
            263 calls · 5 languages
          </p>
          <ResponsiveContainer width="100%" height={140}>
            <BarChart data={LANGUAGE_BREAKDOWN} margin={{ top: 0, right: 0, bottom: 0, left: -28 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
              <XAxis
                dataKey="lang"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 9, fill: "#94A3B8" }}
                interval={0}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 10, fill: "#94A3B8" }}
              />
              <Tooltip
                cursor={{ fill: "rgba(15,23,42,0.04)" }}
                contentStyle={{
                  background: "#FFFFFF",
                  border: "1px solid #E2E8F0",
                  borderRadius: 8,
                  fontSize: 12,
                }}
              />
              <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                {LANGUAGE_BREAKDOWN.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1.4fr_1fr] gap-3">
        <RecentCallsTable liveStats={liveStats} />
        <LiveCallFeed />
      </div>
    </div>
  );
}

function RecentCallsTable({ liveStats }: { liveStats: LiveStats | null }) {
  // If we have real leads from the DB, show those first (top 3),
  // then fill the rest with the sample calls so the table looks full.
  const realRows =
    liveStats?.recentLeads.slice(0, 3).map((l) => ({
      kind: "real" as const,
      name: l.name,
      sub: l.email,
      service: l.industry ?? l.businessName ?? "Inquiry",
      outcome: "New lead",
      duration: "—",
      time: l.timeAgo,
    })) ?? [];
  const sampleRows = RECENT_CALLS.slice(0, Math.max(0, 5 - realRows.length)).map((c) => ({
    kind: "sample" as const,
    name: c.name,
    sub: c.number,
    service: c.service,
    outcome: c.outcome,
    duration: c.duration,
    time: c.time,
  }));
  const rows = [...realRows, ...sampleRows];

  return (
    <div className="rounded-xl border border-border bg-background overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <p className="text-xs uppercase tracking-[0.15em] text-text-secondary">
          {realRows.length > 0 ? "Recent leads (live)" : "Recent calls"}
        </p>
        <button className="inline-flex items-center gap-1 text-xs font-medium text-accent hover:underline">
          View all
          <ChevronRight className="h-3 w-3" />
        </button>
      </div>
      <div className="overflow-x-auto scroll-bukwin">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-[11px] uppercase tracking-[0.1em] text-text-muted border-b border-border">
              <th className="px-4 py-2.5 font-medium">Caller</th>
              <th className="px-4 py-2.5 font-medium">Service</th>
              <th className="px-4 py-2.5 font-medium">Outcome</th>
              <th className="px-4 py-2.5 font-medium">Duration</th>
              <th className="px-4 py-2.5 font-medium text-right">Time</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((call, i) => (
              <tr
                key={i}
                className="border-b border-border/60 last:border-0 hover:bg-secondary/30 transition"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={cn(
                        "inline-flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-medium",
                        call.kind === "real"
                          ? "bg-accent/15 text-accent"
                          : "bg-success/15 text-success"
                      )}
                    >
                      {call.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                    </div>
                    <div>
                      <p className="text-primary font-medium text-[13px] leading-tight">
                        {call.name}
                      </p>
                      <p className="text-[11px] text-text-muted font-mono">{call.sub}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-[13px] text-text-secondary">
                  {call.service}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={cn(
                      "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium",
                      call.outcome === "Booked" && "bg-success/15 text-success",
                      call.outcome === "Qualified" && "bg-accent/15 text-accent",
                      call.outcome === "Transferred" && "bg-primary/10 text-primary",
                      call.outcome === "New lead" && "bg-accent/15 text-accent"
                    )}
                  >
                    {(call.outcome === "Booked" || call.outcome === "New lead") && (
                      <CheckCircle2 className="h-3 w-3" />
                    )}
                    {call.outcome}
                  </span>
                </td>
                <td className="px-4 py-3 font-mono text-[12px] text-text-secondary">
                  {call.duration}
                </td>
                <td className="px-4 py-3 text-right text-[11px] text-text-muted">
                  {call.time}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CallsPanel() {
  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-border bg-background p-5">
        <p className="text-xs uppercase tracking-[0.15em] text-text-secondary mb-3">
          Live call transcript
        </p>
        <div className="flex items-start gap-3 mb-3">
          <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-accent/15 border border-accent/30">
            <Sparkles className="h-4 w-4 text-accent" />
          </div>
          <div className="flex-1 rounded-lg bg-secondary/40 p-3 text-sm text-primary">
            <p className="font-medium mb-1">Bukwin · 0:14</p>
            <p className="text-text-secondary">
              &ldquo;Thanks for calling Bright Smile Dental — this is Bukwin.
              Are you calling to book an appointment?&rdquo;
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3 mb-3 flex-row-reverse">
          <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-medium">
            SM
          </div>
          <div className="flex-1 rounded-lg bg-primary text-primary-foreground p-3 text-sm">
            <p className="font-medium mb-1">Caller · 0:21</p>
            <p className="text-white/80">
              &ldquo;Yes, I&apos;d like to book a cleaning for next week.&rdquo;
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-accent/15 border border-accent/30">
            <Sparkles className="h-4 w-4 text-accent" />
          </div>
          <div className="flex-1 rounded-lg bg-secondary/40 p-3 text-sm text-primary">
            <p className="font-medium mb-1">Bukwin · 0:34</p>
            <p className="text-text-secondary">
              &ldquo;Of course. Are you an existing patient, or is this your
              first visit?&rdquo;
            </p>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2 rounded-lg border border-success/20 bg-success/5 px-3 py-2">
          <CheckCircle2 className="h-4 w-4 text-success" />
          <p className="text-xs text-text-secondary">
            <span className="font-medium text-primary">Sentiment:</span> positive ·
            <span className="font-medium text-primary ml-1">Outcome:</span> booked ·
            <span className="font-medium text-primary ml-1">Booked:</span> Tue 2:30 PM
          </p>
        </div>
      </div>
    </div>
  );
}

function AnalyticsPanel() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard label="Pickup rate" value="100%" delta="+0%" trend="up" icon={PhoneCall} />
        <StatCard label="Avg booking rate" value="53%" delta="+9%" trend="up" icon={CalendarCheck} />
        <StatCard label="No-show recovery" value="38" delta="+12" trend="up" icon={CheckCircle2} />
        <StatCard label="Hours saved / mo" value="124h" delta="+18h" trend="up" icon={Clock} />
      </div>

      <div className="rounded-xl border border-border bg-background p-4">
        <p className="text-xs uppercase tracking-[0.15em] text-text-secondary mb-3">
          Calls by hour · today
        </p>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart
            data={[
              { h: "8a", c: 2 },
              { h: "9a", c: 5 },
              { h: "10a", c: 8 },
              { h: "11a", c: 6 },
              { h: "12p", c: 4 },
              { h: "1p", c: 7 },
              { h: "2p", c: 9 },
              { h: "3p", c: 6 },
              { h: "4p", c: 5 },
              { h: "5p", c: 3 },
              { h: "6p", c: 4 },
              { h: "7p", c: 2 },
            ]}
            margin={{ top: 5, right: 5, bottom: 0, left: -25 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
            <XAxis dataKey="h" tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: "#94A3B8" }} />
            <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: "#94A3B8" }} />
            <Tooltip
              cursor={{ fill: "rgba(212,168,83,0.05)" }}
              contentStyle={{
                background: "#FFFFFF",
                border: "1px solid #E2E8F0",
                borderRadius: 8,
                fontSize: 12,
              }}
            />
            <Bar dataKey="c" radius={[4, 4, 0, 0]} fill="#D4A853" />
          </BarChart>
        </ResponsiveContainer>
        <p className="mt-2 text-xs text-text-secondary">
          Peak at <span className="font-medium text-accent">2:00 PM</span> — consider staffing or extending Bukwin hours.
        </p>
      </div>
    </div>
  );
}
