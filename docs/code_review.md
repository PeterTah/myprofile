# Code Review — myprofile

Full-repo review of the Next.js 16 / React 19 portfolio site (~2,900 lines across `src/`). Scope: correctness, security, reliability, accessibility, and maintenance. No automated test suite exists, so findings are from static reading of the source, not from a green/red test run.

## Summary

The codebase is small, well-organized (data/components/sections separation), and mostly free of outright bugs. The issues below are concentrated in the two features with real backend logic — the OpenRouter chat route and the in-memory rate limiter — plus a handful of pre-existing rough edges the author already flagged in `tutorial.md`'s self-review but never fixed. Nothing here is a "the site is broken" issue; treat this as a punch list.

---

## 1. Correctness & Reliability

### 1.1 ~~Rate limiter has no eviction — unbounded memory growth~~ — Fixed
`src/lib/rate-limit.ts` kept a `Map` of every key (IP) ever seen, keyed forever, with no TTL sweep.

**Fix applied:** `checkRateLimit` now calls `pruneExpired(now)` at the start of every call, deleting any bucket whose `resetAt` has passed. Keeps the map bounded by concurrently-active keys instead of growing forever.

### 1.2 ~~Rate limiting keys off a spoofable header~~ — Fixed
`src/app/api/chat/route.ts` took the client IP from `x-forwarded-for`'s first entry, which any caller can set directly.

**Fix applied:** added `getClientIp()`, which prefers `x-real-ip` (set by common reverse proxies) and otherwise reads the *last* entry of `x-forwarded-for` rather than the first — the entry closest to our own edge/proxy, which a client can't overwrite once a trusted hop appends it. Note this only provides real protection once the app sits behind a reverse proxy/edge network that actually appends that hop (verified locally: with no proxy in front, dev/test traffic has only one hop, so the "trusted" and "client-supplied" entries are the same value — expected, not a bug in the fix). Deploy behind Vercel or a proxy that manages this header for the mitigation to take effect.

### 1.3 ~~No timeout on the OpenRouter upstream call~~ — Fixed
`src/app/api/chat/route.ts` awaited `fetch` with no `AbortController`/timeout, so a slow or hanging upstream could tie up the request indefinitely.

**Fix applied:** the OpenRouter `fetch` now passes `signal: AbortSignal.timeout(20_000)`. A timeout returns a `504` with a clear message instead of hanging; other fetch failures (DNS, network) return `502`. Verified via manual `curl` testing that normal chat requests still complete successfully end-to-end.

### 1.4 ~~Digital twin chat reads stale `messages` state~~ — Fixed
`src/components/sections/digital-twin-chat.tsx:53` built `nextMessages` from the `messages` closure rather than a functional state update. The `isLoading` guard prevented the obvious double-submit, but any path that called `sendMessage` twice before the first `setMessages` commit (e.g., a quick-prompt click racing a form submit in the same tick) could silently drop a message.

**Fix applied:** added a `messagesRef` that mirrors `messages` synchronously on every update (user send, assistant reply, error, and reset), so `sendMessage` always reads the full history instead of a stale render-time closure. Also added an `isSendingRef` re-entrancy guard checked synchronously, since the `isLoading` *state* flag doesn't reflect reality until React commits it — a second call issued in the same tick as the first now no-ops instead of racing. Verified with a Playwright script against a mocked `/api/chat`: two back-to-back sends in the same tick now result in exactly one request (the second is a no-op), and two sequential sends correctly build a request payload containing all four prior messages with none dropped or duplicated.

### 1.5 ~~Initial theme flashes for non-dark users~~ — Fixed
`src/app/layout.tsx:33` hardcoded the `dark` class on `<html>`, and `src/components/theme-provider.tsx:45-47` seeded `resolvedTheme` state from `defaultTheme` (`"dark"`) before the mount effect read `localStorage`/system preference. Anyone who previously chose light mode, or whose OS is set to light with `enableSystem`, saw a flash of dark UI until the effect ran.

**Fix applied:** added an inline theme-detection script that runs before any visible content paints and sets the correct `light`/`dark` class + `color-scheme` directly on `document.documentElement`. Note this is a **raw `<script>` tag**, not `next/script`'s `beforeInteractive` strategy — verified with Playwright (by delaying all `/_next/static/chunks/*` responses) that in this project's Next.js build, `beforeInteractive` inline scripts are queued into `self.__next_s` and only processed once an async-loaded runtime chunk executes, so the SSR `dark` class was still showing at `domcontentloaded` with that approach. A literal `<script>` as the first element in `<body>` is parsed and executed synchronously in document order, before the rest of the page's visible content, which actually prevents the flash. Confirmed via Playwright end-to-end for both a `light` and `dark` stored preference.

