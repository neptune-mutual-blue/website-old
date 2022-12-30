import { getApi } from './get'

const getDocs = async () => {
  try {
    const { docs } = await getApi('ecosystem')
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
