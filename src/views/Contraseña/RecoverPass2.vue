<template>
  

    <div v-if="!isMobile" class="column tam-box mt-2 container  has-text-centered  ">
        <div class="column title-box">
            <h2 v-if="valorLocale=='en'" class="color-letras">Recover your password - Step 2</h2>
            <h2 v-if="valorLocale=='es'" class="color-letras">Recupera tu contraseña - Paso 2</h2>
        </div>
        <div class="column is-centered cuadro-border">
            <div class="column">
                <!-- <button class="button color-letras has-background-success">{{$t('contraseña.msmCambio')}}</button> -->
                    <p v-if="valorLocale=='en'" style="padding:10px ;" class=" color-letras has-background-success">You will receive in a moment a link to retrieve your password</p>
                    <p v-if="valorLocale=='es'" style="padding:10px ;" class=" color-letras has-background-success">Recibirá en un momento un enlace para recuperar su contraseña</p>
                <button class="button tam-btn mt-2 color-letras title-box" @click="volver">Volver a enviar</button>
            </div>
        </div>
    </div>

    <div v-if="isMobile" class="column tam-box mt-2 container  has-text-centered  ">
        <div class="column title-box">
            <h2 v-if="valorLocale=='en'" class="color-letras">Recover your password</h2>
            <h2 v-if="valorLocale=='es'" class="color-letras">Recupera tu contraseña</h2>
        </div>
        <div class="column is-centered cuadro-border">
            <div class="column">
                <p v-if="valorLocale=='en'" style="padding:5px;" class=" color-letras has-background-success">You will receive in a moment a link to retrieve your password</p>
                <p v-if="valorLocale=='es'" style="padding:5px;" class=" color-letras has-background-success">Recibirá en un momento un enlace para recuperar su contraseña</p>
                <button class="button mt-2 color-letras title-box" @click="volver">Volver a enviar</button>
            </div>
        </div>
    </div>


</template>

<script>
import { inject, watchEffect } from '@vue/runtime-core'
import { ref } from '@vue/reactivity'
import { useRouter } from 'vue-router'
import i18n from '@/i18n.js'

export default {
    name:'RecoverPass2',
    setup(){
        const isMobile = inject('isMobile')
        const valorLocale = ref('')
        const langStorage = window.localStorage
        const router = useRouter()

        watchEffect(()=>{
            /* valorLocale.value = langStorage.getItem('lang') */
            valorLocale.value = i18n.global.locale
        })
        const volver = () => {
            router.push({name: 'RecoverPass1'})
        }

        return { 
            volver,
            valorLocale ,
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
    width: 9rem;
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