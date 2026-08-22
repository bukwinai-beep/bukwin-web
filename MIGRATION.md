# OpenAI-Native Chat Migration

This package replaces the "second brain OS" (ZAI SDK + OpenAI ChatKit) with a pure OpenAI API approach.

## What Changed

### NEW Files (copy these in)
- `src/app/api/chat/route.ts` — Custom chat API using OpenAI with function calling
- `src/components/bukwin/chat/chat-ui.tsx` — Custom React chat interface (replaces ChatKit widget)
- `src/components/bukwin/chat/floating-chat.tsx` — Floating bubble using ChatUI
- `src/app/chat/page.tsx` — Standalone /chat page
- `src/app/layout.tsx` — Updated (removes ChatKitScript)
- `src/app/api/appointments/[id]/route.ts` — Reschedule + Cancel
- `src/app/api/appointments/lookup/route.ts` — Lookup by email
- `src/lib/email.ts` — Reschedule/cancel emails
- `prisma/schema.prisma` — Appointment model + PostgreSQL

### DELETE These Old Files
```bash
# Remove ZAI / ChatKit dependencies
rm src/components/bukwin/shared/chatkit-script.tsx
rm src/components/bukwin/chat/floating-chatkit.tsx
rm src/components/bukwin/chat/chat-interface.tsx
rm src/app/api/chatkit/session/route.ts
rm src/app/api/demo/chat/route.ts
```

### UPDATE package.json
Remove:
- `"z-ai-web-dev-sdk": "^0.0.18"`

Add:
- `"openai": "^4.77.0"`

### UPDATE .env / Vercel env vars

REMOVE (no longer needed):
- `CHATKIT_WORKFLOW_ID`
- `NEXT_PUBLIC_CHATKIT_WORKFLOW_CONFIGURED`
- `NEXT_PUBLIC_CHATKIT_API_URL`
- `NEXT_PUBLIC_CHATKIT_DOMAIN_KEY`
- `NEXT_PUBLIC_CHATKIT_SCRIPT_URL`

KEEP (still needed):
- `OPENAI_API_KEY`
- `DATABASE_URL`
- `GOOGLE_CALENDAR_ID`
- `GOOGLE_SERVICE_ACCOUNT_KEY`
- `BUSINESS_NAME`
- `RESEND_API_KEY` (optional)
- `BUSINESS_EMAIL_FROM` (optional)

OPTIONAL (new):
- `OPENAI_MODEL` — defaults to `gpt-4o-mini`. Set to `gpt-4o` for better quality.

## Architecture

```
User types message
    ↓
Frontend (ChatUI) → POST /api/chat
    ↓
Backend calls OpenAI Chat Completions with function definitions
    ↓
If OpenAI requests a tool call → backend executes it internally
    ↓
Backend returns final assistant reply to frontend
    ↓
Frontend displays the reply
```

## Why This Is Better

1. **No external dependencies** — No ZAI SDK, no ChatKit CDN, no Agent Builder workflow
2. **Full control** — You own the UI, prompts, and tool logic completely
3. **Security** — Tools execute server-side, API key never touches the browser
4. **Reliability** — No flaky CDN scripts or third-party SDK failures
5. **Cost** — Direct OpenAI API calls, no middleman fees
6. **Customizable** — Change the model, prompts, or UI anytime without platform lock-in
