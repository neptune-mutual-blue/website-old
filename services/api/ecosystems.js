import { getApi } from './get'

let docs = null

const getDocs = async () => {
  try {
    if (docs) {
      return docs
    }

    const api = await getApi('ecosystem')
    docs = api.docs

    return docs
  } catch (error) {

  }

  return []
}

const transformDoc = (doc) => {
  return {
    id: doc.id,
    type: doc.type,
    content: doc.content
  }
}

export const getEcosystems = async () => {
  try {
    const docs = await getDocs()

    const result = await docs.map((doc) => transformDoc(doc))

    return result
  } catch (error) {
    console.error(error)
  }

  return []
}
