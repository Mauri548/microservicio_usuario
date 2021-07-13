<template>
    <div class="conteiner-carrousel">
        <div class="carrousel" >
            <div class="conteiner-app">
                <div @click="selectApp(app)" class="img-app" v-for="app in apps" :key="app.id">
                    <img :src="app.logo" width="120" alt="">
                    <h3>{{app.name}}</h3>
                </div>
            </div>
            <CarrouselSection :size="apps.length" carrousel="conteiner-app" type="app"/>
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
            // {id: 11, name: 'Geston', logo: geston, activo: false},
            // {id: 12, name: 'Geston', logo: geston, activo: false},
            // {id: 13, name: 'Geston', logo: geston, activo: false},
            // {id: 14, name: 'Geston', logo: geston, activo: false},

        ])
        let cantSection = 0
        const appSelect = ref('')

        // Calculamos la cantidad de secciones que tendra el carrousel
        if ((apps.value.length % 3) > 0) {
            cantSection = Math.trunc(apps.value.length / 3) + 1
        } else {
            cantSection = Math.trunc(apps.value.length / 3) 
        }

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
        })
 
        const selectApp = (e) => {
            appSelect.value = e
        }

        return {
            apps,
            appSelect,
            selectApp
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
    border: 2px solid #005395;
    border-radius: 10px;
}

.description-app {
    padding: 16px;
    border: 2px solid #005395;
    border-radius: 10px;
}
</style>