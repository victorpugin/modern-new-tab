<template lang="pug">
  .navbar
    .container
      el-menu(mode="horizontal" class="navbar__menu navbar__menu--opacity" @select="menuSelected" active-text-color="#1b6f84" hover-text-color="black")
        el-menu-item(
          :index="item.id"
          class="navbar__item"
          v-for="item in bookmarks"
          :key="item.id") {{ cut_title(item.title) }}
</template>

<script>

export default {
  name: 'bookmarks-bar',
  props: [],
  computed: { },
  data () {
    return {
      bookmarks: null
    }
  },
  created () {
    chrome.bookmarks.getTree(this.process_bookmarks)
  },
  methods: {
    process_bookmarks (bookmarks) {
      for (var i = 0; i < bookmarks.length; i++) {
        var bookmark = bookmarks[i]

        if (bookmark.children) {
          if (bookmark.title === 'Barre de favoris') {
            this.bookmarks = bookmark.children
          } else {
            this.process_bookmarks(bookmark.children)
          }
        }
      }
    },
    cut_title (title) {
      return title.substring(0, 18)
    },
    menuSelected (key, keyPath) {
      const res = this.bookmarks.filter(bookmark => bookmark.id === key)
      if (res != null && res.length > 0) {
        const bookmark = res[0]
        if (bookmark.url) {
          chrome.tabs.update(null, {
            url: bookmark.url
          })
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar__menu {
	background-color: black;
	border-bottom: none;
}
.navbar__menu--opacity {
	opacity: 0.75;
}
.navbar__menu--opacity:hover {
	opacity: 1;
}
.navbar__item {
	height: 30px;
	line-height: 30px;
	padding-left: 8px;
	padding-right: 8px;
	color: white;
}

</style>
