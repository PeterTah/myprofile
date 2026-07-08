# Peter Tah Site Tutorial

This tutorial explains how the `myprofile` project works, from the top-level page down to the supporting components, data files, and API route. It is written for a complete beginner in frontend coding, so I will keep the language simple and explain the "why" behind the code as we go.

## What This Project Is

This is a personal portfolio site built with Next.js and React. It presents Peter Tah as a principal engineer, AI and cloud architect, and technical leader. The site is not just a static resume page. It includes:

- A hero section with strong visual styling
- A sectioned, scrollable one-page layout
- A "digital twin" chat experience powered by an API route
- A downloadable resume and a print-friendly resume page
- A contact form and social links
- Motion, theme switching, and reusable UI components

The overall idea is to make the site feel like a polished, modern professional profile rather than a plain brochure.

## Technology Summary

Here is the main technology stack used in the project:

- `Next.js 16` for the app framework and routing
- `React 19` for building the UI
- `TypeScript` for safer, typed JavaScript
- `Tailwind CSS` for styling
- `framer-motion` for animation
- `lucide-react` for icons
- `shadcn/ui` style components and patterns
- `next-themes` for theme switching
- `Playwright` for generating the PDF resume
- `clsx` and `tailwind-merge` for combining CSS classes

The project also uses a mix of client-side and server-side code:

- Client components handle interaction, animation, and browser-only features
- Server route handlers handle the AI chat proxy to OpenRouter

## High-Level Walkthrough

Think of the site as a set of building blocks:

1. `src/app/layout.tsx` sets up the global page shell.
2. `src/app/page.tsx` decides which sections appear on the homepage.
3. Each section component renders one part of the portfolio.
4. Data files in `src/data/` hold the profile content, skills, experience, and project information.
5. Shared helpers in `src/components/shared/` and `src/components/motion/` keep the design consistent.
6. `src/app/api/chat/route.ts` acts as the backend for the digital twin chat.
7. `src/app/resume-print/page.tsx` renders a clean resume page for printing and PDF generation.

That separation is important. It keeps the code easier to understand because each file has one job.

## How The Page Is Built

The homepage is assembled in `src/app/page.tsx`. The file is short on purpose:

```tsx
export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <CvSnapshot />
      <DigitalTwinChat />
      <CircuitDivider />
      <CareerTimeline />
      <CircuitDivider />
      <Skills />
      <CircuitDivider />
      <AIProjects />
      <CircuitDivider />
      <Education />
      <CircuitDivider />
      <ContactFooter />
    </>
  );
}
```

This is a great beginner pattern to learn:

- The page is easy to scan
- Each section is reusable
- The content is ordered like a story

Instead of putting everything into one giant file, the page imports small section components and places them in the correct order.

## Layout And App Shell

The root layout in `src/app/layout.tsx` wraps the whole app in shared providers and global UI:

```tsx
<ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
  <TooltipProvider delay={150}>
    <SiteHeader />
    <main id="main-content">{children}</main>
  </TooltipProvider>
</ThemeProvider>
```

For a beginner, this means:

- `ThemeProvider` handles dark/light theme switching
- `TooltipProvider` makes tooltip components work everywhere
- `SiteHeader` stays visible at the top of the page
- `main` is the spot where page content appears

There is also a skip link near the top of the file. That helps keyboard and screen-reader users jump straight to the main content.

## Visual Design And Styling

The main styling lives in `src/app/globals.css`. The file defines color tokens, fonts, and reusable utility styles.

```css
:root {
  --background: #F7F8FA;
  --foreground: #111826;
  --primary: #0091A8;
  --accent: #6A3FD9;
}

.dark {
  --background: #0B0F14;
  --foreground: #E6EAF0;
  --primary: #00E5FF;
  --accent: #7C5CFF;
}
```

This pattern is helpful because the rest of the app can refer to semantic names like `background`, `foreground`, and `accent` instead of hard-coding colors everywhere.

The file also defines some custom utilities like `kicker`, `glow-border`, and `glow-border-active`. These give the site a distinctive look without repeating the same class strings in every component.

## The Hero Section

The hero section is the first thing users see. It introduces Peter Tah, shows the main job titles, and presents calls to action.

```tsx
<Button size="lg" nativeButton={false} render={<a href="#career" />}>
  View my journey
  <ArrowRight className="size-4" />
</Button>
```

Beginner takeaways:

- A `Button` component is reused, but it can render as a link
- The page uses anchor links like `#career` to jump to sections
- Icons help make actions easier to understand

The hero also uses `framer-motion` to fade elements in. Animation is small and controlled, which makes the page feel polished without being distracting.

## Data-Driven Content

A lot of the site content comes from files in `src/data/`. For example, `src/data/profile.ts` stores the most important profile text:

```ts
export const profile = {
  name: "Peter Tah",
  titles: [
    "Principal Engineer",
    "AI & Cloud Architect",
  ],
  tagline: "19+ years turning enterprise infrastructure into secure, intelligent, customer-trusted systems.",
};
```

This is a smart pattern because:

- The content is easy to update
- Components stay smaller
- The same data can be reused in many places, like the homepage and resume page

Other data files follow the same idea:

- `src/data/experience.ts` for career history
- `src/data/skills.ts` for skill groups
- `src/data/education.ts` for education, certifications, and languages
- `src/data/ai-projects.ts` for selected AI work
- `src/data/cv.ts` for summary bullets and facts

