<template>
	<div id="app">
		<aaa type='primary' circle>primary</aaa>
		<br/>
		<br/>
		<aaa type='primary' circle>C</aaa>
		<br/>
		<br/>
		<aaa type='warning'>警告</aaa>
		<br/>
		<br/>
		<aaa type='danger' round disabled>危险</aaa>
		<br/>
		<br/>
		<aaa @click='onClick'>1</aaa>

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
		<ycInput size='mini' type="text" placeholder='瞎几把输'></ycInput>
		<ycInput size='small' type="password" placeholder='输入密码'></ycInput>
<ycInput size='small' showPassword type="password" placeholder='输入密码'></ycInput>
	</div>
</template>

<script>
	import aaa from '../packages/button.vue'
	import bbb from '../packages/dialog/dialog'
	import ycInput from '../packages/input/input'
	export default {
		name: 'App',
		components: {
			aaa,
			bbb,
			ycInput
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
