<template>
    <div class="conteiner-tablero mt-2 py-4">
        <div  class="head-tablero">
            <TitleBoard :title="$i18n.locale=='en'? 'Permissions' : 'Permisos'"/>
            <hr>
            <div class="body-tablero my-3 px-4">
                <HeadBoard :buttonDefault="false">
                    <Button @click="actionModalAddPermission">
                        {{$t('board.headBoard.agregar')}}
                    </Button>
                </HeadBoard>
            </div>
        </div>
        
        <div class="body-tablero px-4">
            <Board :datas="permisos" :titles="titles" >
                <tr class="has-text-centered row-table" v-for="data in permisos" :key="data.id">
                    <th @click="actionModal(data)">{{data.id}}</th>
                    <td @click="actionModal(data)">{{data.app.name}}</td>
                    <td @click="actionModal(data)">{{data.key}}</td>
                    <td @click="actionModal(data)">{{data.detail}}</td>
                    <Modal :data="data" @onCloseModal="actionModal" @onOpenModalDelete="actionModalDelete" :buttonDefault="false">
                        <button @click="activarEdicion(data)" class="button btn-crenein w-100 my-1">
                            <span class="icon is-small">
                                <i class="fas fa-pencil-alt"></i>
                            </span>
                            <span>{{$t('modal.editar')}}</span>
                        </button>
                    </Modal>
                    <ActionModal :data="data" @onCloseModalAction="actionModalDelete" />
                </tr>
            </Board>

            <Loading v-show="loadingTable"/>
            <NoFoundData v-if="!loadingTable && permisos.length == 0" />

        </div>
        <Pagination @next="camb_pagina" @previous="atras" :lastPage=lastPage :currentPage=currentPage :count="count" :total="total" :firstItem="firstItem" :lastItem="lastItem" :perPage="perPage" :hasMorePages="hasMorePages" />
        <!-- <AddPermission :data="addPermission" @tengoAct="mostrarModal2" @onCloseModal="actionModalAddPermission" />  -->
  <!--       <EditPermission :data="editPermission" @tengoAct="mostrarModal"  @onCloseModal="actionModalEditPermission" /> -->
    </div>


    <div>
    <div class="modal " :class="{'is-active':addPermission}" >
        <div class="modal-background  "></div>
        <div class="modal-card " >
            <header class="modal-card-head has-background-white " >
            <p class="modal-card-title has-text-centered blue-crenein" style="font-size:1.5em; font-weight:bold;">{{$t('permisos.agregar')}}</p>
            <button class="delete" @click="closeModal"  aria-label="close"></button>
            </header>
            <section class="modal-card-body">
                <form action="" class="column">
            
                    <div>
                        <p class="blue-crenein">Aplicación</p>
                        <select class="column select1 mb-4 has-text-dark" v-model="selectedApp" >
                            <option v-for="app in apps" :key="app.id" :value="app">{{app.name}}</option>
                        </select>
                    </div>

                    <CampoForm type="text" :place="$i18n.locale=='en' ? 'Key':'Llave'" 
                     v-model="key" :error="msg_error.key" class="has-text-dark"
                    />

                    <div>
                        <p class="blue-crenein">Visibilidad para usuario</p>
                        <select class="column select1 mb-4 has-text-dark" v-model="visible" >
                            <option value="Visible_to_customers">Visible</option>
                            <option value="Not_visible_to_customers">No visible</option>
                        </select>
                    </div>

                    <div>
                        <p class="blue-crenein">Asignación automática</p>
                    </div>
                    <select class="column select1 mb-4 has-text-dark" v-model="automatic" >
                        <option value="Automatic_assigned">automática</option>
                        <option value="Not_automatic">No automática</option>
                    </select>

                    <textarea class="textarea has-text-dark" v-model="detail" 
                     :placeholder="$i18n.locale=='es'? 'Detalles':'Detail'">
                    </textarea>
                   
                    <div class="column has-text-centered" >
                        <Button class="has-background-danger mr-2" @click="closeModal">
                            {{$t('permisos.cancel')}}
                        </Button>
                        <Button :loading="loading" @click="validar">
                            {{$t('permisos.guardar')}}
                        </Button>
                    </div>
                </form>
            </section>
        </div>
    </div>
    </div> 

   <div>
        <div class="modal " :class="{'is-active':editPermission}" >
        <div class="modal-background  "></div>
        <div class="modal-card " >
            <header class="modal-card-head has-background-white " >
            <p class="modal-card-title has-text-centered blue-crenein" style="font-size:1.5em; font-weight:bold;">{{$t('permisos.editar')}}</p>
            <button class="delete" @click="closeModal" aria-label="close"></button>
            </header>
            <section class="modal-card-body">
                <form action="" class="column">
                    <select class="column  select1 mb-4 has-text-dark" v-model="selectedApp" >
                        <option v-for="app in apps" :key="app.id" :value="app">{{app.name}}</option>
                    </select>

                    <CampoForm class="has-text-dark" place="Key" type="text" v-model="key"/>

                    <div>
                        <p class="blue-crenein">Visibilidad para usuario</p>
                        <select class="column select1 mb-4 has-text-dark" v-model="visible" >
                            <option value="Visible_to_customers">Visible</option>
                            <option value="Not_visible_to_customers">No visible</option>
                        </select>
                    </div>

                    <div>
                        <p class="blue-crenein">Asignación automática</p>
                    </div>
                    <select class="column select1 mb-4 has-text-dark" v-model="automatic" >
                        <option value="Automatic_assigned">automática</option>
                        <option value="Not_automatic">No automática</option>
                    </select>

                    <textarea class="textarea has-text-dark" :placeholder="$i18n.locale=='es'? 'Detalles':'Detail'"
                        v-model="detail">
                    </textarea>
                
                    <div class="column has-text-centered" >
                        <Button class="has-background-danger mr-2" @click="closeModal">
                            {{$t('permisos.cancel')}}
                        </Button>
                        <Button :loading="loading" @click="validar">
                            {{$t('permisos.guardar')}}
                        </Button>
                    </div>
                </form>
            </section>
    
        </div>
        </div>
    </div>



    <ModalAlert :activador="carga_exitosa">
        <p v-if="comprobar">{{$t('permisos.modalCarga')}}</p>
        <p v-if="comprobar_edi">{{$t('permisos.modalEdicion')}}</p>
    </ModalAlert>

