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

import config from '../../config'

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
        return this.user.link + config.unsplash.utm
      }
      return config.unsplash.url + config.unsplash.utm
    },
    unsplashLink () {
      return config.unsplash.url + config.unsplash.utm
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
	opacity: 0.75;
}
.text-block:hover {
	opacity: 1;
}
.hyperlink {
	color: #1b6f84;
}
.remove-opacity {
	opacity: 1;
}
</style>
