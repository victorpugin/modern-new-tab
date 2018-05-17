import types from './mutation_types'

export default {
  [types.WALLPAPER_SET] (state, wallpaper) {
    wallpaper = wallpaper || {}

    if (wallpaper.url == null) return

    state.info = wallpaper
    state.info.user = state.info.user || {name: 'Unknown'}
  },

  [types.IS_FETCHING_SET] (state, isFetching) {
    if (typeof (isFetching) === typeof (true)) {
      state.isFetching = isFetching
      state.fetchTime = new Date()
    }
  }
}
