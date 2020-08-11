<template>
    <div class="drawer"
    v-if="visible"
    >
        <div class="d-flex">
            <div class="mx" style="margin-top:5px">
                <slot name="head"></slot>
            </div>
            <div class="close mx" @click="close()">
                <svg t="1597048483431" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10230" width="32" height="32"><path d="M504.224 470.288l207.84-207.84a16 16 0 0 1 22.608 0l11.328 11.328a16 16 0 0 1 0 22.624l-207.84 207.824 207.84 207.84a16 16 0 0 1 0 22.608l-11.328 11.328a16 16 0 0 1-22.624 0l-207.824-207.84-207.84 207.84a16 16 0 0 1-22.608 0l-11.328-11.328a16 16 0 0 1 0-22.624l207.84-207.824-207.84-207.84a16 16 0 0 1 0-22.608l11.328-11.328a16 16 0 0 1 22.624 0l207.824 207.84z" p-id="10231" data-spm-anchor-id="a313x.7781069.0.i1" class="selected"></path></svg>
            </div>   
        </div>
         <div class="bottom"></div>
        <slot name="container">
        </slot>
    </div>    
</template>

<script>

export default {
    name:'Dialog',
    props:{
        visible:{
            type:Boolean,
            default:false
        }
    },
    data(){
        return {
             
        }
    },
    watch:{
    },
    methods:{
        close(){
             this.$emit('update:visible', false);
             console.log(this.visible)
        }
    }
}
</script>

<style lang="scss">
    @import './dialog';
    .drawer{
        margin: 50px;
    }
</style>