<template>
    <div class="table-container">
        <table class="table is-bordered w-100">
            <thead class="fondo-crenein">
                <tr>
                    <th>ID</th>
                    <th v-for="title in titles" :key="title.id">{{title}}</th>
                </tr>
            </thead>
            <tbody>
                <tr class="has-text-centered" v-for="data in datas" :key="data.id">
                    <th v-if="data.valor1" @click="openModal(data)" >{{data.valor1}}</th>
                    <td v-if="data.valor2" @click="openModal(data)" >{{data.valor2}}</td>
                    <td v-if="data.valor3" @click="openModal(data)" >{{data.valor3}}</td>
                    <td v-if="data.valor4" @click="openModal(data)" >{{data.valor4}}</td>
                    <td v-if="data.valor5" @click="openModal(data)" >{{data.valor5}}</td>
                    <td v-if="data.valor6" @click="openModal(data)" >{{data.valor6}}</td>
                    <td v-if="data.valor7" @click="openModal(data)" >{{data.valor7}}</td>
                    <td v-if="data.valor8" @click="openModal(data)" >{{data.valor8}}</td>
                    <td v-if="data.valor9" @click="openModal(data)" >{{data.valor9}}</td>
                    <td v-if="data.valor10" @click="openModal(data)" >{{data.valor10}}</td>
                    <td v-if="data.valor11" @click="openModal(data)" >{{data.valor11}}</td>
                    <td v-if="data.valor12" @click="openModal(data)" >{{data.valor12}}</td>
                    <td v-if="data.valor13" @click="openModal(data)" >
                        <img :src="data.valor13" width="40" alt="">
                    </td>
                    <td v-if="data.valor14" @click="openModal(data)" >{{data.valor14}}</td>


                    <Modal :data="data" @onCloseModal="closeModal" @onOpenModal="openModalDelete" />
                    <ActionModal :data="data" />

                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import Modal from '../Modal.vue'
import ActionModal from '../Modals/ActionsModal.vue'

export default {
    name: 'Board',
    components: {
        Modal,
        ActionModal,
    },

    props: ['datas','titles'],
    emits: ['onOpenModal','onCloseModal','openModalDelete'],

    setup(props, { emit }) {
        const openModal = (e) => {
            emit("onOpenModal", {id: e.valor1, valor: true})
        }

        const openModalDelete = (e) => {
            console.log('abrir2')
            emit("openModalDelete", e)
        }

        const closeModal = (e) => {
            emit("onCloseModal", e)
        }

        return{
            openModal,
            closeModal,
            openModalDelete,
        }
    }
}
</script>

<style scoped>
.table-container {
    max-height: 480px;
    overflow-y: auto;
}
table thead {
    background-color: #005395;
    color: #fff;
    text-align: center;
}
table thead th {
    color: #fff;
}
</style>