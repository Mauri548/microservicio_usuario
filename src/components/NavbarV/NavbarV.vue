<template>
  
    <div class="conteiner-nabvarV">
        <aside class="menu mx-3">
            <ul class="menu-list">
                <li><a class="is-active">Home</a></li>
                <!-- <li><a>Personal Info</a></li> -->
                <li><router-link :to="{name: 'PersonalForm'}" >Personal Info</router-link></li>
                <li><a>Permissions management</a></li>
                <li><a class="companyOption btn-company" @click="ActionShowCompanyOption">
                    <span class="column has-text-left ">Company</span>
                    <span class="column  has-text-right  icon is-small">
                        <i  class="fas fa-chevron-down"></i>
                    </span>
                </a>
                    <ul v-show="showCompanyOption" >
                        <!-- <li><a class="companyOption">Companies management</a></li> -->
                        <li><router-link :to="{name: 'CompaniesDashboard'}">Companies management</router-link></li>
                        <!-- <li><a class="companyOption">Apps management</a></li> -->
                        <li><router-link :to="{name: 'AppDashboard'}">Apps management</router-link></li>
                        <!-- <li><a class="companyOption">Permissions management</a></li> -->
                        <li><router-link :to="{name: 'PermissionsDashboard'}">Permissions management</router-link></li>
                    </ul>
                </li>
            </ul>
        </aside>
    </div>
   
</template>

<script>

import ButtonMenu from '../../components/Buttons/ButtonMenu.vue'
import ButtonMenuDesp from '../../components/Buttons/ButtonMenuDesp.vue'
import PersonalForm from '../../components/PersonalInfo/PersonalForm.vue'
import {ref} from '@vue/reactivity' 
import { onMounted } from '@vue/runtime-core'


export default {
    name:'NavbarV',
    components: {
        ButtonMenu,
        ButtonMenuDesp,
        PersonalForm,
    },
    setup(){

        // ************ Prueba ************
        const showCompanyOption = ref(false)

        const ActionShowCompanyOption = () => {
            showCompanyOption.value = !showCompanyOption.value
        }

        onMounted(() => {
            const item = document.querySelectorAll('a')
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
        //     let clic = e.target.className
        //     if (!clic.includes('companyOption')) {
        //         showCompanyOption.value = false
        //     }
        // }, false)

        // ********************************
        
      
        // const data = ref([
        //     {id: 1, name: 'Companies management'},{id: 2, name: 'User management'}, {id: 3, name: 'Apps management'},
        //     {id: 4, name: 'Permissions management'}
        // ])
        // const companyActual = ref({id: 0, name: 'Company'})
     

        // const activo = ref(false)

        // const changeCompany = (id) => {
        //     let aux = data.value.find(element => element.id == id)
        //     companyActual.value = aux
        // }

        // const activar = () => {
        //     activo.value = !activo.value
        // }
        // const Desact = () => {
        //     activo.value = false
        //     document.getElementById("menu-desp").style.display = 'none'; 
        // }


        // const  Ocultar = () => 
        // {
            
        //     if(activo.value == true){
        //         document.getElementById("menu-desp").style.display = 'none'; 
        //         activo.value = !activo.value
        //     }else{
        //         activo.value = !activo.value
        //         document.getElementById("menu-desp").style.display = 'block'; 
        //     }
            
        // }

       
        return {
            showCompanyOption,
            ActionShowCompanyOption,

        //  Ocultar,
        //     isMobile,
        //     activo,
        //     activar,
        //     changeCompany,
        //     Desact ,
        //     data,
        //     companyActual,

          
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