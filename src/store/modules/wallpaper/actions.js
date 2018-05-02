import types from './mutation_types'
import Storage from '../../../ext/storage'

export default {
  loadWallpaperFromStorage ({ dispatch, commit }) {
    const wallpaper = Storage.get('wallpaper.info')
    if (wallpaper && wallpaper.url) {
      commit(types.WALLPAPER_SET, wallpaper)
    } else { // TODO: handle when storage is empty
      dispatch('fetchNextWallpaper')
    }
  },

  fetchNextWallpaper ({ commit, state }) {
    chrome.runtime.sendMessage({ msg: 'fetchNextWallpaper' })
  }

}
