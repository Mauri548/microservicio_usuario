<template>
    <div class="conteiner-tablero mt-2 py-4">
        <div class="head-tablero">
            <TitleBoard :title="$i18n.locale=='en'? 'Subscriptions' : 'Subscripciones'" />
            <hr>
            <div class="body-tablero my-3 px-4">
                <HeadBoard :buttonDefault="false">
                    <router-link :to="{name: 'AppSuscription'}" class="button btn-crenein">{{$t('appSuscription.agregar')}}</router-link>
                </HeadBoard>             
            </div>
        </div>
        <div class="body-tablero px-4">
            <Board :datas="subscripciones" :titles="titles" >
                <tr class="has-text-centered row-table" v-for="data in subscripciones" :key="data.id">
                    <td @click="actionModal(data)">{{data.nombreApp}}</td>
                    <td @click="actionModal(data)">{{data.licence}}</td>
                    <td @click="actionModal(data)">{{data.companyName}}</td>
           
                    <Modal :data="data" :buttonDefault="false" @onCloseModal="actionModal" 
                     @onOpenModalDelete="actionModalDelete" >
                         <button @click="actualizar(data)" class="button btn-crenein w-100 my-1">
                            <span class="icon is-small">
                                <i class="fas fa-pencil-alt"></i>
                            </span>
                            <span>{{$t('appSuscription.actualizar')}}</span>
                        </button>
                    </Modal>
                    <ActionModal :data="data" @onCloseModalAction="actionModalDelete" />
                </tr>
            </Board>

            <Loading v-show="loading"/>
            <NoFoundData v-if="!loading && subscripciones.length == 0" />
        </div>

        <Pagination @next="camb_pagina" @previous="atras" :lastPage=lastPage :currentPage=currentPage :count="count" :total="total" :firstItem="firstItem" :lastItem="lastItem" :perPage="perPage" :hasMorePages="hasMorePages" />
    </div>
       <!-- Modal de carga exitosa -->
    <ModalAlert :activador="carga_exitosa">
       <p v-if="comprobar">{{$t('appSuscription.modalCarga')}}</p>
       <p v-if="comprobar_edi">{{$t('appSuscription.modalEdicion')}}</p>
    </ModalAlert>
</template>

<script>
import TitleBoard from '../../components/Board/TitleBoard.vue'
import HeadBoard from '../../components/Board/HeadBoard.vue'
import Board from '../../components/Board/Board.vue'
import Pagination from '../../components/Board/Pagination.vue'
import Modal from '../../components/Modal.vue'
import ModalAlert from '../../components/Modals/ModalsAlert.vue'
import ActionModal from '../../components/Modals/ActionsModal.vue'
import { ref } from '@vue/reactivity'
import store from '@/store' 
import {  watchEffect } from '@vue/runtime-core'
import i18n from '@/i18n.js' 
import {GraphQLClient} from 'graphql-request';
import { useRouter } from 'vue-router'
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
        NoFoundData
    },
    created(){
        this.comprobar_carga()
        this.comprobar_edicion()
    },

    setup () {
        const datas = ref([])
        const carga_exitosa = ref(false)
        const comprobar = store.state.carga_exitosa
        const comprobar_edi = store.state.edicion_exitosa
        const company_id = ref();
        const titles = ref([])
        const endpoint = store.state.url_backend
        const subscripciones = ref([])
        const router = useRouter()
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
         * Trae las suscripciones de la empresa actual
         * 
         */
        const actualizar = (data) => {
            router.push({name: 'UpdateSuscription', params: {id: data.id} })
        }


        const traerSuscriptionxCompany = async () => {
            const client = new GraphQLClient(endpoint)
            await client.rawRequest(/* GraphQL */ `
                query($company_id:ID,$page:Int,$first: Int!) {
                    subscriptionsxcompany(first: $first, page: $page,company_id:$company_id) {
                        paginatorInfo {
                            count, currentPage, firstItem, hasMorePages
                            lastItem, lastPage, perPage, total
                        }
                        data {
                            id, use_app_id, use_company_id, lic_license_id
                            company {
                                id, name_fantasy
                            }
                            app {
                                id, name
                            }
                            license {
                                id, name, price_arg
                            }
                        }
                    }
                }`,
                {
                    page:page.value,
                    company_id: company_id.value,
                    first: store.state.cant
                },
                {
                    authorization: `Bearer ${ localStorage.getItem('user-token') }` 
                })
                .then((data) => {
                    let paginacion = data.data.subscriptionsxcompany.paginatorInfo
                    subscripciones.value = []
                    data.data.subscriptionsxcompany.data.forEach(element => {
                        subscripciones.value.push({id:element.id, nombreApp: element.app.name, licence:element.license.name ,companyName:element.company.name_fantasy,activo: false, modalDelete: false})
                    })
                    lastPage.value = paginacion.lastPage
                    count.value = paginacion.count
                    total.value = paginacion.total
                    currentPage.value = paginacion.currentPage
                    firstItem.value = paginacion.firstItem
                    lastItem.value = paginacion.lastItem
                    perPage.value = paginacion.perPage
                    hasMorePages.value = paginacion.hasMorePages

                }).catch(error => {
                    console.log(error.response)
                })
        }

        /**
         * 
         * Reacciona cuando se cambia la empresa
         * 
         */
        watchEffect( async ()=>{
            loading.value = true
            subscripciones.value = []
            store.state.company_id 
            company_id.value = localStorage.getItem('id_company_selected')
            await traerSuscriptionxCompany()
            loading.value = false
        })
        const camb_pagina = (valorNext) => {
            /* console.log('valor sig',valorNext) */
            page.value +=1
            
        }
        const atras = (valorNext) => {
          /*   console.log('valor sig',valorNext) */
            if(valorNext==false) page.value -=1
        }

        // Activa el valor para abrir una ventana modal de ese elemento
        const actionModal = (data) => {
            let aux = subscripciones.value.find(element => element.id == data.id)
            aux.activo = !aux.activo
        }

        // Activa el valor de modalDelete para abrir el modal de aviso 
        const actionModalDelete = (data) => {
            let aux = subscripciones.value.find(element => element.id == data)
            aux.activo = false
            aux.modalDelete = !aux.modalDelete
        }

        watchEffect(()=>{
            i18n.global.locale == 'en'? titles.value = ['App','Licence','Company'] 
            : titles.value = ['App','Licencia','Empresa']
        })

        // Cambia el estado del usuario entre habilitado y deshabilitado
        const ChangeState = (data) => {
            data.state == 'Habilitado'? data.state = 'Deshabilitado' : data.state = 'Habilitado'
        }

        const comprobar_carga = () => {
            if(comprobar==true){
                setTimeout(() => carga_exitosa.value = true ,500)

                let accion = "cargarSus"
                store.commit('verificar_carga',accion)
            }
            setTimeout(() => carga_exitosa.value = false ,3000)
        }
        const comprobar_edicion = () => {
            if(comprobar_edi==true){
                setTimeout(() => carga_exitosa.value = true ,500)

                let accion = "edicionSus"
                store.commit('verificar_carga',accion)
            }
            setTimeout(() => carga_exitosa.value = false ,3000)
        }

        return {
            actualizar,
            loading,
            comprobar_carga,
            comprobar_edicion ,
            carga_exitosa ,
            comprobar ,
            comprobar_edi ,
            subscripciones,
            datas,
            titles,
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
            lastPage,
            atras ,
            camb_pagina,
        }
    }
}
</script>

<style scoped></style>