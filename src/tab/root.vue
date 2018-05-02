<template lang="pug">
  #root
    #wallpaper
      transition(name="fade")
        img(v-bind:src="wallpaperUrl" @load="onWallpaperLoaded" v-show='wallpaper.isLoaded')
    unsplash-credits(:user='wallpaperUser')
</template>

<script>
  import Storage from '../ext/storage'
  import UnsplashCredits from '../components/unsplash-credits'

  import { mapState } from 'vuex'

  export default {
    components: {
      UnsplashCredits
    },
    data: () => ({
      isLoadingFullscreen: true,
      wallpaper: {
        isLoaded: false
      },
      ui: {
        credits: {
          show: false
        }
      }
    }),
    computed: mapState({
      wallpaperUrl: state => state.wallpaper.url,
      wallpaperUser: state => state.wallpaper.user
    }),
    created () {
      this.loadingFullscreen = this.$loading({
        lock: true,
        text: 'Loading...'
      })
      this.getWallpaperFromStorage()
    },
    mounted () { },
    methods: {
      getWallpaperFromStorage () {
        const wallpaper = Storage.get('wallpaper.info')
        if (wallpaper && wallpaper.url) {
          this.$store.commit('background/WALLPAPER_SET', wallpaper)
        } else { // TODO: handle when storage is empty
          this.fetchNextWallpaper()
          this.loadingFullscreen.text = 'Please, refresh or open a new tab.'
        }
      },
      onWallpaperLoaded () {
        this.loadingFullscreen.close()
        this.wallpaper.isLoaded = true
        this.fetchNextWallpaper()
      },
      fetchNextWallpaper () {
        chrome.runtime.sendMessage({ msg: 'fetchNextWallpaper' })
      }
    }
  }
</script>

<style lang="scss">
  #wallpaper {
    position: fixed;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
  }
  #wallpaper img {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    min-width: 50%;
    min-height: 50%;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity 2s ease-out
  }
  .fade-enter, .fade-leave-to {
    opacity: 0
  }
</style>
