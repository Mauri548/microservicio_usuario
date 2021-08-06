<template>
  
    <div v-show="isMobile==false">
  
        <form action="" class="column is-half is-offset-one-quarter mt-1 is-mobile" style="width:560px">   
            
            <div class="column has-text-centered blue-crenein">
               <h2 style="font-size:1.5em; font-weight:bold;" >Edit Company</h2>
            </div>
            <div class="column">

                    <CampoForm place="Name Fantasy" type="text" />
                    <CampoForm place="Bussines Name" type="text" />
                    <CampoForm place="Owner" type="text" />
                    <CampoForm place="Cuit" type="text" />
                    <CampoForm place="Email" type="text" />
                    <CampoForm place="Phone" type="text" />
                    <CampoForm place="Tax condition" type="text" />
                    <CampoForm place="Direction" type="text" />
                    <CampoForm place="Location" type="text" />
                    <CampoForm place="Province" type="text" />
                    <CampoForm place="Country" type="text" />

            </div>
  

            <div class="column ">
                <div class="columns  ">
                    <div class="column  is-flex-grow-0">
                        <button class=" button  has-text-white has-background-danger " style="font-weight:bold;">Cancel</button>
                    </div>
                    <div class="column   pl-0  ">
                        <button class=" button has-text-white button1 "  @click="Activar" style="background-color:#005395; font-weight:bold;">Save</button>
                    </div>     
                </div>
            </div>
        </form>

    </div>
    
    <div v-show="isMobile==true">
        <form action="" class="column has-text-centered  mt-5 ml-6">

            <div class="column has-text-centered blue-crenein">
               <h2 style="font-size:1.5em; font-weight:bold;" >Edit Company</h2>
            </div>    

            <div class="column">
                <CampoForm place="Name Fantasy" type="text" />
                <CampoForm place="Bussines Name" type="text" />
                <CampoForm place="Owner" type="text" />
                <CampoForm place="Cuit" type="text" />
                <CampoForm place="Email" type="text" />
                <CampoForm place="Phone" type="text" />
                <CampoForm place="Tax condition" type="text" />
                <CampoForm place="Direction" type="text" />
                <CampoForm place="Location" type="text" />
                <CampoForm place="Province" type="text" />
                <CampoForm place="Country" type="text" />
            </div>
            
            <div class="column">
                <button class=" button has-text-white button1 "  style="background-color:#005395; font-weight:bold;">Save</button>
            </div>  
            <div class="column">
                <button class="button  button1 has-text-white has-background-danger "  style="font-weight:bold;">Cancel</button>
            </div>
                      
        </form>
    </div>

</template>

<script>
import CampoForm from '../../components/CampoForm.vue'
import { inject } from '@vue/runtime-core'
/* import Action from '../../components/Modals/ActionsModal.vue' */
import {ref} from '@vue/reactivity'
export default {
    name:'EditCompany',
      components: {
        CampoForm,
       
    }, 
    setup(){
        const isMobile = inject('isMobile')
        const activo = ref(false)

        const Activar = () => {
            activo.value = !activo.value
            console.log(activo.value)
        }

        return{ 
             isMobile,
             activo,
             Activar
         }
    }
}
</script>

<style scoped>

.button1{
    width:100%;
}

.imgred{
    border-radius: 100px;
}


@media screen and (max-width: 1200px) {

 
.button1{
    width: 100%; /* The width is 100%, when the viewport is 800px or smaller */
  }
}
</style>