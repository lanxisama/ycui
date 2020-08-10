<template>
	<button class="yc-button" :class="[`yc-color-${type}`,
		{
			'is-plain':plain,
			'is-round':round,
			'is-circle':circle,
			'is-disabled':disabled
		}
	]"
	@click="handleClick" :disabled="disabled">
		<slot></slot>
	</button>
</template>

<script>
	export default {
		name: 'ycButton',
		props: {
			type: {
				default: 'default', // primary danger warning info success
				type: String
			},
			plain: {
				type: Boolean,
				default: false
			},
			circle: {
				type: Boolean,
				default: false
			},
			round: {
				type: Boolean,
				default: false
			},
			disabled: {
				type: Boolean,
				default: false
			},
		},
		data: function() {
			return {

			}
		},
		methods: {
			handleClick(e) {
				this.$emit('click', e)
			}
		}
	}
</script>

<style lang="scss" scope>
	@import './button'
</style>
