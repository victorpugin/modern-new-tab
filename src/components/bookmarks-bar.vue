<template lang="pug">
  .navbar(class="navbar--overflow")
    .container
      el-menu(mode="horizontal" class="navbar__menu navbar__menu--opacity" @select="menuSelected" background-color="#f2f2f2" active-text-color="#1b6f84")
        bookmarks-folder(:bookmarks="bookmarks" :bookmarksById="bookmarksById" display="inline-flex")

</template>

<script>

import bookmarksFolder from './bookmarks-bar/bookmarks-folder'

export default {
  name: 'bookmarks-bar',
  components: {
    bookmarksFolder
  },
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

</style>
