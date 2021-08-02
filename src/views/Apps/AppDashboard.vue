<template>
    <div class="conteiner mt-2 py-2">
        <div class="head-tablero">
            <TitleBoard title="Apps" />
            <hr>
            <div class="body-tablero my-3 px-4">
                <HeadBoard/>
            </div>
        </div>
        <div class="body-tablero px-4">
            <Board :datas="datas_aux" :titles="titles" @onOpenModal="modalChildren" @onCloseModal="modalChildren" 
            @openModalDelete="modalChildrenDelete">
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
import ispb from '@/assets/ispb2.png'
import puwic from '@/assets/puwic2.png'
import geston from '@/assets/geston2.png'
import { ref } from '@vue/reactivity'

export default {
    components: {
        TitleBoard,
        HeadBoard,
        Board,
        Pagination,
    },

    created() {
        this.cargarData()
    },

    setup() {
        const datas = ref([
           {id: 1, name: 'ISPB', logo: ispb, obvservation: 'Licencia x de ISPB', activo: false, modalDelete: false},
           {id: 2, name: 'PuWiC', logo: puwic, obvservation: 'Licencia x de PuWiC', activo: false, modalDelete: false},
           {id: 3, name: 'Geston', logo: geston, obvservation: 'Licencia x de Geston', activo: false, modalDelete: false},
        ])

        const datas_aux = ref([])
        const titles = ['Name','Logo','Obvservation']

        const cargarData = () => {
            datas.value.forEach(element => {
                datas_aux.value.push({valor1: element.id, valor2: element.name, valor13: element.logo, valor14: element.obvservation, activo: element.activo, modalDelete: element.modalDelete})
            })
        }

        const modalChildren = (dato) => {
            let aux = datas.value.find(element => element.id == dato.id)
            aux.activo = dato.valor
            updateRow(aux)
        }

        const modalChildrenDelete = (dato) => {
            console.log(dato + ' abrir3')
            let aux = datas.value.find(element => element.id == dato.id)
            aux.activo = false
            aux.modalDelete = dato.valor
            updateRow(aux)
        }

        const updateRow = (e) => {
            let aux = datas_aux.value.find(element => element.valor1 == e.id)
            aux.name = e.name
            aux.logo = e.logo
            aux.obvservation = e.obvservation
            aux.activo = e.activo
            aux.modalDelete = e.modalDelete
        }

        return {
            datas,
            datas_aux,
            titles,
            cargarData,
            modalChildren,
            modalChildrenDelete,
        }
    }
}
</script>

<style scoped>
.conteiner {
    width: 76%;
    border: 1px solid #eeeeee;
}

.conteiner .head-tablero, .conteiner .body-tablero, .conteiner .conteiner-pagination {
    width: 100%;
}

.conteiner div hr {
    margin: 5px 0;
    background: #005395;
}
</style>