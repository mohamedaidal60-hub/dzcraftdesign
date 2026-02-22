import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'qjhbyrauzthtrkzafaly.supabase.co',
      },
    ],
  },
  // Désactiver l'en-tête x-powered-by pour plus de sécurité
  poweredByHeader: false,
};

export default nextConfig;
