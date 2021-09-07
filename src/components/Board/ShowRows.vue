<template>
    <div class="column is-flex is-align-items-center">
      
        
        <p>{{$t('board.showRows.mostrar')}}</p>
        <div class="dropdown mx-2" :class="{'is-active':activo}">
            <div class="dropdown-trigger">
                <button @click="activar" id="select-row" class="button" aria-haspopup="true" aria-controls="dropdown-menu3">
                <span>{{cantSelect}}</span>
                <span class="icon is-small">
                    <i id="select-row" class="fas fa-angle-down" aria-hidden="true"></i>
                </span>
                </button>
            </div>
            <div class="dropdown-menu" id="dropdown-menu3" role="menu">
                <div class="dropdown-content">
                    <a v-for="(show, index) in cantRows" :index="index" :key="show.id" 
                    href="#" class="dropdown-item" @click="changeCantRow(show.valor)">
                        {{show.valor}}
                    </a>
                </div>
            </div>
        </div>
        <p>{{$t('board.showRows.filas')}}</p>
     
    </div>
</template>

<script>
import { ref } from '@vue/reactivity'
export default {
    name: 'ShowRows',

    setup () {
        const cantRows = ref([
            {valor: 50},{valor: 100},{valor: 200}
        ])
        const cantSelect = ref(50)
        const activo = ref(false)
       
        const activar = () => {
            activo.value = !activo.value
        }

        const changeCantRow = (valor) => {
            console.log(valor)
            cantSelect.value = valor
        }

        // funcion que cerrara el desplegable con la class "select-row" cuando no se haga click a este
        document.addEventListener('click', (e) => {
            let clic = e.target.getAttribute('id')
            if ((clic != 'select-row') && (e.path[1].getAttribute('id') != 'select-row')) {
                activo.value = false
            }
        })

        return{
     
            cantRows,
            cantSelect,
            activo,
            activar,
            changeCantRow
        }

    }
}
</script>

<style scoped>
.dropdown-menu {
    min-width: 0rem;
}

.dropdown-item {
    padding-right: 2rem;
}
</style>