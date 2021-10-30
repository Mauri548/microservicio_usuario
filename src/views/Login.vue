<template>
    <transition name="alert-error">
        <div v-show="registerError" class="w-100 has-background-danger p-4 has-text-centered">
            <span class="has-text-white is-size-5">Usuario o contraseña incorrecta</span>
        </div>    
    </transition>

    <div class="column  is-mobile  container mt-2 mb-2 cuadro-form" >

        <div class="column " >
            <img src="../assets/logo_crenein.png" width="250" height="200" alt="">
        </div>
    
        <div class="column ">
            <form v-on:keyup.enter="Login">

                <div class="column mx-4 cuadro-central " >
                    
                    <div class="columns is-flex mb-0">
                        <div class="column is-flex-grow-0 pl-0 pt-4">
                            <label class="label is-size-4" style="color: #005395;"><i class="fas fa-user-alt"></i></label>
                        </div>
                        <div class="column px-0 ">
                            <CampoForm place="Email" type="text" v-model="email" />
                        </div>    
                    </div> 

                    <div class="columns is-flex">
                        <div class="column is-flex-grow-0 pl-0 mr-1 pt-4">
                            <label class="label is-size-4" style="color: #005395;"><i class="fas fa-lock"></i></label>
                        </div>
                        <div class="column px-0 ">
                            <CampoFormPassword place="Password" v-model="password" />
                        </div>   
                    </div> 
                    
                </div>      

                <div class="column has-text-centered">
                    <button type="button" @click="Login" class="button button2 has-text-white" 
                        style="font-weight:5px;" :class="{'is-loading': isLoading}"
                    >Login
                    </button>
                    <p  style="color: #005395">¿Olvidaste tu contraseña?</p>
                </div>

                <div class="column has-text-centered">
                    <p >o inicia sesion usando: </p>
                    <button type="button" class="button button2 has-background-info has-text-white" ><i class="fab fa-facebook-f"></i></button>
                    <button type="button" class="button mt-1 button2 has-background-danger has-text-white" ><i class="fab fa-google-plus-g"></i></button>
                    <p style="color: #005395">¿No eres mienbro aun?</p>
                    <router-link :to="{name: 'register'}" style="color: #005395; font-weight:bold;">Registrate gratis</router-link>
                </div>
            </form>
        </div>
    </div>
        
</template>

<script>

import { useRouter } from 'vue-router'
import CampoForm from '../components/CampoForm.vue'
import CampoFormPassword from '../components/CampoFormPass.vue'
import {ref} from '@vue/reactivity'
import FetchMe from '../helper/FetchMe'
import { GraphQLClient } from 'graphql-request'
import store from '@/store'

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
        const endpoint = store.state.url_backend
        const registerError = ref(false)
        const isLoading = ref(false)

        const Login = () => {
            isLoading.value = true
            let client = new GraphQLClient(endpoint)
            client.rawRequest(/* GraphQL */`
            mutation($username: String!, $password: String!) {
                login(input: {
                    username: $username,
                    password: $password,
                }) {
                    access_token
                    user {
                        id, name, email
                    }
                }
            }`,
            {
                username: email.value,
                password: password.value,
            })
            .then( async (data) => {
                console.log(data)
                let token = data.data.login.access_token
                localStorage.setItem('user-token', token)
                store.commit('setToken', token)
                store.commit('setCompanyId', null)
                await FetchMe()
                router.push({name: 'UserDashboard'})
            })
            .catch(error => {
                localStorage.removeItem('user-token')
                isLoading.value = false
                ActiveError()
            })
        }

        /**
         * 
         * Activa la ventana emergente para informar del error
         * Luego de 3 segundo lo desactiva
         * 
         */
        const ActiveError = () => {
            registerError.value = true
            setTimeout(() => {
                registerError.value = false
            },3000)
        }

        return{
            Login, 
            email, password, registerError, isLoading
        }
    }
}
</script>

<style scoped>



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

/* modalAlert transitions */
.alert-error-leave-to {
    opacity: 0;
    transform: translateY(-90px)
}
.alert-error-enter-active {
    animation: temblor .5s ease
}
.alert-error-leave-active {
    transition: all .3s ease
}

@keyframes temblor {
    0% {transform: translateY(-90px); opacity: 0;}
    50% {transform: translateY(0); opacity: 1;}
    60% {transform: translateX(8px);}
    70% {transform: translateX(-8px);}
    80% {transform: translateX(4px);}
    90% {transform: translateX(-4px);}
    100% {transform: translateX(0px);}
}

</style>