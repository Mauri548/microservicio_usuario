<template>
    <div class="carrousel" >
        <div class="conteiner-app">
            <div class="img-app" v-for="app in apps" :key="app.id">
                <img :src="app.logo" width="120" alt="">
                <h3>{{app.name}}</h3>
            </div>
        </div>
        <u class="puntos">
            <li class="punto activo"></li>
            <li class="punto"></li>
            <li class="punto"></li>
        </u>
    </div>
</template>

<script>
import ispb from '@/assets/ispb2.png'
import puwic from '@/assets/puwic2.png'
import geston from '@/assets/geston2.png'
import { ref } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core'

export default {
    name: 'SelectApp',

    setup() {
        const apps = ref([
            {id: 1, name: 'ISPBrain', logo: ispb, activo: true},
            {id: 2, name: 'PuWiC', logo: puwic, activo: true},
            {id: 3, name: 'Geston', logo: geston, activo: true},
            {id: 4, name: 'Geston', logo: geston, activo: false},
            {id: 5, name: 'Geston', logo: geston, activo: false},
            {id: 6, name: 'Geston', logo: geston, activo: false},
            // {id: 7, name: 'Geston', logo: geston, activo: false}
        ])

        let cantSection = 0
        // (apps.value.length % 3) > 0 ? cantSection = Math.trunc(apps.value.length / 3) + 1 : cantSection = Math.trunc(apps.value.length / 3) 
        if ((apps.value.length % 3) > 0) {
            cantSection = Math.trunc(apps.value.length / 3) + 1
        } else {
            cantSection = Math.trunc(apps.value.length / 3) 
        }

        // let dimension = cantSection * 100


        onMounted(() =>  {

            const carrousel = document.querySelector('.conteiner-app')
            const punto = document.querySelectorAll('.punto')

            punto.forEach((cadaPunto, i) => {
                punto[i].addEventListener('click', () => {
                    let posicion = i
                    let operacion = posicion * -33.3

                    carrousel.style.transform = `translateX(${operacion}%)`
                    punto.forEach((cadaPunto, i) => {
                        punto[i].classList.remove('activo')
                    })
                    punto[i].classList.add('activo')

                })
            })
        })
 
        return {
            apps
        }
    }
}
</script>

<style scoped>

.carrousel {
    width: 100%;
}

.carrousel .conteiner-app {
    width: 300%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;

    transition: all .5s ease;
    transform: translateX(0%)
}

.carrousel .img-app {
    width: calc(33.3% / 3);
}

.carrousel .puntos {
    width: 100%;
    padding: 0.4em;
    list-style: none;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
}

.carrousel .punto {
    width: 1em;
    height: 1em;
    background-color: red;
    margin: 0.4em;
    border-radius: 50%;
}

.carrousel .punto.activo {
    background-color: orange;
}
</style>