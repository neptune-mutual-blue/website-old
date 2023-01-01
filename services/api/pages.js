import { helpers } from '../helpers'
import { getApi } from './get'

let docs = null

const getDocs = async () => {
  try {
    if (docs) {
      return docs
    }

    const api = await getApi('pages')
    docs = api.docs

    return docs
  } catch (error) {

  }

  return []
}

const transformDoc = async (doc) => {
  const htmlContent = doc.contentHtml || ''
  const parsedHtml = await helpers.parseHtml(htmlContent)

  return {
    id: doc.id,
    title: doc.title,
    slug: doc.slug,
    sort: doc.sort,
    category: doc.category,
    content: {
      html: parsedHtml.updated,
      toc: parsedHtml.toc,
      minsToRead: parsedHtml.minsToRead
    },
    meta: {
      title: doc.meta?.title || '',
      description: doc.meta?.description || '',
      image: {
        src: await helpers.storeOgImage(doc?.meta?.image?.filename),
        alt: helpers.getOgImageAlt(doc?.meta?.image?.alt)
      }
    }
  }
}

export const getPages = async () => {
  try {
    const docs = await getDocs()

    const result = await Promise.allSettled(docs.map(async (doc) => await transformDoc(doc)))

    return result
      .sort((a, b) => a.value.sort - b.value.sort)
      .map(x => x.value).map(x => {
        return {
          slug: x.slug,
          title: x.title,
          sort: x.sort,
          id: x.id
        }
      })
  } catch (error) {
    console.error(error)
  }

  return []
}

export const getSinglePage = async (slug) => {
  try {
    const docs = await getDocs()

    const match = docs.find(doc => doc.slug === slug)

    return transformDoc(match)
  } catch (error) {
    console.error(error)
  }

  return []
}

export const getPageSlugs = async () => {
  try {
    const docs = await getDocs()

    const result = docs.map((doc) => doc.slug).filter(x => !!x)

    return result
  } catch (error) {
    console.error(error)
  }

  return []
}
