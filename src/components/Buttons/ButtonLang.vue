<template>
  
  <div>
      <button @click="cambiarLang" class="button blue-crenein has-text-weight-semibold">{{language}}</button>
  </div>

</template>

<script>

import { ref } from '@vue/reactivity'
import store from '@/store'


export default {
    name:'ButtonLang',
    emits:['pasarLan'],
    setup(){
        const language = ref("English")
        const cambiar = ref("false")


        const cambiarLang = () => {
            if( language.value == "English"){
                language.value = "Español"
                store.commit('cambiarLan')
                cambiar.value = store.state.cambio_lang
                
                
            }else{
                language.value = "English"
                store.commit('cambiarLan')
                cambiar.value = store.state.cambio_lang
              
            }
        }
        return { 
            cambiar,
            cambiarLang,
            language
        }
    }
}
</script>

<style>

</style>