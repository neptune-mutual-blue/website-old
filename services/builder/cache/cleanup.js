const io = require('../../io')
const { config } = require('./config')

const cleanup = async () => {
  console.info('Cleaning up outdated cache')
  await io.emptyDirectory(config.root)
}

module.exports = { cleanup }
