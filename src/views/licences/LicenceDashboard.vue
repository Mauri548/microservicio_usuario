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
                <tr class="has-text-centered" v-for="licence in licenses" :key="licence.id">
                    <th @click="actionModal(licence)">{{licence.id}}</th>
                    <td @click="actionModal(licence)">{{licence.name}}</td>
                    <td @click="actionModal(licence)">{{licence.app.name}}</td>
                    <td @click="actionModal(licence)">${{licence.price_arg}}</td>
                    <td @click="actionModal(licence)">${{licence.price_usd}}</td>
                    <Modal namePath="EditApp" :data="licence" @onCloseModal="actionModal" @onOpenModalDelete="actionModalDelete" />
                    <ActionModal :data="licence" @onCloseModalAction="actionModalDelete" />
                </tr>
            </Board>
        </div>
        <Pagination/>
    </div>
    <AddLicence v-show="addLicence" @closeModal="ModalAdd" />
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
    },

    setup() {
        const titles = ref([])
        const licenses = ref([])
        const addLicence = ref(false)
        const endpoint = store.state.url_backend
        
        watchEffect(()=>{
            if(i18n.global.locale=='es'){
                titles.value = ['Nombre','Aplicación','Precio ARG','Precio USD']
            }
            if(i18n.global.locale=='en'){
                titles.value = ['Name','App','Price ARG','Price USD']
            }
        })

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
                console.log(data)
                data.data.licenses.forEach(element => {
                    licenses.value.push({id:element.id, name:element.name, price_arg:element.price_arg, 
                        price_usd:element.price_usd, app: {id:element.app.id, name: element.app.name}, activo: false, modalDelete: false})
                })
                console.log(licenses.value)
            })
            .catch(error => console.log(error))
        })

        const ModalAdd = () => {
            addLicence.value = !addLicence.value
        }

        const actionModal = (data) => {
            let aux = licenses.value.find(element => element.id == data.id)
            console.log(aux)
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
            ModalAdd,
            actionModal,
            actionModalDelete,
        }
    }

}
</script>

<style>

</style>