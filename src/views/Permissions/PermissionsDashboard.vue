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
                    <Modal :data="data" @onCloseModal="actionModal" @onOpenModalDelete="actionModalDelete" />
                    <ActionModal :data="data" @onCloseModalAction="actionModalDelete" />
                </tr>
            </Board>
        </div>
        <Pagination/>
        <AddPermission :data="addPermission" @onCloseModal="actionModalAddPermission" />
    </div>
</template>

<script>
import TitleBoard from '../../components/Board/TitleBoard.vue'
import HeadBoard from '../../components/Board/HeadBoard.vue'
import Board from '../../components/Board/Board.vue'
import Pagination from '../../components/Board/Pagination.vue'
import Modal from '../../components/Modal.vue'
import ActionModal from '../../components/Modals/ActionsModal.vue'
import AddPermission from './AddPermission.vue'
import { ref } from '@vue/reactivity'
export default {
    components: {
        TitleBoard,
        HeadBoard,
        Board,
        Pagination,
        Modal,
        ActionModal,
        AddPermission
    },

    setup() {
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

        return {
            datas,
            titles,
            actionModal,
            actionModalDelete,
            addPermission,
            actionModalAddPermission
        }
    }
}
</script>

<style >

.is-current {
    background-color: #005395;
}
</style>