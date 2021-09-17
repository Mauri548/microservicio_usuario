<template>
    <div class="conteiner-tablero mt-2 py-2">
        <div class="head-tablero">
            <TitleBoard v-show="$i18n.locale=='en'" title="Licenses" />
            <TitleBoard v-show="$i18n.locale=='es'" title="Licencias" />
            <hr>
            <div class="body-tablero my-3 px-4">
                <HeadBoard :buttonDefault="false">
                    <button @click="ModalAdd" class="button btn-crenein">{{$t('board.headBoard.agregar')}}</button>
                </HeadBoard>
            </div>
        </div>
        <div class="body-tablero px-4">
            <Board :datas="licenses" :titles="titles">
                <tr class="has-text-centered row-table" v-for="licence in licenses" :key="licence.id">
                    <th @click="actionModal(licence)">{{licence.id}}</th>
                    <td @click="actionModal(licence)">{{licence.name}}</td>
                    <td @click="actionModal(licence)">{{licence.app.name}}</td>
                    <td @click="actionModal(licence)">${{licence.price_arg}}</td>
                    <td @click="actionModal(licence)">${{licence.price_usd}}</td>
                    <Modal class="modal-action" namePath="EditApp" :data="licence" @onCloseModal="actionModal" @onOpenModalDelete="actionModalDelete" />
                    <ActionModal :data="licence" @onCloseModalAction="actionModalDelete" />
                </tr>
            </Board>
        </div>
        <Pagination/>
    </div>
    <AddLicence title="licence.agregar" v-show="addLicence" @closeModal="ModalAdd">
        <div>
            <section class="modal-card-body">
                <form id="form-create-app" action="" class="column">
                    <CampoForm type="text" place="Name" v-model="name" />

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
                data.data.licenses.forEach(element => {
                    licenses.value.push({id:element.id, name:element.name, price_arg:element.price_arg, 
                        price_usd:element.price_usd, app: {id:element.app.id, name: element.app.name}, activo: false, modalDelete: false})
                })
            })
            .catch(error => console.log(error))
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
                console.log(data)
                if (data.data.appsVisible) selectedApp.value = data.data.appsVisible[0].id
                console.log(selectedApp.value)
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

            if (name.value == "") msg_error.value.name = 'Name is required'
            // if (price_arg.value == 0) msg_error.value.price_arg = 'Price ARG is required'
            // if (price_usd.value == 0) msg_error.value.price_usd = 'Price USD is required'

            if (msg_error.value.name == '' && msg_error.value.price_usd == '' && msg_error.value.price_arg == ''){
                // createLicence()
                console.log('paso')
                ModalAdd()
            } else {
                console.log('no paso')
                // Saltar los errores
            } 

        }

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
                    id,
                    app_id,
                    name,
                    price_arg,
                    price_usd,
                }
            }`,
            {
                app_id: parseInt(selectedApp.value),
                name: name.value,
                price_arg: parseFloat(price_arg.value),
                price_usd: parseFloat(price_usd.value)
            })
            .then((data) => {
                ModalAdd()
            })
            .catch(error => console.log(error))
        }

        const ModalAdd = () => {
            addLicence.value = !addLicence.value
            if (addLicence.value) {
                document.getElementById('form-create-app').reset()
                name.value = ''
                price_arg.value = 0
                price_usd.value = 0
                fetchApps()
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
            price_usd
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