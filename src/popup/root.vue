<template lang="pug">
    div
      h1 Modern New Tab
      p Enjoy a view of the world each time you're opening a new tab !
      p
        b Known issue:
        |  First usage of the extension, need to refresh or open a new tab again.
      p Thank you,&nbsp;
        a(:href="githubLink" v-on:click="personalGithub")
          b Victor Pugin
</template>
<script>
  export default {
    data: () => ({
      githubLink: 'https://github.com/victorpugin'
    }),
    computed: { },
    created () {
      console.log('New tab')
    },
    mounted () { },
    methods: {
      personalGithub () {
        chrome.tabs.create({ url: this.githubLink })
      }
    }
  }
</script>
<style lang="scss">
body {
  min-width: 250px;
}
h1, b {
  color: #1b6f84;
}
a:active {
  text-decoration-color: #1b6f84;
}
</style>
