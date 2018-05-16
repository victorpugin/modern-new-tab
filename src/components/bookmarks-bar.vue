<template lang="pug">
  .navbar(class="navbar--overflow")
    .container
      el-menu(mode="horizontal" class="navbar__menu navbar__menu--opacity" @select="menuSelected" background-color="#f2f2f2" active-text-color="#1b6f84")
        .navbar__container(v-for="item in bookmarks")
          template(v-if="isBookmarkFolder(item.id)")
            el-submenu(:index="item.id" class="navbar__item")
              template(slot="title" class="navbar__item") {{ cut_title(item.title) }}
              el-menu-item(class="navbar__item") Sub item
          template(v-else)
            el-menu-item(
              :index="item.id"
              class="navbar__item"
              :key="item.id") {{ cut_title(item.title) }}
</template>

<script>

export default {
  name: 'bookmarks-bar',
  props: [],
  computed: { },
  data () {
    return {
      bookmarks: null,
      bookmarksById: {}
    }
  },
  created () {
    chrome.bookmarks.getTree(this.find_bookmark_bar)
  },
  methods: {
    find_bookmark_bar (bookmarks) {
      for (var i = 0; i < bookmarks.length; i++) {
        var bookmark = bookmarks[i]

        if (bookmark.children) {
          if (bookmark.title === 'Barre de favoris') {
            this.bookmarks = bookmark.children
            this.process_bookmarks(this.bookmarks)
            return
          } else {
            this.find_bookmark_bar(bookmark.children)
          }
        }
      }
    },
    process_bookmarks (bookmarks) {
      const length = bookmarks.length
      for (var i = 0; i < length; i++) {
        const bookmark = bookmarks[i]

        this.bookmarksById[bookmark.id] = bookmark

        if (bookmark.children) {
          this.process_bookmarks(bookmark.children)
        }
      }
    },
    cut_title (title) {
      return title.substring(0, 18)
    },
    menuSelected (key, keyPath) {
      if (this.bookmarksById.hasOwnProperty(key)) {
        const bookmark = this.bookmarksById[key]

        if (bookmark.url) {
          chrome.tabs.update(null, {
            url: bookmark.url
          })
        }
      }
    },
    isBookmarkFolder (bookmarkId) {
      if (this.bookmarksById.hasOwnProperty(bookmarkId)) {
        const bookmark = this.bookmarksById[bookmarkId]

        if (bookmark.children) {
          return true
        }
      }
      return false
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 30px;
}
.navbar--overflow {
  position: relative;
  width: 100%;
  overflow: auto;
}
.navbar__menu {
	border-bottom: none;
}
.navbar__menu--opacity {
	opacity: 0.75;
}
.navbar__menu--opacity:hover {
	opacity: 1;
}
.navbar__container {
  display: inline-flex;
}
.navbar__item {
	height: 30px;
	line-height: 30px;
	padding-left: 8px;
	padding-right: 8px;
  color: black;
}

</style>
