<template>
    <div class="conteiner-tablero mt-2 py-4">
        <div class="head-tablero">
            <TitleBoard :title="$i18n.locale=='en'? 'Invitations' : 'Invitaciones'" />
            <hr>
            <div class="body-tablero my-3 px-4">
                <HeadBoard :buttonDefault="false">
                    <router-link :to="{name: 'InviteUser'}" class="button btn-crenein">{{$t('inviteUser.invitar')}}</router-link>
                </HeadBoard>             
            </div>
        </div>
        <div class="body-tablero px-4">
            <Board :datas="invitaciones" :titles="titles" >
                <tr class="has-text-centered row-table" v-for="data in invitaciones" :key="data.id">
                    <th @click="actionModal(data)">{{data.id}}</th>
                    <td @click="actionModal(data)">{{data.nombre}}</td>
                    <td @click="actionModal(data)">{{data.email}}</td>
                  <!--   <td @click="actionModal(data)">{{data.created}}</td> -->
           
                    <Modal :data="data" :buttonDefault="false" @onCloseModal="actionModal" 
                     @onOpenModalDelete="actionModalDelete" >
                    </Modal>
                    <ActionModal :data="data" @onCloseModalAction="actionModalDelete" />
                </tr>
            </Board>

            <Loading v-show="loading"/>
            <NoFoundData v-if="!loading && invitaciones.length == 0" />
        </div>

        <Pagination @next="camb_pagina" @previous="atras" :lastPage=lastPage :currentPage=currentPage :count="count" :total="total" :firstItem="firstItem" :lastItem="lastItem" :perPage="perPage" :hasMorePages="hasMorePages" />
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
import {  watch, watchEffect } from '@vue/runtime-core'
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
        NoFoundData
    },

    setup () {
        const datas = ref([])
    
        const titles = ref([])
        const endpoint = store.state.url_backend
        const invitaciones = ref([])
        const company_id = ref();
        const loading = ref(false)

        const page = ref(1);
        const count = ref();
        const total = ref()
        const currentPage = ref()
        const firstItem = ref()
        const lastItem = ref()
        const perPage = ref()
        const hasMorePages = ref()
        const lastPage = ref();

        /**
         * 
         * Trae las invitaciones por empresa
         * 
         */
        const traerInvitaciones =() => {
            const client = new GraphQLClient(endpoint) // creamos la consulta para usarlo luego
            client.rawRequest(/* GraphQL */ `
            query($company_id:ID,$page:Int) {
                    invitationsxcompany(first: 999, page: $page,company_id:$company_id)  {
                    data{
                        id
                        name
                        email
                        use_company_id
                        use_user_id
                        company{
                            id
                            business_name
                        }
                        user{
                            id
                            name
                        }
                    }
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
                }
            }`,
            {
                page:page.value,
                company_id: company_id.value
            },
            {
                authorization: `Bearer ${ localStorage.getItem('user-token') }`
            })
            .then((data) => {
                invitaciones.value = []
                let paginacion = data.data.invitationsxcompany.paginatorInfo
                data.data.invitationsxcompany.data.forEach(element => {
                    invitaciones.value.push({id:element.id, nombre: element.name, email:element.email ,activo: false, modalDelete: false})
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

        watchEffect(()=>{
            loading.value = true
            store.state.company_id 
            company_id.value = localStorage.getItem('id_company_selected')
            traerInvitaciones()
        })

        // Activa el valor para abrir una ventana modal de ese elemento
        const actionModal = (data) => {
            let aux = invitaciones.value.find(element => element.id == data.id)
            aux.activo = !aux.activo
        }

        // Activa el valor de modalDelete para abrir el modal de aviso 
        const actionModalDelete = (data) => {
            let aux = invitaciones.value.find(element => element.id == data)
            aux.activo = false
            aux.modalDelete = !aux.modalDelete
        }
        watchEffect(()=>{
            i18n.global.locale == 'en'? titles.value = ['Full name','Email']
            : titles.value = ['Nombre completo','Correo']
        })

        // Cambia el estado del usuario entre habilitado y deshabilitado
        const ChangeState = (data) => {
            data.state == 'Habilitado'? data.state = 'Deshabilitado' : data.state = 'Habilitado'
        }

        return {
            invitaciones,
            datas,
            titles,
            loading,
            actionModal,
            actionModalDelete,
            ChangeState,
              
            page ,
            count,
            total,
            currentPage,
            firstItem,
            lastItem, 
            perPage,
            hasMorePages,
            lastPage
        }
    }
}
</script>

<style scoped></style>