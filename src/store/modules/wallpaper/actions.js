import types from './mutation_types'
import config from '../../../../config'
import Storage from '../../../ext/storage'

export default {
  loadWallpaperFromStorage ({ dispatch, commit }) { // DEPRECATED
    const wallpaper = Storage.get(config.storage.wallpaper.info)
    if (wallpaper && wallpaper.url) {
      commit(types.WALLPAPER_SET, wallpaper)
    } else {
      dispatch('fetchNextWallpaper')
    }
  },

  fetchNextWallpaper ({ commit, state }) {
    chrome.runtime.sendMessage({ msg: config.message.fetchNextWallpaper })
  }

}
