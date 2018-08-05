const express = require('express')

const router = express.Router()

router.use('/flickr', require('./flickr'))

module.exports = router
