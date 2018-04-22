<template lang="pug">
	.text-block
		p(class='remove-opacity') Photo by&nbsp;
			a(:href="link" class="hyperlink")
				b {{ name }}
			|  on&nbsp;
			a(:href="unsplashLink" class="hyperlink")
				b Unsplash
</template>

<script>

export default {
  name: 'unsplash-credits',
  props: [ 'user' ],
  data: () => ({
    unsplashUrl: 'https://unsplash.com/',
    unsplashUtm: '?utm_source=modern_new_tab&utm_medium=referral'
  }),
  computed: {
    name () {
      if (this.user && this.user.name) {
        return this.user.name
      }
      return 'Unknown'
    },
    link () {
      if (this.user && this.user.link) {
        return this.user.link + this.unsplashUtm
      }
      return this.unsplashUrl + this.unsplashUtm
    },
    unsplashLink () {
      return this.unsplashUrl + this.unsplashUtm
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
