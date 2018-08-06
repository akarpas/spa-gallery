const _ = require('lodash')

exports.produceLinks = (data) => {
  return _.map(data, item => {
    const { farm, server, id, secret } = item.photo
    return {
      username: item.username,
      url: `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`
    }
  })
}

