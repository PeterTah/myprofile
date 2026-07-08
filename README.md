# Peter Tah — Portfolio Site

Personal portfolio for Peter Tah (principal engineer / AI & cloud architect), built with Next.js 16 (App Router) and React 19. Single-page marketing site with a "digital twin" AI chat, plus a print-friendly resume route used to generate a PDF.

See [`tutorial.md`](./tutorial.md) for a deeper walkthrough of how the site was built, and [`docs/code_review.md`](./docs/code_review.md) for known issues and their status.

## Getting started

1. Copy `.env.example` to `.env` and fill in the values you need (see below).
2. Install dependencies and start the dev server:

   ```bash
   npm install
   npm run dev
   ```

3. Open [http://localhost:3007](http://localhost:3007) — note this project binds port **3007**, not the Next.js default 3000.

## Environment variables

Documented in [`.env.example`](./.env.example):

- `OPENROUTER_API_KEY` — **required** for the digital-twin chat route (`src/app/api/chat/route.ts`) to work locally.
- `NEXT_PUBLIC_FORM_ENDPOINT` — optional. When unset, the contact section shows direct contact links instead of a submittable form.
- `ALLOWED_DEV_ORIGIN` — optional, comma-separated. Add an origin (e.g. a phone's LAN IP) if you need to reach the dev server from another device.

## Commands

```bash
npm run dev          # dev server on 0.0.0.0:3007
npm run build        # production build
npm run start        # serve the production build
npm run lint         # eslint (flat config, eslint-config-next)
npm run resume:pdf   # build, boot next start on :3010, and use Playwright to
                      # render /resume-print into public/resume.pdf
```

There is no test suite configured (no test runner/scripts in `package.json`).

## Deploy on Vercel

The easiest way to deploy this app is via the [Vercel Platform](https://vercel.com/new). See the [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying) for details.
