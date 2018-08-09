const axios = require('axios')

require('dotenv').config()

const { FLICKR_API_KEY } = process.env

const call = (baseUrl,method,input,page) => {
  const endUrl = method.includes('photos') ?
  `&api_key=${FLICKR_API_KEY}&text=${input}&page=${page}&per_page=20&sort=relevance&format=json&nojsoncallback=1` :
  `&api_key=${FLICKR_API_KEY}&user_id=${input}&format=json&nojsoncallback=1`

  return axios.get(
    `${baseUrl}${method}${endUrl}`,
    {
      method: 'get'
    }
  )
  .then(({ data }) => {
    if (data.stat === 'fail') {
      return { error: data.message }
    }
    return { data }
  })
  .catch(error => {
    return { error }
  })
}

module.exports = { call }