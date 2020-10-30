<template>
    <div>
        {{dataTime}}
    </div>
</template>



<script>

export default {
    name:'godson',
    inject:['nameFromParent'],
    watch:{ 
        'nameFromParent':(va)=>{
            console.log(va)
        }
    },
    computed:{
        dataTime(){
            return this.nameFromParent()
        }
    },
    data(){
        return{

        }
    }
}
</script>