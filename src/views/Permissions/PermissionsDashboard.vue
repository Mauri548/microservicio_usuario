<template>
    <div class="conteiner-tablero mt-2 py-4">
        <div  class="head-tablero">
            <div v-if="$i18n.locale=='es'">
                <TitleBoard title="Permisos"/>
            </div>
            <div v-if="$i18n.locale=='en'">
                <TitleBoard title="Permissions"/>
            </div>
          
            <hr>
            <div class="body-tablero my-3 px-4">
                <HeadBoard :buttonDefault="false">
                    <button @click="actionModalAddPermission" class="button btn-crenein">{{$t('board.headBoard.agregar')}}</button>
                </HeadBoard>
            </div>
        </div>
        
        <div class="body-tablero px-4">
            <Board :datas="datas" :titles="titles" >
                <tr class="has-text-centered" v-for="data in datas" :key="data.id">
                    <th @click="actionModal(data)">{{data.id}}</th>
                    <td @click="actionModal(data)">{{data.app}}</td>
                    <td @click="actionModal(data)">{{data.key}}</td>
                    <td @click="actionModal(data)">{{data.detail}}</td>
                    <Modal :data="data" @onCloseModal="actionModal" @onOpenModalDelete="actionModalDelete" :buttonDefault="false">
                        <button @click="actionModalEditPermission" class="button btn-crenein w-100 my-1">
                            <span class="icon is-small">
                                <i class="fas fa-pencil-alt"></i>
                            </span>
                            <span>{{$t('modal.editar')}}</span>
                        </button>
                    </Modal>
                    <ActionModal :data="data" @onCloseModalAction="actionModalDelete" />
                </tr>
            </Board>
        </div>
        <Pagination/>
        <AddPermission :data="addPermission" @tengoAct="mostrarModal2" @onCloseModal="actionModalAddPermission" /> 
        <EditPermission :data="editPermission" @tengoAct="mostrarModal"  @onCloseModal="actionModalEditPermission" />
    </div>

    <ModalAlert :activador="carga_exitosa">
        <p v-if="comprobar">Se cargo con exito el permiso</p>
        <p v-if="comprobar_edi">Se edito con exito el permiso.</p>
    </ModalAlert>


      <!-- <div>
            <div class="modal" :class="{'is-active': carga_exitosa}">
                <div class="modal-background " style="background-color: rgb(197, 197, 197, 0.0)"></div>
                <div class="modal-content-width has-text-black" style="border:1px ridge grey;" :class="{'modal-puntowifi-escritorio' : !isMobile, 'modal-puntowifi-mobil' : isMobile}">
                    <div class="container has-text-centered has-background-white" :class="{'p-2':isMobile, 'p-5':!isMobile}" id="modal">
                        <p v-show="comprobar==true" class="has-text-centered has-text-success">Se cargo con exito el permiso.</p>
                        <p v-show="comprobar_edi==true" class="has-text-centered  has-text-success">Se edito con exito el permiso.</p>
                        <div class="columns mt-2">
                            <div class="column">
                                <button class="button w-100 fondo-crenein is-outline btn has-text-white has-text-weight-blod" @click="cerrarModal">Esta bien</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> -->
</template>

<script>
import TitleBoard from '../../components/Board/TitleBoard.vue'
import HeadBoard from '../../components/Board/HeadBoard.vue'
import Board from '../../components/Board/Board.vue'
import Pagination from '../../components/Board/Pagination.vue'
import Modal from '../../components/Modal.vue'
import ActionModal from '../../components/Modals/ActionsModal.vue'
import ModalAlert from '../../components/Modals/ModalsAlert.vue'
import EditPermission from './EditPermission.vue'
import AddPermission from './AddPermission.vue'
import { ref } from '@vue/reactivity'
import { inject, watchEffect } from '@vue/runtime-core'

