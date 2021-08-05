<template>
    <div class="modal" :class="{'is-active':data.activo}">
        <div class="modal-background" @click="closeModal(data)"></div>
        <div class="modal-content has-background-white">
            <h1 class="has-text-centered has-text-weight-semibold is-size-4">Actions </h1>
            <hr class="my-3">
            <button @click="push(data)" class="button btn-crenein w-100 my-1">
                <span class="icon is-small">
                    <i class="fas fa-pencil-alt"></i>
                </span>
                <span>Edit</span>
            </button>
            <button @click="openModalDelete(data)" class="button btn-delete w-100 my-1">
                <span class="icon is-small">
                    <i class="fas fa-trash-alt"></i>
                </span>
                <span>Delete</span>
            </button>
        </div>
        <button @click="closeModal(data)" class="modal-close is-large" aria-label="close"></button>
    </div>
</template>

<script>
import { useRouter } from 'vue-router'
export default {
    name: 'Modal',
    props: ['data','namePath'],
    emits: ['onCloseModal','onOpenModalDelete'],

    setup(props, { emit }) {
        const closeModal = (e) => {
            emit("onCloseModal", {id: e.id, valor: false})
        }

        const openModalDelete = (e) => {
            emit("onOpenModalDelete", e.id)
        }

        const router = useRouter()
        const push = (data) => {
            console.log('click')
            router.push({name: props.namePath, params: {id: data.id}})
        }

        return {
            closeModal,
            openModalDelete,
            push,
        }
    }
}
</script>

<style scoped>
.modal-content {
    width: 300px;
    padding: 20px;
    border-radius: 10px;
}

.modal-content hr {
    background-color: #e0dddd;
}

.modal-content .btn-delete {
    background-color: #ce2d22;
    color: #fff;
    font-weight: 600;
}
.modal-content .btn-delete:hover {
    background-color: #F93023;
}
</style>