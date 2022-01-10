<template>
    <div class="conteiner-tablero mt-2 py-2">
        <div class="head-tablero">
            <TitleBoard :title="$i18n.locale=='en'? 'Not_events' : 'Not_events'" />

            <hr>
            <div class="body-tablero my-3 px-4">
                <HeadBoard :buttonDefault="false">
                    <button @click="ModalAdd('add')" class="button btn-crenein">{{$t('board.headBoard.agregar')}}</button>
                </HeadBoard>
            </div>
        </div>
        <div class="body-tablero px-4">
            <Board :datas="events" :titles="titles">
                <tr class="has-text-centered row-table" v-for="event in events" :key="event.id">
                    <th @click="actionModal(licence)">{{event.id}}</th>
                    <td @click="actionModal(event)">{{event.event}}</td>
                    <td @click="actionModal(event)">{{event.app.name}}</td>
                    <td @click="actionModal(event)">{{event.type}}</td>
                    <td @click="actionModal(event)">{{event.observation}}</td>

                    <Modal class="modal-action" :buttonDefault="false" :data="event" @onCloseModal="actionModal" @onOpenModalDelete="actionModalDelete">
                        <button @click="ModalAdd('edit', event)" class="button btn-crenein w-100 my-1">
                            <span class="icon is-small">
                                <i class="fas fa-pencil-alt"></i>
                            </span>
                            <span>{{$t('modal.editar')}}</span>
                        </button>
                    </Modal>
                    <ActionModal :data="event" @onCloseModalAction="actionModalDelete" />
                </tr>
            </Board>

            <Loading v-show="loading"/>
            <NoFoundData v-if="!loading && events.length == 0" />
        </div>
         <Pagination @next="camb_pagina" @previous="atras" :lastPage=lastPage :currentPage=currentPage :count="count" :total="total" :firstItem="firstItem" :lastItem="lastItem" :perPage="perPage" :hasMorePages="hasMorePages" />
    </div>

 
    <!-- Ventana modal de formulario carga etiqueta -->
    <AddNotEvent :title="typeAction" v-show="addNotEvent" @closeModal="ModalAdd">
        <div>
            <section class="modal-card-body">
                <form id="form-create-app" action="" class="column">
                    <CampoForm type="text" v-model="event"
                        :place="$i18n.locale=='en'? 'Event name': 'Nombre del Evento'" 
                        :error="msg_error.event" 
                    />

                    <div class="select w-100 mb-4">
                        <select class="w-100 mb-4" v-model="selectedApp" >
                            <option v-for="app in apps" :key="app.id" :value="app">{{app.name}}</option>
                        </select>
                    </div>

                    <div class="select w-100 mb-4">
                        <select class="w-100 mb-4" v-model="selectedType" >
                            <option value="error">error</option>
                            <option value="alert">alert</option>
                            <option value="notification">notification</option>
                        </select>
                    </div>

                    <CampoForm type="text" v-model="observation"
                        :place="$i18n.locale=='en'? 'Observation': 'Observacion'" 
                    />
                
                    <div class="column p-0 has-text-centered">
                        <Button class="has-background-danger mr-2"
                            @click="ModalAdd">
                            {{$t('permisos.cancel')}}
                        </Button>
                        <Button :loading="loading_form" class="ml-2"
                            @click="register">
                            {{$t('permisos.guardar')}}
                        </Button>
                    </div>
                </form>
            </section>
        </div>
    </AddNotEvent>


    <ModalAlert :activador="activeAlert" :state="succesLoad">
        <div v-if="succesLoad">
            <p v-if="typeAction == 'event.agregar'" v-t="'event.modalCarga'"></p>
            <p v-else v-t="'event.modalEdicion'"></p>
        </div>
        <div v-else>
            <p v-if="typeAction == 'event.agregar'" v-t="'event.modalCargaError'"></p>
            <p v-else v-t="'event.modalEdicionError'"></p>
        </div>
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
import AddNotEvent from './AddNotEvent.vue'
import CampoForm from '../../components/CampoForm.vue'
import { ref, watchEffect } from '@vue/runtime-core'
import i18n from '@/i18n.js'
import store from '@/store'
import { GraphQLClient } from 'graphql-request'
import resetErrorMessage from '../../helper/resetErrorMessage'
import isEmpty from '../../helper/FieldIsEmpty'
import Loading from '../../components/loading.vue'
import NoFoundData from '../../components/NoFoundData.vue'
import Button from '../../components/Buttons/Button.vue'


