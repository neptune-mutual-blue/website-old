import { publicEnv } from '../environment'

export const pageview = (url) => {
  if (!publicEnv.googleAnalyticsId) {
    throw Error('GA: not configured')
  }

  return window?.gtag?.('config', publicEnv.googleAnalyticsId, {
    path_url: url
  })
}
