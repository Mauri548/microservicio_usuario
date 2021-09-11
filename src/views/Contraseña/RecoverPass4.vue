<template>
  
    <div class="column tam-box mt-2 container  has-text-centered  ">
        <div class="column title-box">
            <h2 class="color-letras">{{$t('contraseña.msmRecupera')}}</h2>
        </div>
        <div class="column is-centered cuadro-border">
            <div class="column  has-text-centered">
              <!--   <button class=" button tam-btn color-letras has-background-success ">{{$t('contraseña.msmCambiado')}}</button> -->
                <p  style="padding:5px ;" class=" color-letras has-background-success">{{$t('contraseña.msmCambio')}}</p>
            </div>
             <div class="column is-centered">
                <button class=" button tam-btn color-letras title-box ">{{$t('contraseña.aceptar')}}</button>
            </div>
        </div>
    </div>

</template>

<script>

export default {
    name:'RecoverPass2',
   
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
    width: 8rem;
  
}

.tam-box{
    width: 28rem;
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