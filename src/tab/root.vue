<template lang="pug">
    #bg
      img(v-bind:src="imgUrl" title="Love you" v-on:load="fetchBackgroundPhoto")
</template>

<script>
  import storage from '../ext/storage'

  export default {
    data: () => ({
      imgUrl: null
    }),
    computed: { },
    created () {
      this.getBackgroundFromStorage()
    },
    mounted () { },
    methods: {
      getBackgroundFromStorage () {
        this.imgUrl = storage.get('backgroundPhoto')
      },
      fetchBackgroundPhoto () {
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
</style>
