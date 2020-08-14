<template>
  <div id="app">
    --------------Button--------------
    <div class="d-flex" style="justify-content: space-around;">
      <aaa type="primary" circle>primary</aaa>

      <aaa type="primary" circle>C</aaa>

      <aaa type="warning">警告</aaa>

      <aaa type="danger" round disabled>危险</aaa>

      <aaa @click="onClick">1</aaa>
    </div>
    --------------Input--------------
    <div>
      <ycInput size="medium" placeholder='medium'></ycInput>
      <ycInput size="mini" placeholder='mini'></ycInput>
      <ycInput size="small" showPassword type="password" placeholder="small"></ycInput>
    </div>
    --------------Dialog--------------
    <bbb :visible.sync="Visible">
      <div slot="head">登录</div>
      <div slot="container" style="padding:10px;">
        账号：
        <ycInput></ycInput>密码：
        <ycInput showPassword type="password" placeholder="small"></ycInput>
        <div  class="d-flex" style="justify-content: space-around;">
          <aaa @click="onClick">登录</aaa>
          <aaa type="warning" @click="onClick">注册</aaa>
          <aaa type="primary" round @click="open1()">打开内部对话框</aaa>
        </div >

      </div>
    </bbb>

    <bbb :visible.sync="Visible1">
      <div slot="head">第二个dialog</div>
      <div slot="container" style="padding:10px;">
        <ycInput type="textarea"></ycInput>
        <ycTree :treeNode='treeNode'></ycTree>
      </div>
    </bbb>
    <div class="tree">
     -------------- 树组件--------------
        <ycTree :treeNode='treeNode'></ycTree>
    </div>

    <br />
    <aaa type="primary" round @click="open()">打开对话框</aaa>
  </div>
</template>

<script>
import aaa from "../packages/button.vue";
import bbb from "../packages/dialog/dialog";
import ycInput from "../packages/input/input";
import ycTree from '../packages/tree/tree'
export default {
  name: "App",
  components: {
    aaa,
    bbb,
    ycInput,
    ycTree
  },
  beforeUpdate() {
    console.log("beforeUpdated---->", this.Visible);
  },
  data: function () {
    return {
      input: "",
      Visible: false,
      Visible1: false,
      treeNode: [
        {
          label: "1-1",
          children: [
            {
              label: "1-2",
            },
          ],
        },
        {
          label: "2-1",
          children: [
            {
              label: "2-2",
            },
            {
              label: "2-3",
            },
            {
              label: "2-4",
              children: [
                {
                  label: "2-4-1",
                },
                {
                  label: "2-4-2",
                  children: [
                    {
                      label: "2-4-2-1",
                    },
                    {
                      label: "2-4-2-2",
                      children: [
                        {
                          label: "2-4-2-2-1",
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    };
  },
  methods: {
    onClick() {
      alert("登陆成功");
    },
    open() {
      // val = true
      this.Visible = true;
      // console.log('val--->',val)
	},
	open1() {
      // val = true
      this.Visible1 = true;
      console.log('val--->', this.Visible1)
    },
  },
};
</script>

<style lang="scss">
@import "./common/font/font.scss";
#app {
  font-family: jap;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.tree{
  float: left;
  width: 20vw;
}
</style>
