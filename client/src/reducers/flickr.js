const INITIAL_STATE = {
  photos: [],
  photosPending: false
}

const setPhotos = (state, photos) => ({
  ...state, photos,
  photosPending: false
})

const setPendingPhotos = (state, photosPending) => ({
  ...state,
  photosPending
})

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case `PHOTOS_PENDING`:
      return setPendingPhotos(state, true)
    case `PHOTOS_SET`:
      return setPhotos(state, action.photos)
    default:
      return state
  }
}