export default {
    components: {
        TitleBoard,
        HeadBoard,
        Board,
        Pagination,
        Modal,
        ActionModal,
        AddPermission,
        EditPermission,
        ModalAlert,
    },
   
    setup() {
        const isMobile = inject('isMobile')
        const carga_exitosa = ref(false)
       /*  const comprobar = store.state.carga_exitosa */
        const comprobar = ref(false)
        const comprobar_edi = ref(false)
        const accion_exitosa = ref(false)
        const addPermission = ref(false)
        const editPermission = ref(false)
    


        const mostrarModal = (act) => {
            /* console.log(act.value.activo) */
            carga_exitosa.value = act.value.activo
            comprobar_edi.value = act.value.edit
            setTimeout(() => {
                carga_exitosa.value = false
                comprobar_edi.value = false
            } ,3000)
        }

        const mostrarModal2 = (act) => {
            /* console.log(act.value.activo) */
            carga_exitosa.value = act.value.activo
            comprobar.value = act.value.cargar
            setTimeout(() => {
                carga_exitosa.value = false
                comprobar.value = false
            } ,3000)
        }

        const cerrarModal = () => {
            carga_exitosa.value = false
            if(comprobar_edi.value==true){
                comprobar_edi.value = false
            }
            if(comprobar.value==true){
                comprobar.value = false
            }
        }

        const datas = ref([
            {id: 1, app: 'ISPB', key: 'customers_table_list', detail: 'Ver lista', activo: false},
            {id: 2, app: 'ISPB', key: 'customers_table_add', detail: 'Agregar cliente', activo: false},
            {id: 3, app: 'ISPB', key: 'customers_table_add', detail: 'Agregar cliente', activo: false},
            {id: 4, app: 'ISPB', key: 'customers_table_add', detail: 'Agregar cliente', activo: false},
            {id: 5, app: 'ISPB', key: 'customers_table_add', detail: 'Agregar cliente', activo: false},
            {id: 6, app: 'ISPB', key: 'customers_table_add', detail: 'Agregar cliente', activo: false},
            {id: 7, app: 'ISPB', key: 'customers_table_add', detail: 'Agregar cliente', activo: false},
            {id: 8, app: 'ISPB', key: 'customers_table_add', detail: 'Agregar cliente', activo: false},
            {id: 9, app: 'ISPB', key: 'customers_table_add', detail: 'Agregar cliente', activo: false},
            {id: 10, app: 'ISPB', key: 'customers_table_add', detail: 'Agregar cliente', activo: false},
        ])
      
        
        const titles = ref(['App','Key','Detail'])


  /*  watchEffect(()=>{
            if($i18n.locale=='es'){
                titles.value[0] = 'Aplicacion'
            }
            if($i18n.locale=='en'){
                titles.value[0] = 'App'
            }
        })  */


        // Abre el modal de acciones del elemento que clickeas

        const actionModal = (data) => {
            let aux = datas.value.find(element => element.id == data.id)
            aux.activo = !aux.activo
        }

        // Abre la ventana emergente para eliminar un elemento de la lista
        const actionModalDelete = (data) => {
            let aux = datas.value.find(element => element.id == data)
            aux.activo = false
            aux.modalDelete = !aux.modalDelete
        }

        // Abre el modal para agregar un permiso a la lista
        const actionModalAddPermission = () => {
            addPermission.value = !addPermission.value
        }

        // Abre el modal para editar un permiso de la lista
        const actionModalEditPermission = () => {
            datas.value.forEach(element => element.activo = false)
            editPermission.value = !editPermission.value
        }
        

        return {
            mostrarModal2 ,
            cerrarModal,
            mostrarModal,
            isMobile,
            carga_exitosa ,
            comprobar ,
            comprobar_edi ,
            accion_exitosa ,
            datas,
            titles,
            actionModal,
            actionModalDelete,
            addPermission,
            editPermission,
            actionModalAddPermission,
            actionModalEditPermission

        }
    }
}

</script>

<style scoped>

.is-current {
    background-color: #005395;
}

/* scaleSize transitions */
.scaleSize-enter-from, .scaleSize-leave-to {
    opacity: 0;
    transform: scale(.5);
}
.scaleSize-enter-active, .scaleSize-leave-active {
    transition: all .3s ease
}
</style>