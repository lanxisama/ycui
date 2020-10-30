<template>
    <div>
        <!-- {{dataFromParent}} -->
        <!-- <god-son></god-son> -->
        <son></son>
        {{time}}
        <ycButton @click="change"></ycButton>
    </div>
</template>



<script>

// import Child from './Child'
// export default {
//   name: 'Parent',
//   provide: {
// 	nameFromParent: 'Kevin'
//   },
//   components: {
//     Child
//   }
// }
import Son from './son'
import ycButton from '../../packages/button'
export default {
    name:'Parent',
    components:{
        'son':Son,
        ycButton
    },
    methods:{
        change(){
            this.time = +new Date()
        }
    },
    // inject:['dataFromParent'],
    provide:function(){
        return {
            nameFromParent:()=>this.time
        }
    },
    data:()=>{
        return{
            time:'11'
        }
    },
    updated(){
        this.time = +new Date()
    }
}
</script>