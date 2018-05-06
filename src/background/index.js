import trace from '../utils/trace'
import config from '../../config'

import wallpaper from './wallpaper'

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.msg === config.message.fetchNextWallpaper) wallpaper.fetchNextWallpaper(trace.generateCallId())
  }
)

// Check whether new version is installed
chrome.runtime.onInstalled.addListener(
  function (details) {
    if (details.reason === 'install') {
      console.log('This is a first install!')
      wallpaper.fetchNextWallpaper(trace.generateCallId())
    } else if (details.reason === 'update') {
      var thisVersion = chrome.runtime.getManifest().version
      console.log('Updated from ' + details.previousVersion + ' to ' + thisVersion + '!')
    }
  })
