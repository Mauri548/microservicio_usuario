<template>
    <div class="conteiner-tablero mt-2 py-2">
        <div class="head-tablero">
            <TitleBoard :title="$i18n.locale=='en'? 'Label Keys' : 'Label Keys'" />

            <hr>
            <div class="body-tablero my-3 px-4">
                <HeadBoard :buttonDefault="false">
                    <button @click="ModalAdd('add')" class="button btn-crenein">{{$t('board.headBoard.agregar')}}</button>
                </HeadBoard>
            </div>
        </div>
        <div class="body-tablero px-4">
            <Board :datas="labelKeys" :titles="titles" :showId="true">
                <tr class="has-text-centered row-table" v-for="labelKey in labelKeys" :key="labelKey.id">
                    <th @click="actionModal(labelKey)">{{labelKey.id}}</th>
                    <td @click="actionModal(labelKey)">{{labelKey.app.name}}</td>
                    <td @click="actionModal(labelKey)">{{labelKey.label}}</td>   
                    <td @click="actionModal(labelKey)">{{labelKey.typekey}}</td>    
                    <Modal class="modal-action" :buttonDefault="false" :data="labelKey" @onCloseModal="actionModal" @onOpenModalDelete="actionModalDelete">
                        <button @click="ModalAdd('edit', labelKey)" class="button btn-crenein w-100 my-1">
                            <span class="icon is-small">
                                <i class="fas fa-pencil-alt"></i>
                            </span>
                            <span>{{$t('modal.editar')}}</span>
                        </button>
                    </Modal>
                    <ActionModal :data="labelKey" @onCloseModalAction="actionModalDelete" />
                </tr>
            </Board>

            <Loading v-show="loading"/>
            <NoFoundData v-if="!loading && labelKeys.length == 0" />
        </div>
         <Pagination @next="camb_pagina" @previous="atras" :lastPage=lastPage :currentPage=currentPage :count="count" :total="total" :firstItem="firstItem" :lastItem="lastItem" :perPage="perPage" :hasMorePages="hasMorePages" />
    </div>
 
    <!-- Ventana modal de formulario carga etiqueta -->
    <AddLabelKey :title="typeAction" v-show="addLabelkey" @closeModal="ModalAdd">
        <div>
            <section class="modal-card-body">
                <form id="form-create-app" action="" class="column">
                    <CampoForm type="text" v-model="name"
                        :place="$i18n.locale=='en'? 'Name': 'Nombre'" 
                        :error="msg_error.name" 
                    />

                    <div class="select w-100 mb-4">
                        <select class="w-100 mb-4" v-model="selectedApp" >
                            <option v-for="app in apps" :key="app.id" :value="app">{{app.name}}</option>
                        </select>
                    </div>

                    <div class="select w-100 mb-4">
                        <select class="w-100 mb-4" v-model="selectedType" >
                            <option value="level_v">level v</option>
                            <option value="level_h">level h</option>
                        </select>
                    </div>
                
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
    </AddLabelKey>

    <ModalAlert :activador="activeAlert" :state="succesLoad">
        <div v-if="succesLoad">
            <p v-if="typeAction == 'labelkey.agregar'" v-t="'labelkey.modalCarga'"></p>
            <p v-else v-t="'labelkey.modalEdicion'"></p>
        </div>
        <div v-else>
            <p v-if="typeAction == 'labelkey.agregar'" v-t="'labelkey.modalCargaError'"></p>
            <p v-else v-t="'labelkey.modalEdicionError'"></p>
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
import AddLabelKey from './AddLabelKey.vue'
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
        AddLabelKey,
        CampoForm,
        Loading,
        NoFoundData,
        Button,
    },

    setup() {
        const activeAlert = ref(false)
        const addLabelkey = ref(false)
        const apps = ref([])
        const count = ref();
        const currentPage = ref()
        const endpoint = store.state.url_backend
        const firstItem = ref()
        const hasMorePages = ref()
        const lastItem = ref()
        const labelKeys = ref([])
        const lastPage = ref();
        const labelEdition = ref(0)
        const loading = ref(false)
        const loading_form = ref(false)
        const msg_error = ref({ name: '' })
        const name = ref('')
        const page = ref(1);
        const perPage = ref()
        const selectedApp = ref()
        const selectedType = ref('level_v')
        const succesLoad = ref(false)
        const titles = ref([])
        const total = ref()
        const typeAction = ref('labelkey.agregar')

        
        /**
         * 
         * Cambia los titulos de la tabla segun el idioma que se seleccione
         * 
         */
        const changeTitleByLanguage = () => {
            i18n.global.locale=='en'? titles.value = ['App','Label','TypeKey']
            : titles.value = ['Aplicación','Etiqueta','TypeKey']
        }

        /**
         * 
         * Trae todas las labelkeys
         * 
         */
        const fetchLabelkeys = () => {
            const client = new GraphQLClient(endpoint)
            client.rawRequest(/* GraphQL */ `
            query($page: Int,$first:Int!){
                labelkeys(first: $first, page: $page) {
                    paginatorInfo {
                        count
                        firstItem
                        hasMorePages
                        lastItem
                        lastPage
                        perPage
                        total
                        currentPage,
                    }
                    data {
                        id
                        app_id
                        label
                        typekey
                        app {
                            id
                            name
                        }
                    }
                }
            }`,
            {
                page:page.value,
                first: store.state.cant
            })
            .then((data) => {
                let paginacion = data.data.labelkeys.paginatorInfo
                
                labelKeys.value = []
                data.data.labelkeys.data.forEach(element => {
                    labelKeys.value.push({id:element.id, label:element.label,typekey:element.typekey, app: {id:element.app.id, name: element.app.name}, activo: false, modalDelete: false})
                })
                console.log(paginacion)
                console.log(labelKeys.value)

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
            fetchLabelkeys()
        })
        
        /**
         * 
         * Trae las app y lo almacena
         * 
         */
        const fetchApps = () => {
            apps.value = []
            const cliente = new GraphQLClient(endpoint)
            cliente.rawRequest(/* GraphQL */ `
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
                if (data.data.appsVisible.data) selectedApp.value = data.data.appsVisible.data[0]
                data.data.appsVisible.data.forEach(element => {
                    apps.value.push({id: element.id, name: element.name})
                })
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
                typeAction.value == 'labelkey.agregar' ? await createLabelKey() : await editLabelKey()
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
            
            for (let i in msg_error.value) {
                if (msg_error.value[i] != '') return false 
            }
            return true
        }

        /**
         * 
         * Verifica que los campos no esten vacios
         * 
         */
        const fieldsIsEmpty = () => {
            isEmpty(name.value, msg_error.value, 'name')
        }

        // Funcion para crear una nueva licencia
        const createLabelKey = async () => {
           
            const client = new GraphQLClient(endpoint)
            await client.rawRequest(/* GraphQL */ `
            mutation($company_user_id:ID!, $label: String!, $app_id: Int!, $typeKey: Typekey!) {
                createsLic_labelkey(company_user_id: $company_user_id, input: {
                    label: $label,
                    app_id: $app_id,
                    typekey: $typeKey
                }) {
                    id, app_id, label, typekey
                }
            }`,
            {
                company_user_id:localStorage.getItem('user_company_id'),
                app_id: parseInt(selectedApp.value.id),
                label: name.value,
                typeKey: selectedType.value,
            })
            .then((data) => {
                const label = data.data.createsLic_labelkey

                labelKeys.value.push({
                    id: label.id, 
                    label: label.label,
                    typekey: label.typekey, 
                    app: {id: selectedApp.value.id, name: selectedApp.value.name}, 
                    activo: false, 
                    modalDelete: false
                })

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

        const editLabelKey = async () => {
            console.log('edit')
            const client = new GraphQLClient(endpoint)
            await client.rawRequest(/* GraphQL */ `
            mutation($company_user_id:ID!, $id: ID!, $app_id: Int, $name: String, $typekey: Typekey) {
                modifiesLic_labelkey(company_user_id: $company_user_id, id: $id, input: {
                    label: $name,
                    app_id: $app_id,
                    typekey: $typekey
                }) {
                    id, app_id, label, typekey
                }
            }`,
            {
                company_user_id:localStorage.getItem('user_company_id'),
                id: labelEdition.value,
                name: name.value,
                app_id: parseInt(selectedApp.value.id),
                typekey: selectedType.value
            })
            .then((data) => {
                
                const label = data.data.modifiesLic_labelkey
                let aux = labelKeys.value.find(element => element.id == label.id)
                aux.label = label.label
                aux.typekey = label.typekey
                aux.app.id = selectedApp.value.id
                aux.app.name = selectedApp.value.name 

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
            addLabelkey.value = !addLabelkey.value
            console.log(type);
            if (addLabelkey.value) {
                resetErrorMessage(msg_error.value)

                console.log(apps.value)
                
                if (apps.value.length == 0) {
                    fetchApps()
                }
                /*Verificamos el tipo de accion que se hara, si es editar o agregar para reutilizar un componente
                modal */
                if (type == 'add') {
                    typeAction.value = 'labelkey.agregar'
                    document.getElementById('form-create-app').reset()
                    name.value = ''
                } else {
                    actionModal(data)
                    labelEdition.value = data.id
                    typeAction.value = 'labelkey.editar'
                    selectedApp.value = data.app
                    name.value = data.label
                    selectedType.value = data.typekey
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
            let aux = labelKeys.value.find(element => element.id == data.id)
            aux.activo = !aux.activo
        }

        const actionModalDelete = (data) => {
            let aux = labelKeys.value.find(element => element.id == data)
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
            addLabelkey,
            apps,
            atras ,
            camb_pagina,
            count,
            currentPage,
            firstItem,
            hasMorePages,
            labelKeys,
            lastItem, 
            lastPage,
            loading,
            loading_form,
            ModalAdd,
            msg_error,
            name,
            page,
            perPage,
            register,
            selectedApp,
            selectedType,
            succesLoad,
            titles,
            total,
            typeAction,
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