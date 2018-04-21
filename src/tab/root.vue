<template lang="pug">
  #root

    #bg
      transition(name="fade")
        img(v-bind:src="bg.url" @load="onBgLoaded" v-show='bg.isLoaded')
    .text-block
      p Photo by&nbsp;
        a(:href="bg.user.link" class="link")
          b {{ bg.user.name }}
        |  on&nbsp;
        a(href="https://unsplash.com/" class="link")
          b Unsplash
</template>

<script>
  import storage from '../ext/storage'

  export default {
    data: () => ({
      isLoadingFullscreen: true,
      bg: {
        url: null,
        isLoaded: false,
        date: null,
        location: null,
        user: null
      },
      ui: {
        credits: {
          show: false
        }
      }
    }),
    computed: { },
    created () {
      this.isLoadingFullscreen = this.$loading({
        lock: true,
        text: 'Loading...'
      })
      this.getBackgroundFromStorage()
    },
    mounted () { },
    methods: {
      getBackgroundFromStorage () {
        const photo = storage.get('backgroundPhoto')

        if (photo.url) {
          this.bg.url = photo.url
          this.bg.date = photo.date
          this.bg.location = photo.location
          this.bg.user = photo.user
        } else { // TODO: handle when storage is empty
          this.fetchNewBackground()
        }
      },
      onBgLoaded () {
        this.isLoadingFullscreen.close()
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
  /* Bottom right text */
  .text-block {
    position: absolute;
    bottom: 20px;
    right: 20px;
    background-color: black;
    color: white;
    padding-left: 20px;
    padding-right: 20px;
  }
  .link {
    color: #999;
  }
</style>
