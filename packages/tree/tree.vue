<template>
  <div id="treeNode" onselectstart="return false;">
    
  </div>
</template>
<script>
// import utils from './utils'
import tree from "./treeNode";
export default {
  name: "ycTree",
  props:{
    treeNode:{
      type:Array
    }
  },
  data() {
    return {

    };
  },
  methods: {
    renderNode(data, root) {
      for (let item = 0; item < data.length; item++) {
        var node = new tree(data[item]);
        var tnode = node.treeNode;
        root.appendChild(tnode);
        if (data[item].children) {
          //如果有树杈
          this.renderNode(data[item].children, tnode);
        }
      }
      return tnode;
    },
  },
  created() {
    this.$nextTick(function () {
      var root = document.querySelector("#treeNode");
      this.renderNode(this.treeNode, root);
    });
  },
  destroyed() {},
};
</script>

<style lang="scss" >
.yc-tree--fold {
  display: none !important;
  // visibility: hidden;
}

.yc-tree--fold::before{
  content:">";
}
// 
.yc-tree--unfold {
  display: inline-block !important;
}
.yc-tree:hover{
    cursor: pointer;
    // color: #c0c4cc;
    // transform: rotate(0deg);
    // transition: transform .3s ease-in-out;
}
.yc-tree--close::before{
  content:"👉 "
}
.yc-tree--open::before{
  content:"👇 ";
}
.yc-tree--leaf::before{
  content:" ";
}
.yc-tree:target{
  background-color:red;
}

</style>