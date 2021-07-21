<template>
    <div @click="move(conteiner)" class="arrow" :class="[arrow, punto]"><i class="fas" :class="icon"></i></div>
</template>

<script>
import { onMounted, ref } from '@vue/runtime-core'
export default {
    name: 'Arrow',

    props: ['conteiner','punto','cantSection','desplazamiento','arrow','icon'],

    setup(props){

        const positionApp = ref(0)
        const positionLic = ref(0)

        const calculatePosition = (punto) => {
            let position = 0
            punto.forEach((element, index) => {
                if (element.classList.contains('activo')) {
                    position = index
                }
            })
            return position
        }

        const move = (conteiner) => {
            const carrousel = document.querySelector(`.${conteiner}`)
            // const arrow = document.querySelector(`.${props.arrow}.${props.punto}`)
            const arrowPrev = document.querySelector(`.arrow-prev.${props.punto}`)
            const arrowNext = document.querySelector(`.arrow-next.${props.punto}`)
            const punto = document.querySelectorAll(`.punto.${props.punto}`)
            
            props.punto == 'app' ? positionApp.value = calculatePosition(punto) : positionLic.value = calculatePosition(punto)

            if (props.arrow == 'arrow-next') {
                props.punto == 'app' ? positionApp.value += 1 : positionLic.value += 1
            } else {
                props.punto == 'app' ? positionApp.value -= 1 : positionLic.value -= 1
            }
            
            moveCarrousel(carrousel,punto,arrowPrev,arrowNext)
        }

        const moveCarrousel = (carrousel,punto,arrowPrev,arrowNext) => {
            // calculamos el desplazamiento que hara el carrousel
            let operacion = null
            if (props.punto == 'app') {
                operacion = positionApp.value * props.desplazamiento
            } else {
                operacion = positionLic.value * props.desplazamiento
            }
            // movemos la posicion x del carrousel correspondiente
            
            carrousel.style.transform = `translateX(${operacion}%)`

            // movemos los puntos y le ponemos la clase activa al punto actual
            punto.forEach((cadaPunto, index) => {
                punto[index].classList.remove('activo')
            })

            if (props.punto == 'app') {
                punto[positionApp.value].classList.add('activo')
            } else {
                punto[positionLic.value].classList.add('activo')    
            }
            
            if (props.punto == 'app') {
                positionApp.value == 0 ? arrowPrev.style.display = 'none' : arrowPrev.style.display = 'flex'
                positionApp.value == props.cantSection -1 ? arrowNext.style.display = 'none' : arrowNext.style.display = 'flex'
            } else {
                positionLic.value == 0 ? arrowPrev.style.display = 'none' : arrowPrev.style.display = 'flex'
                positionLic.value == props.cantSection -1 ? arrowNext.style.display = 'none' : arrowNext.style.display = 'flex'
            }

        }

        return {
            move
        }
        
    },

}
</script>

<style>

</style>