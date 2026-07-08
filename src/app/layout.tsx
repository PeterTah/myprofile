import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SiteHeader } from "@/components/nav/site-header";
import { profile } from "@/data/profile";
import "./globals.css";

// Must match the defaultTheme/storageKey passed to ThemeProvider below.
//
// Deliberately a raw <script> (not next/script's beforeInteractive), which
// in this project's Next.js build defers execution to an async-loaded
// runtime chunk instead of running synchronously — verified with Playwright
// by delaying chunk responses: the SSR "dark" class was still present at
// domcontentloaded. A literal inline <script> as the first element in
// <body> is parsed and executed synchronously, before any visible content
// is painted, which is what actually prevents the flash.
const themeInitScript = `
(function () {
  try {
    var storageKey = "theme";
    var stored = window.localStorage.getItem(storageKey);
    var theme = stored === "light" || stored === "dark" || stored === "system" ? stored : "dark";
    var resolved = theme === "system"
      ? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
      : theme;
    var root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(resolved);
    root.style.colorScheme = resolved;
  } catch (e) {}
})();
`;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${profile.name} — ${profile.titles[0]}`,
  description: profile.tagline,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col">
        <script
          id="theme-init"
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-background focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-foreground focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-accent-cyan"
        >
          Skip to content
        </a>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <TooltipProvider delay={150}>
            <SiteHeader />
            <main id="main-content" className="flex-1">
              {children}
            </main>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
