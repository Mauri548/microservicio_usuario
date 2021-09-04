<template>
    <div>
        <div class="dropdown mt-4 mb-2" :class="{'is-active': coinActivo}">
            <div class="dropdown-trigger">
                <button @click="openSelectCoin" id="select-coin" class="button" aria-haspopup="true" aria-controls="dropdown-menu">
                <span id="select-coin">{{coinSelect.name}}</span>
                <span class="icon is-small" id="select-coin">
                    <i class="fas fa-angle-down" id="select-coin" aria-hidden="true"></i>
                </span>
                </button>
            </div>
            <div class="dropdown-menu" id="dropdown-menu" role="menu">
                <div class="dropdown-content mt-0">
                    <a @click="changeCoin(coin.id)" v-for="coin in coins" :key="coin.id" class="dropdown-item"
                        :class="{'is-active': coin.id == coinSelect.id}">
                        {{coin.name}}
                    </a>
                </div> 
            </div>
        </div>

        <div class="carrousel my-2">
            <Arrow arrow="arrow-prev" icon="fa-chevron-left" conteiner="conteiner-licence" punto="lic"
            :cantSection="cantSection" :desplazamiento="desplazamiento" />
            <div class="conteiner-licence">
                <div class="licence" v-for="licence in licences" :key="licence.id" >
                    <h3 class="mt-2">{{licence.title}}</h3>
                    <hr>
                    <p>{{licence.description}}</p>
                    <hr>
                    <p v-show="coinSelect.name == 'ARS'">{{licence.price.ars}} ARS</p>
                    <p v-show="coinSelect.name == 'USD'">{{licence.price.usd}} USD</p>
                    <button class="button btn-crenein my-2 is-size-7">I want</button>
                </div>
            </div>
            <Arrow arrow="arrow-next" icon="fa-chevron-right" conteiner="conteiner-licence" punto="lic"
            :cantSection="cantSection" :desplazamiento="desplazamiento" />

            <CarrouselSection :size="licences.length" carrousel="conteiner-licence" type="lic" :pos="1" />
        </div>
    </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import CarrouselSection from './CarrouselSection.vue'
import Arrow from './Arrow.vue'
export default {
    name: 'SelectLicence',

    components: {
        CarrouselSection,
        Arrow,
    },
    
    setup() {
        const licences = ref([
            {id: 1, title: 'Licencia 40x6', description: 'Permite hasta 40 anuncios y 6 puntos WiFi', price: {ars: 3000, usd: 32}},
            {id: 2, title: 'Licencia 60x8', description: 'Permite hasta 60 anuncios y 8 puntos WiFi', price: {ars: 4000, usd: 41}},
            {id: 3, title: 'Licencia 80x10', description: 'Permite hasta 80 anuncios y 10 puntos WiFi', price: {ars: 5000, usd: 52}},
            {id: 4, title: 'Licencia 100x12', description: 'Permite hasta 100 anuncios y 12 puntos WiFi', price: {ars: 6000, usd: 62}},
            {id: 5, title: 'Licencia 120x14', description: 'Permite hasta 120 anuncios y 14 puntos WiFi', price: {ars: 7000, usd: 72}},
        ])

        const coins = ref([
            {id: 1, name: 'ARS'},{id:2, name: 'USD'}
        ])
        const coinActivo = ref(false)
        const coinSelect = ref({id: 1, name: 'ARS'})
        const cantSection = ref(0)
        const desplazamiento = ref(0)

        // Calculamos la cantidad de secciones que tendra el carrousel
        if ((licences.value.length % 3) > 0) {
            cantSection.value = Math.trunc(licences.value.length / 3) + 1
        } else {
            cantSection.value = Math.trunc(licences.value.length / 3) 
        }
        // Calculamos el desplazamiento que hara por seccion
        desplazamiento.value = -(100/cantSection.value).toFixed(1)

        // Abre el desplegable de monedas
        const openSelectCoin = () => {
            coinActivo.value = !coinActivo.value 
        }

        // Cambia el valor del desplegable de monedas
        const changeCoin = (id) => {
            let aux = coins.value.find(element => element.id == id)
            coinSelect.value = aux
            openSelectCoin()
        }

        // funcion que detecta cuando se hace click fuera del elemento con la class "select-coin"
        // y hace que se cierre el desplegable de moneda
        document.addEventListener('click', (e) => {
            let clic = e.target.getAttribute('id')
            if (clic != 'select-coin') {
                coinActivo.value = false
            }
        }, false)

        return {
            licences,
            coins,
            coinActivo,
            coinSelect,
            cantSection,
            desplazamiento,
            openSelectCoin,
            changeCoin,
        }
    }
}
</script>

<style scoped>
.dropdown-menu {
    min-width: 10rem;
}

.carrousel {
    width: 100%;
    position: relative;
}

.carrousel .conteiner-licence {
    width: 200%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;

    transition: all .5s ease;
    transform: translateX(0%)
}

.carrousel .licence {
    width: calc(33.3% / 2 - 10px);
    margin: 0px 5px;
    padding: 4px;
    border-radius: 15px;
    box-shadow: 0px 0px 8px 2px #ccc;
    font-size: 0.85rem;
}

.licence hr {
    margin: 0.7em 0;
}

@media (max-width: 768px) {
    .carrousel .conteiner-licence {
        margin: auto;
        flex-direction: column;
    }

    .carrousel .licence {
        width: 100%;
        margin: 5px 5px;
    }
}

</style>