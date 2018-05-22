<template lang="pug">
    .root
      h1 Modern New Tab
      p Enjoy a view of the world each time you're opening a new tab !
      .settings
        h2 Enable features
        .settings__list
          .settings__item
            el-switch(
              v-model="switchBookmarksBar"
              active-color="#1b6f84"
              active-text="bookmarks bar"
              )
        h2 Customize
        .settings__list
          .settings__item
            span(class="settings__description") wallpaper transition duration
            el-slider(
              v-model="sliderWallpaperShowDuration"
              :max="wallpaperShowMaxDuration"
              :format-tooltip="formatDuration"
              )
          .settings__item
            span(class="settings__description") wallpaper update frequency
            el-slider(
              v-model="sliderWallpaperUpdateFrequency"
              :min="wallpaperUpdateMinFrequency"
              :max="wallpaperUpdateMaxFrequency"
              :format-tooltip="formatDuration"
              )
      p Thank you,&nbsp;
        a(:href="githubLink" v-on:click="personalGithub")
          b Victor Pugin
</template>

<script>
  import config from '@Config'

  export default {
    data: () => ({
      githubLink: 'https://github.com/victorpugin',
      wallpaperShowMaxDuration: config.wallpaper.transitionShowMaxDuration,
      wallpaperUpdateMinFrequency: config.wallpaper.updateMinFrequency,
      wallpaperUpdateMaxFrequency: config.wallpaper.updateMaxFrequency
    }),
    computed: {
      switchBookmarksBar: {
        get () {
          return this.$store.state.preferences.feature.bookmarksBar
        },
        set (newValue) {
          this.$store.commit('preferences/FEATURE_BOOKMAR_BAR_SET', newValue)
        }
      },
      sliderWallpaperShowDuration: {
        get () {
          return this.$store.state.preferences.wallpaper.transitionShowDuration
        },
        set (newValue) {
          this.$store.commit('preferences/WALLPAPER_TRANSITION_SHOW_DURATION_SET', newValue)
        }
      },
      sliderWallpaperUpdateFrequency: {
        get () {
          return this.$store.state.preferences.wallpaper.updateFrequency
        },
        set (newValue) {
          this.$store.commit('preferences/WALLPAPER_UPDATE_FREQUENCY_SET', newValue)
        }
      }
    },
    created () { },
    mounted () { },
    methods: {
      personalGithub () {
        chrome.tabs.create({ url: this.githubLink })
      },
      formatDuration (value) {
        const res = value / 1000
        return res.toFixed(2) + 's'
      }
    }
  }
</script>

<style lang="scss">
body {
  min-width: 250px;
}
h1, h2, b {
  color: #1b6f84;
}
a:active {
  text-decoration-color: #1b6f84;
}
.settings__list {
  margin-left: 5px;
  margin-right: 5px;
}
.settings__description {
  font-size: 14px;
  font-weight: 500;
}
</style>
