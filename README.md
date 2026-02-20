<p align="center">
  <img src="https://raw.githubusercontent.com/Conservative-Developers/PanicType/main/preview.png" alt="PanicType Preview" width="800" />
</p>

<h1 align="center">⌨️ PanicType</h1>

<p align="center">
  <strong>Race against the clock. Track your progress. Climb the global leaderboard.</strong>
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#project-structure">Project Structure</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#environment-variables">Environment Variables</a> •
  <a href="#license">License</a>
</p>

---

## Features

- ⚡ **Real-time Typing Test** — Type against randomized passages with instant visual feedback (correct/incorrect keystroke highlighting)
- 📊 **Live Stats** — WPM, accuracy, and elapsed time update in real-time as you type
- 🏆 **Global Leaderboard** — Compete with typists worldwide, ranked by Words Per Minute
- 👤 **User Profiles** — Personal dashboard tracking best WPM, average WPM, average accuracy, and total games played
- 🔐 **Authentication** — Credential-based sign-up/sign-in with secure password hashing (bcrypt) and JWT sessions
- 📱 **Responsive Design** — Fully responsive dark-mode UI with glassmorphism, gradients, and smooth animations
- ⌨️ **Keyboard Shortcuts** — Press `Tab` to instantly get a new text or restart after finishing

## Tech Stack

| Layer          | Technology                                                                 |
| -------------- | -------------------------------------------------------------------------- |
| **Framework**  | [Next.js 16](https://nextjs.org/) (App Router)                            |
| **Language**   | [TypeScript 5](https://www.typescriptlang.org/)                           |
| **UI**         | [React 19](https://react.dev/) + [Tailwind CSS 4](https://tailwindcss.com/) |
| **Auth**       | [NextAuth.js v5](https://authjs.dev/) (Credentials provider, JWT strategy) |
| **Database**   | [PostgreSQL](https://www.postgresql.org/) via [Prisma ORM 6](https://www.prisma.io/) |
| **Hashing**    | [bcryptjs](https://www.npmjs.com/package/bcryptjs)                        |
| **Font**       | [Inter](https://fonts.google.com/specimen/Inter) (via `next/font`)        |

## Project Structure

```
PanicType/
├── prisma/
│   ├── migrations/          # Database migration history
│   └── schema.prisma        # User & TypingResult models
├── public/                  # Static assets (SVGs, favicon)
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   ├── [...nextauth]/route.ts   # NextAuth catch-all handler
│   │   │   │   └── register/route.ts        # POST /api/auth/register
│   │   │   ├── leaderboard/route.ts         # GET  /api/leaderboard
│   │   │   └── results/route.ts             # GET & POST /api/results
│   │   ├── leaderboard/page.tsx   # Global leaderboard page
│   │   ├── login/page.tsx         # Sign-in page
│   │   ├── play/page.tsx          # Typing test game page
│   │   ├── profile/page.tsx       # User profile & stats
│   │   ├── register/page.tsx      # Sign-up page
│   │   ├── globals.css            # Global styles & design tokens
│   │   ├── layout.tsx             # Root layout (Navbar, Providers)
│   │   └── page.tsx               # Landing / Hero page
│   ├── components/
│   │   ├── Navbar.tsx             # Responsive nav with auth state
│   │   ├── Providers.tsx          # NextAuth SessionProvider wrapper
│   │   └── TypingGame.tsx         # Core typing test component
│   └── lib/
│       ├── auth.ts                # NextAuth configuration
│       ├── db.ts                  # Prisma client singleton
│       └── texts.ts               # Curated typing passages
├── .env.example                   # Environment variable template
├── next.config.ts
├── tailwind / postcss configs
├── tsconfig.json
└── package.json
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) **v18+** (or [Bun](https://bun.sh/))
- [PostgreSQL](https://www.postgresql.org/) database

### 1. Clone the repository

```bash
git clone https://github.com/Conservative-Developers/PanicType.git
cd PanicType
```

### 2. Install dependencies

```bash
npm install
# or
bun install
```

### 3. Configure environment variables

Copy the example env file and fill in your values:

```bash
cp .env.example .env
```

See [Environment Variables](#environment-variables) below for details.

### 4. Set up the database

Generate the Prisma client and run migrations:

```bash
npx prisma generate
npx prisma migrate dev
```

### 5. Start the development server

```bash
npm run dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

Create a `.env` file based on `.env.example`:

| Variable          | Description                                      | Example                                               |
| ----------------- | ------------------------------------------------ | ----------------------------------------------------- |
| `DATABASE_URL`    | PostgreSQL connection string                     | `postgresql://user:password@localhost:5432/panictype`  |
| `NEXTAUTH_SECRET` | Random secret for signing JWT tokens             | Generate with `openssl rand -base64 32`               |
| `NEXTAUTH_URL`    | Canonical URL of your deployment                 | `http://localhost:3000`                                |

## Database Schema

The app uses two Prisma models:

- **User** — `id`, `username` (unique), `email` (unique), `passwordHash`, `createdAt`
- **TypingResult** — `id`, `userId`, `wpm`, `accuracy`, `textLength`, `duration`, `createdAt`

Results are indexed by `userId` and by `wpm` (descending) for fast leaderboard queries.

## Scripts

| Command           | Description                        |
| ----------------- | ---------------------------------- |
| `npm run dev`     | Start the development server       |
| `npm run build`   | Create a production build          |
| `npm run start`   | Start the production server        |
| `npm run lint`    | Run ESLint                         |

## License

This project is licensed under the [MIT License](LICENSE).

**© 2026 Conservative Developers**
