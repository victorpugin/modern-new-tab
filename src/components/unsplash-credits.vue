<template lang="pug">
	.text-block
		p(class='remove-opacity') Photo by&nbsp;
			a(:href="user.link" class="link")
				b {{ user.name }}
			|  on&nbsp;
			a(href="https://unsplash.com/" class="link")
				b Unsplash
</template>

<script>

export default {
  name: 'unsplash-credits',
  props: [ 'user' ],
  computed: { }
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
.link {
	color: #999;
}
.remove-opacity {
	opacity: 1;
}
</style>
