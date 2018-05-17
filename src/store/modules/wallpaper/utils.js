import config from '../../../../config'

export default {
  diffDate (time) {
    return new Date() - new Date(time)
  },

  isTimeToFetch (isFetching, time) {
    if (isFetching === true) {
      return this.diffDate(time) > config.wallpaper.fetchTimeout
    }

    return this.diffDate(time) > config.wallpaper.updateFrequency
  }
}
