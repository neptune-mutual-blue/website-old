import { helpers } from '../helpers'
import { getApi } from './get'

const getDocs = async () => {
  try {
    const { docs } = await getApi('programs')

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
    intro: doc.intro,
    category: doc.category,
    icon: doc.icon,
    content: {
      html: parsedHtml.updated,
      toc: parsedHtml.toc,
      minsToRead: parsedHtml.minsToRead
    },
    badges: JSON.parse(doc.badges || '[]'),
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

export const getPrograms = async () => {
  try {
    const docs = await getDocs()

    const result = await Promise.allSettled(docs.map(async (doc) => await transformDoc(doc)))

    return result.map(x => x.value)
  } catch (error) {
    console.error(error)
  }

  return []
}

export const getSingleProgram = async (slug) => {
  try {
    const docs = await getDocs()

    const match = docs.find(doc => doc.slug === slug)

    return transformDoc(match)
  } catch (error) {
    console.error(error)
  }

  return []
}

export const getProgramSlugs = async () => {
  try {
    const docs = await getDocs()

    const result = docs.map((doc) => doc.slug).filter(x => !!x)

    return result
  } catch (error) {
    console.error(error)
  }

  return []
}
