import wallpaper from './wallpaper'

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.msg === 'fetchNextWallpaper') wallpaper.fetchNextWallpaper()
  }
)
