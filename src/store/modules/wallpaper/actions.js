import config from '@Config'
import types from './mutation_types'
import utils from './utils'

export default {

  fetchNextWallpaper ({ commit, state }) {
    if (utils.isTimeToFetch(state.isFetching, state.fetchTime)) {
      commit(types.IS_FETCHING_SET, true)
      chrome.runtime.sendMessage({
        msg: config.message.fetchNextWallpaper
      })
    }
  },

  saveWallpaper ({ commit, state }, wallpaper) {
    commit(types.WALLPAPER_SET, wallpaper)
    commit(types.IS_FETCHING_SET, false)
  }

}
