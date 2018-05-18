<template lang="pug">
    div
      h1 Modern New Tab
      p Enjoy a view of the world each time you're opening a new tab !
      h2 Enable features
      el-switch(
        v-model="switchBookmarksBar"
        active-color="#1b6f84"
        active-text="bookmarks bar"
        )
      h2 Customize
      div
        span wallpaper show duration
        el-slider(
          v-model="sliderWallpaperShowDuration"
          :max="wallpaperShowMaxDuration"
          :format-tooltip="formatDuration"
          class="block__slider"
          )
      p Thank you,&nbsp;
        a(:href="githubLink" v-on:click="personalGithub")
          b Victor Pugin
</template>

<script>
  export default {
    data: () => ({
      githubLink: 'https://github.com/victorpugin',
      wallpaperShowMaxDuration: 5000
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
.block__slider {
  margin-left: 5px;
  margin-right: 5px;
}
</style>