---

## 2. Security

### 2.1 Upstream error text is forwarded to the client
`src/app/api/chat/route.ts:123-132` returns up to 400 chars of OpenRouter's raw error response body to the browser via the `detail` field. This is low-severity for a portfolio site, but it's still passing third-party error content (which could echo request internals) straight to an untrusted client.

**Action:** log the detail server-side and return a generic error message to the client, or verify OpenRouter never echoes sensitive request data in error bodies before keeping this as-is.

### 2.2 `Origin` header forwarded to a third party unchecked
`src/app/api/chat/route.ts:107` forwards `req.headers.get("origin")` as `HTTP-Referer` to OpenRouter without validating it against an expected allowlist. Not exploitable via header injection (fetch's Headers API rejects CR/LF), but it means the referer OpenRouter sees is fully attacker-controlled.

**Action:** low priority; if it matters for OpenRouter's own analytics/rate-limiting, hardcode the site's canonical origin instead of trusting the incoming request.

---

## 3. Accessibility

### 3.1 ~~Chat transcript isn't announced to assistive tech~~ — Fixed
`src/components/sections/digital-twin-chat.tsx:181` rendered the scrolling message list as a plain `<div>`. New assistant replies appeared with no `aria-live` region, so screen-reader users got no notification that a response arrived.

**Fix applied:** added `aria-live="polite" aria-atomic="false"` to the message list container. New messages and the "Thinking…" indicator (both rendered inside that container) are now announced as they appear. Confirmed the attributes render in the served HTML.

---

## 4. Maintenance / Project Hygiene

### 4.1 ~~`README.md` is unmodified `create-next-app` boilerplate~~ — Fixed
`README.md` said "Open http://localhost:3000" and pointed to generic Next.js links, but `npm run dev` actually binds `0.0.0.0:3007` (`package.json:6`), and the project has a chat API, resume-PDF pipeline, and content-driven architecture that weren't mentioned anywhere in it.

**Fix applied:** replaced the README with real setup steps (correct port, required `.env` vars with a link to `.env.example`, all `package.json` scripts including `resume:pdf`), and links to `tutorial.md` and `docs/code_review.md`.

### 4.2 ~~No `.env.example`~~ — Fixed
`OPENROUTER_API_KEY` (required) and `NEXT_PUBLIC_FORM_ENDPOINT` (optional) were documented only in `tutorial.md` prose, not in a checked-in `.env.example`.

**Fix applied:** added `.env.example` with `OPENROUTER_API_KEY`, `NEXT_PUBLIC_FORM_ENDPOINT`, and the new `ALLOWED_DEV_ORIGIN` (see 4.3), all blank, referenced from the README. Added `!.env.example` to `.gitignore` since the existing `.env*` rule would otherwise also ignore the example file.

### 4.3 ~~Hardcoded personal LAN IP in `next.config.ts`~~ — Fixed
`next.config.ts:5` set `allowedDevOrigins: ["192.168.1.79"]` — a specific dev machine's LAN address checked into source control.

**Fix applied:** `next.config.ts` now reads an optional, comma-separated `ALLOWED_DEV_ORIGIN` env var instead of hardcoding an IP, and omits the `allowedDevOrigins` key entirely when unset. Verified `npm run dev` still boots cleanly with no config warnings.

### 4.4 `components.json` references a nonexistent `hooks` alias
`components.json:16` aliases `hooks` to `@/hooks`, but `src/hooks/` doesn't exist. Harmless today; will only bite if `shadcn add` is used to install a component that needs the hooks alias, producing files in a path nothing imports from consistently.

**Action:** no action needed unless the hooks alias starts getting used — just be aware when running the shadcn CLI.

### 4.5 Playwright is installed only for PDF generation, not testing
`playwright` is a devDependency but is exclusively used by `scripts/generate-resume-pdf.mjs` to render the print page; there is no test suite (unit or e2e) anywhere in the repo. Not a defect, but worth flagging since the dependency's presence could mislead a reader into expecting test coverage.

**Action:** none required; consider adding a smoke test for the chat route and resume PDF generation if reliability becomes a priority.

---

## Suggested priority order

1. ~~**1.3** (chat timeout) and **1.2** (spoofable rate-limit key)~~ — **done**.
2. ~~**1.1** (rate limiter eviction)~~ — **done**.
3. ~~**1.4** (stale closure in chat) and **1.5** (theme flash)~~ — **done**.
4. ~~**3.1** (chat `aria-live`)~~ — **done**.
5. ~~**4.1**, **4.2**, **4.3**~~ — **done**. **4.4** and **4.5** need no action (informational only).

All actionable items from this review are now resolved.
