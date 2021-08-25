<template>
 
  <router-view/>
  
</template>

<script>
import store from '@/store'
import { provide, ref, watch } from '@vue/runtime-core'
export default {
  created(){
    store.commit('onResize')
    this.isMobile = store.state.isMobile
    this.isTablet = store.state.isTablet
  },

  setup(){
    const isMobile = ref(false)
    const isTablet = ref(false)

    window.addEventListener("resize", function(){
      store.commit('onResize')
      isMobile.value = store.state.isMobile
      isTablet.value = store.state.isTablet
    })

    provide('isMobile', isMobile)
    provide('isTablet', isTablet)

    return{
      isMobile,
      isTablet
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
  /* text-align: center; */
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

.btn-crenein {
  background: #005395;
  color: #fff;
  font-weight: 600;
}

.btn-crenein:hover {
  background: #0572ca;
  color: #fff;
}
.btn-crenein:focus {
  color: #fff
}

/* style de tablero */
.conteiner-tablero {
  width: 79%;
  border: 1px solid #eeeeee;
}

.conteiner-tablero .head-tablero, .conteiner-tablero .body-tablero, .conteiner-tablero .conteiner-pagination {
  width: 100%;
}

.conteiner-tablero div hr {
  margin: 5px 0;
  background: #005395;
}

@media (max-width: 1024px) {
  .conteiner-tablero {
    width: 98%;
    margin: auto;
  }
}

</style>
