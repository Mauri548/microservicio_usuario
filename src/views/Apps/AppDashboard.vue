<template>
    <div class="conteiner-tablero mt-2 py-2">
        <div class="head-tablero">
            <!-- Componente del titulo de la tabla -->
            <TitleBoard title="Apps" />
            <hr>
            <div class="body-tablero my-3 px-4">
                <HeadBoard namePath="AddApp"  />
            </div>
        </div>
        <div class="body-tablero px-4">
            <!-- Componente de Tablero -->
            <Board :datas="datas" :titles="titles">
                <!-- Esto se remplazara en el <slot> dentro del componente -->
                <tr class="has-text-centered" v-for="data in datas" :key="data.id">
                    <th @click="actionModal(data)" >{{data.id}}</th>
                    <td @click="actionModal(data)">{{data.name}}</td>
                    <td @click="actionModal(data)">
                        <img :src="data.logo" width="40" alt="">
                    </td>
                    <td @click="actionModal(data)">{{data.obvservation}}</td>
                    <Modal namePath="EditApp" :data="data" @onCloseModal="actionModal" @onOpenModalDelete="actionModalDelete" />
                    <ActionModal :data="data" @onCloseModalAction="actionModalDelete" />
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
    <ModalAlert :activador="carga_exitosa"/>
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
import puwic from '@/assets/puwic2.png'
import geston from '@/assets/geston2.png'
import { ref } from '@vue/reactivity'
import store from '@/store';
import { inject } from '@vue/runtime-core'

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
    },

    setup() {
        const isMobile = inject('isMobile')
        const carga_exitosa = ref(false)
        const comprobar = store.state.carga_exitosa
        const comprobar_edi = store.state.edicion_exitosa
        const accion_exitosa = ref(false)
        const paso_elim = ref(false)

        const datas = ref([
           {id: 1, name: 'ISPB', logo: ispb, obvservation: 'Licencia x de ISPB', activo: false, modalDelete: false},
           {id: 2, name: 'PuWiC', logo: puwic, obvservation: 'Licencia x de PuWiC', activo: false, modalDelete: false},
           {id: 3, name: 'Geston', logo: geston, obvservation: 'Licencia x de Geston', activo: false, modalDelete: false},
        ])

        const titles = ['Name','Logo','Obvservation']

        // Activa el valor para abrir una ventana modal de ese elemento
        const actionModal = (data) => {
            let aux = datas.value.find(element => element.id == data.id)
            aux.activo = !aux.activo
        }

        // Activa el valor modalDelete para abrir una ventana de aviso antes de eliminar un elemento
        const actionModalDelete = (data) => {
            let aux = datas.value.find(element => element.id == data)
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
               carga_exitosa.value = true
               let accion = "edicionApp"
               store.commit('verificar_carga',accion)
            }
        }


        return {
            isMobile,
            carga_exitosa,
            comprobar,
            comprobar_edi,
            accion_exitosa,
            paso_elim,
            datas,
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