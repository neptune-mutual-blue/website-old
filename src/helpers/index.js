import { publicEnv } from '../environment'
import * as ga from './ga'
import { scrollToHash } from './hash'

const getFormattedDate = (x) => {
  // Safari doesn't like dashes
  const normalized = x.replace(/-/g, '/')

  const code = 'en'

  return new Date(normalized).toLocaleDateString(code, {
    timeZone: 'UTC',
    year: 'numeric',
    month: 'short',
    day: '2-digit'
  })
}

const copyToClipBoard = (text) => {
  if (!navigator.clipboard) {
    const textArea = document.createElement('textarea')
    textArea.value = text

    // Avoid scrolling to bottom
    textArea.style.top = '0'
    textArea.style.left = '0'
    textArea.style.position = 'fixed'

    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()

    try {
      document.execCommand('copy')
    } finally {
      document.body.removeChild(textArea)
    }
  }

  navigator?.clipboard?.writeText(text)
}

const getDns = () => new URL(publicEnv.domain).origin

const getCanonical = (router) => {
  const domain = getDns()
  const { pathname, origin } = new URL(router.asPath, domain)
  const url = new URL(pathname, origin)

  return url.href
}

// fully qualified domain name
const getFQDN = (path) => {
  const dns = getDns()
  return new URL(path, dns).href
}

const chunkArray = (arr, size) => {
  return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  )
}

export {
  chunkArray,
  copyToClipBoard,
  ga,
  getCanonical,
  getDns,
  getFormattedDate,
  getFQDN,
  scrollToHash
}
