import photo from './photo'

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.msg === 'fetchBackgroundPhoto') photo.fetchBackgroundPhoto()
  }
)
