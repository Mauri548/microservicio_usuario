<template>
    <ul class="puntos">
        <li class="punto activo" :class="type"></li>
        <li v-for="i in cantSection -1" :key="i" class="punto" :class="type"></li>
    </ul>
</template>

<script>
import { onMounted } from '@vue/runtime-core'
export default {
    name: 'CarrouselSection',

    props: {
        size: Number,
        carrousel: String,
        type: String,
    },

    setup(props) {
        let cantSection = 0

        // Calculamos la cantidad de secciones que tendra el carrousel
        if ((props.size % 3) > 0) {
            cantSection = Math.trunc(props.size / 3) + 1
        } else {
            cantSection = Math.trunc(props.size / 3) 
        }
        // Calculamos el desplazamiento que hara por seccion
        let desplazamiento = -(100/cantSection).toFixed(1)

        onMounted(() => {
            const carrousel = document.querySelector(`.${props.carrousel}`)
            const punto = document.querySelectorAll(`.${props.type}`)
            console.log(punto)
            
            carrousel.style.width = `${(cantSection * 100)}%`

            punto.forEach((cadaPunto, i) => {
                punto[i].addEventListener('click', () => {
                    let posicion = i
                    let operacion = posicion * desplazamiento

                    carrousel.style.transform = `translateX(${operacion}%)`
                    punto.forEach((cadaPunto, i) => {
                        punto[i].classList.remove('activo')
                    })
                    punto[i].classList.add('activo')

                })
            })
        })

        return{
            cantSection
        }
    }

}
</script>

<style scoped>

.puntos {
    width: 100%;
    padding: 0.4em;
    list-style: none;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
}

.punto {
    width: 1em;
    height: 1em;
    background-color: #fff;
    margin: 0.4em;
    border-radius: 50%;
    border:2px solid #005395;
}

.carrousel .punto.activo {
    background-color: #005395;
}

.punto:hover {
    cursor: pointer;
}

</style>