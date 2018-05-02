import wallpaper from './wallpaper'

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.msg === 'fetchNextWallpaper') wallpaper.fetchNextWallpaper()
  }
)

// Check whether new version is installed
chrome.runtime.onInstalled.addListener(
  function (details) {
    if (details.reason === 'install') {
      console.log('This is a first install!')
      wallpaper.fetchNextWallpaper()
    } else if (details.reason === 'update') {
      var thisVersion = chrome.runtime.getManifest().version
      console.log('Updated from ' + details.previousVersion + ' to ' + thisVersion + '!')
    }
  })
