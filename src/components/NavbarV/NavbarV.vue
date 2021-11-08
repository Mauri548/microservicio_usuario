<template>
    <div v-show="!isTablet" class="conteiner-nabvarV">

        <div>
            <aside class="menu mx-3">
                <ul class="menu-list">
                    <li v-for="lista in listas" :key="lista.nombre">

                        <div v-if="lista.link">
                            <a class="menu-link item" :class="{'not-active': creating_company, 'is-active':lista.activo}" @click="activar(lista)">{{lista.nombre}}</a>
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

    <div v-show="isTablet">
        <nav class="nav" :class="{'active': active}">

            <div class="nav-movile">
                <div>
                    <a class="navbar-item" href="#">
                    <img src="@/assets/logo_crenein.png" style="max-height: 3rem">
                    </a>
                </div>

                <ButtonLang class="mb-0" />

                <div class="group-navbar">
                    <MenuApp />
                    <MenuHamburger/>
                </div>
            </div>

            <ul class="menu-movile">
                <li v-for="lista in listas" :key="lista.nombre">
                    <div class="item" @click="activar(lista, true)" v-if="lista.link" :class="{'not-active': creating_company, 'is-active':lista.activo}">
                        <a class="menu-link"  >{{lista.nombre}}</a>
                    </div>
                    <div v-else>
                        <a class="menu-link companyOption btn-company item" :class="{'not-active': creating_company}" @click="activar(lista)">
                            <span class="column has-text-left ">{{lista.nombre}}</span>
                            <span class="column has-text-right  icon is-small">
                                <i  class="fas fa-chevron-down"></i>
                            </span>
                        </a>
                        <ul v-show="lista.activo">
                            <li class="item" v-for="sublist in lista.opc" :key="sublist.name" :class="{'not-active': creating_company, 'is-active':sublist.activo}" @click="activarSublist(lista,sublist)">
                                <div class="sublist">
                                    <a class="menu-link">{{sublist.nombre}}</a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </li> 
            </ul>
        </nav>
    </div>

</template>

<script>

import {ref} from '@vue/reactivity' 
import { inject, onMounted, watch, watchEffect } from '@vue/runtime-core'
import { useRoute, useRouter } from 'vue-router'
import store from '@/store'
import i18n from '@/i18n.js'
import MenuApp from '../Navbar/MenuApp.vue'
import MenuHamburger from '../MenuHamburger.vue'
import ButtonLang from '../Buttons/ButtonLang.vue'

export default {
    name:'NavbarV',

    components: {
        MenuApp,
        MenuHamburger,
        ButtonLang,
    },

    setup(){
        const router = useRouter()
        const Lan = ref(false)
        const creating_company = ref(false)
        const isTablet = inject('isTablet')
        const active = ref(false)

        watchEffect(() => {
            // store.state.active_menu_movile
            active.value = store.state.active_menu_movile
        })
        
        const listas = ref([
                {nombre: i18n.global.local == 'en'? 'Personal Info': 'Información personal', activo: false, link: true, name_link: 'PersonalForm'},
                {nombre: 'Permissions', activo: false, link: true, name_link: 'PermissionsDashboard'},
                {nombre: 'Company', activo: false, link: false, opc: [
                    {nombre: 'User management', activo: false, name_link: 'UserDashboard'},
                    {nombre: 'Invitations management', activo: false, name_link: 'InvitationsDashboard'},
                    {nombre: 'Subscriptions management', activo: false, name_link: 'SubscriptionsDashboard'},
                    {nombre: 'Companies management', activo: false, name_link: 'CompaniesDashboard'},
                    {nombre: 'Apps management', activo: false, name_link: 'AppDashboard'},
                    {nombre: 'Licences management', activo: false, name_link: 'LicencesDashboard'},
                    {nombre: 'Permissions management', activo: false, name_link: 'PermissionsManagement'},
                   
                ]},
            ])
        const route = useRoute()

        // Funcion para el link correspondiente del navbar al recargar la página
        // Verifica que se aya guardado el nombre de la url
        if (route.matched[route.matched.length-1].name) {
            // buscamos en nuesta lista de direcciones la path correspondiente
            listas.value.forEach(element => {
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
            // Cambiamos el texto en ingles o español dependiendo de la variable i18n
            listas.value[0].nombre = i18n.global.locale == 'en'? 'Personal Info': 'Información personal'
            listas.value[1].nombre = i18n.global.locale == 'en'? 'Permissions': 'Permisos'
            listas.value[2].nombre = i18n.global.locale == 'en'? 'Company': 'Empresa'
            listas.value[2].opc[0].nombre = i18n.global.locale == 'en'? 'Users management': 'Gestión de usuarios'
            listas.value[2].opc[1].nombre = i18n.global.locale == 'en'? 'Invitations management': 'Tabla de Invitaciones'
            listas.value[2].opc[2].nombre = i18n.global.locale == 'en'? 'Subscriptions management': 'Tabla de Subscripciones'
            listas.value[2].opc[3].nombre = i18n.global.locale == 'en'? 'Companies management' : 'Gestión de empresas'
            listas.value[2].opc[4].nombre = i18n.global.locale == 'en'? 'Apps management': 'Gestión de aplicaciones'
            listas.value[2].opc[5].nombre = i18n.global.locale == 'en'? 'Licences management': 'Gestión de licencias'
            listas.value[2].opc[6].nombre = i18n.global.locale == 'en'? 'Permissions management': 'Gestión de permisos'

            creating_company.value = store.state.creating_company
        })

        // Activa el elemento seleccionado del menu
        const activar = (lista, movile = false) => {
            // Recorremos la lista de elementos
            listas.value.forEach(element => {
                // Ponemos en falso todos los elementos menos el seleccionado
                if (lista != element) {
                    element.activo = false
                }
                // Pone en falso los sub elementos de la lista
                if (!element.link) {
                    element.opc.forEach(it => {
                        it.activo = false
                    })
                }
            })
            // activamos el elementos seleccionado
            lista.activo = !lista.activo
            if (movile) {
                store.commit("setActiveMenuMovile")
            }
            push(lista.name_link)
        }

        const activarSublist = (lista, sublist) => {
            activar(sublist, true)
            lista.activo = !lista.activo
        }

        return {
            Lan,
            creating_company,
            listas, isTablet, active,
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
.item.is-active {
    background-color: #005395;
}
.item.is-active a, .item.is-active span {
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
        border: 1px solid #fff;
    }

    a.is-active {
        background-color: #005395;
        color: #fff
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


.nav {
    position: absolute;
    background-color:#fff;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    z-index: 10;
    transition: all .5s ease;
    transform: translateX(-100%);
}

.nav.active {
    transform: translateX(0%);
}

.nav-movile {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #f1f1f1;
}

.menu-movile {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    /* justify-content: center; */
}

.menu-movile li {
    width: 100%;
    border-bottom: 1px solid #f1f1f1;
}

.sublist {
    padding-left: 13px;
}

@media screen and (max-width: 800px) {
    .item {
        padding: 13px 25px;
    }
}

.group-navbar{
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

</style>