import types from './mutation_types'

export default {
  [types.WALLPAPER_SET] (state, wallpaper) {
    wallpaper = wallpaper || {}

    state.url = wallpaper.url
    state.date = wallpaper.date
    state.location = wallpaper.location
    state.user = wallpaper.user
  }
}
