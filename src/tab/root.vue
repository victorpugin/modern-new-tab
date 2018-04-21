<template lang="pug">
  #root
    #bg
      transition(name="fade")
        img(v-bind:src="bg.url" v-on:load="onBgLoaded" v-show='bg.isLoaded')
</template>

<script>
  import storage from '../ext/storage'

  export default {
    data: () => ({
      bg: {
        url: null,
        isLoaded: false,
        date: null,
        location: null,
        user: null
      }
    }),
    computed: { },
    created () {
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
    transition: opacity 1s ease-out
  }
  .fade-enter, .fade-leave-to {
    opacity: 0
  }
</style>
