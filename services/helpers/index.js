import { load as cheerioLoad } from 'cheerio'

import { env } from '../environment'
import { request } from '../http/request'
import { storeLocally } from '../io/download'
import {
  getOgImageAlt,
  storeOgImage
} from './meta'
import { getSlug } from './slug'

const parseLegacyHtml = async ($) => {
  const promises = []
  $('img').each(function () {
    const oldSrc = $(this).attr('src')

    const imageOrigins = env.imageOrigins

    let originMatched = false

    imageOrigins.forEach(origin => {
      if (oldSrc.startsWith(origin)) {
        originMatched = true
      }
    })

    if (!originMatched) {
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

    promises.push(storeLocally(`${env.fileUrlPrefix}${filename}`, 'images'))
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

    // Removes extra whitespaces
    // ` a bb     ccc dddd  ` => `a bb ccc dddd`
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

const parseEmbeds = async ($ = cheerioLoad('', null, false)) => {
  for (const elem of $('a[data-embed-type]')) {
    try {
      const embedType = $(elem).attr('data-embed-type')
      const oEmbed = $(elem).attr('data-oembed')

      if (embedType === 'twitter') {
        const dataStr = await request.get(oEmbed)
        const data = JSON.parse(dataStr)

        $(elem).replaceWith(data.html)
      }
    } catch (err) {
      // do something with `err`
      console.log('Failed: ', $(elem).attr('data-embed-type'))
      console.log(err)
    }
  }

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
  $ = await parseEmbeds($)
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
