<template>
    <div class="column is-half ">
         <!-- is-one-third  -->
        <img :src="logo" :alt="name" width="35">
        <p class="has-text-weight-medium" :class="{'text-inactivo':!activo}" >{{name}}</p>
    </div>
  <!--   <div v-if="cant%2==0" class="column is-half "> -->
         <!-- is-one-third  -->
        <!-- <img :src="logo" :alt="name" width="35">
        <p class="has-text-weight-medium" :class="{'text-inactivo':!activo}" >{{name}}</p> -->
        <!-- <p class="has-text-weight-medium is-size-7" :class="{'text-inactivo':!activo}" >{{licencia}}</p> -->
   <!--  </div> -->
</template>
<script>
import { watchEffect } from '@vue/runtime-core'
import { ref } from '@vue/reactivity'

export default {
    name: 'AppCrenein',
    props:{
        name: String,
        logo: String,
        activo: Boolean,
        /* cant: Number, */
        /* licencia:String */
    },
    setup(props){
        const cant = ref()
        /* watchEffect(()=>{

        }) */
        cant.value = props.cant
        return { 
            cant
        }
    }



}
</script>

<style scoped>
.text-inactivo {
    color: grey
}

div:hover {
    background-color: rgba(204,204,204,0.27);
    border-radius: 15px;
    cursor: pointer;
}

</style>