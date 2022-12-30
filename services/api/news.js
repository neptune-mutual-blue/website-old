import { env } from '../environment'
import { storeLocally } from '../io/download'
import { getApi } from './get'

const getDocs = async () => {
  try {
    const { docs } = await getApi('news')

    return docs
  } catch (error) {

  }

  return []
}

const transformDoc = async (doc) => {
  return {
    id: doc.id,
    title: doc.title,
    link: doc.link,
    image: await storeLocally(`${env.coverFileUrlPrefix}${doc.cover.filename}`, 'images'),
    alt: doc.cover.alt || '',
    press: {
      name: doc.press.name,
      badge: doc.press.badge
    },
    date: doc.publishedAt || doc.updatedAt || doc.createdAt
  }
}

export const getNews = async () => {
  try {
    const docs = await getDocs()

    const result = await Promise.allSettled(docs.map(async (doc) => transformDoc(doc)))

    const allVideos = result.map(x => x.value)
    const latestVideos = allVideos.sort((a, b) => {
      return (new Date(a.date) < new Date(b.date) ? 1 : new Date(a.date) > new Date(b.date) ? -1 : 0)
    })

    return latestVideos
  } catch (error) {
    console.error(error)
  }

  return []
}
