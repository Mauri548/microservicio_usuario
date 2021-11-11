<template>
    <ul v-if="cantSection" class="puntos mb-2">
        <li class="punto activo" :class="type"></li>
        <li v-for="i in cantSection-1" :key="i" class="punto" :class="type"></li>
    </ul>
</template>

<script>
import { onMounted, ref, watch, watchEffect } from '@vue/runtime-core'
export default {
    name: 'CarrouselSection',

    props: {
        size: Number,
        carrousel: String,
        type: String,
        pos: Number,
        cantSection: Number
    },

    setup(props) {
        const carrousel = ref('')

        // Hacer la misma funcion que en SelectApp pero que se pueda usar en ambas situaciones
        onMounted(() => {
            carrousel.value = document.querySelector(`.${props.carrousel}`)
            
            calWidthCarrusel()
        })

        /**
         * Calcula el ancho del carrusel dependiendo del dispositivo
         */
        const calWidthCarrusel = () => {
            if (window.screen.width <= 768) {
                if (props.type == 'app') {
                    carrousel.value.style.width = `${(props.cantSection * 100)}%`
                } else {
                    carrousel.value.style.width = '95%'
                }
            } else {
                props.size <= 3? carrousel.value.style.width = `${(props.cantSection * 100)}%` : 
                carrousel.value.style.width = `${(props.cantSection * 100)}%`
            }
        }

        watchEffect(() => {
            if (carrousel.value) {
                console.log('b')
                props.size <= 3? carrousel.value.style.width = `${(props.cantSection * 100)}%` : 
                carrousel.value.style.width = `${(props.cantSection * 100)}%`
            }
            
        })

        return{
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


@media (max-width: 768px) {
    .puntos {
        display: none;
    }
}

</style>