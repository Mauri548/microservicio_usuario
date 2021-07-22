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

.btn-crenein {
  background: #005395;
  color: #fff;
  font-weight: 600;
}

.btn-crenein:hover {
  background: #0572ca;
  color: #fff;
}

/* .arrow {
  display: flex;
  align-items: center;
  width: 25px;
  min-height: 80%;
  position: absolute;
  background-color: rgba(204,204,204,0.13);
  z-index: 1;
}

.arrow-next {
  top:0%;
  right: 0%;
  border-radius: 0 5px 5px 0;
}

.arrow-prev {
  display: none;
  border-radius: 5px 0 0 5px;
}

.arrow i{
  font-size: 35px;
  color: rgba(128,128,128,0.38)
}

.arrow:hover {
  cursor: pointer;
  background-color: rgba(204,204,204,0.3);
}

.arrow:hover i {
  color: #005395
} */
</style>
