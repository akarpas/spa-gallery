import apiCall from '../utils/api.js'

export const getPhotos = (dispatch, text, page) => {
  dispatch({
    type: 'PHOTOS_PENDING'
  }) 
  return apiCall('/search', text, page, 'POST').then(result => {
      const { photos } = result
      dispatch({
        type: 'PHOTOS_SET',
        photos
      })
    }).catch(err => {
      console.log(err)
    })
}