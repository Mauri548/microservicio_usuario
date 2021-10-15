<template>
    <div class="conteiner-tablero mt-2 py-4">
        <div class="head-tablero">
             <!--    Utilizo el atributo locale del objeto i18n para saber en que lenguaje esta seteado el sistema  -->
                <TitleBoard v-show="$i18n.locale=='es'" title="Subscripciones" />
                <TitleBoard v-show="$i18n.locale=='en'" title="Subscriptions" />
         
            <hr>
            <div class="body-tablero my-3 px-4">
                <HeadBoard :buttonDefault="false">
                    <router-link :to="{name: 'AppSuscription'}" class="button btn-crenein">{{$t('appSuscription.agregar')}}</router-link>
                </HeadBoard>             
            </div>
        </div>
        <div class="body-tablero px-4">
            <Board :datas="subscripciones" :titles="titles" >
                <tr class="has-text-centered" v-for="data in subscripciones" :key="data.id">
                    <th @click="actionModal(data)">{{data.id}}</th>
                    <td @click="actionModal(data)">{{data.nombreApp}}</td>
                    <td @click="actionModal(data)">{{data.licence}}</td>
                    <td @click="actionModal(data)">{{data.companyName}}</td>
           
                    <Modal :data="data" :buttonDefault="false" @onCloseModal="actionModal" 
                     @onOpenModalDelete="actionModalDelete" >
                         <button  class="button btn-crenein w-100 my-1">
                            <span class="icon is-small">
                                <i class="fas fa-pencil-alt"></i>
                            </span>
                            <span>{{$t('modal.editar')}}</span>
                        </button>
                    </Modal>
                    <ActionModal :data="data" @onCloseModalAction="actionModalDelete" />
                </tr>
            </Board>
        </div>

        <Pagination/>
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


export default {
    components: {
        TitleBoard,
        HeadBoard,
        Board,
        Pagination,
        Modal,
        ActionModal,
    },
 /*    created(){
        traerSubscripciones()
    }, */

    setup () {
        const datas = ref([
/*             {id: 1,  nombreApp: 'Geston', licence: 'Hasta 100 clientes', companyName: 'Zunet', activo: false},
            {id: 2,  nombreApp: 'PuWIc', licence: 'Hasta 100 puntos wifi', companyName: 'Nubitec', activo: false},
            {id: 3,  nombreApp: 'ISPBbrain', licence: 'Hasta 1mil conexiones', companyName: 'Xnet', activo: false}, */
        ])
      

        const titles = ref([])
        const endpoint = store.state.url_backend
        const subscripciones = ref([])
        const subscripciones_aux = ref([])


        const traerSubscripciones = () => {
            const client = new GraphQLClient(endpoint) // creamos la consulta para usarlo luego
            watchEffect(() => {
                client.rawRequest(/* GraphQL */ `
                query {
                    subscriptions(first: 999, page: 1){
                         data {
                            id
                            license {
                                id
                                name
                            }
                            company {
                                id
                                business_name
                            }
                            app {
                                id
                                name
                            }
                        }
                        paginatorInfo {
                            count, currentPage, hasMorePages, total
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
                    subscripciones.value = []
                    data.data.subscriptions.data.forEach(element => {
                        subscripciones.value.push({id:element.id, nombreApp: element.app.name, licence:element.license.name ,companyName:element.company.name,activo: false, modalDelete: false})
                      /*   console.log(typeof element.logo) */
                    })

                }).catch(error => {
                    console.log(error.response);
                })
            })
        }





        // Activa el valor para abrir una ventana modal de ese elemento
        const actionModal = (data) => {
            let aux = datas.value.find(element => element.id == data.id)
            aux.activo = !aux.activo
        }

        // Activa el valor de modalDelete para abrir el modal de aviso 
        const actionModalDelete = (data) => {
            let aux = datas.value.find(element => element.id == data)
            aux.activo = false
            aux.modalDelete = !aux.modalDelete
        }
        watchEffect(()=>{ // utilizamos watcheffect para detectar que valor tiene el atributo locale del objeto i18n al momento de estar en la pagina o al momento de cambiar el valor a traves del boton del lenguaje
            if(i18n.global.locale == 'en'){
                titles.value = ['App','License','Company']
            }
            if(i18n.global.locale == 'es'){
                titles.value = ['App','Licencia','Empresa']
            }
        })

        // Cambia el estado del usuario entre habilitado y deshabilitado
        const ChangeState = (data) => {
            data.state == 'Habilitado'? data.state = 'Deshabilitado' : data.state = 'Habilitado'
        }

        return {
            traerSubscripciones ,
            endpoint,
            subscripciones,
            subscripciones_aux,
            datas,
            titles,
            actionModal,
            actionModalDelete,
            ChangeState
        }
    }
}
</script>

<style scoped></style>