</template>

<script>
import TitleBoard from '../../components/Board/TitleBoard.vue'
import HeadBoard from '../../components/Board/HeadBoard.vue'
import Board from '../../components/Board/Board.vue'
import Pagination from '../../components/Board/Pagination.vue'
import Modal from '../../components/Modal.vue'
import ActionModal from '../../components/Modals/ActionsModal.vue'
import ModalAlert from '../../components/Modals/ModalsAlert.vue'
import EditPermission from './EditPermission.vue'
import AddPermission from './AddPermission.vue'
import { ref } from '@vue/reactivity'
import { inject, watchEffect } from '@vue/runtime-core'
import i18n from '@/i18n.js'
import {GraphQLClient} from 'graphql-request';
import store from '@/store';
import CampoForm from '../../components/CampoForm.vue'
import Loading from '../../components/loading.vue'
import NoFoundData from '../../components/NoFoundData.vue'
import Button from '../../components/Buttons/Button.vue'


export default {
    components: {
        TitleBoard,
        HeadBoard,
        Board,
        Pagination,
        Modal,
        ActionModal,
        AddPermission,
        EditPermission,
        ModalAlert,
        CampoForm,
        Loading,
        NoFoundData,
        Button,
    },

    setup() {
        const isMobile = inject('isMobile')
        const carga_exitosa = ref(false)
        const comprobar = ref(false)
        const comprobar_edi = ref(false)
        const accion_exitosa = ref(false)
        const addPermission = ref(false)
        const editPermission = ref(false)
        const endpoint = store.state.url_backend
        const permisos = ref([])
        const permisos_aux = ref([])
        const key = ref('')
        const detail = ref('')
        const selectedApp = ref('')
        const firtsApp = ref('')
        const visible = ref('Visible_to_customers')
        const automatic = ref('Not_automatic')
        const msg_error = ref({ key: ''})
        const apps = ref([])
        const titles = ref([])
        const id = ref()
        const loadingTable = ref(false)
        const loading = ref(false)     

        const page = ref(1);
        const count = ref();
        const lastPage = ref();
        const total = ref()
        const currentPage = ref()
        const firstItem = ref()
        const lastItem = ref()
        const perPage = ref()
        const hasMorePages = ref()


        const camb_pagina = (valorNext) => {
           /*  console.log('valor sig',valorNext) */
            page.value +=1
            
        }
        const atras = (valorNext) => {
           /*  console.log('valor sig',valorNext) */
            if(valorNext==false) page.value -=1
        }

        const activarEdicion = (data) => {
            editPermission.value = !editPermission.value 
            id.value = data.id
            key.value = data.key
            detail.value = data.detail
            selectedApp.value = data.app
            visible.value = data.public
            automatic.value = data.automatic
        }

        const traerPermisos = () => {
            const client = new GraphQLClient(endpoint) // creamos la consulta para usarlo luego
            client.rawRequest(/* GraphQL */ `
            query($page:Int,$first:Int!) {
                permits(first:$first,page:$page) {
                    paginatorInfo{
                        count
                        currentPage
                        firstItem
                        hasMorePages
                        lastItem
                        lastPage
                        perPage
                        total
                    }	
                    data{
                        id
                        key
                        detail
                        public
                        automatic
                        app{
                            id
                            name
                        }
                    }
                }
            }`,
            {
                page:page.value,
               /* page: parseInt(route.params.page), */
                first: store.state.cant
            })
            .then((data) => {
                permisos.value = []
                let paginacion = data.data.permits.paginatorInfo
               /*  console.log(paginacion) */
                data.data.permits.data.forEach(element => {
                    permisos.value.push({
                        id:element.id, key: element.key, detail: element.detail,
                        app:{ id: element.app.id, name:element.app.name },
                        public: element.public, automatic: element.automatic,
                        activo: false, modalDelete: false
                    })
                })
                lastPage.value = paginacion.lastPage
                count.value = paginacion.count
                total.value = paginacion.total
                currentPage.value = paginacion.currentPage
                firstItem.value = paginacion.firstItem
                lastItem.value = paginacion.lastItem
                perPage.value = paginacion.perPage
                hasMorePages.value = paginacion.hasMorePages

                loadingTable.value = false

            }).catch(error => {
                console.log(error.response)
                loadingTable.value = false
            })
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
                let datos = data.data.apps.data
                if (datos) firtsApp.value = {id: datos[0].id, name: datos[0].name}
                datos.forEach(element => {
                    apps.value.push({id:element.id, name: element.name})
                })
            }).catch(error => {
                console.log(error.response);
            })
        }

        
        watchEffect(() => {
            loadingTable.value = true
           /*  camb_pagina() */
            traerPermisos()
            traerApps()
        })
        

        const closeModal = () => {
            if(addPermission.value) addPermission.value = !addPermission.value
            if(editPermission.value) editPermission.value = !editPermission.value
        }

        const validar = async () => {
            loading.value = true
        
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
                if(addPermission.value){
                    await registrarPermiso()
                }
                if(editPermission.value){
                    await editarPermiso() 
                }              
            } else {
                console.log('no paso')
                // Saltar los errores
            }

            loading.value = false

        }

        const editarPermiso = async () => {
            const client = new GraphQLClient(endpoint) // creamos la consulta para usarlo luego
            await client.rawRequest(/* GraphQL */ `
            mutation($company_user_id:ID!, $id:ID!, $key:String!, $detail:String,$use_app_id:ID!,
                    $public: Public, $automatic: Automatic){
              	modifiesUse_permit (company_user_id: $company_user_id, id: $id, input: {
                    key: $key,
                    detail:  $detail,
                    use_app_id: $use_app_id,
                    public: $public,
                    automatic: $automatic
                }) {
                    id
                    key
                    detail
                    public
                    automatic
                }
            }`,
            {
                company_user_id: localStorage.getItem('user_company_id'),
                id: id.value,
                key: key.value,       
                detail: detail.value,
                use_app_id: selectedApp.value.id,
                public: visible.value,
                automatic: automatic.value
            })
            .then((data) => {
                let aux = permisos.value.find(element => element.id == id.value)
                aux.activo = !aux.activo
                aux.app = selectedApp.value
                aux.key = key.value
                aux.detail = detail.value
                let accion = "edicionPermission"
                store.commit('verificar_carga',accion) 
                editPermission.value = !editPermission.value
                carga_exitosa.value = true
                comprobar_edi.value = true
                setTimeout(() => {
                    carga_exitosa.value = false
                    comprobar_edi.value = false
                } ,3000)

            }).catch(error => {
                let aux = permisos.value.find(element => element.id == id.value)
                aux.activo = !aux.activo
                editPermission.value = !editPermission.value
                console.log(error.response);
            })
        }

        const mostrarModal = (act) => {
            carga_exitosa.value = act.value.activo
            comprobar_edi.value = act.value.edit
            setTimeout(() => {
                carga_exitosa.value = false
                comprobar_edi.value = false
            } ,3000)
        }

        const mostrarModal2 = (act) => {
            carga_exitosa.value = act.value.activo
            comprobar.value = act.value.cargar
            setTimeout(() => {
                carga_exitosa.value = false
                comprobar.value = false
            } ,3000)
        }

        const cerrarModal = () => {
            carga_exitosa.value = false
            if(comprobar_edi.value==true){
                comprobar_edi.value = false
            }
            if(comprobar.value==true){
                comprobar.value = false
            }
        }
        
        watchEffect(()=>{
            i18n.global.locale=='es'? titles.value = ['Aplicacion','Clave','Detalle'] 
            : titles.value = ['App','Key','Detail']
        })  

        // Abre el modal de acciones del elemento que clickeas
        const actionModal = (data) => {
            let aux = permisos.value.find(element => element.id == data.id)
            aux.activo = !aux.activo
        }

        // Abre la ventana emergente para eliminar un elemento de la lista
        const actionModalDelete = (data) => {
            let aux = permisos.value.find(element => element.id == data)
            aux.activo = false
            aux.modalDelete = !aux.modalDelete
        }

        // Abre el modal para agregar un permiso a la lista
        const actionModalAddPermission = () => {
            addPermission.value = !addPermission.value
            resetField()
        }

        // Abre el modal para editar un permiso de la lista
        const actionModalEditPermission = () => {
            permisos.value.forEach(element => element.activo = false)
            editPermission.value = !editPermission.value
            resetField()
        }
        

        const registrarPermiso = async () => {
            const client = new GraphQLClient(endpoint)
            await client.rawRequest(/* GraphQL */ `
            mutation($company_user_id: ID!, $key:String!, $detail:String,$use_app_id:ID!
                    $public: Public!, $automatic: Automatic!){
              	  createsUse_permit(company_user_id: $company_user_id, input: {
                    key: $key,
                    detail: $detail,
                    use_app_id: $use_app_id,
                    public: $public,
                    automatic: $automatic,
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
                public: visible.value,
                automatic: automatic.value
            },
            {
               /*  authorization: `Bearer ${ localStorage.getItem('user_token') }` */
            })
            .then((data) => {
                let id = data.data.createsUse_permit.id
                permisos.value.push(
                    {id:id, key: key.value, detail: detail.value, app: selectedApp.value, 
                    activo: false, modalDelete: false}
                )
                let accion = "cargarPermission"
                store.commit('verificar_carga',accion) 
                addPermission.value = !addPermission.value
                resetField()

                carga_exitosa.value = true
                comprobar.value = true
                setTimeout(() => {
                    carga_exitosa.value = false
                    comprobar.value = false
                } ,3000)

            }).catch(error => {
                addPermission.value = !addPermission.value
                console.log(error.response);
            })
        }

        const resetField = () => {
            key.value = ''
            detail.value = ''
            selectedApp.value = firtsApp.value
            visible.value = 'Visible_to_customers'
            automatic.value = 'Not_automatic'
        }

        return {
            atras ,
            camb_pagina,
            id,
            editarPermiso,
            activarEdicion ,
            // traerApps,
            registrarPermiso,
            validar,
            key,
            detail,
            apps,
            msg_error ,
            selectedApp,
            closeModal,
            endpoint,
            permisos,
            permisos_aux,
            // traerPermisos,
            mostrarModal2 ,
            cerrarModal,
            mostrarModal,
            isMobile,
            carga_exitosa ,
            comprobar ,
            comprobar_edi ,
            accion_exitosa ,
            titles,
            actionModal,
            actionModalDelete,
            addPermission,
            editPermission,
            actionModalAddPermission,
            actionModalEditPermission,
            loadingTable,
            visible,
            automatic,
            loading,
            //traer datos de paginacion
            lastPage,
            page,
            count,
            total,
            currentPage,
            firstItem,
            lastItem, 
            perPage,
            hasMorePages,
        }
    }
}

</script>

<style scoped>

.is-current {
    background-color: #005395;
}

/* scaleSize transitions */
.scaleSize-enter-from, .scaleSize-leave-to {
    opacity: 0;
    transform: scale(.5);
}
.scaleSize-enter-active, .scaleSize-leave-active {
    transition: all .3s ease
}

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