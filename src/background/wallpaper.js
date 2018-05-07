import trace from '../utils/trace'
import storage from '../ext/storage'
import store from '../store'
import config from '../../config'
import axios from 'axios'
import unsplashCredentials from '../../config/unsplash-credentials'

export default {
  // 1. Check if a new wallpaper need to be loaded
  needUpdate (callId) {
    trace.log(callId, 'needUpdate')

    const date = new Date(storage.get(config.storage.wallpaper.lastFetch))
    const now = new Date()

    const diff = now - date
    if (diff > config.wallpaper.updateFrequency) return true

    trace.log(callId, 'needUpdate', 'false')
  },

  // 2. Fetch wallpaper from Unsplash
  async fetchUnsplashWallpaper (callId) {
    trace.log(callId, 'fetchUnsplashWallpaper')

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

    trace.log(callId, 'fetchUnsplashWallpaper', 'unsplash GET ' + endpoint + ': unknown response')
  },

  // 3. Preload wallpaper to be ready in cache
  preloadWallpaper (callId, wallpaper) {
    trace.log(callId, 'preloadWallpaper')

    var img = new Image()
    // 4. on image loaded, store wallpaper
    img.addEventListener('load', this.storeWallpaper.bind(this, callId, wallpaper))
    img.src = wallpaper.urls.custom
  },

  // 4. Store wallpaper in local storage
  storeWallpaper (callId, wallpaper) {
    trace.log(callId, 'storeWallpaper')

    wallpaper.location = wallpaper.location || {}
    wallpaper.user = wallpaper.user || {}

    store.commit('wallpaper/WALLPAPER_SET', {
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

  // onMessage listener: request.msg type 'fetchNextWallpaper'
  async fetchNextWallpaper (callId) {
    trace.log(callId, 'fetchNextWallpaper')

    // 1. Avoid fetching multiple time if user open a lot of new tabs
    if (this.needUpdate(callId) === true) {
      const now = new Date()
      storage.set(config.storage.wallpaper.lastFetch, now.toString())

      // 2. Fetch a wallpaper from Unsplash and get res.data
      const wallpaper = await this.fetchUnsplashWallpaper(callId)

      // 3. Preload wallpaper to cache
      this.preloadWallpaper(callId, wallpaper)
    }
  }
}
