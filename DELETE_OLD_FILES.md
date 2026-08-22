# DELETE THESE OLD FILES

After applying this fix package, run these commands in Git Bash to remove the old broken files:

```bash
# Remove old ChatKit / ZAI files
rm src/components/bukwin/shared/chatkit-script.tsx
rm src/components/bukwin/chat/floating-chatkit.tsx
rm src/app/api/chatkit/session/route.ts
rm src/app/api/demo/chat/route.ts

# Remove old node_modules and lock files (they have z-ai)
rm -rf node_modules
rm bun.lockb 2>/dev/null
rm package-lock.json 2>/dev/null

# Install fresh dependencies
bun install
# or: npm install

# Generate Prisma client for PostgreSQL
bun run db:generate
# or: npx prisma generate

# Stage everything
git add -A

# Commit
git commit -m "fix: migrate to pure OpenAI API, PostgreSQL, custom chat UI"

# Push
git push
```

# ENV VARS TO UPDATE IN VERCEL

## REMOVE these (no longer needed):
- CHATKIT_WORKFLOW_ID
- NEXT_PUBLIC_CHATKIT_WORKFLOW_CONFIGURED
- NEXT_PUBLIC_CHATKIT_API_URL
- NEXT_PUBLIC_CHATKIT_DOMAIN_KEY
- NEXT_PUBLIC_CHATKIT_SCRIPT_URL

## KEEP these:
- OPENAI_API_KEY
- DATABASE_URL (change to Supabase PostgreSQL URI)
- GOOGLE_CALENDAR_ID
- GOOGLE_SERVICE_ACCOUNT_KEY
- BUSINESS_NAME
- RESEND_API_KEY (optional)
- BUSINESS_EMAIL_FROM (optional)

## ADD this (optional):
- OPENAI_MODEL=gpt-4o-mini (default if not set)
- NEXT_PUBLIC_APP_URL=https://yourdomain.com (for internal API calls)
