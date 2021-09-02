<template>
  
    <div>
    
        <div class="modal " :class="{'is-active':data}" >
        <div class="modal-background  "></div>
        <div class="modal-card " >
            <header class="modal-card-head has-background-white " >
            <p class="modal-card-title has-text-centered blue-crenein" style="font-size:1.5em; font-weight:bold;">{{$t('permisos.agregar')}}</p>
            <button class="delete" @click="closeModal"  aria-label="close"></button>
            </header>
            <section class="modal-card-body">
                <form action="" class="column">
                    <select class="column  select1 mb-4 " >
                        <option value="ISPb">ISPb</option>
                        <option value="PuWiC">PuWiC</option>
                        <option value="Geston">Geston</option>
                    </select>

                    <CampoForm place="Key" type="text"/>

                    <textarea class="textarea " placeholder="Details"></textarea>
                
                    <div class="column has-text-centered" >
                        <button class="button has-background-danger has-text-white mr-2"  style="font-weight:bold;" @click="closeModal" >{{$t('permisos.cancel')}}</button>
                        <button class="button  has-text-white  ml-2" style="background-color:#005395; font-weight:bold;" @click="verificar">{{$t('permisos.guardar')}}</button>
                    </div>
                </form>
            </section>
    
        </div>
        </div>

    </div>

</template>

<script>
import CampoForm from '../../components/CampoForm.vue'
import { ref } from '@vue/reactivity'
export default {
    name:'AddPermission',
    props: ['data'],
    emits: ['onCloseModal','onOpenModalDelete','tengoAct'],
    components: {
        CampoForm
    },
    setup(props, { emit }){
       

        const act = ref({activo:false ,cargar:false})

        const closeModal = () => {
            act.value.activo = false
            act.value.cargar = false
            emit("onCloseModal")
        }

        const verificar = () => {
          
            emit("onCloseModal")
            act.value.activo = true
            act.value.cargar = true
            emit('tengoAct', act) 
        }

        return{
            act,
            verificar ,
            closeModal,
       
        }
    }
}
</script>

<style scoped>

.select1 {

    font-family: Arial, Helvetica, sans-ser;
    color: #777474;
    width: 100%;
    padding: 10px ;
    border: 1px solid #ddd;
    border-radius: 4px;
    background-color: none;
    font-size: 0.9rem;
}





</style>