<template>
    <div>
        <!-- {{dataFromParent}} -->
        <god-son></god-son>
    </div>
</template>



<script>
import godSon from './godson'
export default {
    name:'son',
    components:{
        'god-son':godSon
    },
    // inject:['dataFromParent'],
    data(){
        return{

        }
    }
}
</script>