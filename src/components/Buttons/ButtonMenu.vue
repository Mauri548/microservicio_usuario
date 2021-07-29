<template>
    <div v-show="isMobile==false">
        <a href="#" class="button btn btn-letter mb-1" >{{nombre}}</a>
    </div>
    <div v-show="isMobile==true">
      <a href="#" class="button btn btn-letter " style="justify-content: center;">{{nombre}}</a>
    </div>
  
</template>

<script>

import { inject } from '@vue/runtime-core'
export default {
    name:"ButtonMenu",
    props:['nombre'],
    setup(){
        const isMobile = inject('isMobile')

        return { 
            isMobile
        }
    }
}
</script>

<style scoped>


.btn-letter{
    color:#005395;
}

.btn {
    justify-content: flex-start;
    width:240px;
    height:50px;
    background-color:white;
    border-radius: 5px;
    box-shadow: 2px 2px 5px grey;
}

.btn:focus{
    background-color:#005395;
    color:white;
}

.btn:hover{
    background-color:white;
    color:#005395;
    border-color: #005395;
}




</style>