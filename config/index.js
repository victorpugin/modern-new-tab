
var updateWallpaperFrequency = 1000 * 30

if (process.env.NODE_ENV === 'development') {
  updateWallpaperFrequency = 1000 * 20
}

const config = {
  wallpaper: {
    updateFrequency: updateWallpaperFrequency, // fetch frequency of photos
    fetchTimeout: 1000 * 15,
    width: 1920,
    height: 1080
  },
  unsplash: {
    url: 'https://unsplash.com/',
    apiUrl: 'https://api.unsplash.com',
    utm: '?utm_source=modern_new_tab&utm_medium=referral', // change with your app name
    endpoint: {
      photoRandom: '/photos/random'
    }
  },
  message: {
    fetchNextWallpaper: 'fetchNextWallpaper'
  }
}

// Export configuration
module.exports = config
