<template>

        <div class="column  is-mobile  container mt-2 mb-2 cuadro-form" >

            <div class="column " >
                <img src="../assets/logo_crenein.png" width="250" height="200" alt="">
            </div>
        
            <div class="column ">
                <form v-on:keyup.enter="register">
                    <div class="column mx-4 cuadro-central " >                   
                        <div class="columns is-flex">
                            <div class="column is-flex-grow-0 pl-0 pt-1">
                                <label class="label is-size-4" style="color: #005395;"><i class="fas fa-user-alt"></i></label>
                            </div>
                            <CampoForm place="Name" type="text" v-model="name" :error="msg_error.name" />
                        </div>

                        <div class="columns is-flex">
                            <div class="column is-flex-grow-0 pl-0 pt-1">
                                <label class="label is-size-4" style="color: #005395;"><i class="fas fa-envelope"></i></label>
                            </div>
                            <CampoForm place="Email" type="text" v-model="email" :error="msg_error.email" />
                        </div>


                        <div class="columns is-flex">
                            <div class="column is-flex-grow-0 mr-1 pl-0 pt-1">
                                <label class="label is-size-4" style="color: #005395;"><i class="fas fa-lock"></i></label>
                            </div>
                            <CampoFormPassword place="Password" v-model="password" :error="msg_error.password" />
                        </div> 

                        <div class="columns is-flex">
                            <div class="column is-flex-grow-0 mr-1 pl-0 pt-1">
                                <label class="label is-size-4" style="color: #005395;"><i class="fas fa-lock"></i></label>
                            </div>
                            <CampoFormPassword place="Password confirmation" v-model="password_confirmation" :error="msg_error.password_confirmation" />
                        </div> 
                        
                    </div>      

                    <div class="column has-text-centered">
                        <Button class="button2" :loading="entering" @click="register">
                            Registrarse
                        </Button>
                    </div>

                    <div class="column has-text-centered">
                        <p class="blue-crenein has-text-weight-semibold">Proximamente!</p>
                        <p >o registrate usando: </p>
                        <button type="button" class="button button2 has-background-info has-text-white" ><i class="fab fa-facebook-f"></i></button>
                        <button type="button" class="button mt-1 button2 has-background-danger has-text-white" ><i class="fab fa-google-plus-g"></i></button>
                        <p style="color: #005395">¿Ya tienes cuenta?</p>
                        <router-link :to="{name: 'login'}" style="color: #005395; font-weight:bold;">Inicia sesión</router-link>
                    </div>
                </form>
            </div>
        </div>
        
</template>

<script>
import { ref } from '@vue/reactivity'
import CampoForm from '../components/CampoForm.vue'
import CampoFormPassword from '../components/CampoFormPass.vue'
import { useRouter } from 'vue-router'
import store from '@/store'
import { GraphQLClient } from 'graphql-request'
import FetchMe from '../helper/FetchMe'
import Button from '../components/Buttons/Button.vue'

