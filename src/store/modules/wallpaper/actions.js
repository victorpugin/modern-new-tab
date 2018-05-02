import types from './mutation_types'
import Storage from '../../../ext/storage'

export default {
  loadWallpaperFromStorage ({ commit, state }) {
    const wallpaper = Storage.get('wallpaper.info')
    if (wallpaper && wallpaper.url) {
      commit(types.WALLPAPER_SET, wallpaper)
    } else { // TODO: handle when storage is empty
      this.fetchNextWallpaper()
    }
  },

  fetchNextWallpaper ({ commit, state }) {
    chrome.runtime.sendMessage({ msg: 'fetchNextWallpaper' })
  }

}
