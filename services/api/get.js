import path from 'path'

import * as io from '../io'
import { config } from './config'

const getApi = async (type) => {
  if (!config.allowed.includes(type)) {
    throw new Error(`Invalid type ${type}`)
  }

  try {
    const file = path.join(config.root, `${type}.json`)
    const contents = await io.readFile(file)
    const result = JSON.parse(contents)

    return result
  } catch (error) {
    console.error(error)
  }
}

export { getApi }
