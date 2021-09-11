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

        onMounted(() => {
            const arrowNext = document.querySelector(`.arrow-next.${props.punto}`)
            if(props.cantSection == 1) {
                arrowNext.style.display = 'none'
            }
        })

        // Calculamos la posicion actual del carrousel de app
        const calculatePosition = (punto) => {
            let position = 0
            punto.forEach((element, index) => {
                // si el punto esta activo es la posicion en la que se encuentra
                if (element.classList.contains('activo')) {
                    position = index
                }
            })
            return position
        }


        const move = (conteiner) => {
            const carrousel = document.querySelector(`.${conteiner}`) // Obtenemos el carrousel que queremos mover
            // Obtenemos la flecha next y prev
            const arrowPrev = document.querySelector(`.arrow-prev.${props.punto}`)
            const arrowNext = document.querySelector(`.arrow-next.${props.punto}`)
            // Obtenemos los puntos que estan debajo del carrousel
            const punto = document.querySelectorAll(`.punto.${props.punto}`)
            
            // obtenemos la posicion del punto que esta activo del carrousel pasado como props
            props.punto == 'app' ? positionApp.value = calculatePosition(punto) : positionLic.value = calculatePosition(punto)

            // Verificamos si avanza el carrousel o si retrosede
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
            props.punto == 'app' ? operacion = positionApp.value * props.desplazamiento : operacion = positionLic.value * props.desplazamiento

            // movemos la posicion x del carrousel correspondiente            
            carrousel.style.transform = `translateX(${operacion}%)`

            // movemos los puntos y le ponemos la clase activa al punto actual
            punto.forEach((cadaPunto, index) => {
                punto[index].classList.remove('activo')
            })
            props.punto == 'app' ? punto[positionApp.value].classList.add('activo') : punto[positionLic.value].classList.add('activo')

            // Mostramos o ocultamos la flecha del carrousel si esta en el comienzo o en el final
            if (props.punto == 'app') {
                // Si el valor es igual a 0 ocultamos la flecha de prev y si es igual al valor maximo oculamos la flecha next
                positionApp.value == 0 ? arrowPrev.style.display = 'none' : arrowPrev.style.display = 'flex'
                // positionApp.value == props.cantSection -1 ? arrowNext.style.display = 'none' : arrowNext.style.display = 'flex'
                if (positionApp.value == props.cantSection - 1 || props.cantSection == 0) {
                    arrowNext.style.display = 'none'
                } else {
                    arrowNext.style.display = 'flex'
                }
            } else {
                // Si el valor es igual a 0 ocultamos la flecha de prev y si es igual al valor maximo oculamos la flecha next
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

<style scoped>

.arrow {
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

.arrow i{
  font-size: 35px;
  color: rgba(128,128,128,0.38)
}

.arrow:hover {
  cursor: pointer;
  background-color: rgba(204,204,204,0.3);
}

.arrow:hover i {
  color: #005395
}

@media (max-width: 768px) {
    .arrow-next, .arrow-prev {
        display: none;
    }

}

</style>