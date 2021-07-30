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
                <tr v-for="data in datas" :key="data.id">
                    <th v-if="data.valor1" @click="openModal(data)" >{{data.valor1}}</th>
                    <td v-if="data.valor2" @click="openModal(data)" >{{data.valor2}}</td>
                    <td v-if="data.valor3" @click="openModal(data)" >{{data.valor3}}</td>
                    <td v-if="data.valor4" @click="openModal(data)" >{{data.valor4}}</td>
                    <td v-if="data.valor5" @click="openModal(data)" >{{data.valor5}}</td>
                    <td v-if="data.valor6" @click="openModal(data)" >{{data.valor6}}</td>
                    <Modal :data="data" @onCloseModal="closeModal" />
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import Modal from '../Modal.vue'

export default {
    name: 'Board',
    components: {
        Modal
    },

    props: ['datas','titles'],
    emits: ['onOpenModal','onCloseModal'],

    setup(props, { emit }) {
        const openModal = (e) => {
            emit("onOpenModal", {id: e.valor1, valor: true})
        }

        const closeModal = (e) => {
            emit("onCloseModal", e)
        }

        return{
            openModal,
            closeModal,
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