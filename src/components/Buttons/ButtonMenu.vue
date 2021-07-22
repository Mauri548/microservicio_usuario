<template>
  <div>
      <a href="#" class="button btn btn-letter" >{{nombre}}</a>
  </div>
</template>

<script>
export default {
    name:"ButtonMenu",
    props:['nombre']
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