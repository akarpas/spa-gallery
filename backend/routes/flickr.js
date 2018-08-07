const express = require('express')
const router = express.Router()
const fetch = require('node-fetch')
const _ = require('lodash')
const parser = require('../helpers/dataParser')

require('dotenv').config()
const { FLICKR_API_KEY } = process.env

callFlickr = (baseUrl,method,text,page) => {
  const endUrl = method.includes('photos') ?
    `&api_key=${FLICKR_API_KEY}&text=${text}&page=${page}&per_page=20&sort=relevance&format=json&nojsoncallback=1` :
    `&api_key=${FLICKR_API_KEY}&user_id=${text}&format=json&nojsoncallback=1`

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
      return response.status
    }
  })
  .then(data => {
    return data
  })
  .catch(error => {
    callFlickr(baseUrl,method,text,page)
  })
}

router.post('/search', async (req, res, next) => {

  const baseUrl = `https://api.flickr.com/services/rest/?method=`
  const photosMethod = `flickr.photos.search`
  const usersMethod = `flickr.people.getInfo`
  const text = req.body.text.replace(' ','+')
  const page = req.body.page

  const { photos } = await callFlickr(baseUrl,photosMethod,text,page)
  const photosUsernames = await Promise.all(
    _(photos.photo).map(async onePhoto => {
      const user = await callFlickr(baseUrl,usersMethod,onePhoto.owner)
      const username = user.person.username._content
      return {
        username,
        photo: onePhoto
      }
    })
  )

  const parsedResults = parser.produceLinks(photosUsernames)

  res.status(200).send({
    photos: parsedResults
  })
})

module.exports = router
