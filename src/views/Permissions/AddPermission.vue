<template>
  
    <div>
        <div class="modal " :class="{'is-active':data}" >
        <div class="modal-background  "></div>
        <div class="modal-card " >
            <header class="modal-card-head has-background-white " >
            <p class="modal-card-title has-text-centered blue-crenein" style="font-size:1.5em; font-weight:bold;">{{$t('permisos.agregar')}}</p>
            <button class="delete" @click="closeModal"  aria-label="close"></button>
            </header>
            <section class="modal-card-body">
                <form action="" class="column">
                    <select class="column  select1 mb-4 " >
                        <option value="ISPb">ISPb</option>
                        <option value="PuWiC">PuWiC</option>
                        <option value="Geston">Geston</option>
                    </select>

                    <CampoForm type="text" :place="$i18n.locale=='en' ? 'Key':'Llave'" v-model="key" :error="msg_error.key" />
                    
                
                    <div v-show="$i18n.locale=='es'">
                        <textarea class="textarea" v-model="detail" placeholder="Detalles"></textarea>
                    </div>
                    <div v-show="$i18n.locale=='en'">
                        <textarea class="textarea" v-model="detail" placeholder="Details"></textarea>
                    </div>
                   
                
                    <div class="column has-text-centered" >
                        <button class="button has-background-danger has-text-white mr-2"  style="font-weight:bold;" @click="closeModal" >{{$t('permisos.cancel')}}</button>
                        <button class="button  has-text-white  ml-2" style="background-color:#005395; font-weight:bold;" @click="validar ">{{$t('permisos.guardar')}}</button>
                    </div>
                </form>
            </section>
        </div>
        </div>
    </div>

</template>

<script>
import CampoForm from '../../components/CampoForm.vue'
import { ref } from '@vue/reactivity'
import {GraphQLClient} from 'graphql-request';
import store from '@/store';
import i18n from '@/i18n.js'

export default {
    name:'AddPermission',
    props: ['data'],
    emits: ['onCloseModal','onOpenModalDelete','tengoAct'],
    components: {
        CampoForm
    },
    setup(props, { emit }){
       
        const endpoint = store.state.url_backend
        const act = ref({activo:false ,cargar:false})
        const key = ref('')
        const detail = ref('')
        const app = ref('')
        const msg_error = ref({ key: ''})


        const validar = () => {

          /*console.log(nombre.value)
            console.log(observation.value)
            console.log(logo.value)
            console.log(visible.value) */
            msg_error.value.key = ''
        
            if (key.value == ""){
                if(i18n.global.locale == 'en'){
                    msg_error.value.key = 'key is required'
                }
                if(i18n.global.locale == 'es'){
                    msg_error.value.key = 'La palabra clave es requerido'
                }
                
            } 
            if (msg_error.value.key == ''){
                verificar()
            } else {
                console.log('no paso')
                // Saltar los errores
            } 

        }


        const closeModal = () => {
            act.value.activo = false
            act.value.cargar = false
            emit("onCloseModal")
        }

        const verificar = () => {
          
            emit("onCloseModal")
            act.value.activo = true
            act.value.cargar = true
            emit('tengoAct', act) 
        }

        const registrarPermiso = () => {
            const client = new GraphQLClient(endpoint) // creamos la consulta para usarlo luego
            // Estructura FetchQL(url, query, variable, opcions)
            client.rawRequest(/* GraphQL */ `
            mutation($key:String!, $detail:String,$app:ID!){
              	  createsUse_permit(input: {
                    key: $key,
                    detail: $detail,
                    use_app_id: $app,
                    }) {
                        id
                        key
                        detail
                    }
            }`,
            {
                key: key.value,       
                detail: detail.value,
                app: app.value,
            },
            {
               /*  authorization: `Bearer ${ localStorage.getItem('user_token') }` */
            })
            .then((data) => {
                router.push({name: 'PermissionsDashboard'}) 
                let accion = "cargarPermission"
                store.commit('verificar_carga',accion) 
            }).catch(error => {
                console.log(error.response);
            })
        }

        return{
            msg_error ,
            validar,
            registrarPermiso ,
            key,
            detail,
            app,
            act,
            verificar ,
            closeModal,
       
        }
    }
}
</script>

<style scoped>

.select1 {

    font-family: Arial, Helvetica, sans-ser;
    color: #777474;
    width: 100%;
    padding: 10px ;
    border: 1px solid #ddd;
    border-radius: 4px;
    background-color: none;
    font-size: 0.9rem;
}

</style>