import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin('./src/shared/config/i18n/request.ts');

const nextConfig: NextConfig = {
  reactCompiler: true,
  devIndicators: {
    position: "bottom-left",
  },
  images: {
  localPatterns: [
    {
      pathname: "/api/image",
    },
    {
      pathname: "/images/**",
    },
  ],
  remotePatterns: [
    {
      protocol: "https",
      hostname: "image.tmdb.org",
      pathname: "/t/**",
    },
  ],
},
  reactStrictMode: false,
}

export default withNextIntl(nextConfig);

