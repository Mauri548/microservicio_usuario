<template>
    <div class="conteiner-tablero mt-2 py-2">
        <div class="head-tablero">
            <!-- Componente del titulo de la tabla -->
            <TitleBoard v-show="$i18n.locale=='en'" title="Apps" />
             <TitleBoard v-show="$i18n.locale=='es'" title="Aplicaciones" />
            <hr>
            <div class="body-tablero my-3 px-4">
                <HeadBoard namePath="AddApp"  />
            </div>
        </div>
        <div class="body-tablero px-4">
            <!-- Componente de Tablero -->
            <Board :datas="apps" :titles="titles">
                <!-- Esto se remplazara en el <slot> dentro del componente -->
                <tr class="has-text-centered" v-for="app in apps" :key="app.id">
                    <th @click="actionModal(app)" >{{app.id}}</th>
                    <td @click="actionModal(app)">{{app.nombre}}</td>
                    <td @click="actionModal(app)">
                        <img :src="app.logo" width="40" alt="app.logo">
                    </td>
                    <td @click="actionModal(app)">{{app.observacion}}</td>
                    <Modal namePath="EditApp" :data="app" @onCloseModal="actionModal" @onOpenModalDelete="actionModalDelete" />
                    <ActionModal :data="app" @onCloseModalAction="actionModalDelete" />
                </tr>
            </Board>
        </div>
        <div>
            <!-- <div class="modal" :class="{'is-active': carga_exitosa}">
                <div class="modal-background " style="background-color: rgb(197, 197, 197, 0.0)"></div>
                <div class="modal-content-width has-text-black" style="border:1px ridge grey;" :class="{'modal-puntowifi-escritorio' : !isMobile, 'modal-puntowifi-mobil' : isMobile}">
                    <div class="container has-text-centered has-background-white" :class="{'p-2':isMobile, 'p-5':!isMobile}" id="modal">
                        <p v-show="comprobar==true" class="has-text-centered has-text-success">Se cargo con exito el App.</p>
                        <p v-show="comprobar_edi==true" class="has-text-centered has-text-success">Se edito con exito el App.</p>
                        <div class="columns mt-2">
                            <div class="column">
                                <button class="button w-100 fondo-crenein is-outline btn has-text-white has-text-weight-blod" @click="carga_exitosa = false">Esta bien</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div> -->
        </div>

        <Pagination/>
    </div>
    <!-- Modal de carga exitosa -->
    <ModalAlert :activador="carga_exitosa">
       <!--  Se cargo con exito la App -->
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
/* import ispb from '@/assets/ispb2.png'
import puwic from '@/assets/puwic2.png'
import geston from '@/assets/geston2.png' */
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
        this.traerApps()
    },

    setup() {
        const isMobile = inject('isMobile')
        const carga_exitosa = ref(false)
        const comprobar = store.state.carga_exitosa
        const comprobar_edi = store.state.edicion_exitosa
        const accion_exitosa = ref(false)
        const paso_elim = ref(false)
        const endpoint = store.state.url_backend
        const apps = ref([])
        const apps_aux = ref([])


     /*    const datas = ref([
           {id: 1, name: 'ISPB', logo: ispb, obvservation: 'Licencia x de ISPB', activo: false, modalDelete: false},
           {id: 2, name: 'PuWiC', logo: puwic, obvservation: 'Licencia x de PuWiC', activo: false, modalDelete: false},
           {id: 3, name: 'Geston', logo: geston, obvservation: 'Licencia x de Geston', activo: false, modalDelete: false},
        ])
 */
        const titles = ref([])

        watchEffect(()=>{
            if(i18n.global.locale=='es'){
                titles.value = ['Nombre','Logo','Obvservación']
            }
            if(i18n.global.locale=='en'){
                titles.value = ['Name','Logo','Obvservation']
            }
        })

        const traerApps = () => {
            const client = new GraphQLClient(endpoint) // creamos la consulta para usarlo luego
            watchEffect(() => {
                client.rawRequest(/* GraphQL */ `
                query{
                    apps{
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
                            deleted_at
                            created_at
                            updated_at
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
                    apps.value = []
                    data.data.apps.forEach(element => {
                        apps.value.push({id:element.id, nombre: element.name, logo: element.logo,observacion:element.observation ,activo: false, modalDelete: false})
                        console.log(typeof element.logo)
                    })

                }).catch(error => {
                    console.log(error.response);
                })
            })
        }


        // Activa el valor para abrir una ventana modal de ese elemento
        const actionModal = (data) => {
         
            let aux = apps.value.find(element => element.id == data.id)
            console.log(aux)
            aux.activo = !aux.activo

        }

        // Activa el valor modalDelete para abrir una ventana de aviso antes de eliminar un elemento
        const actionModalDelete = (data) => {
            let aux = apps.value.find(element => element.id == data)
            aux.activo = false
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

        watchEffect(() => {
            const client = new GraphQLClient(endpoint)

            client.rawRequest(/* GraphQL */ `
            query{
                apps{
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
                        deleted_at
                        created_at
                        updated_at
                    }
                }
            }
            `)
            .then((data) => {
                console.log(data)
            })
            .catch(error => {
                console.log(error.response)
            })
        })


        return {
            traerApps,
            apps,
            apps_aux,
            endpoint,
            isMobile,
            carga_exitosa,
            comprobar,
            comprobar_edi,
            accion_exitosa,
            paso_elim,
       /*      datas, */
            titles,
            actionModal,
            actionModalDelete,
            comprobar_carga,
            comprobar_edicion
        }
    }
}
</script>

<style></style>