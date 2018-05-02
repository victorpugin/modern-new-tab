
var updateBackgroundFrequency = 1000 * 30

if (process.env.NODE_ENV === 'development') {
  updateBackgroundFrequency = 1000 * 2
}

const config = {
  wallpaper: {
    updateFrequency: updateBackgroundFrequency, // fetch frequency of photos
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
  }
}

// Export configuration
module.exports = config
