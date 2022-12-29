const imageOrigins = process.env.IMAGE_ORIGINS
  ? process.env.IMAGE_ORIGINS.split(',')
    .map((x) => x.trim())
    .filter(Boolean)
  : [
      (new URL(process.env.WEBSITE_API_ORIGIN)).origin,
      (new URL(process.env.COVER_FILE_URI_PREFIX)).origin
    ]

const env = {
  imageOrigins,
  fileUrlPrefix: process.env.FILE_URL_PREFIX,
  coverFileUrlPrefix: process.env.COVER_FILE_URI_PREFIX,
  resetFileCache: process.env.RESET_FILE_CACHE,
  websiteApiAuthToken: process.env.API_AUTH_TOKEN,
  websiteApiServer: process.env.WEBSITE_API_ORIGIN
}

module.exports = {
  env
}
