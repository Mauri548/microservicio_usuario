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

            <CarrouselSection :size="apps.length" carrousel="conteiner-app" type="app" :pos="0"/>
            
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

        // Calculamos la cantidad de secciones que tendra el carrousel
        if ((props.apps.length % 3) > 0) {
            cantSection.value = Math.trunc(props.apps.length / 3) + 1
        } else if ((props.apps.length % 3) == 0) {
            cantSection.value = 1
        } else {
            cantSection.value = Math.trunc(props.apps.length / 3) 
        }
        // Calculamos el desplazamiento que hara por seccion
        desplazamiento.value = -(100/cantSection.value).toFixed(1)


        // Dejare comentado esto de momento
        // En teoría debería de calcular el tamaño para cada elemento o app
        // onMounted(() =>  {
        //     const imgApp = document.querySelectorAll('.img-app')

        //     // Caclulamos el tamaño para cada app
        //     imgApp.forEach((cadaImage, i) => {
        //         imgApp[i].style.width = `calc(33.3% / ${cantSection.value})`
        //         // Agregamos el evento de seleccionar app
        //         imgApp[i].addEventListener('click', () => {
        //             imgApp.forEach((cadaImage, i) => {
        //                 imgApp[i].classList.remove('activo')
        //             })
        //             imgApp[i].classList.add('activo')
        //         })
        //     })
        // })
 
        const selectApp = (e) => {
            appSelect.value = e
           /*  console.log(appSelect.value) */
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
    /* width: 300%; */
    /* width: 500%; */
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

/* .arrow {
    display: flex;
    align-items: center;
    width: 25px;
    min-height: 80%;
    position: absolute;
    background-color: rgba(204,204,204,0.13);
    z-index: 1;
}

.arrow-next {
    top:0%;
    right: 0%;
    border-radius: 0 5px 5px 0;
}

.arrow-prev {
    display: none;
    border-radius: 5px 0 0 5px;
}

i {
    font-size: 35px;
    color: rgba(128,128,128,0.38)
}

.arrow:hover {
    cursor: pointer;
    background-color: rgba(204,204,204,0.3);
}

.arrow:hover i {
    color: #005395
} */


</style>