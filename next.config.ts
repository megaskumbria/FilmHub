import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin('./src/shared/config/i18n/request.ts');

const nextConfig: NextConfig = {
  reactCompiler: true,
  devIndicators: {
    position: "bottom-left",
  },
  images: {
    unoptimized: true,
    remotePatterns: [
    {
      protocol: "https",
      hostname: "image.tmdb.org",
      pathname: "/t/**",
    },
    {
      protocol: "http",
      hostname: "localhost",
      port: "3001",
      pathname: "/images**",
    },
  ],
  },
  reactStrictMode: false,
  // Next 16+: cross-origin dev; typings may omit `allowedDevOrigins`.
  experimental: {
    allowedDevOrigins: ["localhost:3000", "localhost:5175"],
  } as NextConfig["experimental"],
};

export default withNextIntl(nextConfig);

