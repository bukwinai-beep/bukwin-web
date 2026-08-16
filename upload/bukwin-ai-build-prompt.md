# BUKWIN AI — Comprehensive Build Prompt
## Full-Stack AI Receptionist SaaS Website
**Generated:** 2026-08-14
**Stack:** Next.js 15 (App Router) + Supabase + Vercel
**Contact:** arehman09967@gmail.com
**Brand:** Bukwin AI

---

## TABLE OF CONTENTS
1. [Executive Summary & Brand Identity](#1-executive-summary--brand-identity)
2. [Deep Competitive Analysis (Reference Sites)](#2-deep-competitive-analysis-reference-sites)
3. [Anti-Vibe-Coded Design Manifesto](#3-anti-vibe-coded-design-manifesto)
4. [Color System & Typography](#4-color-system--typography)
5. [Page Architecture & Route Map](#5-page-architecture--route-map)
6. [Component Design System](#6-component-design-system)
7. [Animation & Interaction Specifications](#7-animation--interaction-specifications)
8. [Section-by-Section Build Specs](#8-section-by-section-build-specs)
9. [Backend Architecture & Placeholders](#9-backend-architecture--placeholders)
10. [AI Agent Integration Roadmap](#10-ai-agent-integration-roadmap)
11. [Database Schema (Supabase)](#11-database-schema-supabase)
12. [Deployment & DevOps](#12-deployment--devops)
13. [Missing Elements Checklist](#13-missing-elements-checklist)

---

## 1. EXECUTIVE SUMMARY & BRAND IDENTITY

### Brand Essence
Bukwin AI is a premium AI receptionist and phone agent system that answers calls 24/7, books appointments, handles orders, speaks multiple languages, and integrates with existing business tools. The brand communicates **trust, professionalism, and intelligent automation** — not "tech-bro AI startup."

### Core Value Propositions
- **Never miss a call again** — 24/7 voice + chat answering in any language
- **Books while you sleep** — real-time calendar integration, instant confirmations
- **Sounds human, not robotic** — natural conversation with interruption handling
- **Universal task handler** — appointments, orders, inquiries, transfers, follow-ups
- **Plugs into your stack** — CRM, calendar, WhatsApp, email, SMS sync

### Target Audience
- Small-to-medium service businesses (clinics, salons, restaurants, law firms, real estate, home services)
- Multi-location businesses needing centralized front-desk coverage
- Solo practitioners who cannot afford a full-time receptionist
- Businesses with high after-hours call volume

### Tone of Voice
Professional but warm. Confident but not arrogant. Technical accuracy with human empathy. Avoid AI buzzwords ("leverage," "synergize," "transformative"). Use plain language that a business owner understands.

---

## 2. DEEP COMPETITIVE ANALYSIS (REFERENCE SITES)

### 2.1 Agentlii.com Analysis
**What works:**
- **Live demo prominence** — "Talk to it before you talk to us" section with live voice/chat demo is the primary CTA
- **Problem-first storytelling** — "The cost of a ringing phone" section with 3 missed-call scenarios builds emotional urgency
- **Step-by-step trace** — "One call, start to finish" timeline (00:00 → 00:53) makes the invisible process visible
- **Industry tuning** — "Tuned per industry, not a generic bot" with 10 verticals shows depth
- **Integration grid** — Clean logo grid (ElevenLabs, n8n, Calendly, Google Calendar, WhatsApp, HubSpot, Gmail, Shopify)
- **Flat pricing promise** — "priced flat, no per-minute surprises" addresses the #1 objection

**What to improve upon:**
- Hero section is somewhat generic; could use more editorial typography
- No ROI calculator — missed conversion opportunity
- Testimonials lack photos/verifiable identities
- Dark mode toggle absent

### 2.2 Rastaah-ai.com Analysis
**What works:**
- **Terminal/command-line aesthetic** — "operator@rastaah — /automation/core" console UI creates technical credibility
- **Pipeline visualization** — "Lead Command Center" with file-tree style explorer (~/pipeline, new-leads, follow-up, booked.index)
- **Workflow trigger library** — Visual automation cards (NEW LEAD → Instant Reply, NO SHOW → Auto Re-Book)
- **Live system telemetry** — "sys.load 42%" with real-time log stream ("›lead: acme-corp captured ›reply sent · 38s")
- **Founder story with conviction** — "Speed is the whole game" quote humanizes the brand
- **Systemic/Automated/Accountable** triad as brand pillars

**What to improve upon:**
- Dark-only theme may feel too "hacker" for mainstream SMBs
- Missing live voice demo
- No pricing transparency at all
- Navigation is minimal; could benefit from clearer information architecture

### 2.3 GetFrontDeskHQ.com Analysis
**What works:**
- **Assessment-first approach** — "Most practices should not begin by building anything" — radical honesty builds trust
- **Interactive ROI calculator** — "Put your own numbers in" with draggable sliders (calls/month, patient value, capture rate)
- **Live demo with calendar** — Split-screen: chat with "Ava" on left, live schedule on right
- **Staged rollout timeline** — "A staged rollout, with a date you can hold me to" — 4 numbered steps with realistic expectations
- **Founder credibility** — Medical doctor + Professor of Physiology + Gold Medalist — authority stacking
- **Compliance geography** — Australia (Privacy Act), US (HIPAA), UK/EU (GDPR) — shows regulatory maturity
- **Honest FAQ** — "I am willing to tell you not to build it" — disarming objection handling

**What to improve upon:**
- Design is somewhat clinical/medical-focused; needs broader industry appeal
- No voice demo (chat only)
- Heavy text density; could use more visual breathing room
- No integration logo grid

### 2.4 Synthesis — What Bukwin AI Must Do Differently
1. **Combine Agentlii's live demo + FrontDesk's ROI calculator** — both are conversion powerhouses
2. **Adopt Rastaah's system visualization** but make it accessible, not hacker-only
3. **FrontDesk's radical honesty** in pricing and expectations
4. **Agentlii's industry breadth** (10+ verticals) with FrontDesk's vertical depth
5. **Create a unique visual identity** that is neither "medical clinical" nor "hacker terminal" — think "premium business concierge"

---

## 3. ANTI-VIBE-CODED DESIGN MANIFESTO

### What "Vibe-Coded" Looks Like (AVOID AT ALL COSTS)
- Purple-to-blue gradient hero backgrounds with floating 3D spheres
- Generic "AI sparkle" icons (✨) everywhere
- Neon glow effects on every button and card
- Glassmorphism cards with excessive blur and rainbow borders
- ChatGPT-clone layout (sidebar + central chat, dark purple theme)
- Stock illustrations of robots shaking hands with humans
- "Revolutionize," "Transform," "Harness the power of AI" copy
- Random particle systems that serve no purpose
- Inter font + purple gradient = instant "AI startup template"
- Bento grids filled with abstract shapes instead of real content

### What "Skilled Developer Built" Looks Like (EMULATE)
- **Editorial typography** — Serif headlines (Playfair Display, Canela, or Tiempos) paired with clean sans-serif body (Inter, Geist, or Söhne)
- **Restrained color palette** — Exactly 2 colors + neutrals. No rainbow gradients.
- **Purposeful whitespace** — Content breathes. 120px+ section padding. Generous line-height (1.6–1.8).
- **Real product UI** — Screenshots of actual dashboard, not mockups with fake data
- **Meaningful motion** — Animations that explain functionality (e.g., call flow timeline animating step-by-step)
- **Tactile interactions** — Subtle hover states (scale 1.02, shadow lift, color shift) not neon glows
- **Magazine-quality photography** — Real people, real offices, not 3D renders
- **Grid systems that respect content** — Asymmetric layouts that serve the story, not symmetry for symmetry's sake
- **Conversion-optimized, not decoration-optimized** — Every element earns its place

### Design Principles for Bukwin AI
1. **Hierarchy over decoration** — The eye should know exactly where to go next
2. **Typography is the interface** — Let type do the visual heavy lifting
3. **Motion serves meaning** — Animate to explain, not to impress
4. **Two colors, infinite nuance** — Depth through opacity, weight, and scale, not more hues
5. **Show the product, don't describe it** — Live demos > hero illustrations
6. **Trust through transparency** — Pricing, process, and limitations are visible

---

## 4. COLOR SYSTEM & TYPOGRAPHY

### Recommended Color Palette: "Executive Concierge"

After analyzing all three reference sites and 2026 SaaS trends, Bukwin AI should use a **warm professional palette** that signals trust and premium service without being cold or clinical.

| Token | Hex | Usage |
|-------|-----|-------|
| **Primary** | `#0F172A` | Deep navy — headings, primary buttons, footer, dark sections |
| **Accent** | `#D4A853` | Warm gold — CTAs, highlights, active states, icons, underlines |
| **Background** | `#FAF9F6` | Warm off-white — page background, cards |
| **Surface** | `#FFFFFF` | Pure white — elevated cards, modals, input fields |
| **Text Primary** | `#0F172A` | Deep navy — body text on light backgrounds |
| **Text Secondary** | `#64748B` | Slate — captions, metadata, secondary text |
| **Text Muted** | `#94A3B8` | Light slate — placeholders, disabled states |
| **Border** | `#E2E8F0` | Light gray — dividers, card borders, input borders |
| **Success** | `#10B981` | Emerald — confirmation states, live indicators |
| **Error** | `#EF4444` | Red — validation errors, alert states |

**Dark Mode Variant:**
| Token | Hex | Usage |
|-------|-----|-------|
| **Background** | `#0A0F1C` | Deep charcoal — dark mode page bg |
| **Surface** | `#111827` | Elevated dark — cards, modals |
| **Text Primary** | `#F8FAFC` | Off-white — headings on dark |
| **Text Secondary** | `#94A3B8` | Slate — body text on dark |
| **Accent** | `#F0C674` | Brighter gold — maintains visibility on dark |

**Why this palette:**
- Deep navy + warm gold is the "luxury concierge" aesthetic — think premium hotel lobby, not tech startup
- Navy is authoritative and trustworthy (financial services, legal, medical all use it)
- Gold accent is energetic and premium without being aggressive like red or orange
- Off-white background reduces eye strain vs pure white and feels more editorial
- Passes WCAG AA contrast ratios at all levels

### Typography System

| Element | Font | Weight | Size (Desktop) | Size (Mobile) | Line-Height | Letter-Spacing |
|---------|------|--------|----------------|---------------|-------------|----------------|
| **Display** | Playfair Display | 500 | 72px | 40px | 1.1 | -0.02em |
| **H1** | Playfair Display | 500 | 56px | 36px | 1.15 | -0.01em |
| **H2** | Playfair Display | 500 | 42px | 28px | 1.2 | -0.01em |
| **H3** | Inter | 600 | 28px | 22px | 1.3 | 0 |
| **H4** | Inter | 600 | 20px | 18px | 1.4 | 0 |
| **Body Large** | Inter | 400 | 20px | 18px | 1.7 | 0 |
| **Body** | Inter | 400 | 16px | 16px | 1.7 | 0 |
| **Body Small** | Inter | 400 | 14px | 14px | 1.6 | 0 |
| **Caption** | Inter | 500 | 12px | 12px | 1.5 | 0.05em |
| **Button** | Inter | 600 | 14px | 14px | 1 | 0.02em |
| **Nav** | Inter | 500 | 14px | 14px | 1 | 0.01em |
| **Mono** | JetBrains Mono | 400 | 14px | 13px | 1.5 | 0 |

**Font loading strategy:**
- Use `next/font` for optimal loading
- Playfair Display: subset latin, display: swap
- Inter: variable font if available, otherwise standard weights
- JetBrains Mono: load only for code/terminal sections
- System font stack as fallback: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`

---

## 5. PAGE ARCHITECTURE & ROUTE MAP

### Public Pages (Marketing Site)
```
/                    → Homepage (Hero + Features + How It Works + Industries + Live Demo + Testimonials + Pricing + FAQ + CTA)
/about               → About Bukwin AI (Founder story, mission, values, team)
/features            → Feature deep-dive (Voice, Chat, Calendar, CRM, Multilingual, Analytics)
/how-it-works        → Step-by-step process (Setup → Train → Go Live → Optimize)
/industries          → Industry solutions grid (Healthcare, Real Estate, Legal, Hospitality, etc.)
/industries/[slug]   → Individual industry page (dedicated landing for SEO)
/pricing             → Pricing tiers + ROI calculator + FAQ
/demo                → Live interactive demo (voice + chat simulator + calendar view)
/integrations        → Integration directory (Calendar, CRM, Phone, Messaging)
/case-studies        → Customer success stories
/blog                → Blog listing
/blog/[slug]         → Individual blog post
/contact             → Contact form + Book a call calendar
/book-call           → Dedicated booking page (Calendly embed or custom)
```

### Auth Pages
```
/login               → Sign in (email + password + Google OAuth)
/register            → Sign up (email + password + business name)
/forgot-password     → Password reset flow
/reset-password      → Password reset confirmation
```

### Dashboard (Post-Auth — Placeholder Structure)
```
/dashboard           → Main dashboard (overview stats, recent calls, upcoming appointments)
/dashboard/calls     → Call history + transcripts + recordings
/dashboard/calendar  → Calendar view + booking management
/dashboard/contacts  → CRM contacts + lead pipeline
/dashboard/analytics → Call metrics, conversion rates, response times
/dashboard/settings  → Agent configuration, voice settings, business rules
/dashboard/billing   → Subscription management, invoices, usage
```

### Legal Pages
```
/privacy             → Privacy Policy
/terms               → Terms of Service
/security            → Security & Compliance (SOC 2, GDPR, HIPAA info)
```

---

## 6. COMPONENT DESIGN SYSTEM

### 6.1 Layout Components

**Container**
- Max-width: 1280px (xl), 1024px (lg), 768px (md)
- Padding: px-4 sm:px-6 lg:px-8 xl:px-12
- Centered with mx-auto

**Section**
- Default padding: py-24 md:py-32
- Alternate backgrounds: bg-background (warm white) → bg-primary (navy) → bg-background
- Border-top on alternate sections: border-border/50

**Grid**
- 12-column responsive grid
- Gap: gap-6 md:gap-8 lg:gap-12
- Common patterns: 2-col (1fr 1fr), 3-col (1fr 1fr 1fr), asymmetric (1.2fr 0.8fr)

### 6.2 UI Components

**Primary Button**
- Background: accent gold (`#D4A853`)
- Text: primary navy (`#0F172A`)
- Padding: px-8 py-3.5
- Border-radius: 6px (slightly rounded, not pill)
- Font: button weight, uppercase tracking
- Hover: background darkens 10%, scale(1.02), shadow-lg
- Active: scale(0.98)
- Transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1)

**Secondary Button**
- Background: transparent
- Border: 1.5px solid primary navy
- Text: primary navy
- Hover: background primary navy, text white
- Same padding/radius as primary

**Ghost Button (Dark backgrounds)**
- Background: transparent
- Border: 1.5px solid white/30
- Text: white
- Hover: background white/10, border white/50

**Card**
- Background: surface white
- Border: 1px solid border color
- Border-radius: 12px
- Padding: p-6 md:p-8
- Shadow: none by default, shadow-sm on hover
- Hover: translateY(-2px), shadow-md, border-color accent/30
- Transition: all 300ms ease

**Feature Card (Bukwin-specific)**
- Icon: 48x48, accent gold, contained in 56x56 rounded-lg bg-accent/10
- Title: H4, primary color
- Description: Body small, text-secondary
- Hover: icon container bg-accent/20, card lift

**Testimonial Card**
- Quote: Body large, italic, primary color
- Avatar: 56x56 rounded-full, object-cover
- Name: Body small, font-weight 600
- Role: Caption, text-secondary
- Company: Caption, text-muted
- Border-left: 3px solid accent on left side

**Input Field**
- Background: surface white
- Border: 1px solid border, focus: accent/50 ring-2
- Border-radius: 8px
- Padding: px-4 py-3
- Font: body size
- Placeholder: text-muted
- Error state: border-error, text-error caption below

**Navigation**
- Sticky top-0, z-50
- Background: bg-background/80 backdrop-blur-md
- Height: h-16 md:h-20
- Logo left, links center, CTAs right
- Links: Nav font, text-primary, hover:text-accent
- Mobile: hamburger menu with slide-in drawer
- Scroll behavior: add subtle shadow on scroll

**Footer**
- Background: primary navy
- Text: white/80
- 4-column grid: Brand + Description | Product Links | Company Links | Legal
- Newsletter signup: input + button
- Social icons: 24x24, white/60 hover:white
- Bottom bar: copyright + privacy/terms links

### 6.3 Animation Components

**FadeIn (Scroll-triggered)**
- Initial: opacity 0, translateY 30px
- Animate: opacity 1, translateY 0
- Duration: 600ms
- Easing: cubic-bezier(0.4, 0, 0.2, 1)
- Trigger: when element enters viewport (threshold 0.2)
- Stagger: 100ms between sibling elements

**StaggerChildren**
- Parent wrapper that triggers child animations sequentially
- Delay: index * 100ms
- Used for: feature grids, testimonial lists, step timelines

**TextReveal**
- Headline words animate in individually
- Initial: opacity 0, translateY 40px, rotateX(-15deg)
- Animate: opacity 1, translateY 0, rotateX(0)
- Duration: 800ms per word
- Stagger: 50ms
- Easing: cubic-bezier(0.22, 1, 0.36, 1)

**CountUp**
- Numbers animate from 0 to target value
- Duration: 2000ms
- Easing: easeOutExpo
- Trigger: when scrolled into view
- Used for: stats section ("62% of calls missed", "<60s response time")

**LivePulse**
- Small green dot with ping animation
- Used for: "Live" indicators, "Answering now" status
- CSS: animate-ping on pseudo-element

**TerminalTypewriter**
- Monospace text types out character by character
- Cursor: blinking block cursor
- Speed: 40ms per character
- Used for: demo console, command-line aesthetic sections


---

## 7. ANIMATION & INTERACTION SPECIFICATIONS

### Animation Philosophy
- **60fps target** — All animations must be GPU-accelerated (transform, opacity only)
- **Respect prefers-reduced-motion** — Disable animations for users who request it
- **Purposeful, not decorative** — Every animation must guide attention or explain function
- **Subtlety is sophistication** — 300ms transitions, not 1s spectacles

### Library Selection

**Primary: Framer Motion (Motion)**
- Use for: page transitions, component enter/exit, layout animations, hover states, gesture handling
- Why: React-native API, excellent for UI interactions, AnimatePresence for mount/unmount
- Bundle: ~32KB, acceptable for SaaS product

**Secondary: GSAP + ScrollTrigger**
- Use for: hero scroll-pinned narrative, complex timeline choreography, SVG path animations
- Why: Industry standard for scroll-driven storytelling, pinning, scrubbing
- Bundle: ~23KB core + ~12KB ScrollTrigger — only load on pages that need it (homepage hero)

**CSS Animations**
- Use for: simple hover states, loading spinners, pulse indicators, infinite loops
- Why: Zero JS overhead, GPU-accelerated by default

### Page-Specific Animation Specs

**Homepage Hero**
- TextReveal on headline (word by word)
- Subtitle fades in 400ms after headline completes
- CTA buttons fade in + translateY(20px→0) 600ms after subtitle
- Hero image/mockup: subtle float animation (translateY ±10px, 6s loop, ease-in-out)
- Background: static gradient (no animation) — navy to slightly lighter navy, subtle noise texture overlay at 3% opacity

**How It Works Timeline**
- ScrollTrigger: pin the left side (step numbers), scroll the right side (step descriptions)
- Each step: number scales up (1→1.2) when active, description fades in
- Progress indicator: vertical line fills with accent gold as user scrolls
- Duration: scrubbed to scroll position (1px scroll = 1px animation)

**Live Demo Section**
- Split-screen layout: chat interface left, calendar right
- Chat messages: stagger in (100ms delay each)
- Calendar events: pop in with scale(0.9→1) + opacity
- "Typing" indicator: three dots bouncing
- Voice waveform: CSS animation of bars scaling

**Stats Section**
- CountUp animation on numbers
- Stagger: 200ms between each stat card
- Cards: fade in + translateY(40px→0)

**Testimonials**
- Horizontal scroll carousel (optional) or grid fade-in
- Quote marks: large decorative serif, accent gold at 20% opacity
- Hover: card lifts slightly, quote mark opacity increases to 40%

**Pricing Cards**
- Recommended plan: accent border + subtle glow (box-shadow: 0 0 40px accent/10)
- Hover: all cards lift, recommended card lifts more
- Feature list: checkmarks stagger in on scroll

**FAQ Accordion**
- Expand/collapse: height auto animation (300ms)
- Chevron: rotate 180deg on open
- Content: fade in + translateY(-10px→0)

### Micro-Interactions

**Button Hover**
- Primary: bg darkens, scale(1.02), shadow-lg appears
- Secondary: bg fills with primary color, text inverts
- Ghost: bg fills with white/10
- All: 200ms ease-out

**Link Hover**
- Underline grows from left to right (scaleX 0→1, transform-origin left)
- Color shifts to accent
- Duration: 250ms

**Card Hover**
- translateY(-4px)
- Shadow increases
- Border color shifts to accent/30
- Duration: 300ms ease-out

**Input Focus**
- Border color: border → accent/50
- Ring: 2px accent/20
- Label: translateY(-20px) + scale(0.85) if using floating labels
- Duration: 200ms

**Navigation Scroll**
- At top: transparent background, no shadow
- After 50px scroll: bg-background/80, backdrop-blur, shadow-sm
- Duration: 300ms

---

## 8. SECTION-BY-SECTION BUILD SPECS

### 8.1 HOMEPAGE — `/`

#### Section 1: Hero
**Layout:** Full-width, min-height 90vh, centered content with asymmetric split (55% text / 45% visual)
**Background:** Primary navy (`#0F172A`) with subtle radial gradient (lighter center, darker edges) + noise texture overlay at 3%
**Content:**
- **Eyebrow:** "AI RECEPTIONIST FOR YOUR BUSINESS" — Caption, uppercase, accent gold, letter-spacing 0.1em
- **Headline:** "Never Miss a Call. Never Lose a Customer." — Display font, white, max-width 600px
- **Subheadline:** "Bukwin AI answers your phone 24/7, books appointments, takes orders, and speaks your customers' language — all while you focus on running your business." — Body large, white/70, max-width 520px
- **CTA Group:**
  - Primary: "Hear It Answer Live" → links to /demo
  - Secondary: "See How It Works" → scrolls to #how-it-works
- **Trust Bar:** "Trusted by 200+ businesses" + 5 client logos (grayscale, opacity 50%, hover: opacity 100%)
- **Visual:** Right side — animated phone interface mockup showing:
  - Incoming call screen
  - Waveform visualization
  - "Bukwin AI is answering..." status
  - Live calendar booking animation
  - **OR** use a high-quality product screenshot with subtle float animation

**Animation:** TextReveal headline → fadeIn subtitle (delay 600ms) → fadeIn CTAs (delay 800ms) → fadeIn trust bar (delay 1000ms)

#### Section 2: The Problem ("The Cost of a Ringing Phone")
**Layout:** Full-width, bg-background, py-24
**Content:**
- **Eyebrow:** "THE PROBLEM" — Caption, accent gold
- **Headline:** "Every Missed Call Is a Customer Calling Your Competitor." — H2, primary
- **Subheadline:** "You're not bad at answering the phone. You're busy running the business." — Body large, text-secondary
- **3-Column Grid:**
  1. **"The Rush Hour"** — Icon: Clock (Lucide). Title: "The calls you can't take." Body: "The chair is full, the kitchen is slammed, you're mid-viewing. The phone rings anyway — and it rings out."
  2. **"The After-Hours Gap"** — Icon: Moon. Title: "The hours you're closed but demand isn't." Body: "Evenings, weekends, holidays. Customers call when they're free, not when you're open. Voicemail catches almost none of them."
  3. **"The Time Drain"** — Icon: Repeat. Title: "The same five questions, forty times a day." Body: "Opening hours. Parking. Price. Your team recites the same script instead of serving the customer in front of them."
- **Stat Bar:** Full-width, bg-primary, py-16, 3 stats:
  - "62%" — "of calls to small businesses go unanswered"
  - "85%" — "of unanswered callers never call back"
  - "62%" — "ring a competitor instead, within minutes"
  (Use CountUp animation)

#### Section 3: Live Demo ("Talk to Bukwin Before You Talk to Us")
**Layout:** Full-width, bg-surface, py-24, border-y
**Content:**
- **Eyebrow:** "LIVE DEMO" — Caption, accent gold
- **Headline:** "Experience It Yourself. No Signup Required." — H2, primary
- **Subheadline:** "Speak to the agent or type at it. See exactly how it handles a real customer." — Body large, text-secondary
- **Split-Screen (60/40):**
  - **Left: Interactive Chat/Voice Demo**
    - Tab switcher: "Voice Call" | "Website Chat"
    - Voice mode: "Call (555) 019-2834" button + "Or simulate a call below"
    - Chat interface: Message bubbles (user right, agent left)
    - Pre-set scenarios: "Book a dental cleaning" | "Check restaurant hours" | "Schedule a property viewing"
    - Agent avatar: small circular image with LivePulse green dot
    - Typing indicator when "agent is thinking"
  - **Right: Live Calendar View**
    - Calendar widget showing current month
    - Animated booking: when demo completes, a new event pops into the calendar
    - Event card shows: "New Booking: John D. — Dental Cleaning — 2:30 PM"
    - "Real-time sync" badge with LivePulse
- **Below:** "This is not a recording. It's a real conversation with Bukwin AI." — Caption, text-muted, centered

**Note:** This section requires backend integration. For MVP, implement a simulated demo with hardcoded responses and a mock calendar. Add a TODO comment marking where live AI integration connects.

#### Section 4: How It Works ("One Call, Start to Finish")
**Layout:** Full-width, bg-background, py-24
**Content:**
- **Eyebrow:** "HOW IT WORKS" — Caption, accent gold
- **Headline:** "Your AI Receptionist. Setup in Days, Not Months." — H2, primary
- **Timeline (Vertical, 4 steps):**
  1. **"01 — We Learn Your Business"** — "Share your hours, services, pricing, and tone. We build a knowledge base that sounds like your best employee." + Icon: BookOpen
  2. **"02 — We Connect Your Tools"** — "Calendar, CRM, phone number, WhatsApp. Bukwin integrates with what you already use — nothing changes for your customers." + Icon: Plug
  3. **"03 — Go Live in 48 Hours"** — "Your existing number routes to Bukwin. The agent answers, qualifies, books, and transfers — just like a human receptionist." + Icon: Phone
  4. **"04 — It Gets Smarter Every Day"** — "Call transcripts, booking patterns, and customer feedback train the agent to handle more autonomously over time." + Icon: TrendingUp
- **Visual:** Each step has an accompanying illustration/mockup (phone screen, calendar sync, analytics dashboard)
- **CTA:** "Book Your Setup Call" — Primary button, links to /book-call

**Animation:** ScrollTrigger pinned timeline. Active step highlights with accent gold, progress line fills.

#### Section 5: Features ("Everything a Great Receptionist Does")
**Layout:** Full-width, bg-primary (navy), py-24, text white
**Content:**
- **Eyebrow:** "FEATURES" — Caption, accent gold
- **Headline:** "A Premium Front Desk, Without Hiring One." — H2, white
- **Subheadline:** "Everything a great receptionist does — answered instantly, priced flat, and running while you sleep." — Body large, white/70
- **Bento Grid (3x3, mixed sizes):**
  - **Large card (spans 2x2):** "24/7 Voice Answering" — "Nights, weekends, public holidays. Unlimited calls at once, no hold music. Every caller gets answered on the first ring." + Waveform visualization
  - **Medium card:** "Instant Appointment Booking" — "Checks live availability, books the slot, sends confirmations by SMS or WhatsApp, and reminders that cut your no-shows." + Calendar icon
  - **Medium card:** "Speaks Their Language" — "Natural conversation in 30+ languages. Detects the caller's language and switches automatically." + Globe icon
  - **Small card:** "CRM Sync" — "Contacts, notes, call summaries, and appointments written back automatically." + Database icon
  - **Small card:** "Smart Transfers" — "Urgent or high-value callers get routed to the right person, with full conversation context attached." + ArrowRight icon
  - **Small card:** "WhatsApp & Chat" — "The same agent on your website and WhatsApp. Answers never contradict each other." + MessageCircle icon
  - **Small card:** "Lead Qualification" — "Asks your qualifying questions, flags real buyers, and politely handles non-buyers." + Filter icon
  - **Small card:** "Call Analytics" — "Every call measured: response time, resolution rate, booking conversion, and sentiment." + BarChart icon
  - **Small card:** "No-Show Recovery" — "Automatically follows up with missed appointments to rebook them before they go cold." + RefreshCw icon

**Animation:** Cards stagger in on scroll (100ms delay each). Hover: card lifts, icon pulses subtly.

#### Section 6: Industries ("Tuned Per Industry")
**Layout:** Full-width, bg-background, py-24
**Content:**
- **Eyebrow:** "INDUSTRIES" — Caption, accent gold
- **Headline:** "Not a Generic Bot. Trained for Your Business." — H2, primary
- **Grid:** 6 columns on desktop, 2 on mobile, 10 industry cards:
  1. Healthcare & Dental — Stethoscope icon
  2. Real Estate — Home icon
  3. Restaurants & Food — UtensilsCrossed icon
  4. Salons & Spas — Sparkles icon
  5. Legal Services — Scale icon
  6. Automotive — Car icon
  7. Home Services — Wrench icon
  8. Hospitality — Bed icon
  9. Retail & E-commerce — ShoppingBag icon
  10. Consulting — Briefcase icon
- **Card design:** Icon (accent gold, 32px) + Industry name (H4) + "Learn more →" link
- **Hover:** Card border shifts to accent, icon scales 1.1, "Learn more" underline animates
- **CTA:** "See Your Industry" — Secondary button, links to /industries

#### Section 7: Integrations ("Plugs Into Your Tools")
**Layout:** Full-width, bg-surface, py-16, border-y
**Content:**
- **Headline:** "Works With What You Already Use." — H3, centered, primary
- **Logo Grid:** 2 rows of 6 logos each (12 total), grayscale, opacity 60%, hover: opacity 100% + color
  - Row 1: Google Calendar, Outlook, Calendly, HubSpot, Salesforce, GoHighLevel
  - Row 2: Twilio, WhatsApp, Slack, Zapier, Stripe, Shopify
- **Note:** Use official SVG logos where permitted, or high-quality PNGs. Do not distort aspect ratios.
- **Caption:** "And 50+ more. Don't see your tool? We build custom integrations." — Body small, text-muted, centered

#### Section 8: Testimonials ("Businesses That Stopped Letting Leads Slip")
**Layout:** Full-width, bg-background, py-24
**Content:**
- **Eyebrow:** "TESTIMONIALS" — Caption, accent gold
- **Headline:** "Real Businesses. Real Results." — H2, primary
- **Grid:** 3 columns, 2 rows = 6 testimonial cards
- **Card content:**
  1. "We were losing leads overnight and never knew it. Now every inquiry gets a reply in seconds — our booked calls doubled without hiring anyone." — Aria Chen, COO, Meridian B2B
  2. "The 60-second response is the whole game. Prospects tell us we were the only company that actually got back to them fast." — Marcus Vale, Founder, Kernel Labs
  3. "The no-show recovery flow alone paid for the system in the first month. Leads I'd written off just started rebooking themselves." — Devi Ramachandran, Head of Growth
  4. "One inbox, one pipeline, everything automated. It replaced four tools and finally gave us a single source of truth." — Jonas Weber, Director of Sales Ops
  5. "Our review count tripled on autopilot. The local SEO lift from that alone brought in new inbound we weren't getting before." — Sana Malik, Owner, Vale Consulting
  6. "I was skeptical an AI could sound natural. Then I heard it handle an angry customer with more patience than my best employee." — David Park, Owner, Park Auto Repair
- **Card design:** Quote text (Body large, italic) + Avatar (56px circle) + Name + Role + Company
- **Verification:** Each card has a small "Verified Business" badge with checkmark

**Animation:** Stagger fade-in on scroll. Cards have subtle hover lift.

#### Section 9: Pricing ("Simple, Flat Pricing")
**Layout:** Full-width, bg-surface, py-24
**Content:**
- **Eyebrow:** "PRICING" — Caption, accent gold
- **Headline:** "The Cost of a Full-Time Receptionist, Without the Salary." — H2, primary
- **Toggle:** Monthly / Annual (save 20%)
- **3-Tier Grid:**

**Starter — $79/month**
- "Perfect for solo practitioners"
- Up to 200 minutes/month
- 1 phone number
- Website chat + WhatsApp
- Google Calendar integration
- Basic call transcripts
- Email support
- CTA: "Get Started"

**Professional — $199/month** (RECOMMENDED — accent border + badge)
- "For growing businesses"
- Up to 800 minutes/month
- 3 phone numbers
- All channels (Voice, Chat, WhatsApp, SMS, Email)
- Calendar + CRM integration
- Advanced analytics
- Multilingual support (5 languages)
- Priority support
- No-show recovery
- CTA: "Start Free Trial"

**Enterprise — Custom**
- "For multi-location teams"
- Unlimited minutes
- Unlimited numbers
- Custom integrations
- Dedicated account manager
- SLA guarantee
- On-premise deployment option
- White-label option
- CTA: "Book a Call"

- **Below tiers:** "All plans include: 24/7 answering, instant setup, call recording, SSL security, data encryption" — Body small, text-muted
- **Guarantee:** "30-day money-back guarantee. No questions asked." — Caption, centered, with Shield icon

**Animation:** Cards stagger in. Recommended card has subtle glow pulse on load.

#### Section 10: ROI Calculator ("Put Your Own Numbers In")
**Layout:** Full-width, bg-primary (navy), py-24, text white
**Content:**
- **Eyebrow:** "ROI CALCULATOR" — Caption, accent gold
- **Headline:** "See What Missed Calls Are Costing You." — H2, white
- **Subheadline:** "Drag the sliders. The math is done in your browser — nothing is sent to us." — Body large, white/70
- **Interactive Calculator (2-column):**
  - **Left: Inputs**
    - "Calls per month" — Slider: 50–1000, default 200
    - "Average customer value" — Slider: $50–$2000, default $250
    - "Current answer rate" — Slider: 10%–90%, default 45%
    - "Bukwin answer rate" — Fixed at 98% (with tooltip: "We answer every call that connects")
  - **Right: Results**
    - "Current monthly bookings:" [calculated]
    - "With Bukwin:" [calculated]
    - "Additional monthly revenue:" [calculated, accent gold, large]
    - "Annual impact:" [calculated, accent gold, larger]
    - "ROI:" [calculated]x your monthly investment
- **Disclaimer:** "This is an illustration, not a guarantee. Your results depend on your business, call quality, and conversion rate." — Caption, white/50
- **CTA:** "Book a Free Assessment" — Primary button, links to /book-call

**Note:** This is a client-side calculator using React state. No backend needed for MVP.

#### Section 11: FAQ ("Everything You Need to Know")
**Layout:** Full-width, bg-background, py-24
**Content:**
- **Eyebrow:** "FAQ" — Caption, accent gold
- **Headline:** "Good Questions. Honest Answers." — H2, primary
- **Accordion (8 items):**
  1. "How does the AI receptionist actually work?" → "We point your existing number at Bukwin. The agent answers, follows the script and rules we build with you, checks your calendar, books or transfers, then writes everything back to your systems. Nothing changes for the caller."
  2. "Will it sound like a robot?" → "No. It speaks naturally, handles interruptions and pauses, and can be tuned to your brand's tone. Most callers treat it like a normal front-desk conversation. You can hear it yourself in the live demo above."
  3. "Can it speak my customers' language?" → "Yes — 30+ languages supported. It can detect the caller's language and switch automatically. This matters a lot for businesses serving diverse communities."
  4. "Can it transfer calls to my team?" → "Yes. You define the triggers — urgency, deal size, a specific service, an angry caller — and the agent routes to the right person, with full conversation context attached."
  5. "Does it work with my calendar and CRM?" → "Google Calendar, Outlook, Calendly, HubSpot, Salesforce, GoHighLevel, and more. If you don't have a system yet, we'll set up a simple one for you."
  6. "Does it handle WhatsApp and website chat too?" → "Yes. The same agent, the same knowledge, across phone, WhatsApp, and your website — so answers never contradict each other."
  7. "How long does setup take?" → "Most businesses go live within 48 hours. Complex integrations or multi-location setups take a few days longer, and we'll tell you honestly on the first call."
  8. "What does it cost?" → "Flat monthly pricing based on call volume and integrations — no per-minute surprises. We quote it after a 15-minute call, once we know what your phone actually does on a busy day."

**Animation:** Accordion expand/collapse with height animation + chevron rotation.

#### Section 12: Final CTA ("Your Next Customer Is Already Calling")
**Layout:** Full-width, bg-primary (navy), py-24, text white, centered
**Content:**
- **Headline:** "Your Next Customer Is Already Calling." — H1, white
- **Subheadline:** "Fifteen minutes, no pitch deck. We'll ask what your phone does on a busy day, then show you Bukwin handling it." — Body large, white/70, max-width 600px, mx-auto
- **CTA:** "Book Your Free Demo" — Large primary button (px-10 py-4, text-lg)
- **Secondary:** "Or call us: (555) 019-2834" — Body, white/50, with Phone icon
- **Trust:** "No credit card required. Cancel anytime." — Caption, white/40

#### Section 13: Footer
**Layout:** Full-width, bg-primary (navy), border-t border-white/10, pt-16 pb-8
**Content:**
- **Top Row (4 columns):**
  1. **Brand:** Bukwin AI logo (white) + "AI receptionists that answer your phone 24/7, handle enquiries, qualify leads, book appointments, and transfer the calls that matter." — Body small, white/60
  2. **Product:** Features, How It Works, Industries, Integrations, Pricing, Demo
  3. **Company:** About, Blog, Case Studies, Careers, Contact
  4. **Legal:** Privacy Policy, Terms of Service, Security, Cookie Policy
- **Newsletter:** "Get updates on AI receptionist technology" — Input + Button (accent gold)
- **Bottom Row:**
  - Left: "© 2026 Bukwin AI. All rights reserved."
  - Center: Social icons (LinkedIn, Twitter/X, YouTube, GitHub) — 24px, white/40 hover:white
  - Right: "Built with care by skilled developers." — Caption, white/30


---

### 8.2 ABOUT PAGE — `/about`

**Purpose:** Build trust through founder story, mission, and team credibility.

**Sections:**
1. **Hero:** "Built by People Who Hate Missed Calls Too" — Founder photo + mission statement
2. **Our Story:** Why Bukwin AI was founded — the problem experienced firsthand
3. **Values:** 4 pillars — Human-First, Radical Honesty, Systemic Thinking, Continuous Improvement
4. **Team:** 3–4 team members with photos, names, roles, and 1-line bios
5. **Stats:** "200+ businesses served", "1M+ calls answered", "48h avg setup time", "30+ languages"
6. **CTA:** "Join us in building the future of business communication"

---

### 8.3 FEATURES PAGE — `/features`

**Purpose:** Deep-dive into each feature for SEO and conversion.

**Sections:**
1. **Hero:** "Everything Your Front Desk Does. Automated."
2. **Feature Grid (6 features, each with detailed section):**
   - 24/7 Voice Answering — with waveform demo
   - Smart Appointment Booking — with calendar integration diagram
   - Multilingual Support — with language flags/detection flow
   - CRM & Calendar Sync — with integration architecture diagram
   - Call Transfer & Escalation — with routing logic flowchart
   - Analytics & Insights — with dashboard screenshot
3. **Comparison Table:** Bukwin vs Human Receptionist vs Voicemail vs Traditional IVR
4. **CTA:** "See It In Action" → /demo

---

### 8.4 HOW IT WORKS PAGE — `/how-it-works`

**Purpose:** Reduce anxiety about setup complexity.

**Sections:**
1. **Hero:** "Live in 48 Hours. Here's Exactly How."
2. **4-Step Timeline (detailed):**
   - Step 1: Discovery Call (15 min) — "We learn your business, call volume, and tools."
   - Step 2: Knowledge Build (24h) — "We script your agent, connect your calendar, and train it on your business."
   - Step 3: Testing (24h) — "You test it with real scenarios. We refine until it's perfect."
   - Step 4: Go Live — "Your number routes to Bukwin. You watch bookings land in real time."
3. **Timeline Visualization:** Horizontal on desktop, vertical on mobile. Each step has:
   - Number badge (accent gold circle)
   - Title + description
   - Expected duration
   - "What you need to do" vs "What we handle"
4. **FAQ:** "What if I don't have a CRM?", "Can I keep my existing number?", "What happens during setup?"
5. **CTA:** "Book Your Discovery Call"

---

### 8.5 INDUSTRIES PAGE — `/industries`

**Purpose:** SEO landing pages for vertical-specific keywords.

**Main Page:**
- Grid of 10 industry cards
- Each card links to `/industries/[slug]`

**Individual Industry Page (`/industries/[slug]`):**
- **Hero:** Industry-specific headline (e.g., "AI Receptionist for Dental Practices")
- **Problem:** Industry-specific pain points (e.g., "Missed patient calls = lost lifetime value")
- **Solution:** How Bukwin solves it for this industry
- **Features:** Relevant features highlighted (e.g., HIPAA compliance for healthcare)
- **Case Study:** Industry-specific testimonial
- **Integrations:** Relevant tools (e.g., Open Dental, Dentrix for dental)
- **CTA:** "Get a Custom Quote for [Industry]"

---

### 8.6 PRICING PAGE — `/pricing`

**Purpose:** Transparent pricing + conversion.

**Sections:**
1. **Hero:** "Simple Pricing. No Hidden Fees."
2. **Pricing Tiers:** Same as homepage but with MORE detail:
   - Full feature comparison table
   - "What's included" vs "Add-ons"
   - Annual discount calculator
3. **ROI Calculator:** Full interactive version (same as homepage)
4. **FAQ:** Pricing-specific questions
5. **CTA:** "Still have questions? Book a 15-min call."

---

### 8.7 DEMO PAGE — `/demo`

**Purpose:** Primary conversion page — let visitors experience the product.

**Sections:**
1. **Hero:** "Talk to Bukwin AI Right Now."
2. **Live Demo Interface:**
   - **Left Panel:** Chat/voice interface
     - Scenario selector dropdown
     - Message history
     - Input field (text or "Hold to talk" button for voice)
     - Agent status indicator ("Bukwin is typing..." / "Listening..." / "Speaking...")
   - **Right Panel:** Calendar view
     - Current month view
     - Business hours highlighted
     - Booked slots shown
     - When demo booking completes: new event animates in
   - **Bottom Panel:** Call transcript + summary
3. **Scenario Presets:**
   - "Book a dental cleaning"
   - "Check restaurant availability"
   - "Schedule a property viewing"
   - "Ask about legal consultation fees"
4. **How It Works (mini):** "This demo simulates a real conversation. In production, Bukwin connects to your actual phone number and calendar."
5. **CTA:** "Ready for your own agent? Book a setup call."

**Backend Note:** This page requires the most backend work. For MVP, implement a rule-based chatbot with predefined responses. Mark all integration points with `// TODO: Connect to LiveKit/Twilio/OpenAI`.

---

### 8.8 CONTACT / BOOK CALL PAGE — `/contact` & `/book-call`

**Purpose:** Lead capture + consultation booking.

**Sections:**
1. **Hero:** "Let's Talk About Your Phone."
2. **Two-Column Layout:**
   - **Left: Contact Form**
     - Name, Email, Business Name, Phone Number
     - Industry dropdown
     - "How many calls do you get per month?" dropdown
     - "What tool do you use for scheduling?" dropdown
     - Message textarea
     - Submit button
   - **Right: Direct Booking**
     - "Prefer to book directly?" headline
     - Calendly embed (or custom calendar)
     - "Or call us: (555) 019-2834"
     - "Response time: < 2 hours during business days"
3. **Trust Signals:** "Free 15-minute consultation. No pitch deck. No pressure."

---

### 8.9 DASHBOARD (POST-AUTH) — `/dashboard/*`

**Purpose:** Customer portal for managing their AI agent.

**⚠️ PLACEHOLDER SECTION — Full backend required**

**Pages:**
- `/dashboard` — Overview: call volume graph, recent calls list, upcoming appointments, agent status
- `/dashboard/calls` — Call log table with filters (date, status, duration, outcome). Play recording button. View transcript.
- `/dashboard/calendar` — Full calendar view (month/week/day). Manage bookings. Block time slots.
- `/dashboard/contacts` — CRM-style contact list. Lead pipeline (New → Qualified → Booked → Completed).
- `/dashboard/analytics` — Charts: calls over time, answer rate, booking conversion, peak hours, language breakdown, sentiment analysis.
- `/dashboard/settings` — Agent configuration: business hours, greeting script, services & pricing, transfer rules, voice selection, language preferences, integration connections.
- `/dashboard/billing` — Subscription details, usage metrics, invoices, payment method, upgrade/downgrade.

**Design:**
- Sidebar navigation (collapsible on mobile)
- Top bar: search, notifications bell, profile dropdown
- Color scheme: same as marketing site but with more data-density
- Cards with charts using Recharts or Tremor
- Tables using TanStack Table
- Forms using React Hook Form + Zod

**Backend Requirements:**
- Supabase Auth (session management)
- Supabase DB (calls, appointments, contacts, settings tables)
- Supabase Realtime (live call notifications, calendar updates)
- Supabase Storage (call recordings, transcripts)
- Supabase Edge Functions (webhook handlers for Twilio, calendar APIs)

---

## 9. BACKEND ARCHITECTURE & PLACEHOLDERS

### 9.1 Tech Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Frontend** | Next.js 15 (App Router) | SSR/SSG, routing, API routes |
| **Styling** | Tailwind CSS v4 | Utility-first CSS |
| **UI Components** | shadcn/ui | Base component library |
| **Animations** | Framer Motion + GSAP | UI transitions + scroll animations |
| **Backend** | Supabase | Auth, PostgreSQL, Realtime, Storage, Edge Functions |
| **Deployment** | Vercel | Hosting, CI/CD, edge network |
| **Forms** | React Hook Form + Zod | Validation and form handling |
| **Charts** | Recharts / Tremor | Dashboard analytics |
| **Tables** | TanStack Table | Dashboard data tables |
| **State** | Zustand | Client-side state management |
| **Query** | TanStack Query | Server state, caching, sync |

### 9.2 Supabase Configuration

**Auth:**
- Email/password auth
- Google OAuth provider
- Anonymous auth for demo users
- Row Level Security (RLS) on ALL tables
- JWT session handling with refresh tokens

**Database:**
- PostgreSQL 15+
- pgvector extension for AI memory/semantic search
- Realtime enabled for calls, appointments, notifications
- Connection pooling via Supabase pooler

**Storage:**
- Buckets: `call-recordings`, `avatars`, `documents`, `exports`
- RLS policies per bucket
- Signed URLs for private content

**Edge Functions:**
- `embed` — Generate text embeddings using `gte-small` model
- `webhook-twilio` — Handle Twilio voice/SMS webhooks
- `webhook-calendar` — Handle Google/Outlook calendar push notifications
- `agent-orchestrator` — Main AI agent logic (LLM + tool calling)
- `transcribe` — Speech-to-text processing
- `synthesize` — Text-to-speech generation

### 9.3 Environment Variables

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
SUPABASE_JWT_SECRET=

# AI / Voice
OPENAI_API_KEY=
ANTHROPIC_API_KEY=
ELEVENLABS_API_KEY=
DEEPGRAM_API_KEY=
LIVEKIT_API_KEY=
LIVEKIT_API_SECRET=
LIVEKIT_WS_URL=

# Telephony
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_PHONE_NUMBER=

# Calendar
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_CALENDAR_API_KEY=
MICROSOFT_CLIENT_ID=
MICROSOFT_CLIENT_SECRET=

# CRM
HUBSPOT_API_KEY=
SALESFORCE_CLIENT_ID=
SALESFORCE_CLIENT_SECRET=

# App
NEXT_PUBLIC_APP_URL=https://bukwin-ai.vercel.app
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
```

### 9.4 Placeholder Architecture Map

The following features require significant backend/AI work and should be implemented as **placeholder components** with clear TODO markers:

```
┌─────────────────────────────────────────────────────────────┐
│  MARKETING SITE (Next.js pages — NO backend needed)         │
│  ├── Homepage (static + client-side ROI calculator)         │
│  ├── About, Features, How It Works, Industries              │
│  ├── Pricing (static tiers + client-side toggle)            │
│  ├── Contact form (sends to Supabase/Email)                 │
│  └── Blog (static/markdown or Supabase CMS)                 │
├─────────────────────────────────────────────────────────────┤
│  DEMO PAGE (Partial backend — simulated for MVP)            │
│  ├── Chat interface (rule-based responses)                  │
│  ├── Voice simulation (pre-recorded audio)                  │
│  └── Calendar mock (client-side state only)                 │
│  TODO: Replace with LiveKit + OpenAI Realtime API           │
├─────────────────────────────────────────────────────────────┤
│  AUTH PAGES (Supabase Auth)                                 │
│  ├── Login/Register (Supabase Auth UI or custom)            │
│  └── Password reset                                         │
├─────────────────────────────────────────────────────────────┤
│  DASHBOARD (Full backend required)                          │
│  ├── Overview → TODO: Aggregate queries from calls table    │
│  ├── Calls → TODO: Twilio integration + recording storage   │
│  ├── Calendar → TODO: Google/Outlook API integration        │
│  ├── Contacts → TODO: CRM sync + lead pipeline logic        │
│  ├── Analytics → TODO: Aggregation + chart data             │
│  ├── Settings → TODO: Agent config + voice selection        │
│  └── Billing → TODO: Stripe integration + usage tracking    │
├─────────────────────────────────────────────────────────────┤
│  AI AGENT ENGINE (Core backend — most complex)              │
│  ├── Voice Pipeline: Twilio → LiveKit → STT → LLM → TTS   │
│  ├── Chat Pipeline: WebSocket → LLM → Response              │
│  ├── Tool Calling: Calendar check, Book slot, CRM write     │
│  ├── Memory: Short-term (session) + Long-term (vector DB)   │
│  ├── Multilingual: Language detection + response generation │
│  └── Analytics: Call logging, transcription, sentiment      │
└─────────────────────────────────────────────────────────────┘
```


---

## 10. AI AGENT INTEGRATION ROADMAP

### Phase 1: Marketing Site (Week 1–2)
**Goal:** Launch professional landing site with demo placeholder
- Build all marketing pages
- Implement simulated demo (hardcoded responses)
- Set up Supabase project, auth, basic schema
- Deploy to Vercel

### Phase 2: Auth + Dashboard Shell (Week 3)
**Goal:** Working auth and dashboard navigation
- Supabase Auth integration
- Dashboard layout with sidebar
- Protected routes middleware
- User profile management

### Phase 3: Live Chat Demo (Week 4)
**Goal:** Working text-based AI demo
- OpenAI GPT-4o integration
- Basic tool calling (mock calendar check/book)
- Conversation memory (session-based)
- Demo page connects to real AI

### Phase 4: Voice Integration (Week 5–6)
**Goal:** Working voice call demo
- Twilio phone number setup
- LiveKit room integration
- Deepgram STT integration
- ElevenLabs/Cartesia TTS integration
- Basic voice conversation flow

### Phase 5: Calendar + CRM (Week 7–8)
**Goal:** Real appointment booking
- Google Calendar OAuth + API
- Outlook Calendar integration
- Calendly API integration
- HubSpot/Salesforce basic sync
- Real booking in demo

### Phase 6: Full Dashboard (Week 9–10)
**Goal:** Production customer portal
- Call history with real data
- Analytics with real metrics
- Settings management
- Billing with Stripe

### Phase 7: Scale & Optimize (Week 11+)
**Goal:** Production-ready system
- Multi-tenant architecture
- Advanced RAG memory (pgvector)
- Multi-language support
- Call transfer logic
- No-show recovery workflows
- Performance optimization

---

## 11. DATABASE SCHEMA (SUPABASE)

### 11.1 Auth & Users
```sql
-- Supabase Auth handles: auth.users table
-- Extend with profiles:
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  business_name TEXT,
  industry TEXT,
  phone TEXT,
  avatar_url TEXT,
  subscription_tier TEXT DEFAULT 'starter',
  subscription_status TEXT DEFAULT 'inactive',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS: Users can only read/update their own profile
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
```

### 11.2 Businesses (Multi-tenancy prep)
```sql
CREATE TABLE businesses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID REFERENCES profiles(id),
  name TEXT NOT NULL,
  slug TEXT UNIQUE,
  industry TEXT,
  timezone TEXT DEFAULT 'UTC',
  phone_number TEXT,
  website TEXT,
  settings JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 11.3 Agent Configuration
```sql
CREATE TABLE agent_configs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES businesses(id),
  name TEXT DEFAULT 'Bukwin AI Receptionist',
  greeting_script TEXT,
  business_hours JSONB,
  services JSONB,
  faq_knowledge JSONB,
  voice_settings JSONB,
  language_preferences TEXT[] DEFAULT '{"en"}',
  transfer_rules JSONB,
  integrations JSONB,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 11.4 Calls
```sql
CREATE TABLE calls (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES businesses(id),
  caller_number TEXT,
  caller_name TEXT,
  direction TEXT CHECK (direction IN ('inbound', 'outbound')),
  status TEXT CHECK (status IN ('queued', 'ringing', 'in_progress', 'completed', 'missed', 'voicemail', 'transferred')),
  duration_seconds INTEGER,
  recording_url TEXT,
  transcript TEXT,
  summary TEXT,
  sentiment TEXT CHECK (sentiment IN ('positive', 'neutral', 'negative')),
  outcome TEXT CHECK (outcome IN ('booked', 'qualified', 'transferred', 'resolved', 'no_answer', 'spam')),
  appointment_id UUID,
  notes TEXT,
  metadata JSONB,
  started_at TIMESTAMPTZ,
  ended_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS: Business members can view their calls
CREATE POLICY "Business members can view calls" ON calls FOR SELECT USING (
  EXISTS (SELECT 1 FROM businesses WHERE businesses.id = calls.business_id AND businesses.owner_id = auth.uid())
);
```

### 11.5 Appointments
```sql
CREATE TABLE appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES businesses(id),
  call_id UUID REFERENCES calls(id),
  contact_id UUID,
  service_name TEXT,
  scheduled_at TIMESTAMPTZ NOT NULL,
  duration_minutes INTEGER,
  status TEXT CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled', 'no_show')),
  calendar_event_id TEXT,
  reminder_sent BOOLEAN DEFAULT false,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 11.6 Contacts (CRM)
```sql
CREATE TABLE contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES businesses(id),
  name TEXT,
  phone TEXT,
  email TEXT,
  source TEXT,
  status TEXT CHECK (status IN ('new', 'qualified', 'booked', 'completed', 'archived')),
  lifetime_value DECIMAL(10,2),
  last_contact_at TIMESTAMPTZ,
  notes TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 11.7 Conversations (Chat)
```sql
CREATE TABLE conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES businesses(id),
  channel TEXT CHECK (channel IN ('web', 'whatsapp', 'sms', 'email', 'instagram', 'facebook')),
  contact_id UUID REFERENCES contacts(id),
  status TEXT DEFAULT 'active',
  summary TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID REFERENCES conversations(id),
  role TEXT CHECK (role IN ('user', 'assistant', 'system')),
  content TEXT NOT NULL,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 11.8 AI Memory (Vector Search)
```sql
-- Enable pgvector
CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE agent_memory (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES businesses(id),
  contact_id UUID REFERENCES contacts(id),
  memory_type TEXT CHECK (memory_type IN ('fact', 'preference', 'interaction', 'appointment', 'complaint')),
  content TEXT NOT NULL,
  embedding VECTOR(384),
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for vector search
CREATE INDEX ON agent_memory USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);

-- Hybrid search function
CREATE OR REPLACE FUNCTION match_memories_hybrid(
  query_embedding VECTOR(384),
  query_text TEXT,
  p_business_id UUID,
  match_count INT DEFAULT 5
)
RETURNS TABLE (memory_type TEXT, content TEXT, similarity FLOAT) AS $$
  WITH vector_ranked AS (
    SELECT id, row_number() OVER (ORDER BY embedding <=> query_embedding) as rank
    FROM agent_memory
    WHERE business_id = p_business_id AND embedding IS NOT NULL
    ORDER BY embedding <=> query_embedding
    LIMIT LEAST(GREATEST(match_count, 1) * 4, 50)
  ),
  text_ranked AS (
    SELECT id, row_number() OVER (ORDER BY ts_rank_cd(fts, websearch_to_tsquery('english', query_text)) DESC) as rank
    FROM agent_memory
    WHERE business_id = p_business_id AND fts @@ websearch_to_tsquery('english', query_text)
    ORDER BY ts_rank_cd(fts, websearch_to_tsquery('english', query_text)) DESC
    LIMIT LEAST(GREATEST(match_count, 1) * 4, 50)
  ),
  fused AS (
    SELECT COALESCE(v.id, t.id) as id,
      COALESCE(0.7 / (60 + v.rank), 0.0) + COALESCE(0.3 / (60 + t.rank), 0.0) as score
    FROM vector_ranked v
    FULL OUTER JOIN text_ranked t ON v.id = t.id
  )
  SELECT m.memory_type, m.content, f.score as similarity
  FROM fused f
  JOIN agent_memory m ON m.id = f.id
  ORDER BY f.score DESC
  LIMIT GREATEST(match_count, 1);
$$ LANGUAGE SQL;
```

### 11.9 Subscriptions & Billing
```sql
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES businesses(id),
  stripe_subscription_id TEXT UNIQUE,
  stripe_customer_id TEXT,
  tier TEXT,
  status TEXT,
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  cancel_at_period_end BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE usage_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES businesses(id),
  metric TEXT,
  quantity INTEGER,
  period_start TIMESTAMPTZ,
  period_end TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```


---

## 12. DEPLOYMENT & DEVOPS

### 12.1 Project Structure
```
bukwin-ai/
├── app/                          # Next.js 15 App Router
│   ├── (marketing)/              # Marketing site route group
│   │   ├── page.tsx              # Homepage
│   │   ├── about/page.tsx
│   │   ├── features/page.tsx
│   │   ├── how-it-works/page.tsx
│   │   ├── industries/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── pricing/page.tsx
│   │   ├── demo/page.tsx
│   │   ├── integrations/page.tsx
│   │   ├── case-studies/page.tsx
│   │   ├── blog/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── book-call/page.tsx
│   │   ├── layout.tsx            # Marketing layout (nav + footer)
│   │   └── globals.css           # Marketing styles
│   ├── (auth)/                   # Auth route group
│   │   ├── login/page.tsx
│   │   ├── register/page.tsx
│   │   ├── forgot-password/page.tsx
│   │   └── reset-password/page.tsx
│   ├── (dashboard)/              # Dashboard route group
│   │   ├── layout.tsx            # Dashboard layout (sidebar + topbar)
│   │   ├── page.tsx              # Dashboard overview
│   │   ├── calls/page.tsx
│   │   ├── calendar/page.tsx
│   │   ├── contacts/page.tsx
│   │   ├── analytics/page.tsx
│   │   ├── settings/page.tsx
│   │   └── billing/page.tsx
│   ├── api/                      # API routes
│   │   ├── auth/
│   │   ├── webhooks/
│   │   │   ├── twilio/route.ts
│   │   │   ├── stripe/route.ts
│   │   │   └── calendar/route.ts
│   │   ├── demo/
│   │   │   └── chat/route.ts
│   │   └── agent/
│   │       └── orchestrate/route.ts
│   ├── layout.tsx                # Root layout
│   └── loading.tsx               # Global loading state
├── components/
│   ├── ui/                       # shadcn/ui components
│   ├── marketing/                # Marketing-specific components
│   │   ├── navigation.tsx
│   │   ├── footer.tsx
│   │   ├── hero-section.tsx
│   │   ├── feature-card.tsx
│   │   ├── testimonial-card.tsx
│   │   ├── pricing-card.tsx
│   │   ├── faq-accordion.tsx
│   │   ├── roi-calculator.tsx
│   │   ├── live-demo.tsx
│   │   ├── industry-card.tsx
│   │   └── integration-logo.tsx
│   ├── dashboard/                # Dashboard components
│   │   ├── sidebar.tsx
│   │   ├── topbar.tsx
│   │   ├── stat-card.tsx
│   │   ├── call-table.tsx
│   │   ├── calendar-view.tsx
│   │   ├── contact-list.tsx
│   │   ├── analytics-chart.tsx
│   │   └── settings-form.tsx
│   └── shared/                   # Shared components
│       ├── fade-in.tsx
│       ├── text-reveal.tsx
│       ├── count-up.tsx
│       ├── live-pulse.tsx
│       └── terminal-typewriter.tsx
├── hooks/
│   ├── use-scroll-animation.ts
│   ├── use-intersection-observer.ts
│   ├── use-supabase.ts
│   └── use-auth.ts
├── lib/
│   ├── supabase/                 # Supabase clients
│   │   ├── client.ts
│   │   ├── server.ts
│   │   └── admin.ts
│   ├── utils.ts
│   ├── constants.ts
│   └── types.ts                  # TypeScript types
├── styles/
│   └── animations.css
├── public/
│   ├── images/
│   │   ├── hero-mockup.png
│   │   ├── dashboard-preview.png
│   │   ├── team/
│   │   └── testimonials/
│   └── logos/                    # Integration partner logos
├── supabase/
│   ├── migrations/               # SQL migrations
│   ├── functions/                # Edge Functions
│   │   ├── embed/
│   │   ├── webhook-twilio/
│   │   ├── webhook-calendar/
│   │   ├── agent-orchestrator/
│   │   ├── transcribe/
│   │   └── synthesize/
│   └── seed.sql
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── .env.local
```

### 12.2 Vercel Configuration
```javascript
// next.config.js
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'cdn.sanity.io'],
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    partialPrerendering: true,
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
```

### 12.3 Performance Requirements
- **Lighthouse Score:** 90+ on all metrics (Performance, Accessibility, Best Practices, SEO)
- **Core Web Vitals:**
  - LCP < 2.5s
  - FID < 100ms
  - CLS < 0.1
  - INP < 200ms
- **Bundle Size:** Initial JS < 200KB (gzipped)
- **Image Optimization:** All images served via Next.js Image component with WebP/AVIF
- **Font Loading:** `next/font` with `display: swap`
- **Code Splitting:** Dynamic imports for heavy components (GSAP, charts, demo)

### 12.4 CI/CD Pipeline
1. **GitHub → Vercel** automatic deployments
2. **Branch previews** for PRs
3. **Environment variables** managed in Vercel dashboard
4. **Supabase migrations** applied via CLI before deploy
5. **Edge Functions** deployed via Supabase CLI

---

## 13. MISSING ELEMENTS CHECKLIST

The following are elements you may have missed or should consider adding. Review each and decide if it belongs in your build:

### Content & Copy
- [ ] **Blog content strategy** — Do you have a content calendar? SEO keywords? Who writes?
- [ ] **Case studies** — Real customer stories with metrics. Do you have customers yet?
- [ ] **Video content** — Product demo video, founder intro, customer testimonials
- [ ] **Help center / Documentation** — Self-service support for dashboard users
- [ ] **Changelog** — Product updates page for transparency

### Legal & Compliance
- [ ] **Privacy Policy** — GDPR, CCPA compliant
- [ ] **Terms of Service** — Subscription terms, liability, data ownership
- [ ] **Cookie Consent** — EU cookie banner with granular controls
- [ ] **HIPAA Compliance page** — If targeting US healthcare
- [ ] **SOC 2 / ISO 27001** — If claiming enterprise security
- [ ] **Data Processing Agreement (DPA)** — For EU customers

### Business Operations
- [ ] **Payment processing** — Stripe setup, tax configuration, invoicing
- [ ] **Email infrastructure** — Transactional emails (SendGrid, Resend, Postmark)
- [ ] **Analytics** — Google Analytics 4, Mixpanel, or PostHog
- [ ] **CRM for sales** — HubSpot, Pipedrive, or Salesforce for your own leads
- [ ] **Support system** — Intercom, Crisp, or Zendesk for customer support
- [ ] **Status page** — Uptime monitoring and incident communication

### Technical Infrastructure
- [ ] **Error tracking** — Sentry for frontend/backend errors
- [ ] **Logging** — Structured logging for debugging (Datadog, Logtail)
- [ ] **Monitoring** — Uptime checks, performance alerts
- [ ] **Rate limiting** — API rate limits to prevent abuse
- [ ] **Backup strategy** — Database backups, disaster recovery plan
- [ ] **CDN** — Vercel Edge Network + Supabase Storage CDN

### Marketing & Growth
- [ ] **SEO meta tags** — Dynamic OG images, structured data (JSON-LD)
- [ ] **Social media presence** — LinkedIn, Twitter/X, YouTube channel
- [ ] **Email capture** — Newsletter signup with lead magnets
- [ ] **Referral program** — Customer referral incentives
- [ ] **Affiliate program** — Partner/reseller program for agencies
- [ ] **Webinars / Demo recordings** — Automated demo for async viewing

### Product Features (Future Roadmap)
- [ ] **Mobile app** — iOS/Android companion for dashboard
- [ ] **API for developers** — Public API for custom integrations
- [ ] **White-label option** — Custom branding for agencies
- [ ] **AI agent marketplace** — Pre-built agents for specific industries
- [ ] **Call quality monitoring** — Real-time call quality metrics
- [ ] **Advanced analytics** — Cohort analysis, revenue attribution
- [ ] **AI training interface** — Let users train the agent with examples
- [ ] **Multi-location support** — Different agents per location
- [ ] **Call recording & QA** — Review calls, score agent performance
- [ ] **SMS campaigns** — Outbound SMS marketing from the platform

### Design Polish
- [ ] **Loading states** — Skeleton screens for dashboard data
- [ ] **Empty states** — Friendly illustrations when no data exists
- [ ] **Error states** — 404 page, 500 page, offline indicator
- [ ] **Onboarding flow** — First-time user tutorial for dashboard
- [ ] **Dark mode toggle** — System preference + manual toggle
- [ ] **Print styles** — For invoices, reports, call transcripts
- [ ] **Accessibility audit** — Keyboard navigation, screen reader testing, color contrast

---

## APPENDIX A: REFERENCE SITE SCREENSHOT ANALYSIS

### Agentlii.com — Key Screenshots to Reference
1. **Hero section:** Clean headline + subheadline + CTA + product mockup
2. **Live demo section:** Split chat/voice interface with "Live" badge
3. **Problem section:** 3-column cards with icons + stat bar below
4. **How it works:** Numbered timeline with step descriptions
5. **Features grid:** 2x2 or 3x3 cards with icons
6. **Industry grid:** Horizontal scroll or grid of industry cards
7. **Integration logos:** Clean monochrome logo grid
8. **Testimonials:** Quote cards with avatars
9. **FAQ accordion:** Simple expand/collapse
10. **Footer:** 4-column layout with newsletter

### Rastaah-ai.com — Key Screenshots to Reference
1. **Hero:** Bold monospace headline with stat callouts
2. **Pipeline visualization:** File-tree style explorer UI
3. **Workflow triggers:** Card-based automation triggers
4. **Live telemetry:** System status with real-time logs
5. **Product matrix:** 5-product grid with descriptions
6. **Testimonials:** Quote cards with initials
7. **Founder section:** Photo + bio + quote
8. **CTA section:** Bold headline + form

### GetFrontDeskHQ.com — Key Screenshots to Reference
1. **Hero:** Problem-first headline + assessment CTA
2. **Assessment section:** Detailed value proposition list
3. **ROI calculator:** Interactive sliders with real-time math
4. **Live demo:** Split-screen chat + calendar
5. **What it does:** Icon grid of features
6. **Every channel:** Channel list with descriptions
7. **How it works:** Numbered timeline with realistic expectations
8. **Founder story:** Credibility stacking (credentials + photo)
9. **Compliance:** Geographic compliance badges
10. **FAQ:** Honest, objection-handling answers

---

## APPENDIX B: ANIMATION TIMING REFERENCE

| Animation | Duration | Easing | Delay |
|-----------|----------|--------|-------|
| Page transition | 400ms | ease-in-out | 0 |
| Section fade-in | 600ms | cubic-bezier(0.4, 0, 0.2, 1) | 0 |
| Stagger children | 100ms each | ease-out | index * 100ms |
| Text reveal (per word) | 800ms | cubic-bezier(0.22, 1, 0.36, 1) | index * 50ms |
| Button hover | 200ms | ease-out | 0 |
| Card hover | 300ms | ease-out | 0 |
| Modal open | 300ms | cubic-bezier(0.4, 0, 0.2, 1) | 0 |
| Accordion expand | 300ms | ease-in-out | 0 |
| CountUp | 2000ms | easeOutExpo | 0 |
| Live pulse | 2000ms | ease-in-out | infinite |
| Float animation | 6000ms | ease-in-out | infinite |
| Scroll progress | scrubbed | linear | 0 |

---

## APPENDIX C: RESPONSIVE BREAKPOINTS

| Breakpoint | Width | Usage |
|------------|-------|-------|
| **sm** | 640px | Mobile landscape |
| **md** | 768px | Tablet portrait |
| **lg** | 1024px | Tablet landscape / small desktop |
| **xl** | 1280px | Desktop |
| **2xl** | 1536px | Large desktop |

**Mobile-first approach:** Base styles for mobile, override at `sm`, `md`, `lg`, `xl`.

**Key responsive behaviors:**
- Navigation: Hamburger menu below `md`
- Hero: Stack vertically below `lg`
- Grids: 1 col mobile → 2 col tablet → 3-4 col desktop
- Typography: Scale down 30-40% on mobile
- Section padding: Reduce by 30% on mobile
- Demo section: Stack chat above calendar on mobile

---

## APPENDIX D: THIRD-PARTY SERVICES INTEGRATION LIST

### Required for MVP
- **Supabase** — Auth, DB, Storage, Realtime, Edge Functions
- **Vercel** — Hosting, CI/CD, Edge Network
- **Resend or SendGrid** — Transactional emails
- **Stripe** — Payments and subscriptions

### Required for AI Agent (Phase 3+)
- **Twilio** — Phone numbers, SIP trunking, SMS
- **LiveKit** — Real-time audio streaming, WebRTC rooms
- **Deepgram** — Speech-to-text (STT)
- **ElevenLabs or Cartesia** — Text-to-speech (TTS)
- **OpenAI** — GPT-4o for conversation logic
- **Anthropic** — Claude for complex reasoning (backup/fallback)

### Required for Calendar (Phase 5)
- **Google Calendar API** — OAuth2 + event management
- **Microsoft Graph API** — Outlook calendar integration
- **Calendly API** — Scheduling link integration

### Required for CRM (Phase 5)
- **HubSpot API** — Contact and deal sync
- **Salesforce API** — Enterprise CRM integration
- **Zapier** — Workflow automation for non-native integrations

### Analytics & Monitoring
- **Google Analytics 4** — Web analytics
- **PostHog or Mixpanel** — Product analytics
- **Sentry** — Error tracking
- **UptimeRobot or Pingdom** — Uptime monitoring

---

## FINAL NOTES FOR DEVELOPERS

1. **Start with the marketing site.** Build all public pages first with placeholder data. This gives you a professional presence while you develop the backend.

2. **Use shadcn/ui as the foundation.** It provides accessible, well-designed components that you can customize with your theme. Do NOT build every component from scratch.

3. **Implement the design system first.** Define your colors, typography, spacing, and components in Tailwind config BEFORE building pages. This ensures consistency.

4. **Animate with purpose.** Every animation must serve a function. If removing an animation doesn't hurt the user experience, remove it.

5. **Write TypeScript strictly.** Use `strict: true` in tsconfig. Define interfaces for all data shapes. No `any` types.

6. **Test on real devices.** The site must look and feel premium on iPhone, Android, iPad, and desktop. Use BrowserStack or physical devices.

7. **Optimize images.** Use Next.js Image component with proper sizing. Lazy load below-fold images. Use WebP/AVIF formats.

8. **Handle errors gracefully.** Every API call needs error handling. Every form needs validation. Every async operation needs loading and error states.

9. **Document as you build.** Write README files, component documentation, and API docs. Future you (and your team) will thank you.

10. **Ship incrementally.** Don't wait for perfection. Launch the marketing site, then add auth, then the demo, then the dashboard. Each phase provides value.

---

**END OF PROMPT**

*This document was generated through deep research of competitive landscape, design trends, and technical architecture. It is designed to be handed directly to a development team or AI coding agent for implementation.*

*For questions or clarifications, contact: arehman09967@gmail.com*
