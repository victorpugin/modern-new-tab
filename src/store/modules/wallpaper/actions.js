import config from '../../../../config'

export default {

  fetchNextWallpaper ({ commit, state }) {
    chrome.runtime.sendMessage({ msg: config.message.fetchNextWallpaper })
  }

}
