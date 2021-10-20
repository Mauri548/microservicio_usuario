<template>
    <div class="conteiner-tablero mt-2 py-4">
        <div class="head-tablero">
            <div v-show="$i18n.locale=='es'">
                <TitleBoard title="Empresas" />
            </div> 
            <div v-show="$i18n.locale=='en'">
                <TitleBoard title="Companies" />
            </div> 
           
            <hr>
            <div class="body-tablero my-3 px-4">
                <HeadBoard />
            </div>
        </div>
        <div class="body-tablero px-4">
            <Board :datas="companies" :titles="titles" >
                <tr class="has-text-centered" v-for="data in companies" :key="data.id">
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
                  <!--   <td @click="actionModal(data)">{{data.province}}</td> -->
                    <td @click="actionModal(data)">{{data.country}}</td>
                    <Modal namePath="EditCompany" :data="data" @onCloseModal="actionModal" @onOpenModalDelete="actionModalDelete" />
                    <ActionModal :data="data" @onCloseModalAction="actionModalDelete" />
                </tr>
            </Board>
        </div>
    </div>

    <!--   <div>
            <div class="modal" :class="{'is-active': carga_exitosa}">
                <div class="modal-background " style="background-color: rgb(197, 197, 197, 0.0)"></div>
                <div class="modal-content-width has-text-black" style="border:1px ridge grey;" :class="{'modal-puntowifi-escritorio' : !isMobile, 'modal-puntowifi-mobil' : isMobile}">
                    <div class="container has-text-centered has-background-white" :class="{'p-2':isMobile, 'p-5':!isMobile}" id="modal">
                      
                        <p v-show="comprobar==true" class="has-text-centered has-text-success">Se cargo con exito la empresa.</p>
                        <p v-show="comprobar_edi==true" class="has-text-centered has-text-success">Se edito con exito la empresa.</p>
                        <div class="columns mt-2">
                            <div class="column">
                                <button class="button w-100 fondo-crenein is-outline btn has-text-white has-text-weight-blod" @click="carga_exitosa = false">Esta bien</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> -->

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
import { inject } from '@vue/runtime-core'
import {  watchEffect } from '@vue/runtime-core'
import i18n from '@/i18n.js'
import {GraphQLClient, request as fetchGQL} from 'graphql-request';


