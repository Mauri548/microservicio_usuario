<template>
  
    <div class="conteiner-nabvarV">
        <aside class="menu mx-3">
            <ul class="menu-list">
                <li><a class="menu-link is-active">Home</a></li>
                <li><a class="menu-link" @click="push('PersonalForm')">Personal Info</a></li>
                <li><a class="menu-link">Permissions management</a></li>
                <li><a class="menu-link companyOption btn-company" @click="ActionShowCompanyOption">
                    <span class="column has-text-left ">Company</span>
                    <span class="column has-text-right  icon is-small">
                        <i  class="fas fa-chevron-down"></i>
                    </span>
                </a>
                    <ul v-show="showCompanyOption" >
                        <li><a class="menu-link" @click="push('CompaniesDashboard')">Companies management</a></li>
                        <li><a class="menu-link" @click="push('AppDashboard')">Apps management</a></li>
                        <li><a class="menu-link" @click="push('PermissionsDashboard')">Permissions management</a></li>
                    </ul>
                </li>
            </ul>
        </aside>
    </div>
   
</template>

<script>

import {ref} from '@vue/reactivity' 
import { onMounted } from '@vue/runtime-core'
import { useRouter } from 'vue-router'


export default {
    name:'NavbarV',

    setup(){
        // const paths = ref([
        //     {id: 1, name: 'Home', namePath: '', activo: true, padre: false},
        //     {id: 2, name: 'Personal Info', namePath: 'PersonalForm', activo: false, padre: false},
        //     {id: 3, name: 'Permissions management', namePath: '', activo: false, padre: false},
        //     {id: 4, name: 'Company', activo: false, padre: true, paths: [
        //         {id: 5, name: 'Companies management', namePath: 'CompaniesDashboard', activo: false},
        //         {id: 6, name: 'Apps management', namePath: 'AppDashboard', activo: false},
        //         {id: 7, name: 'Permissions management', namePath: 'PermissionsDashboard', activo: false},
        //     ]}
        // ])

        const router = useRouter()

        const push = (path) => {
            router.push({name: path})
        }

        const showCompanyOption = ref(false)

        const ActionShowCompanyOption = () => {
            showCompanyOption.value = !showCompanyOption.value
        }

        // Le damos una funcion a cada etiqueta "a" para que pueda agregar o quitar la clase "is-active"
        // esta funcion se crea dentro de onMounted() porque el template no se carga todavia entonces debe de 
        // esperar a que este cargado para agregar los elementos del html
        onMounted(() => {
            const item = document.querySelectorAll('.menu-link')
            console.log(item)
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
    border: 1px solid #005395;
    color: #005395;
}
a.is-active {
    background-color: #005395;
    color: #fff
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