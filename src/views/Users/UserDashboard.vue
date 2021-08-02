<template>
    <div class="conteiner mt-2 py-4">
        <div class="head-tablero">
            <TitleBoard title="Users" />
            <hr>
            <div class="body-tablero my-3 px-4">
                <HeadBoard/>
            </div>
        </div>
        <div class="body-tablero px-4">
            <Board :datas="datas" :titles="titles" >
                <tr class="has-text-centered" v-for="data in datas" :key="data.id">
                    <th @click="actionModal(data)">{{data.id}}</th>
                    <td @click="actionModal(data)">{{data.avatar}}</td>
                    <td @click="actionModal(data)">{{data.fullName}}</td>
                    <td @click="actionModal(data)">{{data.email}}</td>
                    <td @click="actionModal(data)">{{data.created}}</td>
                    <td @click="actionModal(data)">{{data.enable}}</td>
                    <Modal :data="data" @onCloseModal="actionModal" @onOpenModalDelete="actionModalDelete" />
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
export default {
    components: {
        TitleBoard,
        HeadBoard,
        Board,
        Pagination,
        Modal,
        ActionModal,
    },

    setup () {
        const datas = ref([
            {id: 1, avatar: 'foto', fullName: 'Mauricio Ferreyra', email: 'mauricioferreyra548@gmail.com', created: '24/07/2021', enable: 'yes', activo: false},
            {id: 2, avatar: 'foto', fullName: 'Luis Ferreyra', email: 'luis548@gmail.com', created: '24/07/2021', enable: 'yes', activo: false},
            {id: 3, avatar: 'foto', fullName: 'Ema Ferreyra', email: 'emaCorreo@gmail.com', created: '24/07/2021', enable: 'yes', activo: false},
            {id: 4, avatar: 'foto', fullName: 'Glo Ferreyra', email: 'gloquita@gmail.com', created: '24/07/2021', enable: 'yes', activo: false},
            {id: 5, avatar: 'foto', fullName: 'Leonardo Ferreyra', email: 'loreto@gmail.com', created: '24/07/2021', enable: 'yes', activo: false},
        ])

        const titles = ref(['Avatar','Full name','Email','Created','Enable'])

        const actionModal = (data) => {
            let aux = datas.value.find(element => element.id == data.id)
            aux.activo = !aux.activo
        }

        const actionModalDelete = (data) => {
            let aux = datas.value.find(element => element.id == data)
            aux.activo = false
            aux.modalDelete = !aux.modalDelete
        }
        

        return {
            datas,
            titles,
            actionModal,
            actionModalDelete
        }
    }
}
</script>

<style scoped>

.conteiner {
    width: 76%;
    border: 1px solid #eeeeee;
}

.conteiner .head-tablero, .conteiner .body-tablero, .conteiner .conteiner-pagination {
    width: 100%;
}

.conteiner div hr {
    margin: 5px 0;
    background: #005395;
}

/* .is-current {
    background-color: #005395;
} */

</style>