<template>
  <div>
    <div v-if="type!='textarea'">
      <input
        class="ycInput"
        ref='selectInput'
        v-bind="$attrs"
        :type="showPassword ? (passwordVisible ? 'text' : 'password') : type"
        :placeholder="placeholder"
        :class="[`yc-input--${size}`,]"
        @change='changeValue'
        @input='changeInput'
      />
      <div v-if="showPassword">
        <p v-if="passwordVisible" @click="handlePassword">{{'隐藏密码'}}</p>
        <p v-else  @click="handlePassword">{{'显示密码'}}</p>
      </div>
    </div>
    <textarea
      v-else
    ></textarea>
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
    },
    placeholder:{
      type:String,
      default:"请输入"
    }
  },
  data () {
    return {
      // 显示是否显示密码框
      passwordVisible: false,
      inputdata:''
    }
  },
  watch:{

  },
  methods:{
    handlePassword () {
      this.passwordVisible = !this.passwordVisible
      console.log(this.passwordVisible,this.showPassword)
    },
    changeInput(e){
      this.inputdata = e.target.value;
      console.log(e.target.value)
      this.$emit('input',e.target.value)
    },
    changeValue(e){
      console.log(e.target.value)
      this.$emit('change',e.target.value)
    }
  }
};
</script>


<style lang="scss" scope>
@import "./input";
</style>