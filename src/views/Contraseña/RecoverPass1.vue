<template>
  
    <div v-show="isMobile==false" class="column tam-box mt-2 container  has-text-centered">
        <div class="column title-box ">
            
            <h2 v-if="valorLocale=='en'" class="color-letras">Recover your password</h2>
            <h2 v-if="valorLocale=='es'" class="color-letras">Recupera tu contraseña</h2>
        </div>
        <div class="column is-centered cuadro-border">
            <form class="column  mx-5  px-0">
                <CampoForm v-if="valorLocale=='en'" place="Email" v-model="email" type="text"  :error="msg_error.email"/>
                <CampoForm v-if="valorLocale=='es'" place="Correo" v-model="email" type="text" :error="msg_error.email"/>
            </form>
            <div class="column mx-5 ">
                <div class="columns">
                    <div class="column px-0 is-flex-grow-0 ">
                        <button v-if="valorLocale=='en'" @click="volver" class=" button color-btn has-background-danger ">Cancel</button>
                        <button v-if="valorLocale=='es'" @click="volver" class=" button color-btn has-background-danger ">Cancelar</button>
                    </div>
                    <div class="column has-text-right  px-0  " >
                        <button v-if="valorLocale=='en'" @click="validar" class="button tam-btn color-btn title-box">Send</button>
                        <button v-if="valorLocale=='es'" @click="validar" class="button tam-btn color-btn title-box">Enviar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div v-show="isMobile==true" class="column tam-box mt-2 container has-text-centered  ">
        <div class="column title-box">
            <h2 class="color-letras">{{$t('contraseña.msmRecupera')}}</h2>
        </div>
        <div class="column  cuadro-border" >
            <form class="column  mx-5  px-0" >
                <CampoForm v-if="valorLocale=='en'" place="Email" v-model="email" type="text"  :error="msg_error.email"/>
                <CampoForm v-if="valorLocale=='es'" place="Correo" v-model="email" type="text" :error="msg_error.email"/>
                <div class="column ">
                    <button class="button  color-btn title-box " type="button" @click="validar" style="width:100%">{{$t('contraseña.enviar')}}</button>
                    <button class="button color-btn has-background-danger mt-2 " @click="volver" style="width:100%">{{$t('contraseña.cancel')}}</button>
                </div>
            </form>
        </div>
    </div>

   <!--  <ModalAlert :state="estado" :activador="carga_exitosa">
       <p v-if="comprobar">{{mensaje}}</p>
    </ModalAlert> -->
</template>

<script>
import CampoForm from '../../components/CampoForm.vue'
import { inject, watchEffect } from '@vue/runtime-core'
import { ref } from '@vue/reactivity'
import {GraphQLClient} from 'graphql-request';
import store from '@/store';
import ModalAlert from '../../components/Modals/ModalsAlert.vue'
import i18n from '@/i18n.js'
import { useRouter } from 'vue-router';

export default {
    
    name:'RecoverPass1',
    components:{
        CampoForm,
        ModalAlert,
    }, 
    setup(){
        const isMobile = inject('isMobile')
        const valorLocale = ref('')
        const langStorage = window.localStorage
        const email = ref("")
        const endpoint = store.state.url_backend
        const msg_error = ref({ email: ''})
        const carga_exitosa = ref(false)
        const comprobar = ref(false)
        const mensaje = ref("")
        const router = useRouter()
        const estado = ref(false)

        watchEffect(()=>{
            /* valorLocale.value = langStorage.getItem('lang') */
            valorLocale.value = i18n.global.locale
        })

        const siguientePaso = () =>{
            router.push({name: 'RecoverPass2'})
        }
        const volver = () => {
            router.go(-1)
        }

        const validar = () => {
            msg_error.value.email = ''
    
            if (email.value == ""){
                if(i18n.global.locale == 'en'){
                    msg_error.value.email = 'Email is required'
                }
                if(i18n.global.locale == 'es'){
                    msg_error.value.email  = 'El correo es requerido'
                }
            } 
            
            if (msg_error.value.email == ''){
                console.log("Paso las validaciones")
                forgotPass()
            } else {
                console.log('no paso')
            } 
        }
        
        const forgotPass = () => {
            const client = new GraphQLClient(endpoint)
            client.rawRequest(/* GraphQL */ `
            mutation($email:String!){
              		forgotPassword(input:{
                        email:$email,
                    }){
                        status
                        message
                    }
            }`,
            {
               email:email.value,
            },
            {
               authorization: `Bearer ${localStorage.getItem('user-token')}` 
            })
            .then((data) => {
                console.log("Paso: ",data.data.forgotPassword.message)
                mensaje.value = "El envio de correo para actualizar la contraseña fue un exito!"
                comprobar.value = !comprobar.value 
                estado.value = !estado.value
                setTimeout(() => carga_exitosa.value = true ,500)
                setTimeout(() =>carga_exitosa.value = false ,2000)
                setTimeout(() =>comprobar.value = !comprobar.value   ,2000)
                siguientePaso()
              
            }).catch(error => {
                console.log(error.response.errors[0].message);
                mensaje.value = error.response.errors[0].message
                comprobar.value = !comprobar.value 
                setTimeout(() => carga_exitosa.value = true ,500)
                setTimeout(() =>carga_exitosa.value = false ,2000)
                setTimeout(() =>comprobar.value = !comprobar.value   ,2000)

                
            })

        }

        

        return { 
            volver,
            estado,
            siguientePaso,
            mensaje,
            carga_exitosa,
            comprobar,
            msg_error ,
            validar,
            email,
            isMobile,
            valorLocale
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

.input2{
    width:14rem;
    
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
    width: 16rem;
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

  .input2 {
    width: 100%; /* The width is 100%, when the viewport is 800px or smaller */
  }
   .tam-btn {
    width: 100%; /* The width is 100%, when the viewport is 800px or smaller */
  }
}



</style>