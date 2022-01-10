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
                  <!--   <select class="column  select1 mb-4 " >
                        <option value="ISPb">ISPb</option>
                        <option value="PuWiC">PuWiC</option>
                        <option value="Geston">Geston</option>
                    </select> -->

                    <select class="column  select1 mb-4" v-model="selectedApp" >
                        <option v-for="app in apps" :key="app.id" :value="app">{{app.nombre}}</option>
                    </select>

                    <CampoForm type="text" :place="$i18n.locale=='en' ? 'Key':'Llave'" v-model="key" :error="msg_error.key" />
                    
                
                    <div v-show="$i18n.locale=='es'">
                        <textarea class="textarea" v-model="detail" placeholder="Detalles"></textarea>
                    </div>
                    <div v-show="$i18n.locale=='en'">
                        <textarea class="textarea" v-model="detail" placeholder="Details"></textarea>
                    </div>
                   
                
                    <div class="column has-text-centered" >
                        <button class="button has-background-danger has-text-white mr-2"  type="button" style="font-weight:bold;" @click="closeModal" >{{$t('permisos.cancel')}}</button>
                        <button class="button  has-text-white  ml-2" type="button" style="background-color:#005395; font-weight:bold;" @click="validar">{{$t('permisos.guardar')}}</button>
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
    created() {
        this.traerApps()
    },
    setup(props, { emit }){
       
        const endpoint = store.state.url_backend
        const act = ref({activo:false ,cargar:false})
        const key = ref('')
        const detail = ref('')
        const selectedApp = ref('')
        const msg_error = ref({ key: ''})
        const apps = ref([])

        const validar = () => {

        
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
                registrarPermiso()
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
            /* console.log(selectedApp.value)
            console.log(key.value)
            console.log(detail.value)  */
        }


        

        const traerApps = () => {
            const client = new GraphQLClient(endpoint) // creamos la consulta para usarlo luego
            client.rawRequest(/* GraphQL */ `
            query{
                apps(first: 999, page: 1){
                    data{
                        id
                        name
                        logo
                        observation
                        visible
                        licenses {
                            id
                            name
                            price_arg
                            price_usd
                        }
                    }
                    paginatorInfo {
                        count, currentPage, hasMorePages, total
                    }
                }
            }`,
            {
                /* page: parseInt(route.params.page),
                first: mostrar_cantidad.value */
            },
            {
                /* authorization: `Bearer ${ localStorage.getItem('user_token') }` */
            })
            .then((data) => {
                apps.value = []
       /*          if (data.data.apps.data) selectedApp.value = data.data.apps[0].id */
                console.log(data.data.apps.data)
               /*  data.data.apps.forEach(element => {
                    apps.value.push({id:element.id, nombre: element.name})
                    
                })
                console.log(apps.value) */
                console.log("se ejecuto")
            }).catch(error => {
                console.log(error.response);
            })
        }

        const registrarPermiso = () => {
            console.log(localStorage.getItem('user_company_id'))
            const client = new GraphQLClient(endpoint) // creamos la consulta para usarlo luego
            // Estructura FetchQL(url, query, variable, opcions)
            client.rawRequest(/* GraphQL */ `
            mutation($company_user_id: ID!, $key:String!, $detail:String,$use_app_id:ID!){
              	  createsUse_permit(company_user_id: $company_user_id ,input: {
                    key: $key,
                    detail: $detail,
                    use_app_id: $use_app_id,
                    }) {
                        id
                        key
                        detail
                 
                    }
            }`,
            {
                company_user_id: localStorage.getItem('user_company_id'),
                key: key.value,       
                detail: detail.value,
                use_app_id: selectedApp.value.id,
            })
            .then((data) => {
                console.log(data)
                /* console.log(data.data.createsUse_permit.id) */
                let id = data.data.createsUse_permit.id

                /* console.log(id)
                console.log(selectedApp.value) */
                permisos.value.push({id:id, key: key.value, detail: detail.value, app: selectedApp.value.nombre,  activo: false, modalDelete: false})
        
               /*  emit("onCloseModal")
                act.value.activo = true
                act.value.cargar = true
                emit('tengoAct', act)  */
                let accion = "cargarPermission"
                store.commit('verificar_carga',accion) 
                selectedApp.value.id = ""
                selectedApp.value.nombre = ""
                key.value = ""
                detail.value =""

            }).catch(error => {
            console.log(selectedApp.value.id)
            console.log(selectedApp.value.nombre)
            console.log(key.value)
            console.log(detail.value) 
                console.log(error.response);
            })
        }

        return{
            apps,
            msg_error ,
            validar,
            registrarPermiso ,
            key,
            detail,
            app,
            act,
            verificar ,
            closeModal,
            traerApps,
            selectedApp
       
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