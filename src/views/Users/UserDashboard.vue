<template>
    <div class="conteiner-tablero mt-2 py-4">
        <div class="head-tablero">
            
                <TitleBoard v-show="$i18n.locale=='es'" title="Usuarios" />
                <TitleBoard v-show="$i18n.locale=='en'" title="Users" />
         
            <hr>
            <div class="body-tablero my-3 px-4">
                <HeadBoard :buttonDefault="false">
                    <router-link :to="{name: 'InviteUser'}" class="button btn-crenein">{{$t('inviteUser.invitar')}}</router-link>
                </HeadBoard>             
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
                    <td @click="actionModal(data)">{{data.state}}</td>
                    <Modal :data="data" :buttonDefault="false" @onCloseModal="actionModal" 
                     @onOpenModalDelete="actionModalDelete" >
                        <button @click="ChangeState(data)" v-if="data.state == 'Habilitado'" class="button btn-crenein w-100 my-1">{{$t('user.deshabilitar')}}</button>
                        <button @click="ChangeState(data)" v-else class="button btn-crenein w-100 my-1">{{$t('user.habilitar')}}</button>
                    </Modal>
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
/* import store from '@/store' */
import {  watchEffect } from '@vue/runtime-core'
import i18n from '@/i18n.js'


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
            {id: 1, avatar: 'foto', fullName: 'Mauricio Ferreyra', email: 'mauricioferreyra548@gmail.com', created: '24/07/2021', state: 'Habilitado', activo: false},
            {id: 2, avatar: 'foto', fullName: 'Luis Ferreyra', email: 'luis548@gmail.com', created: '24/07/2021', state: 'Habilitado', activo: false},
            {id: 3, avatar: 'foto', fullName: 'Ema Ferreyra', email: 'emaCorreo@gmail.com', created: '24/07/2021', state: 'Deshabilitado', activo: false},
            {id: 4, avatar: 'foto', fullName: 'Glo Ferreyra', email: 'gloquita@gmail.com', created: '24/07/2021', state: 'Habilitado', activo: false},
            {id: 5, avatar: 'foto', fullName: 'Leonardo Ferreyra', email: 'loreto@gmail.com', created: '24/07/2021', state: 'Pendiente', activo: false},
        ])
      

        const titles = ref([])

        // Activa el valor para abrir una ventana modal de ese elemento
        const actionModal = (data) => {
            let aux = datas.value.find(element => element.id == data.id)
            aux.activo = !aux.activo
        }

        // Activa el valor de modalDelete para abrir el modal de aviso 
        const actionModalDelete = (data) => {
            let aux = datas.value.find(element => element.id == data)
            aux.activo = false
            aux.modalDelete = !aux.modalDelete
        }
        watchEffect(()=>{
            if(i18n.global.locale == 'en'){
                titles.value = ['Avatar','Full name','Email','Created','State']
            }
            if(i18n.global.locale == 'es'){
                titles.value = ['Avatar','Nombre completo','Correo','Creado','Estado']
            }
        })

        // Cambia el estado del usuario entre habilitado y deshabilitado
        const ChangeState = (data) => {
            data.state == 'Habilitado'? data.state = 'Deshabilitado' : data.state = 'Habilitado'
        }

        return {
            datas,
            titles,
            actionModal,
            actionModalDelete,
            ChangeState
        }
    }
}
</script>

<style scoped></style>