import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin('./src/shared/config/i18n/request.ts');

const nextConfig: NextConfig = {
  reactCompiler: true,
  devIndicators: {
    position: "bottom-left",
  },
}

export default withNextIntl(nextConfig);