export default {
    name:'Register',

    components: {
        CampoForm,
        CampoFormPassword,
        Button
    },

    setup(){
        const name = ref('')
        const email = ref('')
        const password = ref('')
        const password_confirmation = ref('')
        const msg_error = ref({ name: '', email: '', password: '', password_confirmation: '' })
        const entering = ref(false)
        const endpoint = store.state.url_backend
        const router = useRouter()
        const id = ref('')

        localStorage.removeItem('id_company_selected')
        localStorage.removeItem('user_id')

        const mutationRegister = async () => {
            console.log('2')

            let client = new GraphQLClient(endpoint)
            await client.rawRequest(/* GraphQL */`
            mutation($name: String!, $email: String!, $password: String!, $password_confirmation: String!) {
                register(input: {
                    name: $name,
                    email: $email,
                    password: $password,
                    password_confirmation: $password_confirmation
                }) {
                    tokens {
                        access_token
                        user {
                            id, name, email
                        }
                    },
                    status
                }
            }`,
            {
                name: name.value,
                email: email.value,
                password: password.value,
                password_confirmation: password_confirmation.value,
            })
            .then((data) => {
                console.log(data)
                let token = data.data.register.tokens.access_token
                if (isSuccess(data.data.register.status)) {
                    localStorage.setItem('user-token', token)
                    store.commit('setToken', token)
                    FetchMe()
                    // store.commit('setComesfromRegister', true)
                    id.value = data.data.register.tokens.user.id
                    // router.push({name: 'CreateCompany'})
                    console.log('3')

                }
            })
            .catch(error => {
                localStorage.removeItem('user-token')
                console.log(error.response)
            })
            console.log('4')

        }

        // userCrenein@gmail.com
        const isInvited = (id) => {
            console.log('6')

            const client = new GraphQLClient(endpoint)
            client.rawRequest(/* GraphQL */`
            query($user_id: ID) {
                userscompaniesxuser(first: 999, page: 1, user_id: $user_id) {
                    data {
                        id, use_user_id, use_company_id,
                        user {
                            id, name
                        }
                    }
                }
            }`,
            {
                user_id: id
            })
            .then((data) => {
                console.log(data)
                console.log(data.data.userscompaniesxuser.data.length)
                if (data.data.userscompaniesxuser.data.length > 0) {
                    store.commit('setComesfromRegister', false)
                    router.push({name: 'PersonalForm'})
                } else {
                    store.commit('setComesfromRegister', true)
                    router.push({name: 'CreateCompany'})
                }
            })
        }

        const isSuccess = (status) => {
            return status == 'SUCCESS'
        }

        /**
         * 
         * resetea los mensaje de errores a vacio
         * 
         */
        const resetErrorMessage = async () => {
            msg_error.value.name = ''
            msg_error.value.email = ''
            msg_error.value.password = ''
            msg_error.value.password_confirmation = ''
        }

        const register = async () => {
            entering.value = true
            resetErrorMessage()
            
            // isValid()? mutationRegister() : entering.value = false
            if (isValid) {
                console.log('1')
                await mutationRegister()
                console.log('5')
                await FetchMe()

                // Hablar con Marce de si se puede hacer eso o si tarda demasiado
                setTimeout(() => {
                    isInvited(id.value)
                    entering.value = false
                },2000)
            } else {
                entering.value = false
            }
        }

        /**
         * 
         * Valida que los campos sean correctos y no esten vacios
         * 
         */
        const isValid = () => {
            isEmpty(name.value, 'name')
            if (!isEmpty(email.value, 'email')) {
                emailValidate()
            }
            isEmpty(password.value, 'password')
            isEmpty(password_confirmation.value, 'password_confirmation')

            isPasswordEqual()

            return !msg_error.value.email && !msg_error.value.password ? true : false
        }

        /**
         * 
         * @param variable es la variable que se recibe para comprobar si esta vacio
         * @param key (opcional) es para introducir el mensaje de error
         * 
         */
        const isEmpty = (variable, key = '') => {
            if (variable) {
                return false
            }
            if (key) {
                addMsgError(key)
            }
            return true
        }

        const isPasswordEqual = () => {
            if (password.value != password_confirmation.value) {
                msg_error.value.password_confirmation = 'El password no coincide'
            }
        }

        /**
         *
         * Agrega el mensaje de error en la variable del objeto
         *  
         * @param key es el dato del dentro del objeto msg_error, ej: msg_error.email
         * 
         */
        const addMsgError = (key) => {
            msg_error.value[key] = 'Este campo no puede estar vacio'
        }

        /**
         * 
         * Agrega el mensaje de error en caso de que el email no sea valido
         * 
         */
        const emailValidate = () => {
            if (!regex_email_validator(email.value)) {
                msg_error.value.email = 'El email debe tener un formato correcto'
            }
        }

        /**
         * 
         * Valida que el email sea un email correcto con la regla 'examle@correo.com'
         * 
         */
        const regex_email_validator = () => {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email.value)
        }

        return {
            name, email, password, password_confirmation, msg_error, entering,
            register
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

.btn-register:hover {
    background-color: #046ec3;
}

.input2{
    width:12.49rem;
}

.cuadro-form{
    width: 20rem;
}

.cuadro-central{
    width: 15rem;
}
</style>