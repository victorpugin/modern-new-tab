import types from './mutation_types'

export default {
  [types.PHOTO_SET] (state, photo) {
    photo = photo || {}

    state.url = photo.url
    state.date = photo.date
    state.location = photo.location
    state.user = photo.user
  }
}
