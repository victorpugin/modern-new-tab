import storage from '../ext/storage'
import config from '../../config'
import axios from 'axios'
import unsplashCredentials from '../../config/unsplash-credentials'

export default {
  // 1. Check if a new photo need to be loaded
  needUpdate () {
    console.log('needUpdate')

    const date = new Date(storage.get('lastFetchBackgroundPhoto'))
    const now = new Date()

    const diff = now - date
    if (diff > config.background.updateFrequency) return true

    console.log('needUpdate: false')
  },

  // 2. Fetch photo from Unsplash
  async fetchUnsplashPhoto () {
    console.log('fetchUnsplash')

    const authorizationToken = 'Client-ID ' + unsplashCredentials.accessKey
    const request = axios.create({
      baseURL: 'https://api.unsplash.com',
      params: {
        featured: true,
        w: config.background.width,
        h: config.background.height,
        orientation: 'landscape'
      },
      headers: {'Authorization': authorizationToken}
    })

    const res = await request.get('/photos/random')

    const data = res.data
    if (res.status === 200 && data) return res.data

    console.log('unsplash GET /photos/random: unknown response')
  },

  // 3. Store photo in local storage
  storePhoto (photo) {
    console.log('storePhoto')

    photo.location = photo.location || {}
    photo.user = photo.user || {}

    storage.set('backgroundPhoto', {
      url: photo.urls.custom,
      date: photo.created_at,
      location: {
        name: photo.location.title,
        position: photo.location.position
      },
      user: {
        name: photo.user.name,
        link: photo.user.links.html
      }
    })
  },

  // 4. Preload photo to be ready in cache
  preloadPhoto (photo) {
    console.log('preloadPhoto')

    var img = new Image()
    img.onLoad = function () {
      console.log('image loaded')
    }
    img.src = photo.urls.custom
  },

  // onMessage listener: request.msg type 'fetchBackgroundPhoto'
  async fetchBackgroundPhoto () {
    console.log('fetchBackgroundPhoto')

    // 1. Avoid fetching multiple time if user open a lot of new tabs
    if (this.needUpdate() === true) {
      const now = new Date()
      storage.set('lastFetchBackgroundPhoto', now.toString())

      // 2. Fetch a photo from Unsplash and get res.data
      const photo = await this.fetchUnsplashPhoto()

      // Store the new photo
      this.storePhoto(photo)

      // Preload photo to cache
      this.preloadPhoto(photo)
    }
  }
}
