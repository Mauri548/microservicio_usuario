<template>
    <div class="conteiner-carrousel">
        <div class="carrousel">
            <div class="arrow arrow-prev"><i class="fas fa-chevron-left"></i></div>
            <div class="conteiner-app">
                <div @click="selectApp(app)" class="img-app" v-for="app in apps" :key="app.id">
                    <img :src="app.logo" width="120" alt="">
                    <h3>{{app.name}}</h3>
                </div>
            </div>
            <div class="arrow arrow-next"><i class="fas fa-chevron-right"></i></div>
            <CarrouselSection :size="apps.length" carrousel="conteiner-app" type="app" :pos="0"/>
            
        </div>
        <div v-show="appSelect != ''" class="description-app">
            <p>{{appSelect.description}}</p>
        </div>
        <SelectLicence />
    </div>
</template>

<script>
import ispb from '@/assets/ispb2.png'
import puwic from '@/assets/puwic2.png'
import geston from '@/assets/geston2.png'
import { ref } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core'
import SelectLicence from './SelectLicence.vue'
import CarrouselSection from './CarrouselSection.vue'

export default {
    name: 'SelectApp',
    components: {
        CarrouselSection,
        SelectLicence
    },

    setup() {
        const apps = ref([
            {id: 1, name: 'ISPBrain', logo: ispb, activo: true, description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi esse doloribus inventore dolore nesciunt quas laudantium eum quod, quae dolores. Aliquam temporibus quibusdam ratione ullam labore tempore explicabo nisi assumenda.'},
            {id: 2, name: 'PuWiC', logo: puwic, activo: true, description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nihil molestias sed, perferendis harum officia error, nobis nemo incidunt assumenda dignissimos corrupti quo libero minus expedita beatae vitae aspernatur. Earum, excepturi.'},
            {id: 3, name: 'Geston', logo: geston, activo: true, description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequatur impedit nam voluptate minus! Impedit corporis pariatur illo totam tempore, officia exercitationem cumque rem unde, sit, ratione fugit alias rerum ea.'},
            {id: 4, name: 'Geston', logo: geston, activo: false, description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus inventore rerum quod! Laborum odio, ullam enim facere sunt consequatur dicta itaque recusandae cupiditate iure, similique ut unde ex, praesentium exercitationem?'},
            {id: 5, name: 'Geston', logo: geston, activo: false, description : 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nam ad perspiciatis, voluptas, ex nobis sint reprehenderit deserunt aliquam dolorum cum iure vitae doloribus odit, adipisci dignissimos sapiente omnis ab expedita?'},
            {id: 6, name: 'Geston', logo: geston, activo: false, description : 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facere nostrum reiciendis laudantium suscipit aperiam, tempore optio harum ducimus quos a, at commodi eos nam dicta corrupti ea necessitatibus provident fuga.'},
            {id: 7, name: 'Geston', logo: geston, activo: false, description : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Numquam officiis distinctio dolor quasi harum tenetur sapiente! Cupiditate consequatur eos optio dolore ipsa, molestiae placeat quaerat. Incidunt omnis labore dignissimos illo.'},
            {id: 8, name: 'Geston', logo: geston, activo: false, description : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit provident qui ratione esse, sapiente itaque. Debitis, animi quia rerum voluptates molestias voluptatem recusandae maiores nihil odit. Autem saepe odio neque?'},
            {id: 9, name: 'Geston', logo: geston, activo: false, description : 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nam saepe adipisci voluptatem cum et ipsam voluptas in consequatur veniam fuga eum quos hic, pariatur officia neque. Quae reprehenderit eos nostrum.'},
            {id: 10, name: 'Geston', logo: geston, activo: false, description : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem, libero excepturi totam, deserunt quasi tempora quisquam natus nesciunt modi harum ea esse officiis ratione error molestiae quae aliquid quia distinctio.'},

        ])
        let cantSection = 0
        const appSelect = ref('')
        const positionApp = ref(0)
        const positionLic = ref(0)


        // Calculamos la cantidad de secciones que tendra el carrousel
        if ((apps.value.length % 3) > 0) {
            cantSection = Math.trunc(apps.value.length / 3) + 1
        } else {
            cantSection = Math.trunc(apps.value.length / 3) 
        }
        // Calculamos el desplazamiento que hara por seccion
        let desplazamiento = -(100/cantSection).toFixed(1)

        onMounted(() =>  {
            const imgApp = document.querySelectorAll('.img-app')

            imgApp.forEach((cadaImage, i) => {
                imgApp[i].style.width = `calc(33.3% / ${cantSection})`
                imgApp[i].addEventListener('click', () => {
                    imgApp.forEach((cadaImage, i) => {
                        imgApp[i].classList.remove('activo')
                    })
                    imgApp[i].classList.add('activo')
                })
            })

            // Creamos las variables de los carruseles, puntos y flechas
            const arrowNext = document.querySelectorAll('.arrow-next')
            const arrowPrev = document.querySelectorAll('.arrow-prev')
            const carrouselApp = document.querySelector('.conteiner-app')
            const carrouselLicence = document.querySelector('.conteiner-licence')
            const puntosApp = document.querySelectorAll('.app')


            const moveCarrousel = (i) => {
                // calculamos el desplazamiento que hara el carrousel
                let operacion = positionApp.value * desplazamiento
                // movemos la posicion x del carrousel correspondiente
                
                // i == 0 ? carrouselApp.style.transform = `translateX(${operacion}%)` : carrouselLicence.style.transform = `translateX(${operacion}%)`
                carrouselApp.style.transform = `translateX(${operacion}%)`

                // movemos los puntos y le ponemos la clase activa al punto actual
                puntosApp.forEach((punto, i) => {
                    puntosApp[i].classList.remove('activo')
                })
                puntosApp[positionApp.value].classList.add('activo')

                console.log(cantSection, ' ', positionApp.value)
                // ocultaran las flechas en el caso de que este en el final
                positionApp.value == 0 ? arrowPrev[i].style.display = 'none' : arrowPrev[i].style.display = 'flex'
                positionApp.value == cantSection -1 ? arrowNext[i].style.display = 'none' : arrowNext[i].style.display = 'flex'
            }

            console.log(arrowNext)
            // Creamos una funcion para cada flecha next
            arrowNext.forEach((element, i) => {
                arrowNext[i].addEventListener('click', () => {
                    positionApp.value += 1
                    moveCarrousel(i)
                })
            })

            // Creamos una funcion para cada flecha prev
            arrowPrev.forEach((element, i) => {
                arrowPrev[i].addEventListener('click', () => {
                    positionApp.value -= 1
                    moveCarrousel(i)
                })
            })

        })
 
        const selectApp = (e) => {
            appSelect.value = e
        }

        return {
            apps,
            appSelect,
            selectApp,
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
    width: 500%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;

    transition: all .5s ease;
    transform: translateX(0%)
}

.carrousel .img-app {
    width: calc(33.3% / 5);
    padding: 0.3em;
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