<template>
    <div class="conteiner-tablero mt-2 py-4">
        <div v-if="Lan==true" class="head-tablero">
            <TitleBoard title="Permisos"/>
            <hr>
            <div class="body-tablero my-3 px-4">
                <HeadBoard :buttonDefault="false">
                    <button @click="actionModalAddPermission" class="button btn-crenein">+ Agregar</button>
                </HeadBoard>
            </div>
        </div>
        <div v-if="Lan==false" class="head-tablero">
            <TitleBoard title="Permissions"/>
            <hr>
            <div class="body-tablero my-3 px-4">
                <HeadBoard :buttonDefault="false">
                    <button @click="actionModalAddPermission" class="button btn-crenein">+ Add</button>
                </HeadBoard>
            </div>
        </div>
        <div class="body-tablero px-4">
            <Board :datas="datas" :titles="titles" >
                <tr class="has-text-centered" v-for="data in datas" :key="data.id">
                    <th @click="actionModal(data)">{{data.id}}</th>
                    <td @click="actionModal(data)">{{data.app}}</td>
                    <td @click="actionModal(data)">{{data.key}}</td>
                    <td @click="actionModal(data)">{{data.detail}}</td>
                    <Modal :data="data" @onCloseModal="actionModal" @onOpenModalDelete="actionModalDelete" :buttonDefault="false">
                        <button @click="actionModalEditPermission" class="button btn-crenein w-100 my-1">
                            <span class="icon is-small">
                                <i class="fas fa-pencil-alt"></i>
                            </span>
                            <span>Edit</span>
                        </button>
                    </Modal>
                    <ActionModal :data="data" @onCloseModalAction="actionModalDelete" />
                </tr>
            </Board>
        </div>
        <Pagination/>
        <AddPermission :data="addPermission"   @tengoAct="mostrarModal2"  @onCloseModal="actionModalAddPermission" /> 
        <EditPermission :data="editPermission" @tengoAct="mostrarModal"  @onCloseModal="actionModalEditPermission" />
    </div>


      <div>
            <div class="modal" :class="{'is-active': carga_exitosa}">
                <div class="modal-background " style="background-color: rgb(197, 197, 197, 0.0)"></div>
                <div class="modal-content-width has-text-black" style="border:1px ridge grey;" :class="{'modal-puntowifi-escritorio' : !isMobile, 'modal-puntowifi-mobil' : isMobile}">
                    <div class="container has-text-centered has-background-white" :class="{'p-2':isMobile, 'p-5':!isMobile}" id="modal">
                        <!-- <h1 class="is-size-3 has-text-weight-semibold" :class="{'is-size-4':isMobile}">No se puede borrar el anuncio</h1> -->
                        <p v-show="comprobar==true" class="has-text-centered has-text-success">Se cargo con exito el permiso.</p>
                        <p v-show="comprobar_edi==true" class="has-text-centered  has-text-success">Se edito con exito el permiso.</p>
                        <div class="columns mt-2">
                            <div class="column">
                                <button class="button w-100 fondo-crenein is-outline btn has-text-white has-text-weight-blod" @click="cerrarModal">Esta bien</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
import TitleBoard from '../../components/Board/TitleBoard.vue'
import HeadBoard from '../../components/Board/HeadBoard.vue'
import Board from '../../components/Board/Board.vue'
import Pagination from '../../components/Board/Pagination.vue'
import Modal from '../../components/Modal.vue'
import ActionModal from '../../components/Modals/ActionsModal.vue'
import EditPermission from './EditPermission.vue'
import AddPermission from './AddPermission.vue'
import { ref } from '@vue/reactivity'
import { inject } from '@vue/runtime-core'
import store from '@/store'
import {  watchEffect } from '@vue/runtime-core'


export default {
    components: {
        TitleBoard,
        HeadBoard,
        Board,
        Pagination,
        Modal,
        ActionModal,
        AddPermission,
        EditPermission,
    },
   
    setup() {
        const isMobile = inject('isMobile')
        const carga_exitosa = ref(false)
       /*  const comprobar = store.state.carga_exitosa */
        const comprobar = ref(false)
        const comprobar_edi = ref(false)
        const accion_exitosa = ref(false)
        const addPermission = ref(false)
        const editPermission = ref(false)
        const Lan = ref(false)


        watchEffect(()=>{
            Lan.value = store.state.cambio_lang
        })

        const mostrarModal = (act) => {
            /* console.log(act.value.activo) */
            carga_exitosa.value = act.value.activo
            comprobar_edi.value = act.value.edit
        }

         const mostrarModal2 = (act) => {
            /* console.log(act.value.activo) */
            carga_exitosa.value = act.value.activo
            comprobar.value = act.value.cargar
        }


        const cerrarModal = () => {
            carga_exitosa.value = false
            if(comprobar_edi.value==true){
                comprobar_edi.value = false
            }
            if(comprobar.value==true){
                comprobar.value = false
            }
        }

        const datas = ref([
            {id: 1, app: 'ISPB', key: 'customers_table_list', detail: 'Ver lista', activo: false},
            {id: 2, app: 'ISPB', key: 'customers_table_add', detail: 'Agregar cliente', activo: false},
            {id: 3, app: 'ISPB', key: 'customers_table_add', detail: 'Agregar cliente', activo: false},
            {id: 4, app: 'ISPB', key: 'customers_table_add', detail: 'Agregar cliente', activo: false},
            {id: 5, app: 'ISPB', key: 'customers_table_add', detail: 'Agregar cliente', activo: false},
            {id: 6, app: 'ISPB', key: 'customers_table_add', detail: 'Agregar cliente', activo: false},
            {id: 7, app: 'ISPB', key: 'customers_table_add', detail: 'Agregar cliente', activo: false},
            {id: 8, app: 'ISPB', key: 'customers_table_add', detail: 'Agregar cliente', activo: false},
            {id: 9, app: 'ISPB', key: 'customers_table_add', detail: 'Agregar cliente', activo: false},
            {id: 10, app: 'ISPB', key: 'customers_table_add', detail: 'Agregar cliente', activo: false},
        ])
      
        
        const titles = ref(['App','Key','Detail'])

        const actionModal = (data) => {
            let aux = datas.value.find(element => element.id == data.id)
            aux.activo = !aux.activo
        }

        const actionModalDelete = (data) => {
            let aux = datas.value.find(element => element.id == data)
            aux.activo = false
            aux.modalDelete = !aux.modalDelete
        }

        const actionModalAddPermission = () => {
            addPermission.value = !addPermission.value
        }

        const actionModalEditPermission = () => {
            datas.value.forEach(element => element.activo = false)
            editPermission.value = !editPermission.value
        }
        

        return {
            Lan ,
            mostrarModal2 ,
            cerrarModal,
            mostrarModal,
            isMobile,
            carga_exitosa ,
            comprobar ,
            comprobar_edi ,
            accion_exitosa ,
            datas,
            titles,
            actionModal,
            actionModalDelete,
            addPermission,
            editPermission,
            actionModalAddPermission,
            actionModalEditPermission

        }
    }
}

</script>

<style scoped>

.is-current {
    background-color: #005395;
}

</style>