<template lang="pug">
    div
      h1 Modern New Tab
      p Enjoy a view of the world each time you're opening a new tab !
      h2 Enable features
      el-switch(
        v-model="switchBookmarksBar"
        active-color="#1b6f84"
        active-text="bookmarks bar"
        )
      p Thank you,&nbsp;
        a(:href="githubLink" v-on:click="personalGithub")
          b Victor Pugin
</template>
<script>
  export default {
    data: () => ({
      githubLink: 'https://github.com/victorpugin'
    }),
    computed: {
      switchBookmarksBar: {
        get () {
          return this.$store.state.preferences.feature.bookmarksBar
        },
        set (newValue) {
          this.$store.commit('preferences/FEATURE_BOOKMAR_BAR_SET', newValue)
        }
      }
    },
    created () { },
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
h1, h2, b {
  color: #1b6f84;
}
a:active {
  text-decoration-color: #1b6f84;
}
.el-switch__label.is-active {
  color: #303133;
}
</style>
