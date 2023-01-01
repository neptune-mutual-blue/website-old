const cache = require('./cache')

const start = async () => {
  await cache.start()
}

module.exports = { start }
