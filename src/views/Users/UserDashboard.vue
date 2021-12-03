<template>
    <div class="conteiner-tablero mt-2 py-4">
        <div class="head-tablero">
            <TitleBoard :title="$i18n.locale=='en'? 'Users': 'Usuarios'" />
            <hr>
            <div class="body-tablero my-3 px-4">
                <HeadBoard :buttonDefault="false">
                    <router-link :to="{name: 'InviteUser'}" class="button btn-crenein">{{$t('inviteUser.invitar')}}</router-link>
                </HeadBoard>             
            </div>
        </div>
        <div class="body-tablero px-4">
            <Board :datas="users" :titles="titles" >
                <tr class="has-text-centered row-table" v-for="data in users" :key="data.id">
                    <th @click="actionModal(data)">{{data.id}}</th>
                    <!-- <td @click="actionModal(data)">{{data.avatar}}</td> -->
                    <td @click="actionModal(data)">{{data.nombre}}</td>
                    <td @click="actionModal(data)">{{data.email}}</td>
                    <!-- <td @click="actionModal(data)">{{data.created}}</td> -->

                    <!-- Preguntar sobre el estado de los usuarios porq no figura en la query -->
                    <!-- <td @click="actionModal(data)">{{data.state}}</td> -->
                    <Modal :data="data" :buttonDefault="false" @onCloseModal="actionModal" 
                    @onOpenModalDelete="actionModalDelete" >
                    <!-- <button @click="ChangeState(data)" v-if="data.state == 'Habilitado'" class="button btn-crenein w-100 my-1">{{$t('user.deshabilitar')}}</button>
                    <button @click="ChangeState(data)" v-else class="button btn-crenein w-100 my-1">{{$t('user.habilitar')}}</button> -->
                    </Modal>
                    <ActionModal :data="data" @onCloseModalAction="actionModalDelete" />
                </tr>
            </Board>

            <Loading v-show="loading"/>
            <NoFoundData v-if="!loading && users.length == 0" />
        </div>
<!--         <Pagination :count="count" :total="total" :currentPage="currentPage" :firstItem="firstItem" :lastItem="lastItem" :perPage="perPage" :hasMorePages="hasMorePages" /> -->
          <Pagination :currentPage=currentPage :count="count" :total="total" :firstItem="firstItem" :lastItem="lastItem" :perPage="perPage" :hasMorePages="hasMorePages" />
    </div>
</template>

<script>
import TitleBoard from '../../components/Board/TitleBoard.vue'
import HeadBoard from '../../components/Board/HeadBoard.vue'
import Board from '../../components/Board/Board.vue'
import Pagination from '../../components/Board/Pagination.vue'
import Modal from '../../components/Modal.vue'
import ActionModal from '../../components/Modals/ActionsModal.vue'
import { ref } from '@vue/reactivity'
import store from '@/store' 
import {  watchEffect } from '@vue/runtime-core'
import i18n from '@/i18n.js' 
import {GraphQLClient, request as fetchGQL} from 'graphql-request';
import Loading from '../../components/loading.vue'
import NoFoundData from '../../components/NoFoundData.vue'


export default {
    components: {
        TitleBoard,
        HeadBoard,
        Board,
        Pagination,
        Modal,
        ActionModal,
        Loading,
        NoFoundData,
    },

    setup () {
        const datas = ref([])
        const titles = ref([])
        const endpoint = store.state.url_backend
        const users = ref([])
        const company_id = ref('');
        const loading = ref(false)

        const count = ref();
        const total = ref()
        const currentPage = ref()
        const firstItem = ref()
        const lastItem = ref()
        const perPage = ref()
        const hasMorePages = ref()

        const traerUsersxCompany = async (id) => {
            const client = new GraphQLClient(endpoint) 
            await client.rawRequest(/* GraphQL */ `
            query($company_id:ID){
                userscompaniesxcompany(first:888,page:1,company_id:$company_id) {
                    data{
                        user {
                            id
                            name
                            email
                        }
                    }
                    paginatorInfo{
                        count
                        total
                        currentPage
                        firstItem
                        lastItem
                        perPage
                        hasMorePages
                    }
                }
            }`,
            {
                company_id: id
            })
            .then((data) => {
                users.value = []
                let datos = data.data.userscompaniesxcompany.data
                let paginacion = data.data.userscompaniesxcompany.paginatorInfo
                datos.forEach(element => {
                    users.value.push({id:element.user.id, nombre: element.user.name, email:element.user.email ,activo: false, modalDelete: false})
                }) 
                count.value = paginacion.count
                total.value = paginacion.total
                currentPage.value = paginacion.currentPage
                firstItem.value = paginacion.firstItem
                lastItem.value = paginacion.lastItem
                perPage.value = paginacion.perPage
                hasMorePages.value = paginacion.hasMorePages
                
                console.log(typeof(count.value))


                loading.value = false
            })
            .catch(error => {
                console.log(error)
                loading.value = false
            })
            return
        }

        watchEffect( async ()=>{
            loading.value = true
            users.value = []
            store.state.company_id
            company_id.value = store.state.company_id
            if (company_id.value) {
                await traerUsersxCompany(company_id.value)
            }
        })

        // Activa el valor para abrir una ventana modal de ese elemento
        const actionModal = (data) => {
            let aux = users.value.find(element => element.id == data.id)
            aux.activo = !aux.activo
        }

        // Activa el valor de modalDelete para abrir el modal de aviso 
        const actionModalDelete = (data) => {
            let aux = users.value.find(element => element.id == data)
            aux.activo = false
            aux.modalDelete = !aux.modalDelete
        }

        /**
         *
         * utilizamos watcheffect para detectar que valor tiene el atributo locale del objeto i18n 
         * al momento de estar en la pagina o al momento de cambiar el valor a traves del boton del lenguaje
         *  
         */ 
        watchEffect(()=>{ 
            i18n.global.locale == 'en'? titles.value = ['Full name','Email'] 
            : titles.value = ['Nombre completo','Correo']
        })

        // Cambia el estado del usuario entre habilitado y deshabilitado
        const ChangeState = (data) => {
            data.state == 'Habilitado'? data.state = 'Deshabilitado' : data.state = 'Habilitado'
        }

        return {
            company_id,
            endpoint,
            users,
            datas,
            titles,
            loading,
            actionModal,
            actionModalDelete,
            ChangeState,

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

<style scoped></style>