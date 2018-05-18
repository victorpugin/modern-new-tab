import mutations from './mutations'
import config from '@Config'

export default {
  namespaced: true,
  state: {
    feature: {
      bookmarksBar: false
    },
    wallpaper: {
      transitionShowDuration: config.wallpaper.transitionShowDuration
    }
  },
  mutations
}
