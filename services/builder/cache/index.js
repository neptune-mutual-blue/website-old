const path = require('path')

const io = require('../../io')
const { fetchFromApi } = require('../fetch')
const { cleanup } = require('./cleanup')
const { config } = require('./config')

const start = async () => {
  try {
    // First fetch data from the API server
    const result = await fetchFromApi()

    // Build filesystem cache
    console.log('Building filesystem cache')
    await cleanup()

    for (const item of result) {
      if (!item) {
        continue
      }

      const { identifier, data } = item
      const file = path.join(config.root, `${identifier}.json`)

      await io.saveToDisk(file, data)
    }

    console.log('Filesystem cache is now built')
  } catch {
    console.error('Warning: could not reach the API server. Using outdated cache now.')
  }
}

module.exports = { start }
