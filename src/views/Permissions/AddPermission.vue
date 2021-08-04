<template>
  

<div>
    <button @click="activar" class="button">Hola</button>


    <div class="modal " :class="{'is-active':activo}" >
    <div class="modal-background "></div>
    <div class="modal-card " >
        <header class="modal-card-head has-background-white">
        <p class="modal-card-title has-text-centered blue-crenein" style="font-size:1.5em; font-weight:bold;">Add Permissions</p>
        <button class="delete" @click="activar"  aria-label="close"></button>
        </header>
        <section class="modal-card-body">

            <form action="" class="column">
                <select class=" select1 mb-4" id="country" name="country">
                    <option value="ISPb">ISPb</option>
                    <option value="PuWiC">PuWiC</option>
                    <option value="Geston">Geston</option>
                </select>
                <CampoForm place="Key" type="text"/>
        
            </form>
        
            <div class="column ">
                <textarea class="textarea" placeholder="Details"></textarea>
            </div>
            
        </section>
        <footer class="modal-card-foot  has-background-white">
            <div class="column has-text-centered" >
                <button class="button  has-text-white " style="background-color:#005395; font-weight:bold;" >Save changes</button>
                <button class="button has-background-danger has-text-white"  style="font-weight:bold;" @click="activar">Cancel</button>
            </div>
        </footer>
    </div>
    </div>

</div>



</template>

<script>
import {ref} from '@vue/reactivity'
import CampoForm from '../../components/CampoForm.vue'
export default {
    name:'AddPermission',
    components: {
        CampoForm
    },
    setup(){
        const activo = ref(false)

        const activar = () => {
            activo.value = !activo.value
        }

        return{
            activo,
            activar 
        }
    }
}
</script>

<style scoped>

.select1 {
    width: 100%;
    padding: 10px ;
    border: 1px solid #ddd;
    border-radius: 4px;
    background-color: none;
    background-position-x: 204px;
}

</style>