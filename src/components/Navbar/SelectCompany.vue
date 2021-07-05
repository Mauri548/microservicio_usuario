<template>
    <div class="dropdown mx-2" :class="{'is-active':activo}">
        <div class="dropdown-trigger">
            <button @click="activar" id="select-company" class="button" aria-haspopup="true" aria-controls="dropdown-menu">
                <span class="blue-crenein has-text-weight-semibold">{{companyActual.name}}</span>
                <span class="icon is-small">
                    <i id="select-company" class="fas fa-chevron-down blue-crenein"></i>
                </span>
            </button>
        </div>
        <div class="dropdown-menu shadow" id="dropdown-menu" role="menu" style="min-width: 10rem">
            <div class="dropdown-content">

                <a v-for="item in data" :key="item.id" href="#" 
                    @click="changeCompany(item.id)" class="dropdown-item blue-crenein has-text-weight-semibold" :class="{'is-active': item.id == companyActual.id}"
                    >{{item.name}}
                </a>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from '@vue/reactivity'
export default {
    name: 'SelectCompany',

    setup(){

        // ******* Datos de prueba *******
        const data = ref([
            {id: 1, name: 'Company Milkaut'},{id: 2, name: 'Company Random'}, {id: 3, name: 'Company Crenein'},
        ])
        const companyActual = ref({id: 1, name: 'Company Milkaut'})
        // *******************************

        const activo = ref(false)

        const changeCompany = (id) => {
            let aux = data.value.find(element => element.id == id)
            companyActual.value = aux
            activar()
        }

        const activar = () => {
            activo.value = !activo.value
        }

        // Oculta el Selector de company cuando se hace click fuera de este
        document.addEventListener('click', function(e) {
            let clic = e.target.getAttribute('id')
            if ((clic != "select-company") && (e.path[1].getAttribute('id') != 'select-company')) {
                activo.value = false
            }
        }, false)

        return {
            activo,
            activar,
            changeCompany,

            data,
            companyActual,
        }
    }
}
</script>

<style>

</style>