<template>
    <div class="conteiner-tablero mt-2 py-2">
        <div class="head-tablero">
            <TitleBoard :title="$i18n.locale=='en'? 'Licenses' : 'Licencias'" />

            <hr>
            <div class="body-tablero my-3 px-4">
                <HeadBoard :buttonDefault="false">
                    <button @click="ModalAdd('add')" class="button btn-crenein">{{$t('board.headBoard.agregar')}}</button>
                </HeadBoard>
            </div>
        </div>
        <div class="body-tablero px-4">
            <Board :datas="licenses" :titles="titles">
                <tr class="has-text-centered row-table" v-for="licence in licenses" :key="licence.id">
                    <th @click="actionModal(licence)">{{licence.id}}</th>
                    <td @click="actionModal(licence)">{{licence.name}}</td>
                    <td @click="actionModal(licence)">{{licence.app.name}}</td>
                    <td v-if="licence.price_arg" @click="actionModal(licence)">${{licence.price_arg}}</td>
                    <td v-else @click="actionModal(licence)">$0</td>
                    <td v-if="licence.price_usd" @click="actionModal(licence)">${{licence.price_usd}}</td>
                    <td v-else @click="actionModal(licence)">$0</td>
                    <Modal class="modal-action" :buttonDefault="false" :data="licence" @onCloseModal="actionModal" @onOpenModalDelete="actionModalDelete">
                        <button @click="ModalAddLabel('addLimits', licence)" class="button btn-crenein w-100 my-1">
                            <span class="icon is-small">
                                <i class="fas fa-pencil-alt"></i>
                            </span>
                            <span>{{$t('licence.agregarTope')}}</span>
                        </button>
                        
                        <button @click="ModalAdd('edit', licence)" class="button btn-crenein w-100 my-1">
                            <span class="icon is-small">
                                <i class="fas fa-pencil-alt"></i>
                            </span>
                            <span>{{$t('modal.editar')}}</span>
                        </button>
                    </Modal>
                    <ActionModal :data="licence" @onCloseModalAction="actionModalDelete" />
                </tr>
            </Board>

            <Loading v-show="loading"/>
            <NoFoundData v-if="!loading && licenses.length == 0" />
        </div>
         <Pagination @next="camb_pagina" @previous="atras" :lastPage=lastPage :currentPage=currentPage :count="count" :total="total" :firstItem="firstItem" :lastItem="lastItem" :perPage="perPage" :hasMorePages="hasMorePages" />
    </div>

    <!-- Ventana modal de formulario de agregar licencia-->
    <AddLicence :title="typeAction" v-show="addLicence" @closeModal="ModalAdd">
        <div>
            <section class="modal-card-body">
                <form id="form-create-app" action="" class="column">
                    <CampoForm type="text" :place="$i18n.locale=='en'? 'Name': 'Nombre'" v-model="name" :error="msg_error.name" />

                    <div class="select w-100 mb-4">
                        <select class="w-100 mb-4" v-model="selectedApp">
                            <option v-for="app in apps" :key="app.id" :value="app.id">{{app.name}}</option>
                        </select>
                    </div>

                    <CampoForm type="number" :place="$i18n.locale=='en'? 'Price ARG': 'Precio ARG'" v-model="price_arg" :error="msg_error.price_arg" />
                    <CampoForm type="number" :place="$i18n.locale=='en'? 'Price USD': 'Precio USD'" v-model="price_usd" :error="msg_error.price_usd" />
                
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
    </AddLicence>

    <!-- Ventana modal de formulario de agregar topes de licencia-->
   <AddLabelKey :title="typeAction" v-show="addLimits" @closeModal="ModalAddLabel">
        <div>
            <section class="modal-card-body">
                <form id="form-create-app" action="" class="column">

            
                    <div v-for="label in appsLabel" :key="label.id" >
                        <CampoForm type="text" :place="label.name"/>         
                    </div>

                    <div class="column p-0 has-text-centered">
                        <Button class="has-background-danger mr-2"
                            @click="ModalAddLabel">
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
            <p v-if="typeAction == 'licence.agregar'" v-t="'licence.modalCarga'"></p>
            <p v-else v-t="'licence.modalEdicion'"></p>
        </div>
        <div v-else>
            <p v-if="typeAction == 'licence.agregar'" v-t="'licence.modalCargaError'"></p>
            <p v-else v-t="'licence.modalEdicionError'"></p>
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
import AddLicence from './AddLicence.vue'
import AddLabelKey from '../LabelKeys/AddLabelKey.vue'
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
        AddLicence,
        AddLabelKey,
        CampoForm,
        Loading,
        NoFoundData,
        Button,
    },

    setup() {
        const activeAlert = ref(false)
        const addLicence = ref(false)
        const addLimits = ref(false)
        const apps = ref([])
        const appsLabel = ref([])
        const count = ref();
        const currentPage = ref()
        const endpoint = store.state.url_backend
        const firstItem = ref()
        const hasMorePages = ref()
        const lastItem = ref()
        const lastPage = ref();
        const licenses = ref([])
        const licenceEdition = ref(0)
        const loading = ref(false)
        const loading_form = ref(false)
        const msg_error = ref({ name: '', price_usd: '', price_arg: '' })
        const name = ref('')
        const page = ref(1);
        const perPage = ref()
        const price_arg = ref(0)
        const price_usd = ref(0)
        const selectedApp = ref()
        const succesLoad = ref(false)
        const titles = ref([])
        const total = ref()
        const typeAction = ref('licence.agregar')

        
        /**
         * 
         * Cambia los titulos de la tabla segun el idioma que se seleccione
         * 
         */
        const changeTitleByLanguage = () => {
            i18n.global.locale=='en'? titles.value = ['Name','App','Price ARG','Price USD']
            : titles.value = ['Nombre','Aplicación','Precio ARG','Precio USD']
        }

        /**
         * 
         * Trae todas las licencias
         * 
         */
        const fetchLicenses = () => {
            const client = new GraphQLClient(endpoint)
            client.rawRequest(/* GraphQL */ `
            query($page: Int,$first:Int!){
                licenses(first: $first, page: $page) {
                    data {
                        id,
                        name,
                        price_arg,
                        price_usd,
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
                let paginacion = data.data.licenses.paginatorInfo
                licenses.value = []
                data.data.licenses.data.forEach(element => {
                    licenses.value.push({id:element.id, name:element.name, price_arg:element.price_arg, 
                        price_usd:element.price_usd, app: {id:element.app.id, name: element.app.name}, activo: false, modalDelete: false})
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
            fetchLicenses()
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
                if (data.data.appsVisible.data) selectedApp.value = data.data.appsVisible.data[0].id
                data.data.appsVisible.data.forEach(element => {
                    apps.value.push({id: element.id, name: element.name})
                })
            })
            .catch(error => console.log(error))
        }
        const fetchAppsLabel = (licenses) => {
            appsLabel.value = []
            const cliente = new GraphQLClient(endpoint)
            cliente.rawRequest(/* GraphQL */ `
            query($app_id:ID){
                labelkeysxapp(first:999,page:1,app_id:$app_id){
                    paginatorInfo {
                    count
                    firstItem
                    hasMorePages
                    lastItem
                    lastPage
                    perPage
                    total
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
                app_id: licenses.app.id
            },
            {
               authorization: `Bearer ${ localStorage.getItem('user_token') }` 
            }).then((data) => {
                
                console.log(data.data.labelkeysxapp.data);
                data.data.labelkeysxapp.data.forEach(element => {
                    appsLabel.value.push({id:element.id , name: element.label})
                }) 
            }).catch(error => {
                console.log(error)}
            )
        }

        const register = async () => {
            succesLoad.value = true
            loading_form.value = true
            document.getElementById('form-create-app').addEventListener('submit', function(e) {
                e.preventDefault()
            })
            resetErrorMessage(msg_error.value)

            if (isValid()) {
                typeAction.value == 'licence.agregar' ? await createLicence() : await editLicence()
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
         * Agrega un mensaje de error para los campos precio que sea menor a 0
         * 
         * @param price Variable donde esta el valor del precio
         * @param key nombre del campo que se debe buscar
         * 
         */
        const msgErrorPrice = (price, key='') => {
            if (price < 0) {
                msg_error.value[key] = i18n.global.locale=='es'? 'El precio no puede ser menor que 0' : 'The price cannot be less than 0'
            }
        }

        /**
         * 
         * Verifica que los campos no esten vacios
         * 
         */
        const fieldsIsEmpty = () => {
            isEmpty(name.value, msg_error.value, 'name')
            if (isEmpty(price_arg.value)) price_arg.value = 0
            if (isEmpty(price_usd.value)) price_usd.value = 0

            msgErrorPrice(price_arg.value, 'price_arg')
            msgErrorPrice(price_usd.value, 'price_usd')
        }

        // Funcion para crear una nueva licencia
        const createLicence = async () => {
            const client = new GraphQLClient(endpoint)
            await client.rawRequest(/* GraphQL */ `
            mutation($company_user_id:ID!,$app_id:Int!, $name:String!, $price_arg:Float, $price_usd: Float) {
                createsLic_license(company_user_id:$company_user_id,input: {
                    app_id: $app_id,
                    name: $name,
                    price_arg: $price_arg,
                    price_usd: $price_usd
                }) {
                    id, app_id, name, price_arg, price_usd,
                }
            }`,
            {
                company_user_id:localStorage.getItem('user_company_id'),
                app_id: parseInt(selectedApp.value),
                name: name.value,
                price_arg: parseFloat(price_arg.value),
                price_usd: parseFloat(price_usd.value)
            })
            .then((data) => {
                let data_licence = data.data.createsLic_license
                // Buscamos el nombre de la app correspondiente
                let app = apps.value.find(app => app.id == data_licence.app_id)
                // Insertamos la nueva licencia creada en el array de licencias
                licenses.value.push({id:data_licence.id, name:data_licence.name, price_arg: data_licence.price_arg == 0? null : data_licence.price_arg, 
                        price_usd: data_licence.price_usd == 0? null : data_licence.price_usd , app: {id:data_licence.app_id, name: app.name}, activo: false, modalDelete: false})
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

        const editLicence = async () => {
            const client = new GraphQLClient(endpoint)
            await client.rawRequest(/* GraphQL */ `
            mutation($company_user_id:ID!,$id: ID!, $app_id: Int, $name: String, $price_arg: Float, $price_usd: Float) {
                modifiesLic_license(company_user_id:$company_user_id,id: $id, input: {
                    name: $name,
                    app_id: $app_id,
                    price_arg: $price_arg,
                    price_usd: $price_usd
                }) {
                    id, app_id, name, price_arg, price_usd
                }
            }`,
            {
                company_user_id:localStorage.getItem('user_company_id'),
                id: licenceEdition.value,
                name: name.value,
                price_arg: parseFloat(price_arg.value),
                price_usd: parseFloat(price_usd.value),
            })
            .then((data) => {
                let res = data.data.modifiesLic_license
                let app = apps.value.find(app => app.id == res.app_id)
                let lic_aux = licenses.value.find(licencia => licencia.id == res.id)
                // Asignamos los valores al elemento para que se modifique en la vista del usuario
                lic_aux.name = res.name
                res.price_arg == 0? lic_aux.price_arg = null : lic_aux.price_arg = res.price_arg
                res.price_usd == 0? lic_aux.price_usd = null : lic_aux.price_usd = res.price_usd
                lic_aux.app.id = res.app_id
                lic_aux.app.name = app.name
                // Cerramos la ventana modal
                ModalAdd()
                changeStateModal(true)
                succesLoad.value = false
            })
            .catch(error => {
                ModalAdd()
                changeStateModal(false)
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


        const ModalAddLabel = async (type, data) => {
            
            addLimits.value = !addLimits.value

            if(type=="addLimits"){
                
                
                if (type == 'addLimits') {
                    fetchAppsLabel(data)
                    typeAction.value = 'licence.agregarTope'
                    document.getElementById('form-create-app').reset()
                } 
            }
        }







        const ModalAdd = async (type, data) => {
            
            addLicence.value = !addLicence.value
        
            if (addLicence.value){
                
                resetErrorMessage(msg_error.value)
                
                if (apps.value.length == 0) {
                    await fetchApps()
                }
                /*Verificamos el tipo de accion que se hara, si es editar o agregar para reutilizar un componente
                modal */
                if (type == 'add') {
                    typeAction.value = 'licence.agregar'
                    document.getElementById('form-create-app').reset()
                    name.value = ''
                    price_arg.value = null
                    price_usd.value = null
                } 
                
                else {
                    actionModal(data)
                    licenceEdition.value = data.id
                    typeAction.value = 'licence.editar'
                    name.value = data.name
                    selectedApp.value = data.app.id
                    price_arg.value = data.price_arg
                    price_usd.value = data.price_usd
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
            let aux = licenses.value.find(element => element.id == data.id)
            aux.activo = !aux.activo
        }

        const actionModalDelete = (data) => {
            let aux = licenses.value.find(element => element.id == data)
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
            addLicence,
            apps,
            atras ,
            camb_pagina,
            count,
            createLicence,
            currentPage,
            firstItem,
            hasMorePages,
            lastItem, 
            lastPage,
            licenses,
            loading,
            loading_form,
            ModalAdd,
            msg_error,
            name,
            page,
            perPage,
            price_arg,
            price_usd,
            register,
            selectedApp,
            succesLoad,
            titles,
            total,
            typeAction,
            addLimits,
            ModalAddLabel,
            appsLabel,
            fetchAppsLabel
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