<template>  
    <div>
        <div class="modal" :class="{'is-active' : data.modalDelete}">
            <div class="modal-background"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                    <div class="modal-card-title" style="margin-left: 20px">
                        <img class="image is-rounded is-48x48" style="margin: auto" src="../../assets/exclamation.png"> 
                    </div> 

                    <button class="delete " aria-label="close" @click="closeModal(data)" ></button>
                </header> 
                <section class="modal-card-body">

                    <div v-show="Lan==true">
                        <h1 class="modal-card-title">¿Desea cancelar esta accion?</h1> 
                        <p>Esta accion limpiara el formulario {{data.id}} </p>
                    </div>
                    <div v-show="Lan==false">
                        <h1 class="modal-card-title">Do you want to cancel user upload?</h1> 
                        <p>this actions will clear the form {{data.id}} </p>
                    </div>
                 

                </section>
                <footer class="column modal-card-foot">
                        <div v-show="Lan==false">
                            <button class="button btn-cancel" style=" font-weight:bold;">No,cancel</button>
                            <button class="button has-text-white" style="background-color: #005395; font-weight:bold;" @click="closeModal(data)" >Yes,cancel</button>
                        </div>
                        <div v-show="Lan==true">
                            <button class="button btn-cancel" style=" font-weight:bold;">No,cancelar</button>
                            <button class="button has-text-white" style="background-color: #005395; font-weight:bold;" @click="closeModal(data)" >Si,cancelar</button>
                        </div>
                </footer>
            </div>
        </div>
    </div>
</template>

<script>
import store from '@/store'
import {  watchEffect } from '@vue/runtime-core'
import { ref } from '@vue/reactivity'
export default {
    name:'Action',
    props:['data'],
    emits: ['onCloseModalAction'],
    
    setup(props,{emit}){
        const Lan = ref(false)
        const closeModal = (e) => {
            emit("onCloseModalAction", e.id)
        }
        
        watchEffect(()=>{
            Lan.value = store.state.cambio_lang
        })

        return{
            Lan,
            closeModal
        }
    }

}
</script>

<style scoped>
.modal-background {
    background-color: rgba(10,10,10,.86);
}
.btn-cancel {
    background-color: #ce2d22;
    color: #fff;
}
.btn-cancel:hover {
    background-color: #F93023;
}

</style>