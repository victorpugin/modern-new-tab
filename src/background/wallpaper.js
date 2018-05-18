import trace from '@SrcUtils/trace'
import store from '@Store'
import config from '@Config'
import unsplashCredentials from '@Config/unsplash-credentials'
import axios from 'axios'

export default {
  // 1. Fetch wallpaper from Unsplash
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

  // 2. Preload wallpaper to be ready in cache
  preloadWallpaper (callId, wallpaper) {
    trace.log(callId, 'preloadWallpaper')

    var img = new Image()
    // 3. on image loaded, store wallpaper
    img.addEventListener(
      'load',
      this.storeWallpaper.bind(this, callId, wallpaper)
    )
    img.src = wallpaper.urls.custom
  },

  // 3. Store wallpaper in local storage
  storeWallpaper (callId, wallpaper) {
    trace.log(callId, 'storeWallpaper')

    wallpaper.location = wallpaper.location || {}
    wallpaper.user = wallpaper.user || {}

    store.dispatch('wallpaper/saveWallpaper', {
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

    // 1. Fetch a wallpaper from Unsplash and get res.data
    const wallpaper = await this.fetchUnsplashWallpaper(callId)

    // 2. Preload wallpaper to cache
    this.preloadWallpaper(callId, wallpaper)
  }
}
