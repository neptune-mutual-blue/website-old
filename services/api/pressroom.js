import {
  colors,
  primaryColorKey
} from '../../styles/colors'
import { env } from '../environment'
import { helpers } from '../helpers'
import { storeLocally } from '../io/download'
import { getApi } from './get'

const POSTS_PER_PAGE = 4
let docs = null

const getDocs = async () => {
  try {
    if (docs) {
      return docs
    }

    const api = await getApi('pressroom')
    docs = api.docs

    return docs
  } catch (error) {

  }

  return []
}

const getValidColorKey = (colorKey) => {
  return Object.keys(colors).filter(x => x !== 'white' && x !== 'black').includes(colorKey) ? colorKey : primaryColorKey
}

// For article cards
const getMetaData = async (docs) => {
  try {
    const result = await Promise.allSettled(docs.map(async (doc) => {
      return {
        id: doc.id,
        title: doc.title,
        // featured: doc.featured,
        image: await storeLocally(`${env.coverFileUrlPrefix}${doc.cover.filename}`, 'images'),
        alt: doc.cover.alt || '',
        slug: doc.slug,
        intro: doc.intro.replace('&hellip;', ''),
        date: doc.publishedAt || doc.updatedAt || doc.createdAt,
        tags: doc.tags.map((tag) => ({ name: tag.name, slug: tag.slug, color: getValidColorKey(tag.color) }))
      }
    }))

    return result.map(x => x.value)
  } catch (error) {
    console.error(error)
  }

  return []
}

const getTagSlugs = async () => {
  try {
    const docs = await getDocs()

    const allTags = docs.map((doc) => doc.tags || []).flat()
    const uniqueTags = [...new Map(allTags.map((item) => [item.id, item])).values()]

    return uniqueTags
  } catch (error) {
    console.error(error)
  }

  return []
}

export const getAllPosts = async () => {
  try {
    const docs = await getDocs()

    const result = await getMetaData(docs)

    return result.sort((a, b) => {
      return (new Date(a.date) < new Date(b.date) ? 1 : new Date(a.date) > new Date(b.date) ? -1 : 0)
    })
  } catch (error) {
    console.error(error)
  }

  return []
}

export const getRelatedPosts = async (tags, postSlug) => {
  const docs = await getDocs()

  const relatedDocs = docs.filter(doc => {
    return (doc.tags || []).map(tag => tag.slug).includes(tags[0]?.slug || '')
  }).filter(doc => doc.slug !== postSlug).slice(0, 3)

  return getMetaData(relatedDocs)
}

export const getSinglePost = async (slug) => {
  try {
    const docs = await getDocs()

    const match = docs.find(doc => doc.slug === slug)

    const htmlContent = match.contentHtml || match.html || ''
    const parsedHtml = await helpers.parseHtml(htmlContent)

    return {
      id: match.id,
      title: match.title,
      // featured: match.featured,
      image: await storeLocally(`${env.coverFileUrlPrefix}${match.cover.filename}`, 'images'),
      slug: match.slug,
      intro: match.intro.replace('&hellip;', ''),
      date: match.publishedAt || match.updatedAt || match.createdAt,
      tags: match.tags.map((tag) => ({ name: tag.name, slug: tag.slug, color: getValidColorKey(tag.color) })),
      meta: {
        title: match?.meta?.title || match.title || '',
        description: match?.meta?.description || match.intro.replace('&hellip;', '') || '',
        image: {
          src: await helpers.storeOgImage(match?.meta?.image?.filename || match.cover.filename),
          alt: helpers.getOgImageAlt(match?.meta?.image?.alt)
        }
      },
      content: {
        html: parsedHtml.updated,
        toc: parsedHtml.toc,
        minsToRead: parsedHtml.minsToRead
      }
    }
  } catch (error) {
    console.error(error)
  }

  return []
}

export const getPostsSlugs = async () => {
  try {
    const docs = await getDocs()

    const result = docs.map((doc) => doc.slug).filter(x => !!x)

    return result
  } catch (error) {
    console.error(error)
  }

  return []
}

export const getTagsData = async () => {
  const tagSlugs = await getTagSlugs()

  const result = []

  for (let i = 0; i < tagSlugs.length; i++) {
    const tagSlug = tagSlugs[i].slug
    const tagName = tagSlugs[i].name
    const firstPageData = await getPaginatedData(tagSlug, 0)

    result.push({
      slug: tagSlug,
      name: tagName,
      totalPages: firstPageData.totalPages,
      totalPosts: firstPageData.totalPosts
    })
  }

  return result
}

export const getTagDataBySlug = async (tagSlug) => {
  const data = await getTagsData()

  return data.find(x => x.slug === tagSlug)
}

// When tag slug is empty return all posts
export const getPaginatedData = async (tagSlug, pageIndex) => {
  const allPosts = await getDocs()

  let postsByTag = allPosts

  if (tagSlug) {
    postsByTag = allPosts.filter(post => {
      const matchedTag = post.tags.find(tag => tag.slug === tagSlug)
      return matchedTag
    })
  }

  pageIndex = pageIndex || 0

  const total = postsByTag.length

  const sliced = postsByTag.slice(pageIndex * POSTS_PER_PAGE, (pageIndex + 1) * POSTS_PER_PAGE)

  return {
    posts: await getMetaData(sliced),
    totalPosts: total,
    totalPages: Math.ceil(total / POSTS_PER_PAGE)
  }
}
