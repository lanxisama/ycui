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
		<aaa @click='onClick'>就这么傻逼</aaa>

		<bbb
		:visible.sync="Visible"
		>
			<div slot="head">
				this is head |这地方是个头
			</div>
			<div slot="container">
				这地方是内容<br/>
				这地方是内容<br/>
				这地方是内容<br/>
				这地方是内容<br/>
				这地方是内容<br/>
				<aaa @click='onClick'>就这么傻逼</aaa>
			</div>
		</bbb>
		<br/>
		<aaa type='primary' round @click="open()">打开对话框</aaa>
	</div>
</template>

<script>
	import aaa from '../packages/button.vue'
	import bbb from '../packages/dialog/dialog'
	export default {
		name: 'App',
		components: {
			aaa,
			bbb
		},
		beforeUpdate(){
			console.log('beforeUpdated---->',this.Visible)
		},
		data: function() {
			return {
				input: '',
				Visible:false
			}
		},
		methods:{
			onClick(){
				alert("///")
			},
			open(){
				this.Visible = true;
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
