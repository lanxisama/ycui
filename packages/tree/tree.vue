<template>
  <div id="treeNode"></div>
</template>
<script>
// import utils from './utils'
import tree from "./treeNode";
export default {
  name: "ycTree",
  data() {
    return {
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
                  label: "2-4-1",
                  children: [
                    {
                      label: "2-4-1-1",
                    },
                    {
                      label: "2-4-2",
                      children: [
                        {
                          label: "2-4-2-1",
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
.yc-tree--unfold {
  display: inline-block !important;
}
</style>