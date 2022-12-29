const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

const { i18n } = require('./next-i18next.config')
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')
const http = require('./http')

/** @type {import('next').NextConfig} */
const nextConfig = (phase) => withBundleAnalyzer({
  reactStrictMode: true,
  i18n,
  compiler: {
    styledComponents: true
  },
  headers: async () => {
    if (phase === PHASE_DEVELOPMENT_SERVER) {
      return http.headers.development
    }

    return http.headers.production
  }
})

module.exports = nextConfig
