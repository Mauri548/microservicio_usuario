<template>
        <div class="column ancho is-half is-offset-one-quarter mt-5 " >

            <div class="column has-text-centered" style="margin:auto;">
                <h2  style="font-weight:bold; font-size:1.6em">{{$t('inviteUser.titulo')}}</h2>
                <h3 class="mt-4">{{$t('inviteUser.ingresarMail')}}</h3>
                <form class="mt-4">
                    <div class="conteiner-button">
                        <CampoForm v-model="name" :place="$i18n.locale=='en'? 'Name': 'Nombre'" type="text" :error="msg_error.name" />
                        <CampoForm class="input-email" v-model="email" :place="$i18n.locale=='en'? 'Email': 'Correo'" type="email" :error="msg_error.name" />
                        <button type="button" class="button is-info btn-enviar" @click="sendInvitation">{{$t('inviteUser.enviar')}}</button>
                    </div>

                    <button type="button" class="mt-4 px-6 button btn" @click="goToPermissions">{{$t('inviteUser.continuar')}}</button>
                </form>
            </div>

        </div>
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

export default {
    name:'InviteUser',
    components: {
        CampoForm
    },

    setup(){
        const router = useRouter()
        const email = ref('')
        const name = ref('')
        const msg_error = ref({name: '', email: ''})
        const endpoint = store.state.url_backend
    
        const sendInvitation = () => {
            resetErrorMessage(msg_error.value)

            isValid()? console.log('valid') : console.log('invalid')
        }

        const isValid = () => {
            isEmpty(name.value, msg_error.value, "name")
            if (!isEmpty(email.value, msg_error.value, "email")) {
                emailValidate(email.value, msg_error.value)
            }

            console.log(name.value)
            console.log(email.value)
            console.log(msg_error.value.name)
            console.log(msg_error.value.email)

            for (let i in msg_error.value) {
                if (msg_error.value[i] != '') return false
            }
            return true
        }
        /**
         * 
         * IR A SLECTCOMPANY, TRAER LA COMPANY DEL USAURIO0 Y HACER QUE CAMBIE EL ID GUARDANDO EN EL LOCAL STORAGE
         * LUEGO USAR ESA ID DE COMPANY PARA CREAR UNA INVITACION DE USUARIO
         *
         * 
         */

        const createInvitation = () => {
            const client = new GraphQLClient(endpoint)
            client.rawRequest(/* GraphQL */`
            mutation($name: String!, $email: String!, $use_company_id: ID!, $use_user_id: ID) {
                createsUse_invitation(input: {
                    name: $name,
                    email: $email,
                    use_company_id: $use_company_id,
                    use_user_id: $use_user_id
                }) {
                    name, email, use_company_id, use_user_id
                }
            }`,
            {
                name: name.value,
                email: email.value,
                use_user_id: store.state.user_id
            },
            {
                authorization: `Bearer ${localStorage.getItem('user-token')}`
            })
        }

        const goToPermissions = () => {
            router.push({name: 'PermissionsManagement'})
        }


        return{ 
            email, name, msg_error,
            sendInvitation, goToPermissions
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