<template>
  
    <div class="column tam-box mt-2 container  has-text-centered  ">
        <div class="column title-box">
            <h2 v-if="valorLocale=='en'" class="color-letras">Recover your password</h2>
            <h2 v-if="valorLocale=='es'" class="color-letras">Recupera tu contraseña</h2>
        </div>
        <div class="column is-centered cuadro-border">
            <div class="column  has-text-centered">
              <!--   <button class=" button tam-btn color-letras has-background-success ">{{$t('contraseña.msmCambiado')}}</button> -->
                <p v-if="valorLocale=='en'" style="padding:5px ;" class=" color-letras has-background-success">You password has changed</p>
                <p v-if="valorLocale=='es'" style="padding:5px ;" class=" color-letras has-background-success">Tu contraseña ha sido cambiado</p>
            </div>
             <div class="column is-centered">
                <button v-if="valorLocale=='en'" @click="irLogin" class=" button tam-btn color-letras title-box ">Accept</button>
                <button v-if="valorLocale=='es'" @click="irLogin" class=" button tam-btn color-letras title-box ">Aceptar</button>
            </div>
        </div>
    </div>

</template>

<script>
import { ref } from '@vue/reactivity'
import { watchEffect } from '@vue/runtime-core';
import i18n from '@/i18n.js'
import { useRouter } from 'vue-router'

export default {
    name:'RecoverPass4',
    setup(){
        const valorLocale = ref('')
        const langStorage = window.localStorage
        const router = useRouter()

        watchEffect(()=>{
            /* valorLocale.value = langStorage.getItem('lang') */
            let que = langStorage.getItem('lang')
            valorLocale.value = i18n.global.locale
        })

        const irLogin = () => {
            router.push({name: 'login'})
        }
        return { 
            irLogin,
            valorLocale ,
        }
    }
   
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