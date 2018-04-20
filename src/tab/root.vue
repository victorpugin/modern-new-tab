<template lang="pug">
    #bg
      transition(name="fade")
        img(v-bind:src="bgUrl" v-on:load="onBgLoaded" v-show='bgLoaded')
</template>

<script>
  import storage from '../ext/storage'

  export default {
    data: () => ({
      bgUrl: null,
      bgLoaded: false
    }),
    computed: { },
    created () {
      this.getBackgroundFromStorage()
    },
    mounted () { },
    methods: {
      getBackgroundFromStorage () {
        this.bgUrl = storage.get('backgroundPhoto')
      },
      onBgLoaded () {
        this.bgLoaded = true
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
