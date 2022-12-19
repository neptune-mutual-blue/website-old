const connectSources = [
  process.env.NEXT_PUBLIC_FORMS_API_SERVER,
  'https://blog.neptunemutual.com',
  'https://*.clarity.ms',
  'https://www.google-analytics.com',
  'https://youtube.com/',
  process.env.API_URL_PREFIX
]
  .map((x) => (x || '').trim())
  .filter((x) => !!x)
  .join(' ')

const scriptSources = [
  'https://www.googletagmanager.com/',
  'https://www.clarity.ms/',
  'https://www.google.com/recaptcha/api.js',
  'https://www.gstatic.com/recaptcha/',
  'https://platform.twitter.com/',
  'https://gist.github.com/',
  "'sha256-JqYO2e+vKshpSJIL6vXWyHELsI/pvKIy/md6/D76vCE='",
  "'sha256-3xtbv6ivRONYxlH8P0T35lyVzSbw6bA6uFrtQf4b/4E='"

]
  .map((x) => (x || '').trim())
  .filter((x) => !!x)
  .join(' ')

module.exports = [
  {
    key: 'Content-Security-Policy',
    values: [
      `script-src 'self' ${scriptSources}`,
      `connect-src 'self' ${connectSources}`,
      "style-src 'self' 'unsafe-inline' https://github.githubassets.com/",
      'upgrade-insecure-requests',
      "frame-ancestors 'self'",
      "default-src 'self' https://www.google.com https://platform.twitter.com/ https://www.youtube.com/",
      "prefetch-src 'self'",
      "manifest-src 'self'",
      "base-uri 'none'",
      "form-action 'none'",
      "object-src 'self'",
      "img-src 'self' data: https://*.clarity.ms https://*.bing.com https://blog.neptunemutual.com",
      "font-src 'self'"
    ]
  },
  {
    key: 'X-XSS-Protection',
    values: ['1', 'mode=block']
  },
  {
    key: 'X-Frame-Options',
    values: ['DENY']
  },
  {
    key: 'Referrer-Policy',
    values: ['strict-origin']
  },
  {
    key: 'X-Content-Type-Options',
    values: ['nosniff']
  },
  {
    key: 'Strict-Transport-Security',
    values: ['max-age=31536000', 'includeSubDomains']
  },
  {
    key: 'Expect-CT',
    values: ['enforce, max-age=31536000']
  },
  {
    key: 'Feature-Policy',
    values: [
      "microphone 'none'",
      "camera 'none'",
      "fullscreen 'none'",
      "geolocation 'none'"
    ]
  },
  {
    key: 'Permissions-Policy',
    values: ['fullscreen=(), geolocation=()']
  },
  {
    key: 'X-Permitted-Cross-Domain-Policies',
    values: ['none']
  },
  {
    key: 'Access-Control-Allow-Credentials',
    values: ['false']
  },
  {
    key: 'Access-Control-Allow-Headers',
    values: ['*']
  },
  {
    key: 'Access-Control-Allow-Methods',
    values: ['GET']
  },
  {
    key: 'Access-Control-Allow-Origin',
    values: ['https://neptunemutual.com']
  },
  {
    key: 'Access-Control-Max-Age',
    values: ['600']
  }
]
