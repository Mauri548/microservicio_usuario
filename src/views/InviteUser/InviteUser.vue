<template>
        <div class="column  ancho is-half is-offset-one-quarter mt-5 " >

            <div class="column has-text-centered " style="margin:auto;">
                <h2  style="font-weight:bold; font-size:1.6em">{{$t('inviteUser.titulo')}}</h2>
                <h3 class="mt-4">{{$t('inviteUser.ingresarMail')}}</h3>
                <div class=" field has-addons column "  >
                        <input class="input" type="text" placeholder="Email">
                        <button class="button is-info">{{$t('inviteUser.enviar')}}</button>
                </div>
                <button class=" mt-4 px-6 button btn" @click="irPermisos">{{$t('inviteUser.continuar')}}</button>
            </div>

       <!--      <div class="column has-text-centered " style="margin:auto;">
                <h2  style="font-weight:bold; font-size:1.6em">{{$t('inviteUser.titulo')}}</h2>
                <h3 class="mt-4">{{$t('inviteUser.ingresarMail')}}</h3>
                <div class=" field has-addons column "  >
                    <input class="input" type="text" placeholder="Nombre">
                    <CampoFormPassword place="Password confirmation" v-model="password_confirmation" :error="msg_error.password_confirmation" />
                </div>
                <button class=" mt-4 px-6 button btn" @click="irPermisos">{{$t('inviteUser.enviar')}}</button>
            </div> -->

        </div>
</template>

<script>
import { inject } from '@vue/runtime-core'
import { useRouter } from 'vue-router';
import store from '@/store';
import {GraphQLClient} from 'graphql-request';
import { ref } from '@vue/reactivity'

export default {
    name:'InviteUser',
    setup(){
        const router = useRouter()
        const isMobile = inject('isMobile')
    	const use_company_id = ref(localStorage.getItem('id_company_selected'))
        const use_user_id = store.state.user_id
        const nombre = ref("")
        const email = ref("")

        const irPermisos = () => {
            router.push({name: 'PermissionsManagement'})
        }


        const enviarInvitacion = () => {
            	const client = new GraphQLClient(endpoint) // creamos la consulta para usarlo luego
            // Estructura FetchQL(url, query, variable, opcions)
            client.rawRequest(/* GraphQL */ `
            mutation($name:String!, $email:String!,$use_company_id:ID!,$use_user_id:ID){
              	  createsUse_invitation ( input: {
                        name: "usuario_test",
                        email: "emanuelfleitas2020@gmail.com",
                        use_company_id:4,
                        use_user_id:4,

                    }) {
                        id
                        name
                        email
                        use_company_id
                        use_user_id
                        company{
                        id
                        name_fantasy
                        }
                        user{
                        id
                        name
                        }
                    }
            }`,
            {
                use_company_id: use_company_id.value,       
                use_user_id: use_user_id.value,
                name: nombre.value,
                email: email.value
        
            },
            {
               authorization: `Bearer ${ localStorage.getItem('user_token') }` 
            })
            .then((data) => {
				console.log("Paso la carga de suscripcion")
                router.push({name: 'SubscriptionsDashboard'}) 
                let accion = "cargarSus"
                store.commit('verificar_carga',accion) 
            }).catch(error => {
                console.log(error.response);
            })
        }

        return{ 
            email,
            nombre ,
            use_company_id,
            use_user_id ,
            enviarInvitacion,
            irPermisos,
            isMobile
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


@media screen and (max-width: 990px) {

  .ancho-campo{
    width:278px;
    margin-left:0px;
}

  

}


</style>