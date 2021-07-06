<template>
 
  <router-view/>
  
</template>

<script>
import store from '@/store'
import { provide, ref } from '@vue/runtime-core'
export default {
  created(){
    store.commit('onResize')
    this.isMobile = store.state.isMobile
  },

  setup(){
    const isMobile = ref(false)

    window.addEventListener("resize", function(){
      store.commit('onResize')
      isMobile.value = store.state.isMobile
    })

    provide('isMobile', isMobile)

    return{
      isMobile
    }
  }
}

</script>

<style >

@import "https://cdn.jsdelivr.net/npm/bulma@0.9.2/css/bulma.min.css";


#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.blue-crenein {
  color: #005395;
}

.fondo-crenein {
  background-color: #005395;
}

.w-100{
  width: 100%;
}

.shadow {
  box-shadow: 0px 0px 12px 1px;
  border-radius: 5px;
}
</style>
