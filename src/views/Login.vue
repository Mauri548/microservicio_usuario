<template>

        <div class="column  is-mobile  container mt-2 mb-2 cuadro-form" >

            <div class="column " >
                <img src="../assets/logo_crenein.png" width="250" height="200" alt="">
            </div>
        
            <div class="column ">
                <form>

                    <div class="column mx-4 cuadro-central " >
                        
                        <div class="columns">
                            <div class="column is-flex-grow-0 pl-0 pt-4">
                                <label class="label is-size-4" style="color: #005395;"><i class="fas fa-user-alt"></i></label>
                            </div>
                            <div class="column px-0 ">
                                <!-- <div class="control ">
                                    <input class="input" type="text" placeholder="Email">
                                </div> -->

                                <CampoForm place="Email" type="text" v-model="email" :error="msg_error.email" />
                            </div>    
                        </div> 

                        <div class="columns">
                            <div class="column is-flex-grow-0 pl-0 mr-1 pt-4">
                                <label class="label is-size-4" style="color: #005395;"><i class="fas fa-lock"></i></label>
                            </div>
                            <div class="column px-0 ">
                             <!--    <div class="control ">
                                    <input class="input" type="password" placeholder="Password">
                                </div> -->
                                <CampoFormPassword place="Password" v-model="password" :error="msg_error.password" />
                            </div>   
                        </div> 
                        
                    </div>      

                    <div class="column has-text-centered">
                        <button @click="validar" class="button button2 has-text-white" type="button" style="font-weight:5px;">Login</button>
                        <p  style="color: #005395">¿Olvidaste tu contraseña?</p>
                    </div>

                    <div class="column has-text-centered">
                        <p >o inicia sesion usando: </p>
                        <button class="button button2 has-background-info has-text-white" ><i class="fab fa-facebook-f"></i></button>
                        <button class="button mt-1 button2 has-background-danger has-text-white" ><i class="fab fa-google-plus-g"></i></button>
                        <p style="color: #005395">¿No eres mienbro aun?</p>
                        <router-link :to="{name: 'register'}" style="color: #005395; font-weight:bold;">Registrate gratis</router-link>
                    </div>
                </form>
            </div>
        </div>
        <p></p>
        
</template>

<script>

import { useRouter } from 'vue-router'
import CampoForm from '../components/CampoForm.vue'
import CampoFormPassword from '../components/CampoFormPass.vue'
import {ref} from '@vue/reactivity'
import i18n from '@/i18n.js'

export default {
    name:'Login',
    components:{
        CampoForm,
        CampoFormPassword
    },
    setup(){
        const email = ref('')
        const password = ref('')
        const router = useRouter()
        const msg_error = ref({  email: '', password: '' })

        const validar = () => {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            msg_error.value.email = ''
            msg_error.value.password = ''

            if (password.value == ""){
                if(i18n.global.locale == 'en'){
                    msg_error.value.password= 'Password is required'
                }
                if(i18n.global.locale == 'es'){
                    msg_error.value.password= 'La contraseña es requerido'
                }
            } 
            if (email.value == ""){
                if(i18n.global.locale == 'en'){
                    msg_error.value.email= 'Email is required'
                }
                if(i18n.global.locale == 'es'){
                    msg_error.value.email= 'El correo es requerido'
                }
            }else if(re.test(email.value)){
                if(i18n.global.locale == 'en'){
                    msg_error.value.email= 'The email must be in a correct format'
                }
                if(i18n.global.locale == 'es'){
                    msg_error.value.email= 'El correo debe tener un formato correcto'
                }
            } 


            if (msg_error.value.email == '' && msg_error.value.password == '' ){
                Logear()
            } else {
                console.log('no paso')
                // Saltar los errores
            } 

        }

        const Logear = () => {
            router.push({name: 'Home'})
        }

        return{
            validar ,
            Logear,
            email,
            password,
            msg_error 

        }
    }
}
</script>

<style>



@media screen and (max-width: 800px) {
  .button2 {
    width: 100%; /* The width is 100%, when the viewport is 800px or smaller */
  }
  .input2 {
    width: 120%; /* The width is 100%, when the viewport is 800px or smaller */
  }
   .borde-form {
    width: 100%; /* The width is 100%, when the viewport is 800px or smaller */
  }
}

.button2{

    width:15rem;
    background-color:#005395;

}


.input2{
     width:12.49rem;
}

.cuadro-form{
    /* box-shadow: -2px 2px 10px; */
    width: 20rem;
}

.cuadro-central{
    width: 15rem;
}
</style>