<template lang="pug">
  #root
    #wallpaper
      transition(
        v-bind:css="false"
        v-on:before-enter="transitionBeforeEnter"
        v-on:enter="transitionEnter"
        )
        img(v-bind:src="wallpaper.info.url" @load="onWallpaperLoaded" v-show='wallpaper.isLoaded')
    bookmarks-bar(v-show="displayBookmarksBar")
    unsplash-credits(:user='wallpaper.info.user' v-show='wallpaper.isLoaded')
</template>

<script>
  import UnsplashCredits from '@Components/unsplash-credits'
  import BookmarksBar from '@Components/bookmarks-bar'

  import { mapState, mapGetters, mapActions } from 'vuex'
  import Velocity from 'velocity-animate'

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
      }
    }),
    computed: {
      ...mapState({
        wallpaperInfo: state => state.wallpaper.info,
        displayBookmarksBar: state => state.preferences.feature.bookmarksBar,
        wallpaperShowDuration: state => state.preferences.wallpaper.transitionShowDuration
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
          this.loadingFullscreen = this.$loading({
            lock: true,
            text: 'Loading...'
          })
          this.fetchNextWallpaper()
        } else if (this.wallpaper.info.url == null) {
          this.wallpaper.info = this.wallpaperInfo
        }
      },
      onWallpaperLoaded () {
        if (this.loadingFullscreen) {
          this.loadingFullscreen.close()
        }
        this.wallpaper.isLoaded = true
        this.fetchNextWallpaper()
      },
      transitionBeforeEnter (el) {
        el.style.opacity = 0
      },
      transitionEnter (el, done) {
        Velocity(
          el,
          { opacity: 1 },
          {
            duration: this.transitionShowDuration,
            complete: () => {
              done()
            }
          }
        )
        done()
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
</style>
