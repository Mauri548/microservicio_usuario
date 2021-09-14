<template>
  
    <div v-show="isMobile==false">
  
        <form action="" class="column is-half is-offset-one-quarter mt-1 is-mobile" style="width:560px">   
            
            <div class="column has-text-centered blue-crenein">
               <h2 style="font-size:1.5em; font-weight:bold;" >{{$t('company.editarCompany')}}</h2>
            </div>
            <div class="column">
                <div v-show="$i18n.locale=='en'">
                    <CampoForm place="Fantasy Name" type="text" />
                    <CampoForm place="Business Name" type="text" />
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
                <div v-show="$i18n.locale=='es'">
                    <CampoForm place="Nombre de Fantasia" type="text" />
                    <CampoForm place="Nombre del Negocio" type="text" />
                    <CampoForm place="Propietario" type="text" />
                    <CampoForm place="Cuit" type="text" />
                    <CampoForm place="Correo" type="text" />
                    <CampoForm place="Telefono" type="text" />
                    <CampoForm place="Condición Fiscal" type="text" />
                    <CampoForm place="Dirección" type="text" />
                    <CampoForm place="Localidad" type="text" />
                    <CampoForm place="Provincia" type="text" />
                    <CampoForm place="Pais" type="text" />
                    
                </div>
            

            </div>
  

            <div class="column ">
                <div class="columns  ">
                    <div class="column  is-flex-grow-0">
                        <button class=" button  has-text-white has-background-danger " @click="volver" style="font-weight:bold;">{{$t('company.cancel')}}</button>
                    </div>
                    <div class="column   pl-0  ">
                        <button class=" button has-text-white button1 "  @click="verificar" style="background-color:#005395; font-weight:bold;">{{$t('company.guardar')}}</button>
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
                <button class=" button has-text-white button1 "  @click="verificar" style="background-color:#005395; font-weight:bold;">Save</button>
            </div>  
            <div class="column">
                <button class="button  button1 has-text-white has-background-danger " @click="volver" style="font-weight:bold;">Cancel</button>
            </div>
                      
        </form>
    </div>

</template>

<script>
import { useRouter } from 'vue-router';
import CampoForm from '../../components/CampoForm.vue'
import { inject } from '@vue/runtime-core'
/* import Action from '../../components/Modals/ActionsModal.vue' */
import {ref} from '@vue/reactivity'
import store from '@/store';

export default {
    name:'EditCompany',
      components: {
        CampoForm,
       
    }, 
    setup(){
        const router = useRouter()
        const isMobile = inject('isMobile')
        const activo = ref(false)

        const Activar = () => {
            activo.value = !activo.value
            console.log(activo.value)
        }

        const verificar = () => {
            router.push({name: 'CompaniesDashboard'})
            let accion = "edicionCompany"
            store.commit('verificar_carga',accion)
        }


        const volver = () => {
            router.go(-1)
        }

        return{ 
            verificar ,
            volver,
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