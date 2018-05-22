import config from '@Config'

export default {
  diffDate (time) {
    return new Date() - new Date(time)
  },

  isTimeToFetch (updateFrequency, isFetching, time) {
    if (isFetching === true) {
      return this.diffDate(time) > config.wallpaper.fetchTimeout
    }

    return this.diffDate(time) > updateFrequency
  }
}
