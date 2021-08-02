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
                <slot></slot>
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