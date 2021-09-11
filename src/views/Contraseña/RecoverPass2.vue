<template>
  

    <div v-if="!isMobile" class="column tam-box mt-2 container  has-text-centered  ">
        <div class="column title-box">
            <h2 class="color-letras">{{$t('contraseña.msmRecupera')}}</h2>
        </div>
        <div class="column is-centered cuadro-border">
            <div class="column">
                <!-- <button class="button color-letras has-background-success">{{$t('contraseña.msmCambio')}}</button> -->
                 <p style="padding:10px ;" class=" color-letras has-background-success">{{$t('contraseña.msmCambio')}}</p>
                <button class="button tam-btn mt-2 color-letras title-box">ok</button>
            </div>
        </div>
    </div>

    <div v-if="isMobile" class="column tam-box mt-2 container  has-text-centered  ">
        <div class="column title-box">
            <h2 class="color-letras">{{$t('contraseña.msmRecupera')}}</h2>
        </div>
        <div class="column is-centered cuadro-border">
            <div class="column">
                <p style="padding:5px;" class=" color-letras has-background-success">{{$t('contraseña.msmCambio')}}</p>
                <button class="button  mt-2 color-letras title-box">ok</button>
            </div>
        </div>
    </div>


</template>

<script>
import { inject } from '@vue/runtime-core'
export default {
    name:'RecoverPass2',
    setup(){
        const isMobile = inject('isMobile')

        return { 
            isMobile
        }
    }
}
</script>

<style scoped>

.cuadro-border{

    box-shadow:0px 5px 12px;
}

.tam-box{
    width: 40rem;
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
    width: 5rem;
}
.color-btn:hover{
     color:white;
}
.color-btn:focus{
    color:white;
}

@media screen and (max-width: 1000px) {
    .tam-box{
        width: 20rem;
    }

   .tam-btn {
    width: 100%; /* The width is 100%, when the viewport is 800px or smaller */
  }
}



</style>