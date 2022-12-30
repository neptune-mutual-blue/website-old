const http = require('http')
const https = require('https')

const { getApiHeaders } = require('./headers')

const raw = (url, identifier, headers = getApiHeaders()) => {
  const urlObj = new URL(url)
  console.log('Requesting: %s', identifier)

  const httpCore = urlObj.protocol === 'http:' ? http : https

  return new Promise(function (resolve, reject) {
    const options = {
      method: 'GET',
      port: urlObj.port,
      hostname: urlObj.hostname,
      path: urlObj.pathname + urlObj.search,
      headers: {
        ...headers
      },
      maxRedirects: 20
    }

    const req = httpCore.request(options, function (res) {
      // reject on bad status
      if (res.statusCode < 200 || res.statusCode >= 300) {
        console.log('Failed: %s', identifier)
        return reject(new Error('statusCode=' + res.statusCode))
      }

      // cumulate data
      const chunks = []

      res.on('data', (chunk) => {
        chunks.push(chunk)
      })

      res.on('end', () => {
        try {
          const body = Buffer.concat(chunks)
          const string = body.toString()

          console.log('Success: %s', identifier)
          resolve({ url, identifier, string })
        } catch (error) {
          console.log('Failed: %s', identifier)
          reject(error)
        }
      })

      res.on('error', (error) => {
        console.error(error)
      })
    })

    req.on('error', function (err) {
      console.log('Failed: %s', identifier)
      reject(err)
    })

    // important: end the request
    req.end()
  })
}

const get = async (url, identifier, headers = getApiHeaders()) => {
  const { string } = await raw(url, identifier, headers)

  const data = JSON.parse(string)

  return { url, identifier, data }
}

module.exports = { get, raw }
