
export default {
  generateCallId () {
    return Math.random().toString(36).substring(2, 6) + Math.random().toString(36).substring(2, 6)
  },

  log (callId, functionName, message) {
    var res = '[' + callId + '] ' + functionName
    if (message != null) {
      res += ': ' + message
    }
    console.log(res)
  }
}
