const express = require('express')
const router = express.Router()
const flickr = require('../utils/flickrApi')
const _ = require('lodash')
const parser = require('../helpers/dataParser')

router.post('/search', async (req, res) => {

  const baseUrl = `https://api.flickr.com/services/rest/?method=`
  const photosMethod = `flickr.photos.search`
  const usersMethod = `flickr.people.getInfo`
  const text = req.body.text.replace(' ','+')
  const page = req.body.page

  const photosRequest = await flickr.call(baseUrl,photosMethod,text,page)

  if (photosRequest.error) {
    return res.status(400).send({
      status: 400,
      message: 'Error with fetching photos from flickr '
    })
  }

  const { photos } = photosRequest.data
  const photosUsernames = await Promise.all(
    _(photos.photo).map(async onePhoto => {
      const userRequest = await flickr.call(baseUrl,usersMethod,onePhoto.owner)

      if (userRequest.error) {
        return res.status(400).send({
          status: 400,
          message: 'Error with fetching users from flickr '
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