export default {
    components: {
        TitleBoard,
        HeadBoard,
        Board,
        Pagination,
        Modal,
        ActionModal,
        ModalAlert,
    },
    created(){
        this.comprobar_carga()
        this.comprobar_edicion()
       /* this.traerCompanies()  */
        this.traerCompaniesxUser()
    },

    setup() {
        const isMobile = inject('isMobile')
        const carga_exitosa = ref(false)
        const comprobar = store.state.carga_exitosa
        const comprobar_edi = store.state.edicion_exitosa
        const accion_exitosa = ref(false)
        const endpoint = store.state.url_backend
        const companies = ref([])
        const companies_aux = ref([])
        const user_id = ref();

        watchEffect(()=>{
            store.state.user_id 
            user_id.value = localStorage.getItem('user_id')
        })
        const datas = ref([
         /*    {id: 1, nameFantasy: 'Internet', businessName: 'Internet', owners: 'Gonzalo Ramitez', cuit: 203688999, email: 'ramirez@gmail.com',
            phone: 3624624482, taxCondition: 'IVA', direction: 'calle 2', location: 'Resistencia', province: 'Chaco', country: 'Argentina'},
            {id: 2, nameFantasy: 'Internet', businessName: 'Internet', owners: 'Gonzalo Ramitez', cuit: 203688999, email: 'ramirez@gmail.com',
            phone: 3624624482, taxCondition: 'IVA', direction: 'calle 2', location: 'Resistencia', province: 'Chaco', country: 'Argentina'},
            {id: 3, nameFantasy: 'Internet', businessName: 'Internet', owners: 'Gonzalo Ramitez', cuit: 203688999, email: 'ramirez@gmail.com',
            phone: 3624624482, taxCondition: 'IVA', direction: 'calle 2', location: 'Resistencia', province: 'Chaco', country: 'Argentina'},
            {id: 4, nameFantasy: 'Internet', businessName: 'Internet', owners: 'Gonzalo Ramitez', cuit: 203688999, email: 'ramirez@gmail.com',
            phone: 3624624482, taxCondition: 'IVA', direction: 'calle 2', location: 'Resistencia', province: 'Chaco', country: 'Argentina'},
            {id: 5, nameFantasy: 'Internet', businessName: 'Internet', owners: 'Gonzalo Ramitez', cuit: 203688999, email: 'ramirez@gmail.com',
            phone: 3624624482, taxCondition: 'IVA', direction: 'calle 2', location: 'Resistencia', province: 'Chaco', country: 'Argentina'},
            {id: 6, nameFantasy: 'Internet', businessName: 'Internet', owners: 'Gonzalo Ramitez', cuit: 203688999, email: 'ramirez@gmail.com',
            phone: 3624624482, taxCondition: 'IVA', direction: 'calle 2', location: 'Resistencia', province: 'Chaco', country: 'Argentina'},
            {id: 7, nameFantasy: 'Internet', businessName: 'Internet', owners: 'Gonzalo Ramitez', cuit: 203688999, email: 'ramirez@gmail.com',
            phone: 3624624482, taxCondition: 'IVA', direction: 'calle 2', location: 'Resistencia', province: 'Chaco', country: 'Argentina'}, */
        ])

        const titles = ref()


        watchEffect(()=>{

            if(i18n.global.locale=='es'){
                titles.value = ['Nombre de fantasia', 'Nombre del negocio', 'Propietarios', 'Cuit', 'Correo', 'Telefono', 'Condición fiscal', 'Dirección', 'Localidad', 'Pais']
                 /*  titles.value = ['Nombre de fantasia', 'Nombre del negocio', 'Propietarios', 'Cuit', 'Correo', 'Telefono', 'Condición fiscal', 'Dirección', 'Localidad', 'Provincia', 'Pais'] */
            }
            if(i18n.global.locale=='en'){
                titles.value = ['Name fantasy', 'Business name', 'Owners', 'Cuit', 'Email', 'Phone', 'Tax condition', 'Direction', 'Location', 'Country']
            }

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
            watchEffect(() => {
                client.rawRequest(/* GraphQL */ `
                query($id:ID) {
                    user(id:$id){
                        id
                        name
                        email
                        companies {
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
                                country
                        }
                    }
                }`,
                {
                    /* page: parseInt(route.params.page),
                    first: mostrar_cantidad.value */
                    id:user_id.value
                    
                },
                {
                    /* authorization: `Bearer ${ localStorage.getItem('user_token') }` */
                })
                .then((data) => {
                    companies.value = []
                    console.log(data.data.user.companies)
                    data.data.user.companies.forEach(element => {
                        companies.value.push({id:element.id, nameFantasy: element.name_fantasy,
                        businessName: element.business_name,owners:element.owners ,
                        cuit:element.cuit ,email:element.email,phone:element.phones,
                        taxCondition:element.tax_condition ,direction:element.direction,
                        location:element.location,
                         /* province:element.province,  */
                        country:element.country, activo: false, modalDelete: false}) 
                      
                    })
                  /*   console.log(companies.value) */

                }).catch(error => {
                    console.log(error.response);
                })
            })
        }
 
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
            // console.log(comprobar)
            if(comprobar==true){
                setTimeout(() => carga_exitosa.value = true, 500)
                let accion = "cargarCompany"
                store.commit('verificar_carga',accion)
            }
            setTimeout(() => carga_exitosa.value = false, 3000)
        }
        const comprobar_edicion = () => {
            // console.log(comprobar)
            if(comprobar_edi==true){
                setTimeout(() => carga_exitosa.value = true, 500)

                let accion = "edicionCompany"
                store.commit('verificar_carga',accion)
            }
            setTimeout(() => carga_exitosa.value = false, 3000)
        }

        return {
            user_id,
            traerCompaniesxUser,
            traerCompanies,
            endpoint,
            companies,
            companies_aux,
            isMobile ,
            comprobar_carga ,
            comprobar_edicion ,
            carga_exitosa,
            comprobar ,
            comprobar_edi ,
            accion_exitosa ,
            datas,
            titles,
            actionModal,
            actionModalDelete
        }
    }
}
</script>

<style >

</style>