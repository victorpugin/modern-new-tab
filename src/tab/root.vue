<template lang="pug">
  #root
    #wallpaper
      transition(name="fade")
        img(v-bind:src="wallpaper.info.url" @load="onWallpaperLoaded" v-show='wallpaper.isLoaded')
    bookmarks-bar
    unsplash-credits(:user='wallpaper.info.user')
</template>

<script>
  import UnsplashCredits from '../components/unsplash-credits'
  import BookmarksBar from '../components/bookmarks-bar'

  import { mapState, mapGetters, mapActions } from 'vuex'

  export default {
    components: {
      UnsplashCredits,
      BookmarksBar
    },
    data: () => ({
      isLoadingFullscreen: true,
      wallpaper: {
        isLoaded: false,
        info: {
          url: null,
          date: null,
          location: null,
          user: null
        }
      },
      ui: {
        credits: {
          show: false
        }
      }
    }),
    computed: {
      ...mapState({
        wallpaperInfo: state => state.wallpaper.info
      }),
      ...mapGetters('wallpaper', [
        'wallpaperInfoExist'
      ])
    },
    watch: {
      wallpaperInfo (newValue, oldValue) {
        this.initializeWallpaper()
      }
    },
    created () {
      this.loadingFullscreen = this.$loading({
        lock: true,
        text: 'Loading...'
      })
      this.initializeWallpaper()
    },
    mounted () { },
    methods: {
      ...mapActions('wallpaper', [
        'fetchNextWallpaper'
      ]),
      /*
       *  Copy of wallpaper info to avoid display any store update
       *  Data will stay in store when VuexPersist.reducer
       *  will work to restrict which state to persist under a module
       */
      initializeWallpaper () {
        if (!this.wallpaperInfoExist) {
          this.fetchNextWallpaper()
        } else if (this.wallpaper.info.url == null) {
          this.wallpaper.info = this.wallpaperInfo
        }
      },
      onWallpaperLoaded () {
        this.loadingFullscreen.close()
        this.wallpaper.isLoaded = true
        this.fetchNextWallpaper()
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
