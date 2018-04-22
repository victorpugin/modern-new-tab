<template lang="pug">
  #root
    #bg
      transition(name="fade")
        img(v-bind:src="bgUrl" @load="onBgLoaded" v-show='bg.isLoaded')
    unsplash-credits(:user='bgUser')
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
      bg: {
        isLoaded: false
      },
      ui: {
        credits: {
          show: false
        }
      }
    }),
    computed: mapState({
      bgUrl: state => state.background.url,
      bgUser: state => state.background.user
    }),
    created () {
      this.loadingFullscreen = this.$loading({
        lock: true,
        text: 'Loading...'
      })
      this.getBackgroundFromStorage()
    },
    mounted () { },
    methods: {
      getBackgroundFromStorage () {
        const photo = Storage.get('backgroundPhoto')
        if (photo && photo.url) {
          this.$store.commit('background/PHOTO_SET', photo)
        } else { // TODO: handle when storage is empty
          this.fetchNewBackground()
          this.loadingFullscreen.text = 'Please, refresh or open a new tab.'
        }
      },
      onBgLoaded () {
        this.loadingFullscreen.close()
        this.bg.isLoaded = true
        this.fetchNewBackground()
      },
      fetchNewBackground () {
        chrome.runtime.sendMessage({ msg: 'fetchBackgroundPhoto' })
      }
    }
  }
</script>

<style lang="scss">
  #bg {
    position: fixed;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
  }
  #bg img {
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
