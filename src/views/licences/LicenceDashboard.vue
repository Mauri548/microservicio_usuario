<template>
    <div class="conteiner-tablero mt-2 py-2">
        <div class="head-tablero">
            <TitleBoard v-show="$i18n.locale=='en'" title="Licenses" />
            <TitleBoard v-show="$i18n.locale=='es'" title="Licencias" />
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
        </div>
        <Pagination/>
    </div>

    <!-- Ventana modal de formulario -->
    <AddLicence :title="typeAction" v-show="addLicence" @closeModal="ModalAdd">
        <div>
            <section class="modal-card-body">
                <form id="form-create-app" action="" class="column">
                    <CampoForm type="text" place="Name" v-model="name" :error="msg_error.name" />

                    <div class="select w-100 mb-4">
                        <select class="w-100" v-model="selectedApp" >
                            <option v-for="app in apps" :key="app.id" :value="app.id">{{app.name}}</option>
                        </select>
                    </div>

                    <CampoForm type="number" place="Price ARG" v-model="price_arg" />
                    <CampoForm type="number" place="Price USD" v-model="price_usd" />
                
                    <div class="column p-0 has-text-centered" >
                        <button class="button has-background-danger has-text-white mr-2"  style="font-weight:bold;" @click="closeModal" >{{$t('permisos.cancel')}}</button>
                        <button class="button  has-text-white  ml-2" style="background-color:#005395; font-weight:bold;" @click="validar">{{$t('permisos.guardar')}}</button>
                    </div>
                </form>
            </section>
        </div>
    </AddLicence>
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
import CampoForm from '../../components/CampoForm.vue'
import { ref, watchEffect } from '@vue/runtime-core'
import i18n from '@/i18n.js'
import store from '@/store'
import { GraphQLClient } from 'graphql-request'


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
        CampoForm
    },

    setup() {
        const titles = ref([])
        const licenses = ref([])
        const apps = ref([])
        const addLicence = ref(false)
        const endpoint = store.state.url_backend

        const name = ref('')
        const selectedApp = ref()
        const price_arg = ref(0)
        const price_usd = ref(0)
        const msg_error = ref({ name: '', price_usd: '', price_arg: '' })
        const typeAction = ref('licence.agregar')
        const licenceEdition = ref(0)


        
        watchEffect(()=>{
            if(i18n.global.locale=='es'){
                titles.value = ['Nombre','Aplicación','Precio ARG','Precio USD']
            }
            if(i18n.global.locale=='en'){
                titles.value = ['Name','App','Price ARG','Price USD']
            }
        })

        // Query que trae los datos de la licensias
        watchEffect(() => {
            const client = new GraphQLClient(endpoint)
            client.rawRequest(/* GraphQL */ `
            query {
                licenses {
                    id,
                    name,
                    price_arg,
                    price_usd,
                    app {
                        id,
                        name
                    }
                }
            }
            `)
            .then((data) => {
                console.log('aa')
                licenses.value = []
                data.data.licenses.forEach(element => {
                    licenses.value.push({id:element.id, name:element.name, price_arg:element.price_arg, 
                        price_usd:element.price_usd, app: {id:element.app.id, name: element.app.name}, activo: false, modalDelete: false})
                })
            })
            .catch(error => console.log(error.response))
        })


        // Query para traer las apps
        const fetchApps = () => {
            const cliente = new GraphQLClient(endpoint)
            cliente.rawRequest(/* GraphQL */ `
            query {
                appsVisible {
                    id
                    name
                }
            }
            `)
            .then((data) => {
                if (data.data.appsVisible) selectedApp.value = data.data.appsVisible[0].id
                data.data.appsVisible.forEach(element => {
                    apps.value.push({id: element.id, name: element.name})
                })
            })
            .catch(error => console.log(error))
        }

        // Function que valida los datos del formulario para verificar que sean correctos
        const validar = () => {
            document.getElementById('form-create-app').addEventListener('submit', function(e) {
                e.preventDefault()
            })
            msg_error.value.name = ''
            msg_error.value.price_usd = ''
            msg_error.value.price_arg = ''

            console.log(price_arg.value)
            if (price_arg.value == null || price_arg.value == '') price_arg.value = 0
            if (price_usd.value == null || price_usd.value == '') price_usd.value = 0

            if (name.value == "") msg_error.value.name = 'Name is required'

            console.log(name.value)
            console.log(price_arg.value)
            console.log(price_usd.value)

            if (msg_error.value.name == '' && msg_error.value.price_usd == '' && msg_error.value.price_arg == ''){
                typeAction.value == 'licence.agregar' ? createLicence() : editLicence()
            } else { console.log('no paso') } 
        }

        // Funcion para crear una nueva licencia
        const createLicence = () => {
            const client = new GraphQLClient(endpoint)
            client.rawRequest(/* GraphQL */ `
            mutation($app_id:Int!, $name:String!, $price_arg:Float, $price_usd: Float) {
                createsLic_license(input: {
                    app_id: $app_id,
                    name: $name,
                    price_arg: $price_arg,
                    price_usd: $price_usd
                }) {
                    id, app_id, name, price_arg, price_usd,
                }
            }`,
            {
                app_id: parseInt(selectedApp.value),
                name: name.value,
                price_arg: parseFloat(price_arg.value),
                price_usd: parseFloat(price_usd.value)
            })
            .then((data) => {
                console.log(data)
                let data_licence = data.data.createsLic_license
                // Buscamos el nombre de la app correspondiente
                let app = apps.value.find(app => app.id == data_licence.app_id)
                // Insertamos la nueva licencia creada en el array de licencias
                licenses.value.push({id:data_licence.id, name:data_licence.name, price_arg: data_licence.price_arg == 0? null : data_licence.price_arg, 
                        price_usd: data_licence.price_usd == 0? null : data_licence.price_usd , app: {id:data_licence.app_id, name: app.name}, activo: false, modalDelete: false})
                // Cerramos la ventana modal
                ModalAdd()
            })
            .catch(error => console.log(error))
        }

        const editLicence = () => {
            const client = new GraphQLClient(endpoint)
            client.rawRequest(/* GraphQL */ `
            mutation($id: ID!, $app_id: Int, $name: String, $price_arg: Float, $price_usd: Float) {
                modifiesLic_license(id: $id, input: {
                    name: $name,
                    app_id: $app_id,
                    price_arg: $price_arg,
                    price_usd: $price_usd
                }) {
                    id, app_id, name, price_arg, price_usd
                }
            }`,
            {
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
                res.price_arg == 0? lic_aux.price_arg = null : lic_aux.price_usd 
                lic_aux.price_arg = res.price_arg
                lic_aux.price_usd = res.price_usd
                lic_aux.app.id = res.app_id
                lic_aux.app.name = app.name
                // Cerramos la ventana modal
                ModalAdd()
            })
            .catch(error => console.log(error))
        }

        const ModalAdd = (type, data) => {
            addLicence.value = !addLicence.value
            if (addLicence.value) {
                msg_error.value.name = ''
                fetchApps()
                /*Verificamos el tipo de accion que se hara, si es editar o agregar para reutilizar un componente
                modal */
                if (type == 'add') {
                    typeAction.value = 'licence.agregar'
                    document.getElementById('form-create-app').reset()
                    name.value = ''
                    price_arg.value = null
                    price_usd.value = null
                } else {
                    actionModal(data)
                    licenceEdition.value = data.id
                    typeAction.value = 'licence.editar'
                    let aux = licenses.value.find(licence => licence.id == data.id)
                    name.value = aux.name
                    price_arg.value = aux.price_arg
                    price_usd.value = aux.price_usd
                }
            }
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

        return {
            licenses,
            titles,
            addLicence,
            apps,
            ModalAdd,
            actionModal,
            actionModalDelete,
            createLicence,
            validar,
            name,
            selectedApp,
            price_arg,
            price_usd,
            msg_error,
            typeAction
        }
    }

}
</script>

<style scoped>
    .row-table:hover {
        cursor: pointer;
        background-color: #82c1f12b;
    }
    .modal-action:hover {
        cursor: default;
    }
</style>