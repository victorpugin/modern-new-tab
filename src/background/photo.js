import storage from '../ext/storage'

export default {
  needUpdate () {
    console.log('needUpdate')

    var date = new Date(storage.get('lastFetchBackgroundPhoto'))
    var now = new Date()

    var diff = now - date
    if (diff > 1000 * 60) return true // every minutes

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
