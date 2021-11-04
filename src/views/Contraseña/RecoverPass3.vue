<template>
    <div class="column tam-box mt-2 container has-text-centered  ">
        <div class="column title-box ">
            <h2 v-if="valorLocale=='en'" class="color-letras">Recover your password</h2>
            <h2 v-if="valorLocale=='es'" class="color-letras">Recupera tu contraseña</h2>
        </div>
        <div class="column is-centered  cuadro-border">
            <form action="" class="column  mx-5  px-0 ">
                <CampoForm v-if="valorLocale=='en'" place="Email" v-model="email" type="text"  :error="msg_error.email"/>
                <CampoForm v-if="valorLocale=='es'" place="Correo" v-model="email" type="text" :error="msg_error.email"/>   

                <CampoForm v-if="valorLocale=='en'"  v-model="passNueva" class="mb-3" place="New password" type="text" :error="msg_error.newPass" />
                <CampoForm v-if="valorLocale=='es'" v-model="passNueva" class="mb-3" place="Nueva contraseña" type="text" :error="msg_error.newPass" />

                <CampoForm  v-if="valorLocale=='en'" v-model="passConfirm" place="Confirm password" type="text" :error="msg_error.confirmPass"/>
                <CampoForm  v-if="valorLocale=='es'" v-model="passConfirm" place="Confirmar contraseña" type="text" :error="msg_error.confirmPass" />

                <div class="column  ">
                    <div class="columns ">
                        <div class="column px-0 is-flex-grow-0 ">
                            <button v-if="valorLocale=='en'"  @click="volver"  class=" button color-btn has-background-danger ">Cancel</button>
                            <button v-if="valorLocale=='es'"  @click="volver" class=" button color-btn has-background-danger ">Cancelar</button>
                        </div>
                        <div class="column   has-text-right px-0 ">
                            <button v-if="valorLocale=='en'" type="button" @click="validar" class="button tam-btn color-btn title-box">Send</button>
                            <button v-if="valorLocale=='es'" type="button"  @click="validar" class="button tam-btn color-btn title-box">Enviar</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
  <!--   <ModalAlert :activador="carga_exitosa" :state="estado">
       <p v-if="comprobar">{{mensaje}}</p>
    </ModalAlert> -->

</template>

