import { colors, primaryColorKey } from '../../styles/colors'
import { helpers } from '../helpers'
import { storeLocally } from '../io/download'
import { request } from '../http/request'
import { mockData } from '../_mock_'
import { getApiHeaders } from './config'

const POSTS_PER_PAGE = 12

let docs = null

const getDocs = async () => {
  if (docs) {
    return docs
  }

  console.log('fetching all articles')

  if (process.env.PROD === 'true') {
    const dataStr = await request.get(`${process.env.API_URL_PREFIX}articles?limit=1000`, getApiHeaders())
    const data = JSON.parse(dataStr)
    docs = data.docs
    return docs
  }

  docs = mockData.articles.docs
  return docs
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
        featured: doc.featured,
        image: await storeLocally(`${process.env.COVER_FILE_URI_PREFIX}${doc.cover.filename}`, 'images'),
        slug: doc.slug,
        intro: doc.intro.replace('&hellip;', ''),
        date: doc.updatedAt || doc.createdAt,
        tags: doc.tags.map((tag) => ({ name: tag.name, slug: tag.slug, color: getValidColorKey(tag.color) }))
      }
    }))

    return result.map(x => x.value)
  } catch (error) {
    console.error(error)
  }

  return []
}

export const getLatestBlogPosts = async () => {
  try {
    const docs = await getDocs()

    const result = await getMetaData(docs)
    const latestPosts = result.sort((a, b) => {
      return (new Date(a.date) < new Date(b.date) ? 1 : new Date(a.date) > new Date(b.date) ? -1 : 0)
    }).slice(0, 10)

    return latestPosts
  } catch (error) {
    console.error(error)
  }

  return []
}

export const getAllBlogPosts = async () => {
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

export const getRelatedBlogPosts = async (tags, postSlug) => {
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
      featured: match.featured,
      image: await storeLocally(`${process.env.COVER_FILE_URI_PREFIX}${match.cover.filename}`, 'images'),
      slug: match.slug,
      intro: match.intro.replace('&hellip;', ''),
      date: match.updatedAt || match.createdAt,
      tags: match.tags.map((tag) => ({ name: tag.name, slug: tag.slug, color: getValidColorKey(tag.color) })),
      meta: {
        title: match.meta.title,
        description: match.meta.description,
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

export const getBlogPostTagSlugs = async () => {
  try {
    const docs = await getDocs()

    const slugs = []

    docs.map((doc) => doc.tags || []).forEach(tags => {
      tags.forEach(tag => {
        slugs.push(tag.slug)
      })
    })

    return [...(new Set(slugs))]
  } catch (error) {
    console.error(error)
  }

  return []
}

export const getBlogPostTagsData = async () => {
  const tagSlugs = await getBlogPostTagSlugs()

  const result = []

  for (let i = 0; i < tagSlugs.length; i++) {
    const tagSlug = tagSlugs[i]
    const firstPageData = await getBlogPaginatedData(tagSlug, 0)

    result.push({
      slug: tagSlug,
      totalPages: firstPageData.totalPages,
      totalPosts: firstPageData.totalPosts
    })
  }

  return result
}

export const getBlogPaginatedData = async (tagSlug, pageIndex) => {
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

export const getFeaturedPosts = async () => {
  const docs = await getDocs()
  const featuredDocs = docs.filter(x => x.featured)

  const sliced = featuredDocs.slice(0, 3)
  const result = await getMetaData(sliced)
  return result
}