## Reusable Section Components

Most sections use the same building blocks:

- `SectionHeading` for consistent titles
- `FadeIn` for simple reveal animation
- `StaggerContainer` and `StaggerItem` for grouped animated cards

Example:

```tsx
<SectionHeading kicker="// About" title="Executive profile" />
<FadeIn delay={0.1}>
  <p>{profile.executiveProfile}</p>
</FadeIn>
```

This keeps the code predictable. Once you understand one section, the others follow the same pattern.

## The Digital Twin Chat

This is one of the most interesting parts of the site. It lets visitors ask questions about Peter's career and get AI-generated answers based on the portfolio content.

On the frontend, the chat keeps a `messages` array in state and sends it to the API:

```tsx
const response = await fetch("/api/chat", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ messages: nextMessages }),
});
```

What is happening here?

- The browser sends a request to the app's own API route
- The request contains the chat history
- The server responds with an AI-generated reply
- The UI adds that reply back into the message list

The chat also shows loading and error states, which is good frontend practice because users should always know what the interface is doing.

## The Chat API Route

The server-side route is in `src/app/api/chat/route.ts`. It does several important jobs:

1. Checks a simple rate limit
2. Reads the `OPENROUTER_API_KEY`
3. Validates the request body
4. Sends the prompt to OpenRouter
5. Returns the model's reply

Here is the basic shape of the logic:

```ts
const { allowed } = checkRateLimit(ip, RATE_LIMIT, RATE_LIMIT_WINDOW_MS);
if (!allowed) return NextResponse.json({ error: "Too many requests" }, { status: 429 });

const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
  method: "POST",
  body: JSON.stringify({ messages: [systemPrompt, ...messages] }),
});
```

This is a good example of a "backend-for-frontend" pattern. The browser does not talk directly to the third-party model API. Instead, the app protects the key, validates input, and controls what gets sent out.

## The Career Timeline

The career timeline uses data from `src/data/experience.ts` and animates each role in sequence.

```tsx
{experience.map((entry) => (
  <li key={entry.role + entry.period}>
    <h3>{entry.role}</h3>
    <p>{entry.company}</p>
    <p>{entry.description}</p>
  </li>
))}
```

Why this pattern is useful:

- The job history is stored in one place
- The UI is generated from the array automatically
- Adding a new role is as easy as adding a new data object

## The Contact Section

The contact area combines a form and direct contact buttons.

```tsx
const FORM_ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT;
```

If that endpoint exists, the form posts the data to it. If not, the UI explains that direct contact options are available instead.

This is a nice beginner lesson in progressive enhancement:

- The site still works without a form backend
- The user is not left with a broken submit button
- Alternative contact paths are always visible

## The Resume Print Page

The print-friendly resume lives at `src/app/resume-print/page.tsx`. It uses the same data as the homepage, but arranges it in a more traditional, print-first layout.

That gives the project two useful views:

- The portfolio site for browsing
- The resume page for PDF export

The script `scripts/generate-resume-pdf.mjs` opens the print page in Playwright and saves it as `public/resume.pdf`.

## Detailed Code Review

### 1. Good separation of concerns

The project does a strong job of splitting responsibilities across files. For example, `src/app/page.tsx` only composes sections, while the actual content lives elsewhere.

This is a strong choice because beginners often put too much logic into one file. Here, the app stays readable and scalable.

### 2. Strong accessibility basics

The layout includes a skip link, semantic `main` content, and clear button labels. The mobile navigation and contact form also include accessible labels.

That is a good foundation because accessibility is easier to build in early than to fix later.

### 3. Motion is used with restraint

The `FadeIn` helper is a nice example of reusable animation:

```tsx
<motion.div
  initial={{ opacity: 0, y: 16 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
>
```

This keeps the site lively but avoids overwhelming the content. It is also good that reduced-motion preferences are respected.

### 4. The AI chat has a clear boundary

The frontend chat component only handles UI state, while the route handler owns the OpenRouter call. That separation is exactly what you want in a real app.

The route also validates messages and trims the history down before sending it onward, which helps keep the prompt more manageable.

### 5. The design system is consistent

The project uses the same card, button, badge, and heading patterns across the site. That makes the experience feel cohesive and helps future edits stay predictable.

## Self-Review: What Could Be Better

Here are five improvements I would make after reviewing the code myself:

1. The digital twin chat should use a functional state update or reducer so rapid submits cannot rely on a stale `messages` closure.
2. The OpenRouter route should use an abort timeout and stronger error shaping so slow or failed upstream requests are handled more cleanly.
3. The in-memory rate limiter should eventually move to a shared store if the app ever needs to run across multiple instances.
4. The contact form would be stronger with a visible success/error pattern tied to a real validation schema instead of only relying on HTML field checks.
5. The theme setup could be simplified so the initial HTML class does not force a dark appearance before the theme provider finishes hydrating.

## Final Takeaway

This project is a good example of a modern frontend portfolio site that mixes:

- content-driven React components
- thoughtful styling
- light motion
- server-side AI integration
- print-friendly resume output

If you are new to frontend coding, the most important thing to learn here is the structure:

1. Put the content in data files
2. Keep each component focused on one job
3. Use shared helpers for repeated patterns
4. Separate browser UI from server logic
5. Build features that degrade gracefully when something is unavailable

That approach scales much better than putting everything into one file, and it makes the code much easier to understand as the project grows.
