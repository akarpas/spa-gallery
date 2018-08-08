const express = require('express')
const router = express.Router()
const fetch = require('node-fetch')
const _ = require('lodash')
const parser = require('../helpers/dataParser')
const asyncWrapper = require('../utils/asyncWrapper')

require('dotenv').config()

const { FLICKR_API_KEY } = process.env

callFlickr = (baseUrl,method,input,page) => {
  const endUrl = method.includes('photos') ?
  `&api_key=${FLICKR_API_KEY}&text=${input}&page=${page}&per_page=20&sort=relevance&format=json&nojsoncallback=1` :
  `&api_key=${FLICKR_API_KEY}&user_id=${input}&format=json&nojsoncallback=1`

  return fetch(
    `${baseUrl}${method}${endUrl}`,
    {
      method: 'get'
    }
  )
  .then((response) => {
    if (response.size != 0) {
      return response.json()
    }
    return Promise.reject(new Error())
  })
  .then(data => {
    return Promise.resolve(data)
  })
}

router.post('/search', async (req, res) => {

  const baseUrl = `https://api.flickr.com/services/rest/?method=`
  const photosMethod = `flickr.photos.search`
  const usersMethod = `flickr.people.getInfo`
  const text = req.body.text.replace(' ','+')
  const page = req.body.page

  const photosRequest = await asyncWrapper(callFlickr(baseUrl,photosMethod,text,page))
  if (photosRequest.error) {
    return res.status(400).send({
      status: 400,
      message: 'Error with fetching photos from flickr '
    })
  }

  const { photos } = photosRequest.data
  const photosUsernames = await Promise.all(
    _(photos.photo).map(async onePhoto => {
      const userRequest = await asyncWrapper(callFlickr(baseUrl,usersMethod,onePhoto.owner))

      if (userRequest.error) {
        return res.status(400).send({
          status: 400,
          message: 'Error with fetching photos from flickr '
        })
      }
      
      const { person } = userRequest.data

      const username = person.username._content
      const realName = person.realname ? person.realname._content : ''
      const profileUrl = person.profileurl ? person.profileurl._content : ''

      return {
        user: {
          username,
          realName,
          profileUrl
        },
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
