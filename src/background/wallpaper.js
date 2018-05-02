import storage from '../ext/storage'
import config from '../../config'
import axios from 'axios'
import unsplashCredentials from '../../config/unsplash-credentials'

export default {
  // 1. Check if a new wallpaper need to be loaded
  needUpdate () {
    console.log('needUpdate')

    const date = new Date(storage.get('lastFetchWallpaper'))
    const now = new Date()

    const diff = now - date
    if (diff > config.wallpaper.updateFrequency) return true

    console.log('needUpdate: false')
  },

  // 2. Fetch wallpaper from Unsplash
  async fetchUnsplashWallpaper () {
    console.log('fetchUnsplashWallpaper')

    const authorizationToken = 'Client-ID ' + unsplashCredentials.accessKey
    const request = axios.create({
      baseURL: config.unsplash.apiUrl,
      params: {
        featured: true,
        w: config.wallpaper.width,
        h: config.wallpaper.height,
        orientation: 'landscape'
      },
      headers: {'Authorization': authorizationToken}
    })

    const endpoint = config.unsplash.endpoint.photoRandom

    const res = await request.get(endpoint)

    const data = res.data
    if (res.status === 200 && data) return res.data

    console.log('unsplash GET ' + endpoint + ': unknown response')
  },

  // 4. Store wallpaper in local storage
  storeWallpaper (wallpaper) {
    console.log('storeWallpaper')

    wallpaper.location = wallpaper.location || {}
    wallpaper.user = wallpaper.user || {}

    storage.set('backgroundPhoto', {
      url: wallpaper.urls.custom,
      date: wallpaper.created_at,
      location: {
        name: wallpaper.location.title,
        position: wallpaper.location.position
      },
      user: {
        name: wallpaper.user.name,
        link: wallpaper.user.links.html
      }
    })
  },

  // 3. Preload wallpaper to be ready in cache
  preloadWallpaper (wallpaper) {
    console.log('preloadWallpaper')

    var img = new Image()
    // 4. on image loaded, store wallpaper
    img.addEventListener('load', this.storeWallpaper.bind(this, wallpaper))
    img.src = wallpaper.urls.custom
  },

  // onMessage listener: request.msg type 'fetchNextWallpaper'
  async fetchNextWallpaper () {
    console.log('fetchNextWallpaper')

    // 1. Avoid fetching multiple time if user open a lot of new tabs
    if (this.needUpdate() === true) {
      const now = new Date()
      storage.set('lastFetchWallpaper', now.toString())

      // 2. Fetch a wallpaper from Unsplash and get res.data
      const wallpaper = await this.fetchUnsplashWallpaper()

      // 3. Preload wallpaper to cache
      this.preloadWallpaper(wallpaper)
    }
  }
}
