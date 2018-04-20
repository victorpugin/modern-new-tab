<template lang="pug">
    div
      h1 Hello World
</template>

<script>
  export default {
    data: () => ({
    }),
    computed: { },
    created () {
      chrome.runtime.sendMessage({ msg: 'fetchBackgroundPhoto' })
    },
    mounted () { },
    methods: { }
  }
</script>

<style lang="scss">
  div {
    color: blue
  }
</style>
