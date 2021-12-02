<template>
    <transition name="MenuAction">
        <div class="mi-modal">
            <div class="modal-background" @click="closeModal(data)"></div>
            <div class="modal-content has-background-white">
                <h1 class="has-text-centered has-text-weight-semibold is-size-4">{{$t('modal.acciones')}}</h1>
                <hr class="my-3">
                <button v-if="buttonDefault" @click="push(data)" class="button btn-crenein w-100 my-1">
                    <span class="icon is-small">
                        <i class="fas fa-pencil-alt"></i>
                    </span>
                    <span>{{$t('modal.editar')}}</span>
                </button>
                <slot></slot>
                <button @click="openModalDelete(data)" class="button btn-delete w-100 my-1">
                    <span class="icon is-small">
                        <i class="fas fa-trash-alt"></i>
                    </span>
                    <span>{{$t('modal.eliminar')}}</span>
                </button>
            </div>
            <!-- <button @click="closeModal(data)" class="modal-close is-large" aria-label="close"></button> -->
        </div>
        <!-- <div class="modal" :class="{'is-active':data.activo}">
            <div class="modal-background" @click="closeModal(data)"></div>
            <div class="modal-content has-background-white">
                <h1 class="has-text-centered has-text-weight-semibold is-size-4">{{$t('modal.acciones')}}</h1>
                <hr class="my-3">
                <button v-if="buttonDefault" @click="push(data)" class="button btn-crenein w-100 my-1">
                    <span class="icon is-small">
                        <i class="fas fa-pencil-alt"></i>
                    </span>
                    <span>{{$t('modal.editar')}}</span>
                </button>
                <slot></slot>
                <button @click="openModalDelete(data)" class="button btn-delete w-100 my-1">
                    <span class="icon is-small">
                        <i class="fas fa-trash-alt"></i>
                    </span>
                    <span>{{$t('modal.eliminar')}}</span>
                </button>
            </div>
            <button @click="closeModal(data)" class="modal-close is-large" aria-label="close"></button>
        </div> -->
    </transition>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
    name: 'Modal',
    props: {
        data: Object,
        namePath: String,
        buttonDefault: {
            type: Boolean,
            default: true
        }
    },
    emits: ['onCloseModal','onOpenModalDelete'],

    setup(props, { emit }) {
  
        const closeModal = (e) => {
            emit("onCloseModal", {id: e.id})
        }

        const openModalDelete = (e) => {
            emit("onOpenModalDelete", e.id)
        }

        const router = useRouter()
        const push = (data) => {
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
.mi-modal {
    display: flex;
    align-content: center;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    position: fixed;
    z-index: 40;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
}

.modal-content {
    width: 300px;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 2px 14px 3px rgb(0 0 0 / 31%);
}

.modal-background {
    background: rgb(10 10 10 / 10%);
    /* background: transparent; */
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

.MenuAction-enter-from, .MenuAction-leave-to {
    opacity: 0;
    transform: scale(0.6);
}

.MenuAction-enter-active, .MenuAction-leave-active {
    transition: all ease .3s;
}

</style>