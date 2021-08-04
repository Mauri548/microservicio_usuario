<template>
    <div class="conteiner mt-2 py-2">
        <div class="head-tablero">
            <TitleBoard title="Apps" />
            <hr>
            <div class="body-tablero my-3 px-4">
                <HeadBoard/>
            </div>
        </div>
        <div class="body-tablero px-4">
            <Board :datas="datas" :titles="titles">
                <tr class="has-text-centered" v-for="data in datas" :key="data.id">
                    <th @click="actionModal(data)" >{{data.id}}</th>
                    <td @click="actionModal(data)">{{data.name}}</td>
                    <td @click="actionModal(data)">
                        <img :src="data.logo" width="40" alt="">
                    </td>
                    <td @click="actionModal(data)">{{data.obvservation}}</td>
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
import ispb from '@/assets/ispb2.png'
import puwic from '@/assets/puwic2.png'
import geston from '@/assets/geston2.png'
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

    setup() {
        const datas = ref([
           {id: 1, name: 'ISPB', logo: ispb, obvservation: 'Licencia x de ISPB', activo: false, modalDelete: false},
           {id: 2, name: 'PuWiC', logo: puwic, obvservation: 'Licencia x de PuWiC', activo: false, modalDelete: false},
           {id: 3, name: 'Geston', logo: geston, obvservation: 'Licencia x de Geston', activo: false, modalDelete: false},
        ])

        const titles = ['Name','Logo','Obvservation']

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
    width: 79%;
    border: 1px solid #eeeeee;
}

.conteiner .head-tablero, .conteiner .body-tablero, .conteiner .conteiner-pagination {
    width: 100%;
}

.conteiner div hr {
    margin: 5px 0;
    background: #005395;
}
</style>