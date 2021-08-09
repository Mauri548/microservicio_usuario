<template>
    <div class="conteiner-tablero mt-2 py-4">
        <div class="head-tablero">
            <TitleBoard title="Companies" />
            <hr>
            <div class="body-tablero my-3 px-4">
                <HeadBoard />
            </div>
        </div>
        <div class="body-tablero px-4">
            <Board :datas="datas" :titles="titles" >
                <tr class="has-text-centered" v-for="data in datas" :key="data.id">
                    <th @click="actionModal(data)">{{data.id}}</th>
                    <td @click="actionModal(data)">{{data.nameFantasy}}</td>
                    <td @click="actionModal(data)">{{data.businessName}}</td>
                    <td @click="actionModal(data)">{{data.owners}}</td>
                    <td @click="actionModal(data)">{{data.cuit}}</td>
                    <td @click="actionModal(data)">{{data.email}}</td>
                    <td @click="actionModal(data)">{{data.phone}}</td>
                    <td @click="actionModal(data)">{{data.taxCondition}}</td>
                    <td @click="actionModal(data)">{{data.direction}}</td>
                    <td @click="actionModal(data)">{{data.location}}</td>
                    <td @click="actionModal(data)">{{data.province}}</td>
                    <td @click="actionModal(data)">{{data.country}}</td>
                    <Modal namePath="EditApp" :data="data" @onCloseModal="actionModal" @onOpenModalDelete="actionModalDelete" />
                    <ActionModal :data="data" @onCloseModalAction="actionModalDelete" />
                </tr>
            </Board>
        </div>
    </div>

      <div>
            <div class="modal" :class="{'is-active': carga_exitosa}">
                <div class="modal-background " style="background-color: rgb(197, 197, 197, 0.0)"></div>
                <div class="modal-content-width has-text-black" style="border:1px ridge grey;" :class="{'modal-puntowifi-escritorio' : !isMobile, 'modal-puntowifi-mobil' : isMobile}">
                    <div class="container has-text-centered has-background-white" :class="{'p-2':isMobile, 'p-5':!isMobile}" id="modal">
                        <!-- <h1 class="is-size-3 has-text-weight-semibold" :class="{'is-size-4':isMobile}">No se puede borrar el anuncio</h1> -->
                        <p v-show="comprobar==true" class="has-text-centered has-text-success">Se cargo con exito la empresa.</p>
                        <p v-show="comprobar_edi==true" class="has-text-centered has-text-success">Se edito con exito la empresa.</p>
                        <div class="columns mt-2">
                            <div class="column">
                                <button class="button w-100 fondo-crenein is-outline btn has-text-white has-text-weight-blod" @click="carga_exitosa = false">Esta bien</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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
import store from '@/store';
import { inject } from '@vue/runtime-core'

export default {
    components: {
        TitleBoard,
        HeadBoard,
        Board,
        Pagination,
        Modal,
        ActionModal,
    },
    created(){
        this.comprobar_carga()
        this.comprobar_edicion()
    },

    setup() {
        const isMobile = inject('isMobile')
        const carga_exitosa = ref(false)
        const comprobar = store.state.carga_exitosa
        const comprobar_edi = store.state.edicion_exitosa
        const accion_exitosa = ref(false)

        const datas = ref([
            {id: 1, nameFantasy: 'Internet', businessName: 'Internet', owners: 'Gonzalo Ramitez', cuit: 203688999, email: 'ramirez@gmail.com',
            phone: 3624624482, taxCondition: 'IVA', direction: 'calle 2', location: 'Resistencia', province: 'Chaco', country: 'Argentina'},
            {id: 2, nameFantasy: 'Internet', businessName: 'Internet', owners: 'Gonzalo Ramitez', cuit: 203688999, email: 'ramirez@gmail.com',
            phone: 3624624482, taxCondition: 'IVA', direction: 'calle 2', location: 'Resistencia', province: 'Chaco', country: 'Argentina'},
            {id: 3, nameFantasy: 'Internet', businessName: 'Internet', owners: 'Gonzalo Ramitez', cuit: 203688999, email: 'ramirez@gmail.com',
            phone: 3624624482, taxCondition: 'IVA', direction: 'calle 2', location: 'Resistencia', province: 'Chaco', country: 'Argentina'},
            {id: 4, nameFantasy: 'Internet', businessName: 'Internet', owners: 'Gonzalo Ramitez', cuit: 203688999, email: 'ramirez@gmail.com',
            phone: 3624624482, taxCondition: 'IVA', direction: 'calle 2', location: 'Resistencia', province: 'Chaco', country: 'Argentina'},
            {id: 5, nameFantasy: 'Internet', businessName: 'Internet', owners: 'Gonzalo Ramitez', cuit: 203688999, email: 'ramirez@gmail.com',
            phone: 3624624482, taxCondition: 'IVA', direction: 'calle 2', location: 'Resistencia', province: 'Chaco', country: 'Argentina'},
            {id: 6, nameFantasy: 'Internet', businessName: 'Internet', owners: 'Gonzalo Ramitez', cuit: 203688999, email: 'ramirez@gmail.com',
            phone: 3624624482, taxCondition: 'IVA', direction: 'calle 2', location: 'Resistencia', province: 'Chaco', country: 'Argentina'},
            {id: 7, nameFantasy: 'Internet', businessName: 'Internet', owners: 'Gonzalo Ramitez', cuit: 203688999, email: 'ramirez@gmail.com',
            phone: 3624624482, taxCondition: 'IVA', direction: 'calle 2', location: 'Resistencia', province: 'Chaco', country: 'Argentina'},
        ])

        const titles = ref(['Name fantasy', 'Business name', 'Owners', 'Cuit', 'Email', 'Phone', 'Tax condition', 'Direction', 'Location', 'Province', 'Country'])

        const actionModal = (data) => {
            console.log(datas.value)
            let aux = datas.value.find(element => element.id == data.id)
            aux.activo = !aux.activo
        }

        const actionModalDelete = (data) => {
            let aux = datas.value.find(element => element.id == data)
            aux.activo = false
            aux.modalDelete = !aux.modalDelete
        }

        const comprobar_carga = () => {
            // console.log(comprobar)
            if(comprobar==true){
               carga_exitosa.value = true
               let accion = "cargarCompany"
               store.commit('verificar_carga',accion)
            }
        }
        const comprobar_edicion = () => {
            // console.log(comprobar)
            if(comprobar_edi==true){
               carga_exitosa.value = true
               let accion = "edicionCompany"
               store.commit('verificar_carga',accion)
            }
        }

        return {
            isMobile ,
            comprobar_carga ,
            comprobar_edicion ,
            carga_exitosa,
            comprobar ,
            comprobar_edi ,
            accion_exitosa ,
            datas,
            titles,
            actionModal,
            actionModalDelete
        }
    }
}
</script>

<style >

</style>