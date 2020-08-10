<template>
	<div id="app">
		<aaa type='primary' circle>按钮</aaa>
		ss
		<aaa type='primary' circle>C</aaa>
		sss
		<aaa type='warning'>这个字体为什么别人用</aaa>
		sss
		<aaa type='danger' round disabled>就这么好看，我一用</aaa>
		sss
		<aaa @click='onClick' icon='ditudingwei'>就这么傻逼</aaa>
	</div>
</template>

<script>
	import aaa from '../packages/button.vue'
	export default {
		name: 'App',
		components: {
			aaa
		},
		data: function() {
			return {
				input: ''
			}
		},
		methods:{
			onClick(){
				alert("///")
			}
		}
	}
</script>

<style lang="scss">
	@import './common/font/font.scss';
	#app {
		font-family: jap;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		margin-top: 60px;
	}
</style>