export default {
    components : {
        TitleBoard,
        HeadBoard,
        Board,
        Pagination,
        Modal,
        ActionModal,
        ModalAlert,
        CampoForm,
        Loading,
        NoFoundData,
        Button,
        AddNotEvent
    },

    setup() {
        const activeAlert = ref(false)
        const addNotEvent = ref(false)
        const apps = ref([])
        const appsLabel = ref([])
        const count = ref();
        const currentPage = ref()
        const editLimits = ref(false)
        const endpoint = store.state.url_backend
        const firstItem = ref()
        const hasMorePages = ref()
        const labels = ref([])
        const lastItem = ref()
        const lastPage = ref();
        const events = ref([])
        const eventEdition = ref(0)
        const loading = ref(false)
        const loading_form = ref(false)
        const msg_error = ref({ event: ''})
        const event = ref('')
        const observation = ref('')
        const page = ref(1);
        const perPage = ref()
        const selectedApp = ref('')
        const succesLoad = ref(false)
        const titles = ref([])
        const total = ref()
        const typeAction = ref('licence.agregar')
        const selectLicense = ref(null)
        const tope = ref(null)
        const selectedType = ref('notification')
       
        
        /**
         * 
         * Cambia los titulos de la tabla segun el idioma que se seleccione
         * 
         */
        const changeTitleByLanguage = () => {
            i18n.global.locale =='en'? titles.value = ['Event','App','Type','Observation']
            : titles.value = ['Evento','Aplicación','Tipo','Observacion']
        }

        /**
         * 
         * Trae todas las licencias
         * 
         */
        const fetchEvents = () => {
            const client = new GraphQLClient(endpoint)
            client.rawRequest(/* GraphQL */ `
            query($page: Int,$first:Int!){
                events(first: $first, page: $page) {
                    data {
                        id,
                        app_id,
                        event,
                        type,
                        observation,
                            
                        app {
                            id,
                            name
                        }
                    }
                    paginatorInfo {
                        count, currentPage, firstItem, hasMorePages
                        lastItem, lastPage, perPage, total
                    }
                }
            }`,
            {
                page:page.value,
                first: store.state.cant
            })
            .then((data) => {
                let paginacion = data.data.events.paginatorInfo
                events.value = []
                console.log(data.data.events.data)
                data.data.events.data.forEach(element => {
                    events.value.push({id:element.id,event:element.event, observation:element.observation,type:element.type, app: {id:element.app.id, name: element.app.name}, activo: false, modalDelete: false})
                })
                lastPage.value = paginacion.lastPage
                count.value = paginacion.count
                total.value = paginacion.total
                currentPage.value = paginacion.currentPage
                firstItem.value = paginacion.firstItem
                lastItem.value = paginacion.lastItem
                perPage.value = paginacion.perPage
                hasMorePages.value = paginacion.hasMorePages
                loading.value = false
            })
            .catch(error => {
                console.log(error.response)
                loading.value = false
            })
        }

        watchEffect(() => {
            changeTitleByLanguage()
        })

        watchEffect(() => {
            loading.value = true
            fetchEvents()
           /*  fetchAppsLabel() */
        })
        
        /**
         * 
         * Trae las app y lo almacena
         * 
         */
        const fetchApps = async () => {
            apps.value = []
            const cliente = new GraphQLClient(endpoint)
            await cliente.rawRequest(/* GraphQL */ `
            query {
                  appsVisible(first: 999, page: 1) {
                    data{
                        id
                        name
                    }
                    paginatorInfo 
                    {
                        count, currentPage, hasMorePages, total
                    }
                }
            }`)
            .then((data) => {
                /* console.log(data.data.appsVisible.data); */
                if (data.data.appsVisible.data) selectedApp.value = data.data.appsVisible.data[0].id
                /* console.log(selectedApp.value); */
                data.data.appsVisible.data.forEach(element => {
                    apps.value.push({id: element.id, name: element.name})
                })
                /* console.log(apps.value) */
            })
            .catch(error => console.log(error))
        }


      

        const register = async () => {
            succesLoad.value = true
            loading_form.value = true
            document.getElementById('form-create-app').addEventListener('submit', function(e) {
                e.preventDefault()
            })
            resetErrorMessage(msg_error.value)
                 
            if (isValid()) {
                typeAction.value == 'event.agregar' ? await createsNot_event() : await modifiesNot_event()
            } else {
                console.log('no valido')
            }

            loading_form.value = false
        }

        /**
         * 
         * Valida que no tenga ningun error en los campos
         * 
         */
        const isValid = () => {
            fieldsIsEmpty()

            return checkMessageError(msg_error.value)
        }

        const checkMessageError = (list) => {
            for (let i in list) {
                if (list[i] != '') return false 
            }
            return true
        }

        
       

        /**
         * 
         * Verifica que los campos no esten vacios
         * 
         */
        const fieldsIsEmpty = () => {
            isEmpty(event.value, msg_error.value, 'event')

        }

        // Funcion para crear 
        const createsNot_event = async () => {
           
            const client = new GraphQLClient(endpoint)
            await client.rawRequest(/* GraphQL */ `
            mutation($company_user_id:ID!,$app_id:ID!, $event:String!, $type: TypeEvent!,$observation:String) {
                createsNot_event(company_user_id:$company_user_id,input: {
                    app_id: $app_id,
                    event: $event,
                    type:$type,
                    observation:$observation
                }) {
                    id, app_id, event,type,observation
                }
            }`,
            {
                company_user_id:localStorage.getItem('user_company_id'),
                app_id: parseInt(selectedApp.value.id),
                event: event.value,
                type: selectedType.value,
                observation: observation.value
            })
            .then((data) => {
                
                // Insertamos el nuevo evento creada en el array de licencias
                let event = data.data.createsNot_event
                console.log(event);
                events.value.push({
                    id:event.id,
                    event:event.event, 
                    observation:event.observation,
                    type:event.type, 
                    app: {id: selectedApp.value.id, name: selectedApp.value.name}, 
                    activo: false,
                    modalDelete: false
                }) 
                
                
                // Cerramos la ventana modal
                ModalAdd()
                changeStateModal(true)
                succesLoad.value = false
            })
            .catch(error => {

                ModalAdd()
                changeStateModal(false)
                console.log(error.response)
            })
        }

        const modifiesNot_event = async () => {
            console.log("funcion editar");
            const client = new GraphQLClient(endpoint)
            await client.rawRequest(/* GraphQL */ `
            mutation($company_user_id:ID!,$id: ID!, $app_id: ID!,$event:String!, $type: TypeEvent!,$observation:String) {
                modifiesNot_event(company_user_id:$company_user_id,id: $id, input: {
                    app_id: $app_id,
                    event: $event,
                    type:$type,
                    observation:$observation
                }) {
                    id, app_id, event,type,observation
                }
            }`,
            {
                company_user_id:localStorage.getItem('user_company_id'),
                id: eventEdition.value,
                app_id: parseInt(selectedApp.value.id),
                event: event.value,
                type: selectedType.value,
                observation: observation.value
          
            })
            .then((data) => {
                let res = data.data.modifiesLic_license
                let app = apps.value.find(app => app.id == res.app_id)
                let event_aux = events.value.find(event => event.id == res.id)
                // Asignamos los valores al elemento para que se modifique en la vista del usuario
      
                event_aux.app.id = res.app_id
                event_aux.app.name = app.name
                // Cerramos la ventana modal
                ModalAdd()
                changeStateModal(true)
                succesLoad.value = false
            })
            .catch(error => {
                ModalAdd()
                changeStateModal(false)
                console.log(error.response)
            })
        }

        // Cambia el estado para mostrar la ventana modal de succes o failed
        const changeStateModal =(state) => {
            setTimeout(() => {
                succesLoad.value = state
                activeAlert.value = true
                checkLoad()
            },500)
        }


        

        const ModalAdd = (type, data) => {
            addNotEvent.value = !addNotEvent.value
            /* console.log(selectedApp.value); */
            console.log(addNotEvent.value);
            console.log(type);
            if (addNotEvent.value) {
                resetErrorMessage(msg_error.value)
               /*  console.log(apps.value) */
                
                if (apps.value.length == 0) {
                    fetchApps()
                }
                console.log(apps.value)
                /*Verificamos el tipo de accion que se hara, si es editar o agregar para reutilizar un componente
                modal */
                if (type == 'add') {
                    typeAction.value = 'event.agregar'
                    document.getElementById('form-create-app').reset()
                    event.value = ''
                } else {
                    actionModal(data)
                    eventEdition.value = data.id
                    typeAction.value = 'event.editar'
                    selectedApp.value = data.app
                    event.value = data.event
                    selectedType.value = data.type
                }
            }
        }

        const camb_pagina = (valorNext) => {
            page.value +=1
            
        }

        const atras = (valorNext) => {
            if(valorNext==false) page.value -=1
        }

        const actionModal = (data) => {
            let aux = events.value.find(element => element.id == data.id)
            aux.activo = !aux.activo
            selectLicense.value = data.id
        }

        const actionModalDelete = (data) => {
            let aux = events.value.find(element => element.id == data)
            aux.activo = false
            aux.modalDelete = !aux.modalDelete
        }

        // Cambia el estado de la ventana modal luego de 3s para hacer el efecto de animación y darle tiempo al usuario de leer
        const checkLoad = () => {
            if (activeAlert.value == true) {
                setTimeout(() => {
                    activeAlert.value = false
                },3000)
            }
        }

        return {
            actionModal,
            actionModalDelete,
            activeAlert,
            apps,
            atras ,
            camb_pagina,
            count,
            createsNot_event,
            currentPage,
            editLimits,
            firstItem,
            hasMorePages,
            labels,
            lastItem, 
            lastPage,
            events,
            loading,
            loading_form,
            ModalAdd,
            msg_error,
            event,
            page,
            perPage,
            register,
            selectedApp,
            succesLoad,
            titles,
            total,
            typeAction,
            appsLabel,
            tope,
            addNotEvent ,
            observation,
            selectedType
        }
    }

}
</script>

<style scoped>
    
    .modal-action:hover {
        cursor: default;
    }
    .red {
        background-color: red;
    }
    
</style>