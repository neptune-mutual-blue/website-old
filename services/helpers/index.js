import { load as cheerioLoad } from 'cheerio'
import { storeLocally } from '../io/download'
import { storeOgImage, getOgImageAlt } from './meta'

const getSlug = (title) => {
  return title.toLowerCase().replace(/ /g, '-').replace(/[-]+/g, '-').replace(/[^\w-]+/g, '')
}

const parseLegacyHtml = async ($) => {
  const promises = []
  $('img').each(function () {
    const oldSrc = $(this).attr('src')

    if (
      !oldSrc.startsWith('https://blog.neptunemutual.com') &&
      !oldSrc.startsWith('https://content.neptunedefi.com') &&
      !oldSrc.startsWith('https://example.com')
    ) {
      console.log('Skipped: ' + oldSrc)
      return
    }

    const filename = (new URL(oldSrc)).pathname.split('/').pop()

    // Guessing filepath in advance
    const storedAt = `/cdn/images/${filename}`

    const newSrc = storedAt
    $(this).attr('src', newSrc)
    $(this).removeAttr('srcset')
    $(this).removeAttr('width')
    $(this).removeAttr('height')

    promises.push(storeLocally(`${process.env.FILE_URL_PREFIX}${filename}`, 'images'))
  })

  await Promise.allSettled(promises)

  return $
}

const getTableOfContents = async ($) => {
  const selector = 'h2, h3, h4, h5, h6'
  const headerElements = $(selector)

  const h = []

  headerElements.each(function () {
    const el = this
    const elName = el.tagName

    const elText = $(el).text().replace(/^(\s)+|(\s)+$/g, '')
    // .replace(/^(\d+\.\s)/g, '') to remove preceeding numbers

    const elId = $(el).attr('id') || ''

    if (elName === 'h2') {
      h.push({ text: elText, id: elId, type: 2 })
    }

    if (elName === 'h3') {
      h.push({ text: elText, id: elId, type: 3 })
    }

    if (elName === 'h4') {
      h.push({ text: elText, id: elId, type: 4 })
    }

    if (elName === 'h5') {
      h.push({ text: elText, id: elId, type: 5 })
    }

    if (elName === 'h6') {
      h.push({ text: elText, id: elId, type: 6 })
    }
  })

  return h
}

const convertTwitterAnchorsToEmbeds = ($ = cheerioLoad('', null, false)) => {
  $('a').each(function () {
    // Anchor href should match inner text
    if ($(this).attr('href').trim() !== $(this).text().trim()) {
      return
    }

    const match = $(this).attr('href').match(/^https?:\/\/twitter\.com\/(?:#!\/)?(\w+)\/status(es)?\/(\d+)$/)

    // Anchor href should match twitter status url regex
    if (!match) {
      return
    }

    $(this).replaceWith(
      $(`<blockquote class="twitter-tweet">
      <a href="${$(this).text().trim()}"></a>
      </blockquote>
      <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>`
      ))
  })

  return $
}

const addHeadingAnchors = ($ = cheerioLoad('', null, false)) => {
  $('h2, h3, h4, h5, h6').each(function () {
    // Removes anything inside `heading` tags. Replace children with trimmed text
    $(this).text($(this).text().trim())

    // Append anchor inside `heading` tags
    $(this).append(`<a aria-label="Direct link to heading" class="heading-anchor" href="#${$(this).attr('id')}">#</a>`)
  })

  return $
}

const getMinsToRead = (text) => {
  try {
    const wpm = 225

    const words = text.trim().split(/\s+/).length

    return Math.ceil(words / wpm)
  } catch (error) {

  }

  return 0
}

const parseHtml = async (html) => {
  let $ = cheerioLoad(html, null, false)

  const toc = await getTableOfContents($)
  $ = await parseLegacyHtml($)
  $ = convertTwitterAnchorsToEmbeds($)
  $ = addHeadingAnchors($)
  const text = $.text().trim()
  const minsToRead = getMinsToRead(text)

  return { toc, updated: $.html(), minsToRead, text }
}

export const helpers = {
  getSlug,
  parseHtml,
  getOgImageAlt,
  storeOgImage
}
