<template>
    <AlertErrorLogin :activator="registerError" @onChangeActivator="changeError" />

    <div class="column is-mobile container mt-2 mb-2 cuadro-form">

        <div class="column " >
            <img src="../../assets/logo_crenein.png" width="250" height="200" alt="">
        </div>
    
        <div class="column ">
            <form v-on:keyup.enter="validate">

                <div class="column mx-4 cuadro-central">
                    
                    <div class="columns is-flex mb-0">
                        <div class="column is-flex-grow-0 pl-0 pt-4">
                            <label class="label is-size-4 blue-crenein">
                                <i class="fas fa-user-alt"></i>
                            </label>
                        </div>
                        <div class="column px-0 ">
                            <CampoForm place="Email" type="text" v-model="email" />
                        </div>    
                    </div> 

                    <div class="columns is-flex">
                        <div class="column is-flex-grow-0 pl-0 mr-1 pt-4">
                            <label class="label is-size-4 blue-crenein">
                                <i class="fas fa-lock"></i>
                            </label>
                        </div>
                        <div class="column px-0">
                            <CampoFormPassword place="Password" v-model="password" />
                        </div>   
                    </div> 
                    
                </div>      

                <div class="column has-text-centered">
                    <Button class="button2" :loading="isLoading" @click="validate">
                        Iniciar sesion
                    </Button>

                    
                    <router-link :to="{name: 'RecoverPass1'}" class="blue-crenein has-text-weight-bold">
                        ¿Olvidaste tu contraseña?
                    </router-link>
                </div>

                <div class="column has-text-centered">
                    <p >o inicia sesion usando: </p>

                    <button type="button" class="button button2 has-background-info has-text-white">
                        <i class="fab fa-facebook-f"></i>
                    </button>
                    
                    <button type="button" class="button mt-1 button2 has-background-danger has-text-white">
                        <i class="fab fa-google-plus-g"></i>
                    </button>
                    
                    <p class="blue-crenein">¿No eres mienbro aun?</p>
                    
                    <router-link :to="{name: 'register'}" class="blue-crenein has-text-weight-bold">
                        Registrate gratis
                    </router-link>
                </div>
            </form>
        </div>
    </div>
        
</template>

<script>

import { useRouter } from 'vue-router'
import CampoForm from '../../components/CampoForm.vue'
import CampoFormPassword from '../../components/CampoFormPass.vue'
import {ref} from '@vue/reactivity'
import FetchMe from '../../helper/FetchMe'
import { GraphQLClient } from 'graphql-request'
import store from '@/store'
import AlertErrorLogin from './AlertErrorLogin.vue'
import Button from '../../components/Buttons/Button.vue'

export default {
    name:'Login',
    components:{
        CampoForm,
        CampoFormPassword,
        AlertErrorLogin,
        Button,
    },
    setup(){
        const email = ref('')
        const password = ref('')
        const router = useRouter()
        const endpoint = store.state.url_backend
        const registerError = ref(false)
        const isLoading = ref(false)

        const validate = () => {
            isLoading.value = true

            if (!email.value || !password.value) {
                isLoading.value = false
                return changeError()
            }

            Login()
        }

        const Login = () => {
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
                changeError()
            })
        }

        const changeError = () => {
            registerError.value = !registerError.value
        }

        return{
            validate, changeError, 
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
}

.button2{
    width:15rem;
    background-color:#005395;
}

.cuadro-form{
    width: 20rem;
}

.cuadro-central{
    width: 15rem;
}

</style>