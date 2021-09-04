<template>
    <div class="conteiner-tablero mt-2 py-4">
        <div class="head-tablero">
            <div v-show="$i18n.locale=='es'">
                <TitleBoard title="Empresas" />
            </div> 
            <div v-show="$i18n.locale=='en'">
                <TitleBoard title="Companies" />
            </div> 
           
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
                    <Modal namePath="EditCompany" :data="data" @onCloseModal="actionModal" @onOpenModalDelete="actionModalDelete" />
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
        const Lan = ref(false)

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


        watchEffect(()=>{
            Lan.value = store.state.cambio_lang

            if(Lan.value){
                titles.value[0] = "Nombre de fantasia"
                titles.value[1] = "Nombre de negocio"
                titles.value[2] = "Propietario"
                titles.value[3] = "Cuit"
                titles.value[4] = "Correo"
                titles.value[5] = "Telefono"
                titles.value[6] = "Condición fiscal"
                titles.value[7] = "Direccion"
                titles.value[8] = "Ciudad"
                titles.value[9] = "Provincia"
                titles.value[10] = "Pais"
            }
            else{
                titles.value[0] = "Name fantasy"
                titles.value[1] = "Business name"
                titles.value[2] = "Owner"
                titles.value[3] = "Cuit"
                titles.value[4] = "Email"
                titles.value[5] = "Phone"
                titles.value[6] = "Tax condition"
                titles.value[7] = "Direction"
                titles.value[8] = "Location"
                titles.value[9] = "Province"
                titles.value[10] = "Country"
            }
 

        })

        // Activa el valor para abrir una ventana modal de ese elemento
        const actionModal = (data) => {
            let aux = datas.value.find(element => element.id == data.id)
            aux.activo = !aux.activo
        }

        // Activa el valor modalDelete para abrir una ventana de aviso antes de eliminar un elemento
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
            Lan,
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