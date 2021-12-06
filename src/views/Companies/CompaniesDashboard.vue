<template>
    <div class="conteiner-tablero mt-2 py-4">
        <div class="head-tablero">
            <TitleBoard :title="$i18n.locale=='en'? 'Companies' : 'Empresas'" />
            <hr>
            <div class="body-tablero my-3 px-4">
                <HeadBoard :buttonDefault="false">
                    <router-link :to="{name: 'CreateCompany'}" class="button btn-crenein">{{$t('appSuscription.agregar')}}</router-link>
                </HeadBoard>    
            </div>
        </div>
        <div class="body-tablero px-4">
            <Board :datas="companies" :titles="titles" >
                <tr class="has-text-centered row-table" v-for="data in companies" :key="data.id">
                    <th @click="actionModal(data)">{{data.id}}</th>
                    <td @click="actionModal(data)">{{data.nameFantasy}}</td>
                    <td @click="actionModal(data)">{{data.businessName}}</td>
                    <td @click="actionModal(data)">{{data.owners}}</td>
                    <td @click="actionModal(data)">{{data.cuit}}</td>
                    <td @click="actionModal(data)">{{data.email}}</td>
                    <td @click="actionModal(data)">{{data.phone}}</td>
                    <td @click="actionModal(data)">{{data.taxCondition}}</td>
                    <td @click="actionModal(data)">{{data.direction}}</td>
                    <td @click="actionModal(data)">{{data.location}}</td>
                    <td @click="actionModal(data)">{{data.province}}</td>
                    <td @click="actionModal(data)">{{data.country}}</td>
                    <Modal namePath="EditCompany" :data="data" @onCloseModal="actionModal" @onOpenModalDelete="actionModalDelete" />
                    <ActionModal :data="data" @onCloseModalAction="actionModalDelete" />
                </tr>
            </Board>
            <Loading v-show="loading"/>
        </div>
        <Pagination @next="camb_pagina" @previous="atras" :lastPage=lastPage :currentPage=currentPage :count="count" :total="total" :firstItem="firstItem" :lastItem="lastItem" :perPage="perPage" :hasMorePages="hasMorePages" />
    </div>

   <ModalAlert :activador="carga_exitosa">
        <p v-if="comprobar_edi">{{$t('company.modalEdicion')}}</p>
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
import { ref } from '@vue/reactivity'
import store from '@/store';
import {  watchEffect } from '@vue/runtime-core'
import i18n from '@/i18n.js'
import {GraphQLClient} from 'graphql-request';
import Loading from '../../components/loading.vue'


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
        const endpoint = store.state.url_backend
        const companies = ref([])
        const user_id = ref();
        const datas = ref([])
        const titles = ref()
        const loading = ref(false)
        const page = ref(1);
        const count = ref();
        const lastPage = ref();
        const total = ref()
        const currentPage = ref()
        const firstItem = ref()
        const lastItem = ref()
        const perPage = ref()
        const hasMorePages = ref()


        watchEffect(()=>{
            i18n.global.locale=='es'?
            titles.value = ['Nombre de fantasia', 'Nombre del negocio', 'Propietarios', 'Cuit', 'Correo', 'Telefono', 'Condición fiscal', 'Dirección', 'Localidad','Provincia', 'Pais'] 
            : titles.value = ['Name fantasy', 'Business name', 'Owners', 'Cuit', 'Email', 'Phone', 'Tax condition', 'Direction', 'Location','Province', 'Country']
        })

        const traerCompanies = () => {
            const client = new GraphQLClient(endpoint) // creamos la consulta para usarlo luego
            watchEffect(() => {
                client.rawRequest(/* GraphQL */ `
                query{
                    companies(first: 999, page: 1) {
                        paginatorInfo {
                            count
                            currentPage
                            firstItem
                            hasMorePages
                            lastItem
                            lastPage
                            perPage
                            total
                            }
                            data {
                            id
                            name_fantasy
                            business_name
                            owners
                            cuit
                            email
                            phones
                            tax_condition
                            direction
                            location
                            province
                            country
                            users {
                                id
                                name
                                email
                            }
                            }
                    }
                }`,
                {
                    /* page: parseInt(route.params.page),
                    first: mostrar_cantidad.value */
                },
                {
                    /* authorization: `Bearer ${ localStorage.getItem('user_token') }` */
                })
                .then((data) => {
                    companies.value = []
                    console.log(data.data.companies.data)
                    data.data.companies.data.forEach(element => {
                        companies.value.push({id:element.id, nameFantasy: element.name_fantasy, businessName: element.business_name,
                        owners:element.owners ,cuit:element.cuit ,email:element.email,phone:element.phones,taxCondition:element.tax_condition ,direction:element.direction, location:element.location,province:element.province,country:element.country,  activo: false, modalDelete: false})
                       /*  console.log(typeof element.logo) */
                    })

                }).catch(error => {
                    console.log(error.response);
                })
            })
        }


        const traerCompaniesxUser = () => {
            const client = new GraphQLClient(endpoint) // creamos la consulta para usarlo luego
            client.rawRequest(/* GraphQL */ `
            query($id:ID,$page:Int,$first:Int!) {
                    userscompaniesxuser(first: $first, page:$page, user_id: $id) {
                        paginatorInfo {
                            count
                            currentPage
                            firstItem
                            hasMorePages
                            lastItem
                            lastPage
                            perPage
                            total
                        }
                        data {
                            use_user_id
                            use_company_id
                            user {
                                id
                                name
                                email
                            }
                            company {
                                id
                                name_fantasy
                                business_name
                                owners
                                cuit
                                email
                                phones
                                tax_condition
                                direction
                                location
                                province
                                country
                            }
                        }
                    }
            }`,
            {
                page:page.value,
                id:user_id.value,
                first: store.state.cant
            },)
            .then((data) => {
                companies.value = []
                let paginacion = data.data.userscompaniesxuser.paginatorInfo
                let datos = data.data.userscompaniesxuser.data
                // console.log(datos[0].company.name_fantasy)
            
                datos.forEach(element => {
                    companies.value.push({id:element.company.id, nameFantasy: element.company.name_fantasy,
                    businessName: element.company.business_name,owners:element.company.owners ,
                    cuit:element.company.cuit ,email:element.company.email,phone:element.company.phones,
                    taxCondition:element.company.tax_condition ,direction:element.company.direction,
                    location:element.company.location,
                    province:element.company.province,   
                    country:element.company.country, activo: false, modalDelete: false}) 
                    
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
            store.state.user_id 
            user_id.value = localStorage.getItem('user_id')
            traerCompaniesxUser()
        })
 
        // Activa el valor para abrir una ventana modal de ese elemento
        const actionModal = (data) => {
            let aux = companies.value.find(element => element.id == data.id)
            aux.activo = !aux.activo
        }

        // Activa el valor modalDelete para abrir una ventana de aviso antes de eliminar un elemento
        const actionModalDelete = (data) => {
            let aux = companies.value.find(element => element.id == data)
            aux.activo = false
            aux.modalDelete = !aux.modalDelete
        }

    
        const comprobar_carga = () => {
            if(comprobar==true){
                setTimeout(() => carga_exitosa.value = true, 500)
                let accion = "cargarCompany"
                store.commit('verificar_carga',accion)
            }
            setTimeout(() => carga_exitosa.value = false, 3000)
        }
        const comprobar_edicion = () => {
            if(comprobar_edi==true){
                setTimeout(() => carga_exitosa.value = true, 500)

                let accion = "edicionCompany"
                store.commit('verificar_carga',accion)
            }
            setTimeout(() => carga_exitosa.value = false, 3000)
        }

        return {
            user_id,
            companies,
            loading,
            comprobar_carga ,
            comprobar_edicion ,
            carga_exitosa,
            comprobar ,
            comprobar_edi ,
            accion_exitosa ,
            datas,
            titles,
            actionModal,
            actionModalDelete,
            //traer datos de paginacion
            lastPage,
            page,
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

<style >

</style>