<template>
  <div>
      <input
        class="ycInput"
        v-bind="$attrs"
        :type="showPassword ? (passwordVisible ? 'text' : 'password') : type"
        :class="[`yc-input--${size}`,]"
      />
      <p v-if="passwordVisible" @click="handlePassword">{{'隐藏密码'}}</p>
      <p v-else  @click="handlePassword">{{'显示密码'}}</p>
  </div>
</template>

<script>
export default {
  name: "ycInput",
  props: {
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
      console.log(this.passwordVisible,this.showPassword)
    }
  }
};
</script>


<style lang="scss" scope>
@import "./input";
</style>