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

        onMounted(() => {
            carrousel.value = document.querySelector(`.${props.carrousel}`)
        })

        /**
         * Calcula el ancho del carrusel dependiendo del dispositivo
         */
        const calWidthCarrusel = () => {
            if (window.screen.width <= 768) {
                return (props.type == 'app')? `${(props.cantSection * 100)}%` : '95%'
            }

            return props.size <= 3? `${(props.cantSection * 100)}%` : `${(props.cantSection * 100)}%`
        }

        watchEffect(() => {
            if (carrousel.value) {
                carrousel.value.style.width = calWidthCarrusel()
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