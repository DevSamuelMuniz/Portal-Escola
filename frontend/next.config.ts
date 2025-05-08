import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "vault.pulsarimagens.com.br",
      "s2-g1.glbimg.com",
      "assets.brasildefato.com.br",
    ],

    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn-icons-png.flaticon.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
