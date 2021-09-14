<template>
    <div class="conteiner-tablero mt-2 py-2">
        <div class="head-tablero">
            <TitleBoard v-show="$i18n.locale=='en'" title="Licences" />
            <TitleBoard v-show="$i18n.locale=='es'" title="Licencias" />
            <hr>
            <div class="body-tablero my-3 px-4">
                <HeadBoard :buttonDefault="false">
                    <button @click="ModalAdd" class="button btn-crenein">{{$t('board.headBoard.agregar')}}</button>
                </HeadBoard>
            </div>
        </div>
        <div class="body-tablero px-4">
            <Board :datas="licences" :titles="titles">
                <tr class="has-text-centered" v-for="licence in licences" :key="licence.id">
                    <th>{{licence.id}}</th>
                    <td>{{licence.name}}</td>
                    <td>{{licence.app}}</td>
                    <td>${{licence.price_arg}}</td>
                    <td>${{licence.price_usd}}</td>
                </tr>
            </Board>
        </div>
        <Pagination/>
    </div>
    <AddLicence v-show="addLicence" @closeModal="ModalAdd" />
</template>

<script>
import TitleBoard from '../../components/Board/TitleBoard.vue'
import HeadBoard from '../../components/Board/HeadBoard.vue'
import Board from '../../components/Board/Board.vue'
import Pagination from '../../components/Board/Pagination.vue'
import Modal from '../../components/Modal.vue'
import ActionModal from '../../components/Modals/ActionsModal.vue'
import ModalAlert from '../../components/Modals/ModalsAlert.vue'
import AddLicence from './AddLicence.vue'
import { ref, watchEffect } from '@vue/runtime-core'
import i18n from '@/i18n.js'


export default {
    components : {
        TitleBoard,
        HeadBoard,
        Board,
        Pagination,
        Modal,
        ActionModal,
        ModalAlert,
        AddLicence,
    },

    setup() {
        const titles = ref([])
        const licences = ref([
            {id: 1, name: 'Licence 200 client', app: 'ISPB', price_arg: 2500, price_usd: 25},
            {id: 2, name: 'Licence 5 point wifi and 25 adverstimennt', app: 'Puwic', price_arg: 2000, price_usd: 20},
        ])
        const addLicence = ref(false)
        
        watchEffect(()=>{
            if(i18n.global.locale=='es'){
                titles.value = ['Nombre','Aplicación','Precio ARG','Precio USD']
            }
            if(i18n.global.locale=='en'){
                titles.value = ['Name','App','Price ARG','Price USD']
            }
        })

        const ModalAdd = () => {
            addLicence.value = !addLicence.value
        }

        return {
            licences,
            titles,
            addLicence,
            ModalAdd,
        }
    }

}
</script>

<style>

</style>