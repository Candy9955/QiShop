const axios = require('axios')
const path = require('path')
const express = require('express')

require('dotenv').config()

const { PORT, TOKEN } = process.env

const app = express()

app.use(express.static(path.join(__dirname, '../client/build')))

// other configuration...
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// We want to filter all the requests that are not meant for static assets.
// As all the requests for static assets will be using `GET` method,
// we can filter all non-`GET` requests.
// For `GET` requests, if request `accept`s text/html, we pick /index.html.
// Modern browsers include text/html into `accept` header when navigating.
// However API calls like `fetch()` won’t generally accept text/html.
app.use((req, res, next) => {
  const nonStatic = (req.method !== 'GET' ||
    (req.headers.accept && req.headers.accept.indexOf('text/html') === -1))

  if (nonStatic) {
    next()
  } else {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'))
  }
})

// Setting up an api route, "/api" which is capable of capturing
// the req.method and req.url from the incoming request, attaching the Authentication header,
// and making the same request to the API server,
// before capturing the response data and sending it back to the client.
app.use('/api', (req, res) => {
  // console.log('api call=', req.originalUrl, req.url)
  const { method } = req
  const url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfc${req.url}`
  const headers = { Authorization: TOKEN }
  const data = req.body

  axios({ method, url, headers, data })
    .then((result) => {
      res.send(result.data)
    })
    .catch((err) => {
      const status = (err.response && err.response.status) || 400
      const data = err.response && err.response.data
      res.status(status).send(data)
    })
})

// Setting up a wildcard route, "/*" that catches all unmatched requests
// and simply serves "index.html"
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'))
})

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}!`)
})
