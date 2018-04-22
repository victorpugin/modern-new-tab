<template lang="pug">
	.text-block
		p(class='remove-opacity') Photo by&nbsp;
			a(:href="link" class="hyperlink")
				b {{ name }}
			|  on&nbsp;
			a(href="https://unsplash.com/" class="hyperlink")
				b Unsplash
</template>

<script>

export default {
  name: 'unsplash-credits',
  props: [ 'user' ],
  computed: {
    name () {
      if (this.user && this.user.name) {
        return this.user.name
      }
      return 'Unknown'
    },
    link () {
      if (this.user && this.user.link) {
        return this.user.link
      }
      return 'https://unsplash.com/'
    }
  }
}
</script>

<style lang="scss" scoped>
/* Bottom right text */
.text-block {
	position: absolute;
	bottom: 20px;
	right: 20px;
	background-color: black;
	color: white;
	padding-left: 20px;
	padding-right: 20px;
	opacity: 0.7;
}
.hyperlink {
	color: #1b6f84;
}
.remove-opacity {
	opacity: 1;
}
</style>
