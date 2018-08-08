const _ = require('lodash')

exports.produceLinks = (data) => {
  return _.map(data, item => {
    const { farm, server, id, secret, title } = item.photo
    return {
      user: item.user,
      photo: {
        title,
        url: `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`
      }
    }
  })
}

