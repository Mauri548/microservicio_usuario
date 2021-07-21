<template>
    <ul class="puntos mb-2">
        <li class="punto activo" :class="type"></li>
        <li v-for="i in cantSection -1" :key="i" class="punto" :class="type"></li>
    </ul>
</template>

<script>
import { onMounted, ref } from '@vue/runtime-core'
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
        const positionApp = ref(0)
        const positionLic = ref(0)

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
            const arrowNext = document.querySelectorAll('.arrow-next')
            const arrowPrev = document.querySelectorAll('.arrow-prev')
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

            // const activePunto = (position) => {
            //     console.log(punto)
            //     punto.forEach((cadaPunto, i) => {
            //         punto[i].classList.remove('activo')
            //     })
            //     punto[position].classList.add('activo')
            // }


            // punto.forEach((cadaPunto, i) => {
            //     punto[i].addEventListener('click', () => {
            //         let posicion = i
            //         let operacion = posicion * desplazamiento

            //         carrousel.style.transform = `translateX(${operacion}%)`
            //         punto.forEach((cadaPunto, i) => {
            //             punto[i].classList.remove('activo')
            //         })
            //         punto[i].classList.add('activo')

            //         i == 0 ? arrowPrev[props.pos].style.display = 'none' : arrowPrev[props.pos].style.display = 'flex'
            //         i == cantSection -1 ? arrowNext[props.pos].style.display = 'none' : arrowNext[props.pos].style.display = 'flex'
            //     })
            // })


            // ****** no sirve *******
            // const moveCarrousel = (i) => {
            //     // calculamos el desplazamiento que hara el carrousel
            //     let operacion = null
            //     i == 0 ? operacion = positionApp.value * desplazamiento : operacion = positionLic.value * desplazamiento
                
            //     // movemos la posicion x del carrousel correspondiente
                
            //     i == 0 ? carrouselApp.style.transform = `translateX(${operacion}%)` : carrouselLicence.style.transform = `translateX(${operacion}%)`
            //     // carrousel.style.transform = `translateX(${operacion}%)`
                

            //     // movemos los puntos y le ponemos la clase activa al punto actual
            //     punto.forEach((cadaPunto, i) => {
            //         punto[i].classList.remove('activo')
            //     })
            //     i == 0 ? punto[positionApp.value].classList.add('activo') : punto[positionLic.value].classList.add('activo')
                
            //     // activePunto(i)

            //     // ocultaran las flechas en el caso de que este en el final
            //     if (i == 0) {
            //         positionApp.value == 0 ? arrowPrev[i].style.display = 'none' : arrowPrev[i].style.display = 'flex'
            //         positionApp.value == cantSection -1 ? arrowNext[i].style.display = 'none' : arrowNext[i].style.display = 'flex'
            //     } else {
            //         positionLic.value == 0 ? arrowPrev[i].style.display = 'none' : arrowPrev[i].style.display = 'flex'
            //         positionLic.value == cantSection -1 ? arrowNext[i].style.display = 'none' : arrowNext[i].style.display = 'flex'
            //     }
            // }

            // arrowNext.forEach((element, i) => {
            //     arrowNext[i].addEventListener('click', () => {
            //         i == 0 ? positionApp.value += 1 : positionLic.value += 1
            //         moveCarrousel(i)
            //     })
            // })

            // // Creamos una funcion para cada flecha prev
            // arrowPrev.forEach((element, i) => {
            //     arrowPrev[i].addEventListener('click', () => {
            //         i == 0 ? positionApp.value -= 1 : positionLic.value -= 1
            //         moveCarrousel(i)
            //     })
            // })

            
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