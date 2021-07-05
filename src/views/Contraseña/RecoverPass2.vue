<template>
  

    <div class="column is-5 mt-2 container is-centered  ">
        <div class="column title-box">
            <h2 class="color-letras">Recover your password</h2>
        </div>
        <div class="column is-centered cuadro-border">
            <div class="column  ">
                <button class=" button color-letras has-background-success ">You will instantly receive a link to retrieve your password</button>
            </div>
        </div>
    </div>


</template>

<script>
export default {
    name:'RecoverPass2'
}
</script>

<style scoped>

.cuadro-border{

    box-shadow:0px 5px 12px;
}

.title-box{
    background-color:#005395;
   
}

.color-letras{
    color:white;
    font-family: Arial,  sans-serif;
    font-weight: bold;
}

.color-btn{
    color:white;
    font-size: 0.9em;
    font-weight: 20px;
    font-family: Arial,  sans-serif;
    
}
.tam-btn{
    width: 17rem;
  
}

.color-btn:hover{
     color:white;
}
.color-btn:focus{
    color:white;
}

@media screen and (max-width: 1000px) {

   .tam-btn {
    width: 100%; /* The width is 100%, when the viewport is 800px or smaller */
  }
}



</style>