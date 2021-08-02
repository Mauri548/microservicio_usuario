<template>
    <div class="conteiner mt-2 py-4">
        <div class="head-tablero">
            <TitleBoard title="Companies" />
            <hr>
            <div class="body-tablero my-3 px-4">
                <HeadBoard />
            </div>
        </div>
        <div class="body-tablero px-4">
            <Board :datas="datas" :titles="titles" >
                <tr class="has-text-centered" v-for="data in datas" :key="data.id">
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
                    <Modal :data="data" @onCloseModal="actionModal" @onOpenModalDelete="actionModalDelete" />
                    <ActionModal :data="data" @onCloseModalAction="actionModalDelete" />
                </tr>
            </Board>
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
            {id: 1, nameFantasy: 'Internet', businessName: 'Internet', owners: 'Gonzalo Ramitez', cuit: 203688999, email: 'ramirez@gmail.com',
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
            phone: 3624624482, taxCondition: 'IVA', direction: 'calle 2', location: 'Resistencia', province: 'Chaco', country: 'Argentina'},
        ])

        const titles = ref(['Name fantasy', 'Business name', 'Owners', 'Cuit', 'Email', 'Phone', 'Tax condition', 'Direction', 'Location', 'Province', 'Country'])

        const actionModal = (data) => {
            console.log(datas.value)
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
</style>