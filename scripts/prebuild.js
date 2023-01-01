const path = require('path')
const { env } = require('../services/environment')
const builder = require('../services/builder')
const io = require('../services/io')
const req = require('../services/builder/fetch/request')

const download = async (url, dest) => {
  try {
    const { string } = await req.raw(url, dest)
    await io.saveToDiskRaw(dest, string)
  } catch {
    console.error('Cant download %s', url)
  }
}

const updateXmlFiles = async () => {
  const urlPrefix = env.websiteApiServer

  if (!urlPrefix || !urlPrefix.trim()) {
    return
  }

  // pathToStore is relative - DO NOT START WITH `/`
  const files = [
    {
      url: `${urlPrefix}/sitemap.xml`,
      pathToStore: './sitemap.xml'
    },
    {
      url: `${urlPrefix}/blog/atom.xml`,
      pathToStore: './blog/atom.xml'
    },
    {
      url: `${urlPrefix}/blog/rss.xml`,
      pathToStore: './blog/rss.xml'
    },
    {
      url: `${urlPrefix}/pressroom/atom.xml`,
      pathToStore: './pressroom/atom.xml'
    },
    {
      url: `${urlPrefix}/pressroom/rss.xml`,
      pathToStore: './pressroom/rss.xml'
    }
  ]

  const promises = []

  for (let idx = 0; idx < files.length; idx++) {
    const item = files[idx]

    const parent = path.resolve('public')
    const storedAt = path.resolve(parent, item.pathToStore)

    promises.push(download(item.url, storedAt))
  }

  await Promise.allSettled(promises)
}

const resetCDNCache = async () => {
  if (env.resetFileCache !== 'true') {
    return
  }

  console.log('Updating CDN cache')
  const localCacheFolder = path.resolve('public', 'cdn')

  await io.emptyDirectory(localCacheFolder)
  console.log('Updated CDN cache')
}

const main = async () => {
  const promises = [
    builder.start(),
    updateXmlFiles(),
    resetCDNCache()
  ]

  await Promise.allSettled(promises)

  console.log('All done')

  process.exit()
}

main()