<script>
import CampoForm from '../../components/CampoForm.vue';
import CampoFormPass from '../../components/CampoFormPass.vue';
import { ref } from '@vue/reactivity'
import { watchEffect } from '@vue/runtime-core';
import {GraphQLClient} from 'graphql-request';
import store from '@/store';
import ModalAlert from '../../components/Modals/ModalsAlert.vue'
import i18n from '@/i18n.js'
import { useRouter } from 'vue-router';
export default {
    
    name:'RecoverPass3',
    components:{
       CampoForm,
       CampoFormPass,
       ModalAlert
    }, 
    
    setup(){
        const valorLocale = ref('')
        const langStorage = window.localStorage
        const passNueva = ref("")
        const passConfirm = ref("")
        const endpoint = store.state.url_backend
        const msg_error = ref({ newPass: '',confirmPass: '',email:''})
        const carga_exitosa = ref(false)
        const comprobar = ref(false)
        const email = ref("")
        const router = useRouter()
        const estado = ref(false)
        const token = store.state.token
        const mensaje = ref("")

        watchEffect(()=>{
            /* valorLocale.value = langStorage.getItem('lang') */
            valorLocale.value = i18n.global.locale
        })
        const volver = () => {
            router.push({name: 'RecoverPass2'})
        }
        const validar = () => {
            msg_error.value.email = ''
            msg_error.value.newPass = ''
            msg_error.value.confirmPass = ''
            if (email.value == ""){
                if(i18n.global.locale == 'en'){
                    msg_error.value.email = 'Email is required'
                }
                if(i18n.global.locale == 'es'){
                    msg_error.value.email  = 'El correo es requerido'
                }
            } 
            if (email.value != ""){
                console.log(validadorFormato(email.value)) 
                if(!validadorFormato(email.value)) {
                    if(i18n.global.locale == 'en'){
                        msg_error.value.email = 'The email must have a correct format'
                    }
                    if(i18n.global.locale == 'es'){
                        msg_error.value.email  = 'El email debe tener un formato correcto'
                    }
                }
            }
            if (passNueva.value == ""){
                if(i18n.global.locale == 'en'){
                    msg_error.value.newPass = 'New password is required'
                }
                if(i18n.global.locale == 'es'){
                    msg_error.value.newPass = 'La contraseña nueva es requerido'
                }
            } 
            if (passConfirm.value == ""){
                if(i18n.global.locale == 'en'){
                    msg_error.value.confirmPass = 'Confirm Password is required'
                }
                if(i18n.global.locale == 'es'){
                    msg_error.value.confirmPass = 'Se requiere confirmar la contraseña nueva'
                }
            } 
            if ( msg_error.value.newPass == '' && msg_error.value.confirmPass == '' && msg_error.value.email == '' && validadorFormato(email.value)){
                console.log("Paso las validaciones")
                updateForgottenPass()
            } else {
                console.log('no paso')
            } 
        }

        const validadorFormato = () => {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email.value)
        }

        const updateForgottenPass = () => {
            const client = new GraphQLClient(endpoint)
            client.rawRequest(/* GraphQL */ `
            mutation($email:String!,$token:String!,$password:String!, $password_confirmation:String!){
              		updateForgottenPassword(input:{
                        email:$email,
                        token:$token
                        password:$password,
                        password_confirmation: $password_confirmation
                    }){
                        status
                        message
                    }
            }`,
            {
                email:email.value,
                token:token,
                password:passNueva.value,
                password_confirmation: passConfirm.value
            },
            {
               authorization: `Bearer ${localStorage.getItem('user-token')}` 
            })
            .then((data) => {
                console.log(data.data.updateForgottenPassword.message);
                router.push({name: 'RecoverPass4'})
                /* comprobar.value = !comprobar.value 
                estado.value = true
                mensaje.value =""
                setTimeout(() => carga_exitosa.value = true ,500)
                setTimeout(() =>carga_exitosa.value = false ,3000)
                setTimeout(() =>comprobar.value = !comprobar.value   ,3000)  */
              
            }).catch(error => {
                /* estado.value = false */
                console.log(error.response);
            })

        }

        return { 
            mensaje ,
            estado,
            validadorFormato  ,
            volver ,
            email,
            updateForgottenPass,
            validar,
            carga_exitosa,
            comprobar,
            msg_error,
            passNueva,
            passConfirm,
            valorLocale ,
        }
    }
 
}
</script>

<style scoped>


form {
  /* Temp */
  padding: 1rem;
  background-color: #fff;
/*   border: 1px solid #ddd;
  border-radius: 4px; */
  width: 22rem;
  /* End Temp */
}
form .form-row {
  margin-bottom: 1rem;
  position: relative;
}
form .form-row:last-child {
  margin-bottom: 0;
}
form .form-row input[type=text] {
  box-sizing: border-box;
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  transition: all 0.5s ease-in-out;
  outline: 0;
}
form .form-row input[type=text] + label[data-placeholder] {
  pointer-events: none;
}
form .form-row input[type=text] + label[data-placeholder]:after {
  content: attr(data-placeholder);
  display: block;
  position: absolute;
  top: 50%;
  left: 0.5rem;
  transform: translate(0%, -50%);
  transition: all 0.5s ease-in-out;
  padding: 0 0.25rem;
  background-color: rgba(255, 255, 255, 0);
}
form .form-row input[type=text]:focus, form .form-row input[type=text]:valid {
  border: 1px solid #005395;
}
form .form-row input[type=text]:focus + label[data-placeholder]:after, form .form-row input[type=text]:valid + label[data-placeholder]:after {
  transform: translate(-5%, -150%) scale(0.9, 0.9);
  color: #005395;
  background-color: white;
}



.tam-box{
    width: 28rem;
}

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
    width: 16rem;;
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
    .form {
        /* Temp */
        padding: 1rem;
        background-color: #fff;
        /*   border: 1px solid #ddd;
        border-radius: 4px; */
        width: 100%;
        /* End Temp */
    }
}



</style>