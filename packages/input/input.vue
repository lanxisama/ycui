<template>
  <div>
    <p @click="handlePassword">{{type}}</p>
    <input
      class="ycInput"
      v-bind="$attrs"
      :type="passwordVisible ? 'text' : 'password'"
      :class="[`yc-input--${size}`,]"
    />
  </div>
</template>

<script>
export default {
  name: "ycInput",
  props: {
    text: {
      type: String,
      validator: (val) => {
        return ["text","password","textarea"].indexOf(val) != -1;
      },
    },
    type: {
      type: String,
      default: 'text'
    },
    size: {
      type: String,
      default: "medium",
      validator: (val) => {
        return ["medium", "small", "mini"].indexOf(val) != -1;
      },
    },
    showPassword: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      // 显示是否显示密码框
      passwordVisible: true
    }
  },
  methods:{
    handlePassword () {
      this.passwordVisible = !this.passwordVisible
      this.type = this.passwordVisible ? 'text' : 'password'
      console.log(this.passwordVisible)
    }
  }
};
</script>


<style lang="scss" scope>
@import "./input";
</style>