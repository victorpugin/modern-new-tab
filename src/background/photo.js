import storage from '../ext/storage'
import config from '../../config'

export default {
  needUpdate () {
    console.log('needUpdate')

    var date = new Date(storage.get('lastFetchBackgroundPhoto'))
    var now = new Date()

    var diff = now - date
    if (diff > config.updateBackgroundFrequency) return true

    console.log('needUpdate: false')
  },

  fetchUnsplash () {
    console.log('fetchUnsplash')
  },

  fetchBackgroundPhoto () {
    console.log('fetchBackgroundPhoto')

    // Avoid fetching multiple time if user open a lot of new tabs
    if (this.needUpdate() === true) {
      var now = new Date()
      storage.set('lastFetchBackgroundPhoto', now.toString())

      this.fetchUnsplash()
    }
  }
}
