import wallpaper from './wallpaper'

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.msg === 'fetchBackgroundPhoto') wallpaper.fetchNextWallpaper()
  }
)
