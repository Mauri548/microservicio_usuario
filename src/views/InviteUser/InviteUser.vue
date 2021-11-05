<template>
    <div class="column ancho is-half is-offset-one-quarter mt-5 " >

        <div class="column has-text-centered" style="margin:auto;">
            <h2  style="font-weight:bold; font-size:1.6em">{{$t('inviteUser.titulo')}}</h2>
            <h3 class="mt-4">{{$t('inviteUser.ingresarMail')}}</h3>
            <form v-on:keyup.enter="sendInvitation" class="mt-4">
                <div class="conteiner-button">
                    <CampoForm v-model="name" :place="$i18n.locale=='en'? 'Name': 'Nombre'" type="text" :error="msg_error.name" />
                    <CampoForm class="input-email" v-model="email" :place="$i18n.locale=='en'? 'Email': 'Correo'" type="email" :error="msg_error.email" />
                    <button type="button" class="button is-info btn-enviar" 
                        :class="{'is-loading': sending}"
                        @click="sendInvitation">{{$t('inviteUser.enviar')}}
                    </button>
                </div>

                <button type="button" class="mt-4 px-6 button btn" @click="goToPermissions">{{$t('inviteUser.continuar')}}</button>
            </form>
        </div>

    </div>

    <ModalAlert :activador="activeAlert" :state="deliveryStatus" @onChangeActivator="changeValue">
        <p v-if="deliveryStatus" v-t="'inviteUser.msgInvitationSuccessfuly'"></p>
        <p v-else v-t="'inviteUser.msgInvitationFailed'"></p>
    </ModalAlert>

</template>

<script>
import { ref } from '@vue/runtime-core'
import { useRouter } from 'vue-router';
import CampoForm from '../../components/CampoForm.vue'
import resetErrorMessage from '../../helper/resetErrorMessage'
import isEmpty from '../../helper/FieldIsEmpty'
import emailValidate from '../../helper/EmailValidate'
import store from '@/store'
import { GraphQLClient } from 'graphql-request';
import ModalAlert from '../../components/Modals/ModalsAlert.vue'

export default {
    name:'InviteUser',
    components: {
        CampoForm,
        ModalAlert,
    },

    setup(){
        const router = useRouter()
        const email = ref('')
        const name = ref('')
        const msg_error = ref({name: '', email: ''})
        const endpoint = store.state.url_backend
        const sending = ref(false)
        const activeAlert = ref(false)
        const deliveryStatus = ref(true)

        /**
         * 
         * Resetea los valores a campos vacios
         * 
         */
        const resetValue = () => {
            email.value = ''
            name.value = ''
        }

        /**
         * 
         * Primer paso antes de enviar la invitación
         * 
         */
        const sendInvitation = () => {
            sending.value = true
            resetErrorMessage(msg_error.value)

            isValid()? createInvitation() : sending.value = false
        }

        /**
         * 
         * Cambia el valor del activador de modal
         * Viene desde un componente
         * 
         */
        const changeValue = (value) => {
            activeAlert.value = value
        }

        /**
         * 
         * Verifica que los campos sean validos
         * 
         */
        const isValid = () => {
            isEmpty(name.value, msg_error.value, "name")
            if (!isEmpty(email.value, msg_error.value, "email")) {
                emailValidate(email.value, msg_error.value)
            }

            for (let i in msg_error.value) {
                if (msg_error.value[i] != '') return false
            }
            return true
        }


        /**
         * 
         * Crea la consulta para crear la invitación de un usuario
         * 
         */
        const createInvitation = () => {
            console.log(localStorage.getItem('user_company_id'))
            const client = new GraphQLClient(endpoint)
            client.rawRequest(/* GraphQL */`
            mutation($company_user_id: ID!, $name: String!, $email: String!) {
                createsUse_invitation(company_user_id: $company_user_id,input: {
                    name: $name,
                    email: $email,
                }) {
                    name, email, use_company_id
                }
            }`,
            {
                company_user_id: localStorage.getItem('user_company_id'),
                name: name.value,
                email: email.value,
            },
            {
                authorization: `Bearer ${localStorage.getItem('user-token')}`
            })
            .then((data) => {
                console.log(data)
                normalizeState()
                deliveryStatus.value = true
            })
            .catch(error => {
                console.log(error.response)
                normalizeState()
                deliveryStatus.value = false
            })
        }

        /**
         * 
         * Devuelve los valores a su normalidad
         * 
         */
        const normalizeState = () => {
            resetValue()
            sending.value = false
            activeAlert.value = true
        }

        /**
         * 
         * Redirecciona al usuario a la ventana de permisos
         * 
         */
        const goToPermissions = () => {
            router.push({name: 'PermissionsManagement'})
        }


        return{ 
            email, name, msg_error, sending, activeAlert, deliveryStatus,
            sendInvitation, goToPermissions, changeValue
        }
    }

}
</script>

<style scoped>

.btn{
    background-color:#005395;
    color:white;
    font-weight:bold;
    border-color: #0a518b;
    width: 100%;
}

.ancho{
    margin:auto;
}


.margen-campo{
    margin:auto;
    
}

.ancho-campo{
    width:278px;
    margin:auto;
}

.btn-enviar {
    width: 100%;
}

@media screen and (max-width: 990px) {

    .ancho-campo{
        width:278px;
        margin-left:0px;
    }

}

@media (min-width: 768px) {
    .conteiner-button {
        display: grid;
        grid-template-columns: 3fr 3fr 1fr;
    }

    .input-email {
        margin: 0 10px;
    }
}


</style>