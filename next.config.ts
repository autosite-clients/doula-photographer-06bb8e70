import type { NextConfig } from 'next';

// Standalone template — no monorepo dotenv loading. The deployed site reads
// content from src/site-content.json (baked at deploy time by the Site
// Builder agent), so no DB or API env vars are required at runtime.
const nextConfig: NextConfig = {
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
