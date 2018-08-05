const express = require('express')
const router = express.Router()
const fetch = require('node-fetch')
require('dotenv').config()


router.post('/search', (req, res, next) => {
  const { FLICKR_USER_ID, FLICKR_API_KEY } = process.env

  const baseUrl = `https://api.flickr.com/services/rest/?method=`
  const method = `flickr.photos.search`
  const text = req.body.text.replace(' ','+')
  const endUrl = `&api_key=${FLICKR_API_KEY}&text=${text}&per_page=20&sort=relevance&format=json&nojsoncallback=1`

  return fetch(
    `${baseUrl}${method}${endUrl}`,
    {
      method: 'get'
    }
  )
  .then(response => {
    if (response.ok) {
      return response.json()
    } else {
      res.status(response.status).send()
    }
  })
  .then(data => {
    console.log(data)
    res.status(200).send({
      data
    })
  })


})

module.exports = router
