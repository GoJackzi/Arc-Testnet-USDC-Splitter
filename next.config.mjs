/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    esmExternals: 'loose',
  },
  turbopack: {
    resolveAlias: {
      fs: false,
      net: false,
      tls: false,
    },
  },
}

export default nextConfig
