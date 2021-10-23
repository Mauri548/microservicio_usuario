<template>
    <div class="conteiner-tablero mt-2 py-4">
        <div  class="head-tablero">
            <div v-if="$i18n.locale=='es'">
                <TitleBoard title="Permisos"/>
            </div>
            <div v-if="$i18n.locale=='en'">
                <TitleBoard title="Permissions"/>
            </div>
            <hr>
            <div class="body-tablero my-3 px-4">
                <HeadBoard :buttonDefault="false">
                    <button @click="actionModalAddPermission" class="button btn-crenein">{{$t('board.headBoard.agregar')}}</button>
                </HeadBoard>
            </div>
        </div>
        
        <div class="body-tablero px-4">
            <Board :datas="permisos" :titles="titles" >
                <tr class="has-text-centered" v-for="data in permisos" :key="data.id">
                    <th @click="actionModal(data)">{{data.id}}</th>
                    <td @click="actionModal(data)">{{data.app}}</td>
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
        </div>
        <Pagination/>
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

   <div>
        <div class="modal " :class="{'is-active':editPermission}" >
        <div class="modal-background  "></div>
        <div class="modal-card " >
            <header class="modal-card-head has-background-white " >
            <p class="modal-card-title has-text-centered blue-crenein" style="font-size:1.5em; font-weight:bold;">{{$t('permisos.editar')}}</p>
            <button class="delete" @click="closeModal"  aria-label="close"></button>
            </header>
            <section class="modal-card-body">
                <form action="" class="column">
                    <select class="column  select1 mb-4" v-model="selectedApp" >
                        <option v-for="app in apps" :key="app.id" :value="app">{{app.nombre}}</option>
                    </select>

                    <CampoForm place="Key" type="text" v-model="key"/>

                    <textarea class="textarea " placeholder="Details" v-model="detail"></textarea>
                
                    <div class="column has-text-centered" >
                        <button class="button has-background-danger has-text-white mr-2"  type="button" style="font-weight:bold;" @click="closeModal" >{{$t('permisos.cancel')}}</button>
                        <button class="button  has-text-white  ml-2"  type="button"  style="background-color:#005395; font-weight:bold;"  @click="validar">{{$t('permisos.guardar')}}</button>
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


      <!-- <div>
            <div class="modal" :class="{'is-active': carga_exitosa}">
                <div class="modal-background " style="background-color: rgb(197, 197, 197, 0.0)"></div>
                <div class="modal-content-width has-text-black" style="border:1px ridge grey;" :class="{'modal-puntowifi-escritorio' : !isMobile, 'modal-puntowifi-mobil' : isMobile}">
                    <div class="container has-text-centered has-background-white" :class="{'p-2':isMobile, 'p-5':!isMobile}" id="modal">
                        <p v-show="comprobar==true" class="has-text-centered has-text-success">Se cargo con exito el permiso.</p>
                        <p v-show="comprobar_edi==true" class="has-text-centered  has-text-success">Se edito con exito el permiso.</p>
                        <div class="columns mt-2">
                            <div class="column">
                                <button class="button w-100 fondo-crenein is-outline btn has-text-white has-text-weight-blod" @click="cerrarModal">Esta bien</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> -->
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
        CampoForm
    },
    created(){
        this.traerPermisos()
        this.traerApps()
    },
   
    setup() {
        const isMobile = inject('isMobile')
        const carga_exitosa = ref(false)
       /*  const comprobar = store.state.carga_exitosa */
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
        const msg_error = ref({ key: ''})
        const apps = ref([])
        const titles = ref([])
        const id = ref()
        

        const activarEdicion = (data) => {
                editPermission.value = !editPermission.value 
                id.value = data.id
                key.value = data.key
                detail.value = data.detail
        }


        watchEffect(() => {
            const client = new GraphQLClient(endpoint) // creamos la consulta para usarlo luego
            client.rawRequest(/* GraphQL */ `
               query {
                        permits(first:999,page:1) {
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
                            app{
                                id
                                name
                            }
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
                    permisos.value = []
                    console.log(data.data.permits.data)
                    data.data.permits.data.forEach(element => {
                        permisos.value.push({id:element.id, key: element.key, detail: element.detail, app:element.app.name,  activo: false, modalDelete: false})
                       /*  console.log(typeof element.logo) */
                    })

                }).catch(error => {
                    console.log(error.response);
                })
            })
        
        const traerPermisos = () => {
            const client = new GraphQLClient(endpoint) // creamos la consulta para usarlo luego
            watchEffect(() => {
                client.rawRequest(/* GraphQL */ `
               query {
                        permits(first:999,page:1) {
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
                            app{
                                id
                                name
                            }
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
                    permisos.value = []
                    data.data.permits.data.forEach(element => {
                        permisos.value.push({id:element.id, key: element.key, detail: element.detail, app:element.app.name,  activo: false, modalDelete: false})
                       /*  console.log(typeof element.logo) */
                    })

                }).catch(error => {
                    console.log(error.response);
                })
            })
        }

        const closeModal = () => {
            if(addPermission.value) addPermission.value = !addPermission.value
            if(editPermission.value) editPermission.value = !editPermission.value
        }

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
                if(addPermission.value){
                    registrarPermiso()
                }
                if(editPermission.value){
                    editarPermiso() 
                }
              
            } else {
                console.log('no paso')
                // Saltar los errores
            } 

        }

        const editarPermiso = () => {


          /*   console.log(id.value)  */


            const client = new GraphQLClient(endpoint) // creamos la consulta para usarlo luego
            // Estructura FetchQL(url, query, variable, opcions)
            client.rawRequest(/* GraphQL */ `
            mutation($id:ID!,$key:String!, $detail:String,$use_app_id:ID!){
              	modifiesUse_permit (id: $id, input: {
                    key: $key,
                    detail:  $detail,
                    use_app_id: $use_app_id,
                }) {
                    id
                    key
                    detail
                   
                }
            }`,
            {
                id: id.value,
                key: key.value,       
                detail: detail.value,
                use_app_id: selectedApp.value.id,
            },
            {
               /*  authorization: `Bearer ${ localStorage.getItem('user_token') }` */
            })
            .then((data) => {
             /*    let ide = data.data.modifiesUse_permit.id */
               /*  console.log("anduvo") */
                let aux = permisos.value.find(element => element.id == id.value)
                aux.activo = !aux.activo
                aux.key = key.value
            /*     console.log(aux) */
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
            /* console.log(act.value.activo) */
            carga_exitosa.value = act.value.activo
            comprobar_edi.value = act.value.edit
            setTimeout(() => {
                carga_exitosa.value = false
                comprobar_edi.value = false
            } ,3000)
        }

        const mostrarModal2 = (act) => {
            /* console.log(act.value.activo) */
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

/*    const datas = ref([
            {id: 1, app: 'ISPB', key: 'customers_table_list', detail: 'Ver lista', activo: false},
            {id: 2, app: 'ISPB', key: 'customers_table_add', detail: 'Agregar cliente', activo: false},
            {id: 3, app: 'ISPB', key: 'customers_table_add', detail: 'Agregar cliente', activo: false},
            {id: 4, app: 'ISPB', key: 'customers_table_add', detail: 'Agregar cliente', activo: false},
            {id: 5, app: 'ISPB', key: 'customers_table_add', detail: 'Agregar cliente', activo: false},
            {id: 6, app: 'ISPB', key: 'customers_table_add', detail: 'Agregar cliente', activo: false},
            {id: 7, app: 'ISPB', key: 'customers_table_add', detail: 'Agregar cliente', activo: false},
            {id: 8, app: 'ISPB', key: 'customers_table_add', detail: 'Agregar cliente', activo: false},
            {id: 9, app: 'ISPB', key: 'customers_table_add', detail: 'Agregar cliente', activo: false},
            {id: 10, app: 'ISPB', key: 'customers_table_add', detail: 'Agregar cliente', activo: false},
        ])  */
      
        
        watchEffect(()=>{
            if(i18n.global.locale=='es'){
                titles.value = ['Aplicacion','Clave','Detalle']
            }
            if(i18n.global.locale=='en'){
                titles.value = ['App','Key','Detail']
            }
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
        }

        // Abre el modal para editar un permiso de la lista
        const actionModalEditPermission = () => {
            permisos.value.forEach(element => element.activo = false)
            editPermission.value = !editPermission.value
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
                console.log(datos[0].id)
                if (datos) selectedApp.value = datos[0].id
                datos.forEach(element => {
                    apps.value.push({id:element.id, nombre: element.name})
                    /*  console.log(typeof element.logo) */
                })
               /*  console.log(apps.value)
                console.log("se ejecuto") */
            }).catch(error => {
                console.log(error.response);
            })
        }

        const registrarPermiso = () => {
            const client = new GraphQLClient(endpoint) // creamos la consulta para usarlo luego
            // Estructura FetchQL(url, query, variable, opcions)
            client.rawRequest(/* GraphQL */ `
            mutation($key:String!, $detail:String,$use_app_id:ID!){
              	  createsUse_permit(input: {
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
                key: key.value,       
                detail: detail.value,
                use_app_id: selectedApp.value.id,
            },
            {
               /*  authorization: `Bearer ${ localStorage.getItem('user_token') }` */
            })
            .then((data) => {

                /* console.log(data.data.createsUse_permit.id) */
                let id = data.data.createsUse_permit.id
                permisos.value.push({id:id, key: key.value, detail: detail.value, app: selectedApp.value.nombre,  activo: false, modalDelete: false})
                let accion = "cargarPermission"
                store.commit('verificar_carga',accion) 
                addPermission.value = !addPermission.value
                selectedApp.value.id = ""
                selectedApp.value.nombre = ""
                key.value = ""
                detail.value =""

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

        return {
            id,
            editarPermiso,
            activarEdicion ,
            traerApps,
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
            traerPermisos,
             mostrarModal2 ,
            cerrarModal,
            mostrarModal,
            isMobile,
            carga_exitosa ,
            comprobar ,
            comprobar_edi ,
            accion_exitosa ,
          /*   datas, */
            titles,
            actionModal,
            actionModalDelete,
            addPermission,
            editPermission,
            actionModalAddPermission,
            actionModalEditPermission

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