<template>
    <div class="conteiner-carrousel">
        <div class="carrousel">
            <Arrow arrow="arrow-prev" icon="fa-chevron-left" conteiner="conteiner-app" punto="app"
                :cantSection="cantSection" :desplazamiento="desplazamiento" />
            <div class="conteiner-app">
                <div @click="selectApp(app)" class="img-app" v-for="app in apps" :key="app.id">
                    <img :src="app.logo" width="120" alt="">
                    <h3>{{app.name}}</h3>
                </div>
            </div>
            <Arrow arrow="arrow-next" icon="fa-chevron-right" conteiner="conteiner-app" punto="app"
            :cantSection="cantSection" :desplazamiento="desplazamiento" />

            <CarrouselSection :size="apps.length" carrousel="conteiner-app" 
                type="app" :pos="0" :cantSection="cantSection"
            />
            
        </div>
        <div v-if="appSelect" class="description-app">
            <p>{{appSelect.observation}}</p>
        </div>
        <!-- <SelectLicence v-if="appSelect" :app="appSelect" /> -->
        <SelectLicence2 v-if="appSelect" :app="appSelect" />
        
    </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { onMounted, watchEffect } from '@vue/runtime-core'
import SelectLicence2 from './SelectLicence2.vue'
import CarrouselSection from './CarrouselSection.vue'
import Arrow from './Arrow.vue'

export default {
    name: 'SelectApp',
    components: {
        CarrouselSection,
        SelectLicence2,
        Arrow,
       
    },
    props: ['apps'],

    setup(props) {
    
        const cantSection = ref(0)
        const desplazamiento = ref(0)
        const appSelect = ref(null)
        const app = ref('')
        const cant = ref(0)

        onMounted(() => {
            app.value = document.querySelectorAll('.img-app')
        })

        /**
         * Calcula la cantidad de secciones del carrusel
         * 
         * @param c cantidad de elementos por secciones que va a tener el carrusel
         */
        const calcCantSection = (c) => {
            cant.value = c
            let aux = 0
            if ((props.apps.length / c) > 0) {
                aux = Math.trunc(props.apps.length / c)
                return props.apps.length % c != 0? aux+1 : aux
            }

            if ((props.apps.length / c) == 0) {
                return 1
            }

            return Math.trunc(props.apps.length / c)
        }

        /**
         * Calcula la cantidad de desplazamiento que tiene que hacer el carrusel
         */
        const calcDisplacement = () => {
            return -(100/cantSection.value).toFixed(1)
        }

        watchEffect(() => {
            props.apps

            cantSection.value = window.screen.width > 425? calcCantSection(3) : calcCantSection(2)

            desplazamiento.value = calcDisplacement()

            if (app.value) {
                app.value.forEach(item => {
                    item.style.width = `calc((${100}%/${cant.value}) / ${cantSection.value})`
                })
            }

        })
 
        const selectApp = (e) => {
            appSelect.value = e
        }

        return {
            appSelect,
            selectApp,
            cantSection,
            desplazamiento
        }
    }
}
</script>

<style scoped>

.conteiner-carrousel {
    overflow: hidden;
}

.carrousel {
    width: 100%;
    position: relative;
}

.carrousel .conteiner-app {
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;

    transition: all .5s ease;
    transform: translateX(0%)
}

.carrousel .img-app {
    width: calc(33.3% / 1);
    padding: 0.3em;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.carrousel .img-app:hover {
    background-color: rgba(204,204,204,0.27);
    border-radius: 15px;
    cursor: pointer;
}

.carrousel .img-app.activo {
    /* border: 2px solid #005395; */
    background-color: rgb(206 206 206 / 20%);
    border-radius: 10px;
}

.description-app {
    padding: 16px;
    background-color: rgb(206 206 206 / 20%);
    /* border: 2px solid #005395; */
    border-radius: 10px;
}

@media (max-width: 768px) {
    .carrousel {
        overflow: scroll;
    }
}

</style>