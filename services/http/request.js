const https = require('https')

const get = (url, headers = {}) => {
  const urlObj = new URL(url)

  return new Promise(function (resolve, reject) {
    const options = {
      method: 'GET',
      hostname: urlObj.hostname,
      path: urlObj.pathname + urlObj.search,
      headers: {
        ...headers
      },
      maxRedirects: 20
    }

    const req = https.request(options, function (res) {
      // reject on bad status
      if (res.statusCode < 200 || res.statusCode >= 300) {
        return reject(new Error('statusCode=' + res.statusCode))
      }

      // cumulate data
      const chunks = []

      res.on('data', (chunk) => {
        chunks.push(chunk)
      })

      res.on('end', () => {
        const body = Buffer.concat(chunks)
        resolve(body.toString())
      })

      res.on('error', (error) => {
        console.error(error)
      })
    })

    // reject on request error
    req.on('error', function (err) {
      // This is not a "Second reject", just a different sort of failure
      reject(err)
    })

    // important: end the request
    req.end()
  })
}

export const request = {
  get
}
