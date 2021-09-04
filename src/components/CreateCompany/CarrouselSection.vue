<template>
    <ul class="puntos mb-2">
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
        pos: Number
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


        // Hacer la misma funcion que en SelectApp pero que se pueda usar en ambas situaciones
        onMounted(() => {
            const carrousel = document.querySelector(`.${props.carrousel}`)
            const punto = document.querySelectorAll(`.${props.type}`)
            
            // Calculamos el width del carrousel dependiendo del tamaño del dispositivo
            console.log(carrousel)
            if (window.screen.width <= 768) {
                if (props.type == 'app') {
                    carrousel.style.width = `${(cantSection * 100)}%`
                } else {
                    carrousel.style.width = '95%'
                }
            } else {
                
                carrousel.style.width = `${(cantSection * 100)}%`
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

.punto:hover {
    cursor: pointer;
}

@media (max-width: 768px) {
    .puntos {
        display: none;
    }
}

</style>