const { get } = require('./request.js')

const resources = [
  ['blog', 'api/articles?limit=1000&depth=6'],
  ['pressroom', 'api/pressroom?limit=1000&depth=6'],
  ['ecosystems', 'api/ecosystems?limit=1000&depth=6'],
  ['pages', 'api/pages?limit=1000&depth=6'],
  ['vacancies', 'api/vacancies?limit=1000&depth=6'],
  ['audits', 'api/audits?limit=1000&depth=6'],
  ['news', 'api/news?limit=1000&depth=6'],
  ['programs', 'api/programs?limit=1000&depth=6'],
  ['videos', 'api/videos?limit=1000&depth=6']
]

const build = () => {
  const promises = []

  for (const resource of resources) {
    const [identifier, path] = resource
    const url = `${process.env.WEBSITE_API_ORIGIN}/${path}`

    promises.push(get(url, identifier))
  }

  return promises
}

const fetchFromApi = async () => {
  const result = []

  const tasks = build()
  const items = await Promise.allSettled(tasks)

  for (const item of items) {
    if (!item) {
      continue
    }

    const { value: { identifier, data } } = item
    result.push({ identifier, data })
  }

  return result
}

module.exports = { fetchFromApi }
