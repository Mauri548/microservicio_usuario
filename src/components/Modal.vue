<template>
    <div class="modal" :class="{'is-active':data.activo}">
        <div class="modal-background" @click="closeModal(data)"></div>
        <div class="modal-content has-background-white">
            <h1 class="has-text-centered has-text-weight-semibold is-size-4">{{Palabras.pal1}}</h1>
            <hr class="my-3">
            <button v-if="buttonDefault" @click="push(data)" class="button btn-crenein w-100 my-1">
                <span class="icon is-small">
                    <i class="fas fa-pencil-alt"></i>
                </span>
                <span>{{Palabras.pal2}}</span>
            </button>
            <slot></slot>
            <button @click="openModalDelete(data)" class="button btn-delete w-100 my-1">
                <span class="icon is-small">
                    <i class="fas fa-trash-alt"></i>
                </span>
                <span>{{Palabras.pal3}}</span>
            </button>
        </div>
        <button @click="closeModal(data)" class="modal-close is-large" aria-label="close"></button>
    </div>
</template>

<script>
import { useRouter } from 'vue-router'
import {  watchEffect } from '@vue/runtime-core'
import { ref } from '@vue/reactivity'
import store from '@/store'

export default {
    name: 'Modal',
    // props: ['data','namePath'],
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
        const Lan = ref(false)
        const Palabras = ref({pal1:'Actions',pal2:'Edit',pal3:'Delete'})
        const closeModal = (e) => {
            emit("onCloseModal", {id: e.id, valor: false})
        }

        watchEffect(()=>{
            Lan.value = store.state.cambio_lang
            if(Lan.value){
                Palabras.value.pal1 = 'Acciones'
                Palabras.value.pal2 = 'Editar'
                Palabras.value.pal3 = 'Eliminar'
            }else{
                Palabras.value.pal1 = 'Actions'
                Palabras.value.pal2 = 'Edit'
                Palabras.value.pal3 = 'Delete'
            }
        })

        const openModalDelete = (e) => {
            emit("onOpenModalDelete", e.id)
        }

        const router = useRouter()
        const push = (data) => {
            router.push({name: props.namePath, params: {id: data.id}})
        }

        return {
            Palabras,
            Lan,
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