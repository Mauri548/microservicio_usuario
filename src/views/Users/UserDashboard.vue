<template>
    <div class="conteiner-tablero mt-2 py-4">
        <div class="head-tablero">
            <div v-show="Lan==true">
                <TitleBoard title="Usuarios" />
            </div> 
            <div v-show="Lan==false">
                <TitleBoard title="Users" />
            </div> 
            <hr>
            <div class="body-tablero my-3 px-4">
                <HeadBoard :buttonDefault="false">
                    <button class="button btn-crenein">{{$t('inviteUser.invitar')}}</button>
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
import { ref } from '@vue/reactivity'
import store from '@/store'
import {  watchEffect } from '@vue/runtime-core'


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
        const Lan = ref(false)

        const titles = ref(['Avatar','Full name','Email','Created','State'])

        const actionModal = (data) => {
            let aux = datas.value.find(element => element.id == data.id)
            aux.activo = !aux.activo
        }

        const actionModalDelete = (data) => {
            let aux = datas.value.find(element => element.id == data)
            aux.activo = false
            aux.modalDelete = !aux.modalDelete
        }
        watchEffect(()=>{
            Lan.value = store.state.cambio_lang

            if(Lan.value){
                titles.value[1] = "Nombre completo"
                titles.value[2] = "Correo"
                titles.value[3] = "Creado"
                titles.value[4] = "Estado"
            }
            else{
                titles.value[1] = "Full name"
                titles.value[2] = "Email"
                titles.value[3] = "Created"
                titles.value[4] = "State"
            }
 

        })

        return {
            Lan,
            datas,
            titles,
            actionModal,
            actionModalDelete
        }
    }
}
</script>

<style>



/* .is-current {
    background-color: #005395;
} */

</style>