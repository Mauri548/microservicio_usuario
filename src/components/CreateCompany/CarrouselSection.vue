<template>
    <ul class="puntos mb-2">
        <li class="punto activo" :class="type"></li>
        <li v-for="i in cantSection" :key="i" class="punto" :class="type"></li>
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
        pos: Number
    },
    // props: ['size','carrousel','type','pos'],

    setup(props) {
        let cantSection = ref(0)

        // Calculamos la cantidad de secciones que tendra el carrousel
        
        // Calculamos el desplazamiento que hara por seccion
        // let desplazamiento = -(100/cantSection).toFixed(1)

        const carrousel = ref('')



        // Hacer la misma funcion que en SelectApp pero que se pueda usar en ambas situaciones
        onMounted(() => {
            // const carrousel = document.querySelector(`.${props.carrousel}`)
            carrousel.value = document.querySelector(`.${props.carrousel}`)
            
            // Calculamos el width del carrousel dependiendo del tamaño del dispositivo
            if (window.screen.width <= 768) {
                if (props.type == 'app') {
                    carrousel.value.style.width = `${(cantSection * 100)}%`
                } else {
                    carrousel.value.style.width = '95%'
                }
            } else {
                props.size <= 3? carrousel.value.style.width = `${(cantSection * 100)}%` : 
                carrousel.value.style.width = `${(props.size / 3) * 100}%`
            }
            
        })

        watchEffect(() => {
            if (carrousel.value) {
                props.size <= 3? carrousel.value.style.width = `${(cantSection * 100)}%` : 
                carrousel.value.style.width = `${(props.size / 3) * 100}%`

                if (props.size != 0 ) {
                    if ((props.size % 3) > 0) {
                        cantSection.value = Math.trunc(props.size / 3) + 1
                    } else {
                        cantSection.value = Math.trunc(props.size / 3) 
                    }
                } else {
                    cantSection.value = 1
                }
            }
            
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


@media (max-width: 768px) {
    .puntos {
        display: none;
    }
}

</style>