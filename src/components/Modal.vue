<template>
    <div class="modal" :class="{'is-active':data.activo}">
        <div class="modal-background" @click="closeModal(data)"></div>
        <div class="modal-content has-background-white">
            <h1 class="has-text-centered has-text-weight-semibold is-size-4">Actions</h1>
            <hr class="my-3">
            <button class="button btn-crenein w-100 my-1">
                <span class="icon is-small">
                    <i class="fas fa-pencil-alt"></i>
                </span>
                <span>Edit</span>
            </button>
            <button class="button btn-delete w-100 my-1" >
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
export default {
    name: 'Modal',
    props: ['data'],
    emits: ['onCloseModal'],

    setup(props, { emit }) {
        // console.log(props.data)
        const closeModal = (e) => {
            console.log('close ' + e.valor1)
            emit("onCloseModal", {id: e.valor1, valor: false})
        }

        return {
            closeModal
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