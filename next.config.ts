import type { NextConfig } from "next";

// Set to test the dev server from another device on your LAN (e.g. a phone),
// since `npm run dev` binds 0.0.0.0. Not committed — export it in your shell
// or add it to `.env.local` (gitignored) if you need it.
const allowedDevOrigins = process.env.ALLOWED_DEV_ORIGIN?.split(",").map((origin) => origin.trim());

const nextConfig: NextConfig = {
  ...(allowedDevOrigins ? { allowedDevOrigins } : {}),
};

export default nextConfig;
