<template>
    <div class="conteiner-tablero mt-2 py-2">
        <div class="head-tablero">
            <TitleBoard :title="$i18n.locale=='en'? 'Apps' : 'Aplicaciones'" />
            <hr>
            <div class="body-tablero my-3 px-4">
                <HeadBoard namePath="AddApp"  />
            </div>
        </div>
        <div class="body-tablero px-4">
            <!-- Componente de Tablero -->
            <Board :datas="apps" :titles="titles">
                <tr class="has-text-centered row-table" v-for="app in apps" :key="app.id">
                    <th @click="actionModal(app)" >{{app.id}}</th>
                    <td @click="actionModal(app)">{{app.nombre}}</td>
                    <td @click="actionModal(app)">
                        <img :src="app.logo" width="40" alt="app.logo">
                    </td>
                    <td @click="actionModal(app)">{{app.observacion}}</td>
                    <Modal namePath="EditApp" :data="app"  @onCloseModal="actionModal" @onOpenModalDelete="actionModalDelete" />
                    <ActionModal :data="app" @onDeleteModal="eliminando" @onCloseModalAction="actionModalDelete" />
                </tr>
            </Board>

            <Loading v-show="loading"/>
            <NoFoundData v-if="!loading && apps.length == 0" />
        </div>
   
        <Pagination @next="camb_pagina" @previous="atras" :lastPage=lastPage :currentPage=currentPage :count="count" :total="total" :firstItem="firstItem" :lastItem="lastItem" :perPage="perPage" :hasMorePages="hasMorePages" />
    </div>
    <ModalAlert :activador="carga_exitosa">
       <p v-if="comprobar">{{$t('app.modalCarga')}}</p>
       <p v-if="comprobar_edi">{{$t('app.modalEdicion')}}</p>
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
import ispb from '@/assets/ispb2.png'
import { ref } from '@vue/reactivity'
import store from '@/store';
import {  watchEffect } from '@vue/runtime-core'
import i18n from '@/i18n.js'
import {GraphQLClient, request as fetchGQL} from 'graphql-request';
import { useRouter } from 'vue-router';
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
        ModalAlert,
        Loading,
        NoFoundData,
    },
    created(){
        this.comprobar_carga()
        this.comprobar_edicion()
    },

    setup() {
        const carga_exitosa = ref(false)
        const comprobar = store.state.carga_exitosa
        const comprobar_edi = store.state.edicion_exitosa
        const accion_exitosa = ref(false)
        const paso_elim = ref(false)
        const endpoint = store.state.url_backend
        const apps = ref([])
        const router = useRouter()
        const app_eliminada = ref(false)
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

        const titles = ref([])

        const traerApps = () => {
            const client = new GraphQLClient(endpoint) // creamos la consulta para usarlo luego
            client.rawRequest(/* GraphQL */ `
            query($page:Int){
                apps(first: 999, page: $page){
                    data{
                        id
                        name
                        logo
                        observation
                        visible
                        deleted_at
                        created_at
                        updated_at
                        licenses {
                            id
                            name
                            price_arg
                            price_usd
                        }
                    }
                    paginatorInfo {
                        count, currentPage, firstItem, hasMorePages
                        lastItem, lastPage, perPage, total
                    }
                   
                }
            }`,
            {
                page: page.value
                /* first: mostrar_cantidad.value  */
            },
            {
                authorization: `Bearer ${ localStorage.getItem('user-token') }`
            })
            .then((data) => {
                let paginacion = data.data.apps.paginatorInfo
                apps.value = []
                data.data.apps.data.forEach(element => {
                    apps.value.push({id:element.id, nombre: element.name, logo: ispb, observacion:element.observation ,activo: false, modalDelete: false})
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

            }).catch(error => {
                console.log(error.response)
                loading.value = false
            })
        }
        
        watchEffect(()=>{
            i18n.global.locale=='en'? titles.value = ['Name','Logo','Obvservation']
            : titles.value = ['Nombre','Logo','Obvservación']
        })

        const eliminando = (app_id) => {
     
            actionModalDelete(app_id)
            const client = new GraphQLClient(endpoint)
            console.log(app_id)
            client.rawRequest(/* GraphQL */ `
            mutation($id: ID!){
                 removeUse_app(id: $id) {
                    id
                    name
                    logo
                    observation
                    visible
                }
            }`,
            {
                id: app_id
            },
            {
               /*  authorization: `Bearer ${ localStorage.getItem('user_token') }` */
            })
            .then((data) => {
                let message = data 
                console.log(message.data)
                app_eliminada.value = true
            })
            .catch(error => {
                let mensaje = error.message
              /*   accion_exitosa.value = false
                paso_elim.value = false */
               /*  if(mensaje.includes( 'No se puede eliminar')){
                    mostrar_aviso.value = !mostrar_aviso.value
                    mostrar_nombre.value = anunciante_id
                } */
            })
        }

        watchEffect(()=>{
            loading.value = true 
            traerApps()
        })

        // Activa el valor para abrir una ventana modal de ese elemento
        const actionModal = (data) => {
            let aux = apps.value.find(element => element.id == data.id)
            console.log(aux)
            aux.activo = !aux.activo
            /* router.push({name: 'EditApp', params: {id: aux.id} }) */
        }

        // Activa el valor modalDelete para abrir una ventana de aviso antes de eliminar un elemento
        const actionModalDelete = (data) => {
            let aux = apps.value.find(element => element.id == data)
            aux.activo = false
           /*  console.log(aux.id) */
           /*  eliminando(aux.id)  */
            aux.modalDelete = !aux.modalDelete
        }
        const comprobar_carga = () => {
            if(comprobar==true){
                setTimeout(() => carga_exitosa.value = true ,500)
                let accion = "cargarApp"
                store.commit('verificar_carga',accion)
            }
            setTimeout(() => carga_exitosa.value = false ,3000)
        }
        const comprobar_edicion = () => {
            if(comprobar_edi==true){
                setTimeout(() => carga_exitosa.value = true ,500)

                let accion = "edicionApp"
                store.commit('verificar_carga',accion)
            }
            setTimeout(() => carga_exitosa.value = false ,3000)
        }

    
        return {
            loading,
            eliminando,
            apps,
            carga_exitosa,
            comprobar,
            comprobar_edi,
            accion_exitosa,
            paso_elim,
            titles,
            actionModal,
            actionModalDelete,
            comprobar_carga,
            comprobar_edicion,

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

<style></style>