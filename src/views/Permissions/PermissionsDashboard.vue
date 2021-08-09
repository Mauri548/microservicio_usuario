<template>
    <div class="conteiner-tablero mt-2 py-4">
        <div class="head-tablero">
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
        <AddPermission :data="addPermission" @onCloseModal="actionModalAddPermission" />
        <EditPermission :data="editPermission" @onCloseModal="actionModalEditPermission" />
    </div>


      <div>
            <div class="modal" :class="{'is-active': carga_exitosa}">
                <div class="modal-background " style="background-color: rgb(197, 197, 197, 0.0)"></div>
                <div class="modal-content-width has-text-black" style="border:1px ridge grey;" :class="{'modal-puntowifi-escritorio' : !isMobile, 'modal-puntowifi-mobil' : isMobile}">
                    <div class="container has-text-centered has-background-white" :class="{'p-2':isMobile, 'p-5':!isMobile}" id="modal">
                        <!-- <h1 class="is-size-3 has-text-weight-semibold" :class="{'is-size-4':isMobile}">No se puede borrar el anuncio</h1> -->
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
import store from '@/store';

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

    created(){
        this.comprobar_carga()
        this.comprobar_edicion()
    },

    setup() {

        const carga_exitosa = ref(false)
        const comprobar = store.state.carga_exitosa
        const comprobar_edi = store.state.edicion_exitosa
        const accion_exitosa = ref(false)

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
        const addPermission = ref(false)
        const editPermission = ref(false)


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


        const comprobar_carga = () => {
            // console.log(comprobar)
            if(comprobar==true){
               carga_exitosa.value = true
               let accion = "cargarPermission"
               store.commit('verificar_carga',accion)
            }
        }
        const comprobar_edicion = () => {
            // console.log(comprobar)
            if(comprobar_edi==true){
               carga_exitosa.value = true
               let accion = "edicionPermission"
               store.commit('verificar_carga',accion)
            }

        const actionModalEditPermission = () => {
            datas.value.forEach(element => element.activo = false)
            editPermission.value = !editPermission.value

        }

        return {
            comprobar_carga,
            comprobar_edicion ,
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
}
</script>

<style scoped>

.is-current {
    background-color: #005395;
}

</style>