/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    STRAPI_URL: process.env.STRAPI_URL,
    STRAPI_API_URL: process.env.STRAPI_API_URL
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
    ],
  },
  experimental: {
    typedRoutes: true,
    serverActions: true,
  },
  webpack: (config) => {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    }
    config.resolve.fallback = {
      process: require.resolve('process/browser'),
      zlib: require.resolve('browserify-zlib'),
      stream: require.resolve('stream-browserify'),
      util: require.resolve('util'),
      buffer: require.resolve('buffer'),
      asset: require.resolve('assert'),
    }
    config.externals.push({ sharp: 'commonjs sharp', canvas: 'commonjs canvas' })

    return config
  }
}

module.exports = nextConfig

