<template>
  



    <div v-show="isMobile==false">
        <div class="columns ">
            <div class="column is-flex-grow-0  has-text-left ml-5 mt-5">
                <ButtonMenu nombre="Home"  />
                <ButtonMenu nombre="Personal info"  />
                <ButtonMenu nombre="Permissions management"  />
                <ButtonMenuDesp  />
            </div>

        </div>
    </div>
    <div v-show="isMobile==true">
        <nav>
            <ul class="btns2">
                <li><a class="button1"  @click="Desact" href="#">Home</a></li>
                <li><a class="button1"  @click="Desact" href="#">Personal info</a></li>
                <li><a class="button1"  @click="Desact" href="#">Permissions management</a></li>
                <li>
                    <div class="dropdown">
                        <a  class="button1 dropbtn"  @click="Ocultar"   href="#"> 
                            <span class="column has-text-left ">Company</span>
                            <span class="column  has-text-right  icon is-small">
                                <i  class="fas fa-chevron-down"></i>
                            </span>
                        </a> 
                        <div class="dropdown-content " id="menu-desp"  >                  
                            <a v-for="item in data" :key="item.id" href="#" 
                                @click="changeCompany(item.id)" class="dropdown-item has-text-left" 
                                >{{item.name}}
                            </a>
                        </div>
                    </div>                            
                </li>
            </ul>
        </nav>
    </div>
   
        

</template>

<script>

import ButtonMenu from '../../components/Buttons/ButtonMenu.vue'
import ButtonMenuDesp from '../../components/Buttons/ButtonMenuDesp.vue'
import PersonalForm from '../../components/PersonalInfo/PersonalForm.vue'
import {ref} from '@vue/reactivity' 
import { inject } from '@vue/runtime-core'


export default {
    name:'NavbarV',
    components: {
        ButtonMenu,
        ButtonMenuDesp,
        PersonalForm,
    },
    setup(){
        
        const isMobile = inject('isMobile')
      
        const data = ref([
            {id: 1, name: 'Companies management'},{id: 2, name: 'User management'}, {id: 3, name: 'Apps management'},
            {id: 4, name: 'Permissions management'}
        ])
        const companyActual = ref({id: 0, name: 'Company'})
     

        const activo = ref(false)

        const changeCompany = (id) => {
            let aux = data.value.find(element => element.id == id)
            companyActual.value = aux
        }

        const activar = () => {
            activo.value = !activo.value
      /*       console.log(activo.value) */
        }
        const Desact = () => {
            activo.value = false
            document.getElementById("menu-desp").style.display = 'none'; 
       /*      console.log(activo.value) */
        }


        // Oculta el Selector de company cuando se hace click fuera de este
   /*     document.addEventListener('click', function(e) {
            let clic = e.target.getAttribute('id')
            if ((clic == "menu-desp") && (e.path[1].getAttribute('id') == 'menu-desp')) {
                 document.getElementById("menu-desp").style.display = 'block'; 
            }else{
                 document.getElementById("menu-desp").style.display = 'none'; 
            }
        }, false)  */


            const  Ocultar = () => 
            {
                
                if(activo.value == true){
                    document.getElementById("menu-desp").style.display = 'none'; 
                    activo.value = !activo.value
                }else{
                    activo.value = !activo.value
                    document.getElementById("menu-desp").style.display = 'block'; 
                }
                
               /*  console.log(activo.value) */
            }

       
        return {
         Ocultar,
            isMobile,
            activo,
            activar,
            changeCompany,
            Desact ,
            data,
            companyActual,
          
        }
    } 
}
</script>

<style scoped>



.dropbtn {
  border: none;
  cursor: pointer;
}

.dropdown {
  position: abosulte;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 120px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}

.dropdown-content a {
  color: #005395;
  padding: 10px ;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {background-color: #f1f1f1}


.dropdown:hover .dropdown-content {
  display: block;
}



.button1 {
    display:flex;
}


.button2{
    display:flex;
    margin-bottom: 10px;
}


.btns{
    display:inline-flex;
    width:100%;
    overflow-x: hidden;
    padding:0;
}

.btns2{
    display:inline-flex;
    overflow-x: scroll; 
    
}
.btns2 li {
    padding:10px;
}

.btns2 li a{
    color: #005395;
}

.btns2 li a:hover{
    border-bottom: 1px ridge #005395;
}


@media screen and (max-width: 1000px) {

   .btns{
        overflow-x: scroll;
        width:100%;
    }
    .btns2{
        overflow-x: scroll;
        width:100%;
        
    }
    .dropdown {
    position: relative;
    
    }
    .dropdown-content {
 
    position: relative;
   
    }
    
    
}

</style>