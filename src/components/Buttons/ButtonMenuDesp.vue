<template>
  <div>
    <div class="dropdown " :class="{'is-active':  activo && desplegar == true}" >
        <div class="dropdown-trigger">
            <button @click="activar" id="select-company" class="button btn btn-letter" aria-haspopup="true" aria-controls="dropdown-menu">
                
                <span class="column pl-0 has-text-left ">{{companyActual.name}}</span>
                <span class="columns   icon is-small">
                    <i id="select-company" class="  fas fa-chevron-down "></i>
                </span>
            </button>
        </div>
        <div class="dropdown-menu  ml-4" id="dropdown-menu" role="menu" style="min-width: 10rem ">
            <div class="dropdown-content has-background-none"> 
                <a v-for="item in data" :key="item.id" href="#" 
                     id="select-company" class="dropdown-item  btn btn-letter mt-1 column has-text-left" :class="{'is-active': item.id == companyActual.id}"
                    >{{item.name}}
                </a>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
export default {
    name:"ButtonMenuDesp",
    props:{
        desplegar:Boolean
    },
 
    setup(){
   
        const activo = ref(false)
       
        // ******* Datos de prueba *******
        const data = ref([
            {id: 2, name: 'Companies management'}, {id: 3, name: 'Apps management'},{id: 4, name: 'Permissions management'}
        ])
        const companyActual = ref({id: 1, name: 'Company '})
        // *******************************

        const changeCompany = (id) => {
            let aux = data.value.find(element => element.id == id)
            /* companyActual.value = aux */
            /* activar()  */
        }

        const activar = () => {
                activo.value = !activo.value
        }

     // Oculta el Selector de company cuando se hace click fuera de este
/*      document.addEventListener('click', function(e) {
            let clic = e.target.getAttribute('id')
            if ((clic != "select-company") && desplegar && (e.path[1].getAttribute('id') != 'select-company') ) {
                activo.value = false
            }
        }, false)    */

        return {
            activo,
            activar,
            changeCompany,
            data,
            companyActual,
         
        }
    }
}
</script>

<style scoped >


.btn-letter{
    color:#005395;
}

.btn{
    justify-content: flex-start;
    width:240px;
    height:50px;
    background-color:white;
    border-radius: 5px;
    box-shadow: 2px 2px 5px grey;
}


.btn:focus{
    background-color:#005395;
    color:white;
}

a.dropdown-item{
    width:222px;
}

a.dropdown-item.is-active{
    background-color:#005395;
    color:white;
}


</style>