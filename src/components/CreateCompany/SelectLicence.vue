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
                <div class="licence" v-for="license in app.licenses" :key="license.id" >
                    <h3 class="my-2">{{license.name}}</h3>
                    <!-- <hr>
                    <p>{{license.description}}</p>
                    <hr> -->
                    <p class="my-2" v-show="coinSelect.name == 'ARS'">{{license.price_arg}} ARS</p>
                    <p class="my-2" v-show="coinSelect.name == 'USD'">{{license.price_usd}} USD</p>
                    <button class="button btn-crenein my-2 is-size-7">{{$t('selectLicence.btnQuiero')}}</button>
                </div>
            </div>
            <Arrow arrow="arrow-next" icon="fa-chevron-right" conteiner="conteiner-licence" punto="lic"
            :cantSection="cantSection" :desplazamiento="desplazamiento" />

            <CarrouselSection :size="app.licenses.length" carrousel="conteiner-licence" type="lic" :pos="1" />
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
    props: ['app'],
    
    setup(props) {

        const coins = ref([
            {id: 1, name: 'ARS'},{id:2, name: 'USD'}
        ])
        const coinActivo = ref(false)
        const coinSelect = ref({id: 1, name: 'ARS'})
        const cantSection = ref(0)
        const desplazamiento = ref(0)

        // Calculamos la cantidad de secciones que tendra el carrousel
        if (props.app) {
            console.log('aaa')
            if ((props.app.licenses.length % 3) > 0) {
                cantSection.value = Math.trunc(props.app.licenses.length / 3) + 1
            } else if ((props.app.licenses.length % 3) == 0) {
                cantSection.value = 1
            } else {
                cantSection.value = Math.trunc(props.app.licenses.length / 3) 
            }
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
    width: calc(33.3% / 1 - 10px);
    margin: 0px 5px;
    padding: 15px;
    border-radius: 15px;
    box-shadow: 0px 0px 8px 2px #ccc;
    /* font-size: 0.85rem; */
    box-sizing: border-box;
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