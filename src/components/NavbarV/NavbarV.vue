<template>
  
    <div  class="conteiner-nabvarV">

        <div>
            <aside class="menu mx-3">
                <ul class="menu-list">
                    <li v-for="lista in listas" :key="lista.nombre">
                        <div v-if="lista.link">
                            <a class="menu-link" :class="{'not-active': creating_company, 'is-active':lista.activo}" @click="activar(lista)">{{lista.nombre}}</a>
                        </div>
                        <div v-else>
                            <a class="menu-link companyOption btn-company" :class="{'not-active': creating_company}" @click="activar(lista)">
                                <span class="column has-text-left ">{{lista.nombre}}</span>
                                <span class="column has-text-right  icon is-small">
                                    <i  class="fas fa-chevron-down"></i>
                                </span>
                            </a>
                            <ul v-show="lista.activo">
                                <li v-for="sublist in lista.opc" :key="sublist.name">
                                    <a class="menu-link" :class="{'not-active': creating_company, 'is-active':sublist.activo}" @click="activarSublist(lista,sublist)">{{sublist.nombre}}</a>
                                </li>
                            </ul>
                        </div>
                    </li>  
                </ul>
            </aside>
        </div>
    
    </div>
  
    
</template>

<script>

import {ref} from '@vue/reactivity' 
import { onMounted, watch, watchEffect } from '@vue/runtime-core'
import { useRoute, useRouter } from 'vue-router'
import store from '@/store'

export default {
    name:'NavbarV',

    setup(){
        const router = useRouter()
        const Lan = ref(false)
        const creating_company = ref(false)
        const listas = store.state.lista
        const route = useRoute()
        // console.log(route.matched[route.matched.length-1])

        // Funcion para el link correspondiente del navbar al recargar la página
        // Verifica que se aya guardado el nombre de la url
        if (route.matched[route.matched.length-1].name) {
            // buscamos en nuesta lista de direcciones la path correspondiente
            listas.forEach(element => {
                if (element.name_link == route.matched[route.matched.length-1].name) {
                    // Activamos el elemento
                    element.activo = true
                }
                // En el caso de que tenga una sublista se hara lo mismo pero con la sublista
                if (!element.link) {
                    element.opc.forEach(item => {
                        if (item.name_link == route.matched[route.matched.length-1].name) {
                            // Se activa la lista principal y la sublista
                            item.activo = true
                            element.activo = true
                        }
                    })
                }
            })
        }

        // Redirige al usuario a otra vista        
        const push = (path) => {
            router.push({name: path})
        }

        watchEffect(()=>{
            Lan.value = store.state.cambio_lang
            creating_company.value = store.state.creating_company
        })
       
        // const showCompanyOption = ref(false)

        // const ActionShowCompanyOption = () => {
        //     showCompanyOption.value = !showCompanyOption.value
        // }

        // Le damos una funcion a cada etiqueta "a" para que pueda agregar o quitar la clase "is-active"
        // esta funcion se crea dentro de onMounted() porque el template no se carga todavia entonces debe de 
        // esperar a que este cargado para agregar los elementos del html
        onMounted(() => {
            const item = document.querySelectorAll('.menu-link')
            item.forEach((element, index) => {
                item[index].addEventListener('click', () => {
                    item.forEach((element, i) => {
                        item[i].classList.remove('is-active')
                    })
                    item[index].classList.add('is-active')
                }) 
            })
        })

        // ************************* Prueba *********************

        const activar = (lista) => {
            listas.forEach(element => {
                if (lista != element) {
                    element.activo = false
                }
                if (!element.link) {
                    element.opc.forEach(it => {
                        it.active = false
                    })
                }
            })
            lista.activo = !lista.activo
            push(lista.name_link)
        }

        const activarSublist = (lista, sublist) => {
            activar(sublist)
            lista.activo = !lista.activo
        }

        // ******************************************************
       
        return {
            Lan,
            // showCompanyOption,
            creating_company,
            listas,
            // ActionShowCompanyOption,
            push,
            activar,
            activarSublist
        }
    } 
}
</script>

<style scoped>

.conteiner-nabvarV {
    width: 20%;
    margin-top: 8px;
}
a:hover {
    transition: ease .3s;
    border: 1px solid #005395;
    color: #005395;
}
a.is-active {
    background-color: #005395;
    color: #fff
}
a.not-active {
    pointer-events: none;
    cursor: default;
}
.btn-company {
    display: flex;
}
.btn-company span {
    padding: 0;
}

@media screen and (min-width: 1025px) {
    a {
        margin: 0 0 8px 0;
        box-shadow: 0px 0px 16px 0px rgba(0,0,0,0.2);
        border-radius: 5px;
        color: #005395;
        border: 1px solid #fff
    }
}

@media screen and (max-width: 1024px) {
    .conteiner-nabvarV {
        width: 100%;
        margin: 0px;
        overflow-x: auto;
    }
    .conteiner-nabvarV aside {
        width: 97%;
        margin: 0px 12px;
    }
    .conteiner-nabvarV aside .menu-list {
        display: flex;
        justify-content: space-between;
    }
    .conteiner-nabvarV aside .menu-list li {
        width: 100%;
        text-align: center;
    }
    .conteiner-nabvarV aside .menu-list li ul li {
        text-align: left;
    }
    
}

</style>