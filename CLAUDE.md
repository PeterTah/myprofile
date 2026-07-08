# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## What this is

A personal portfolio site for Peter Tah (principal engineer / AI & cloud architect) built with Next.js 16 (App Router) and React 19. Single-page marketing site with a "digital twin" AI chat, plus a print-friendly resume route used to generate a PDF.

## Commands

```bash
npm run dev          # starts dev server on 0.0.0.0:3007 (not the default 3000)
npm run build        # production build
npm run start        # serve the production build
npm run lint         # eslint (flat config, eslint-config-next)
npm run resume:pdf   # build, then boot next start on :3010 and use Playwright to render
                      # /resume-print to public/resume.pdf (scripts/generate-resume-pdf.mjs)
```

There is no test suite configured (no test runner/scripts in package.json).

## Architecture

- `src/app/page.tsx` composes the homepage purely by ordering section components (`Hero`, `About`, `CvSnapshot`, `DigitalTwinChat`, `CareerTimeline`, `Skills`, `AIProjects`, `Education`, `ContactFooter`, separated by `CircuitDivider`). Add a new page section by creating a component in `src/components/sections/` and inserting it here.
- `src/app/layout.tsx` is the app shell: `ThemeProvider` (next-themes, defaults to dark, class-based) wraps `TooltipProvider` (base-ui), `SiteHeader`, and `main`.
- **Content lives in `src/data/*.ts`, not in components.** `profile.ts`, `experience.ts`, `skills.ts`, `education.ts`, `ai-projects.ts`, `cv.ts`, `contact.ts`, `digital-transformation.ts`, `future-focus.ts` hold all copy/structured data. Section components read from these files and render — when asked to update site content (job history, skills, bio text, etc.), edit the data file, not the component.
- `src/data/digital-twin.ts` builds the system prompt for the AI chat from the same profile/experience data, so the chat's knowledge of Peter's background stays in sync with the visible site content.
- **Chat feature**: `src/components/sections/digital-twin-chat.tsx` (client) posts `{ messages }` to `src/app/api/chat/route.ts` (server route handler), which rate-limits by IP (in-memory, `src/lib/rate-limit.ts` — resets on server restart, not shared across instances), calls OpenRouter (`OPENROUTER_API_KEY` from `.env`, model `openai/gpt-oss-120b`), and returns `{ reply, model }`. The browser never talks to OpenRouter directly.
- **Resume PDF pipeline**: `src/app/resume-print/page.tsx` renders a print-optimized layout from the same data files. `scripts/generate-resume-pdf.mjs` spins up a production server on a separate port, opens that route in headless Chromium via Playwright with `media: print`, and writes `public/resume.pdf`.
- Reusable primitives: `src/components/motion/` (`FadeIn`, stagger helpers built on framer-motion, respect `prefers-reduced-motion`), `src/components/shared/` (`SectionHeading`, `CircuitDivider`, theme toggle, terminal badge, brand icons), `src/components/nav/` (header, mobile nav, active-section-on-scroll hook).
- `src/components/ui/` is a shadcn-style set, but built on **`@base-ui/react` primitives, not Radix**. Components take a `render` prop to change the rendered element (e.g. `<Button render={<a href="#career" />}>`), not `asChild`. Check the installed `@base-ui/react` component's API before assuming Radix-style props/behavior.
- Styling is Tailwind v4 with CSS custom-property design tokens defined in `src/app/globals.css` (`--background`, `--foreground`, `--primary`, `--accent`, etc.), themed via a `.dark` class swap. Custom utility classes like `kicker`, `glow-border`, `glow-border-active` live there too — prefer reusing them over inventing new ad hoc styles.
- Path alias `@/*` maps to `src/*` (see `tsconfig.json`).

## Environment

- `.env` holds `OPENROUTER_API_KEY`, required for the chat route to function locally.
- `NEXT_PUBLIC_FORM_ENDPOINT` (optional) is read by the contact form; when unset, the UI falls back to showing direct contact links instead of a submittable form.
