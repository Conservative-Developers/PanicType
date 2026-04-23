# PanicType Agent Guide

## Stack
- Next.js 16 (App Router), React 19, Tailwind CSS 4
- NextAuth v5 beta (credentials + JWT), Prisma 6, PostgreSQL
- bcryptjs, Inter font via `next/font`

## Developer Commands
```bash
npm run dev     # Start dev server
npm run build   # Production build
npm run lint    # ESLint only (no typecheck script)
```

## Database Setup
```bash
npx prisma generate   # Generate client FIRST
npx prisma migrate dev
```
Always run `generate` before `migrate dev` in a fresh clone.

## Environment Variables
Copy `.env.example` to `.env`:
- `DATABASE_URL` — PostgreSQL connection string
- `NEXTAUTH_SECRET` — Generate with `openssl rand -base64 32`
- `NEXTAUTH_URL` — `http://localhost:3000`

## Architecture
- Path alias: `@/*` → `./src/*`
- Prisma client singleton in `src/lib/db.ts` (uses `globalThis` pattern)
- NextAuth config in `src/lib/auth.ts` — credentials provider, JWT strategy, custom sign-in page at `/login`
- Session user `id` stored in JWT token (not on session object by default)
- Typing passages in `src/lib/texts.ts`

## API Routes
- `POST /api/auth/register` — Create account
- `GET|POST /api/results` — User results (auth required)
- `GET /api/leaderboard` — Top users by WPM
- `[...nextauth]` — NextAuth catch-all

## Style
- Strict TypeScript (`strict: true`)
- ESLint with next vitals + typescript rules
- Glassmorphism/dark UI with violet-cyan gradients
- Use `@/components`, `@/lib` imports (no relative path guessing)