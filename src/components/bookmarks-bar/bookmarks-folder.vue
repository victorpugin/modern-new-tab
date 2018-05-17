<template lang="pug">
  .navbar__folder
    .navbar__container(v-for="item in bookmarks" :style="styleNavbarContainer")
      template(v-if="isBookmarkFolder(item.id)")
        el-submenu(:index="item.id")
          template(slot="title" class="navbar__item")
            img(src="favicon(item.id)" class="navbar__favicon")
            span {{ cut_title(item.title) }}
          bookmarks-folder(:bookmarks="item.children" :bookmarksById="bookmarksById" display="block")
      template(v-else)
        el-menu-item(:index="item.id" class="navbar__item" :key="item.id")
          img(:src="favicon(item.id)" class="navbar__favicon")
          span {{ cut_title(item.title) }}
</template>

<script>

export default {
  name: 'bookmarks-folder',
  props: [
    'bookmarks',
    'bookmarksById',
    'display'
  ],
  computed: {
    styleNavbarContainer () {
      return 'display: ' + this.display
    }
  },
  created () { },
  methods: {
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
    },
    favicon (bookmarkId) {
      if (this.bookmarksById.hasOwnProperty(bookmarkId)) {
        const bookmark = this.bookmarksById[bookmarkId]

        if (bookmark.url) {
          return 'chrome://favicon/' + bookmark.url
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar__folder {
}
.navbar__container {
}
.navbar__favicon {
  width: auto;
  padding-right: 8px;
  vertical-align: sub;
}
.navbar__item {
	height: 30px;
	line-height: 30px;
	padding-left: 8px;
	padding-right: 8px;
  color: black;
}

</style>
