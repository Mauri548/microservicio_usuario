<template>
    <div  class="conteiner-nabvarV">
        <div>
            <aside class="menu mx-3">
                <ul class="menu-list">

                    <li><a class="menu-link" :class="{'not-active': creating_company}"  @click="push('PersonalForm')">{{$t('navbarV.personalInfo')}}</a></li>
                    <li><a class="menu-link" :class="{'not-active': creating_company}" @click="push('PermissionsDashboard')">{{$t('navbarV.permisos')}}</a></li>
                    <li><a class="menu-link companyOption btn-company"  :class="{'not-active': creating_company}"  @click="ActionShowCompanyOption">
                        <span class="column has-text-left ">{{$t('navbarV.company')}}</span>

                        <span class="column has-text-right  icon is-small">
                            <i  class="fas fa-chevron-down"></i>
                        </span>
                    </a>

                        <ul v-show="showCompanyOption">
                            <li><a class="menu-link" :class="{'not-active': creating_company}" @click="push('UserDashboard')">{{$t('navbarV.userManagement')}}</a></li>
                            <li><a class="menu-link" :class="{'not-active': creating_company}" @click="push('CompaniesDashboard')">{{$t('navbarV.companyManagement')}}</a></li>
                            <li><a class="menu-link" :class="{'not-active': creating_company}" @click="push('AppDashboard')">{{$t('navbarV.appsManagement')}}</a></li>
                            <li><a class="menu-link" :class="{'not-active': creating_company}" @click="push('PermissionsManagement')">{{$t('navbarV.permissionsManagement')}}</a></li>

                        </ul>
                    </li>
                </ul>
            </aside>
        </div>

    </div>

</template>

<script>

import {ref} from '@vue/reactivity' 
import { onMounted, watch, watchEffect} from '@vue/runtime-core'
import { useRouter } from 'vue-router'
import store from '@/store'


export default {
    name:'NavbarV',
    setup(){
        const router = useRouter()

       
        const creating_company = ref(false)
        // Redirige al usuario a otra vista        
        const push = (path) => {
            console.log(path)
            router.push({name: path})
        }

        watchEffect(()=>{
            
            creating_company.value = store.state.creating_company
        })
       
        const showCompanyOption = ref(false)
        const ActionShowCompanyOption = () => {
            showCompanyOption.value = !showCompanyOption.value
        }
        // Le damos una funcion a cada etiqueta "a" para que pueda agregar o quitar la clase "is-active"
        // esta funcion se crea dentro de onMounted() porque el template no se carga todavia entonces debe de 
        // esperar a que este cargado para agregar los elementos del html
        onMounted(() => {
            const item = document.querySelectorAll('.menu-link')
            /*    console.log(item) */
            item.forEach((element, index) => {
                item[index].addEventListener('click', () => {
                    item.forEach((element, i) => {
                        item[i].classList.remove('is-active')
                    })
                    item[index].classList.add('is-active')
                }) 
            })
            

        })

        // document.addEventListener('click', function(e) {
            // let clic = e.target
            // console.log(e.target)
            // if (!clic.includes('companyOption')) {
            //     showCompanyOption.value = false
            // }
        // }, false)

       

        return {
            showCompanyOption,
            creating_company,
            ActionShowCompanyOption,
            push,
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