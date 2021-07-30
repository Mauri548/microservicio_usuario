<template>
    <div class="conteiner mt-2 py-4">
        <div class="head-tablero">
            <TitleBoard title="Users" />
            <hr>
            <div class="body-tablero my-3 px-4">
                <HeadBoard/>
            </div>
        </div>
        <div class="body-tablero px-4">
            <Board :datas="datas_aux" :titles="titles" @onOpenModal="modalChildren" @onCloseModal="modalChildren" />
        </div>

        <Pagination/>
        <!-- <div class="conteiner-pagination px-4 mt-3">
            <nav class="pagination is-right" role="navigation" aria-label="pagination">
                <p class="ml-1">1 al 7 de 7</p>
                <ul class="pagination-list">
                    <li><a class="pagination-link" aria-label="Goto page 1">1</a></li>
                    <li><span class="pagination-ellipsis">&hellip;</span></li>
                    <li><a class="pagination-link" aria-label="Goto page 45">45</a></li>
                    <li><a class="pagination-link is-current" aria-label="Page 46" aria-current="page">46</a></li>
                    <li><a class="pagination-link" aria-label="Goto page 47">47</a></li>
                    <li><span class="pagination-ellipsis">&hellip;</span></li>
                    <li><a class="pagination-link" aria-label="Goto page 86">86</a></li>
                </ul>
            </nav>
        </div> -->
    </div>
</template>

<script>
import TitleBoard from '../../components/Board/TitleBoard.vue'
import HeadBoard from '../../components/Board/HeadBoard.vue'
import Board from '../../components/Board/Board.vue'
import Pagination from '../../components/Board/Pagination.vue'
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

    setup () {
        const datas = ref([
            {id: 1, avatar: 'foto', fullName: 'Mauricio Ferreyra', email: 'mauricioferreyra548@gmail.com', created: '24/07/2021', enable: 'yes', activo: false},
            {id: 2, avatar: 'foto', fullName: 'Luis Ferreyra', email: 'luis548@gmail.com', created: '24/07/2021', enable: 'yes', activo: false},
            {id: 3, avatar: 'foto', fullName: 'Ema Ferreyra', email: 'emaCorreo@gmail.com', created: '24/07/2021', enable: 'yes', activo: false},
            {id: 4, avatar: 'foto', fullName: 'Glo Ferreyra', email: 'gloquita@gmail.com', created: '24/07/2021', enable: 'yes', activo: false},
            {id: 5, avatar: 'foto', fullName: 'Leonardo Ferreyra', email: 'loreto@gmail.com', created: '24/07/2021', enable: 'yes', activo: false},
        ])

        const datas_aux = ref([])
        const titles = ref(['Avatar','Full name','Email','Created','Enable'])

        // Creamos un data auxiliar para pasarlo en el componente como parametro
        const cargarData = () => {
            datas.value.forEach(element => {
                datas_aux.value.push({valor1: element.id, valor2: element.avatar, valor3: element.fullName,
                valor4: element.email, valor5: element.created, valor6: element.enable, activo: element.activo})
            })
        }

        const modalChildren = (dato) => {
            let aux = datas.value.find(element => element.id == dato.id)
            aux.activo = dato.valor
            updateRow(aux)
        }

        const updateRow = (e) => {
            let aux = datas_aux.value.find(element => element.valor1 == e.id)
            aux.avatar = e.avatar
            aux.fullName = e.fullName
            aux.email = e.email
            aux.created = e.created
            aux.enable = e.enable
            aux.activo = e.activo
        }

        return {
            datas,
            titles,
            datas_aux,
            cargarData,
            modalChildren,
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

/* .is-current {
    background-color: #005395;
} */

</style>