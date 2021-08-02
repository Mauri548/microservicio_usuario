<template>  
    <div>
        <div class="modal" :class="{'is-active' : data.modalDelete}">
            <div class="modal-background"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                    <!-- <p class="modal-card-title">Modal title</p> -->
                    <div class="modal-card-title" style="margin-left: 20px">
                        <img class="image is-rounded is-48x48" style="margin: auto" src="../../assets/exclamation.png"> 
                    </div> 

                    <button class="delete " aria-label="close" @click="Activar" ></button>
                </header> 
                <section class="modal-card-body">

                    <h1 class="modal-card-title">Do you want to cancel user upload?</h1> 
                    <p>this actions will clear the form</p>
                </section>
                <footer class="column modal-card-foot">
                    <button class="button is-danger" style=" font-weight:bold;">No,cancel</button>
                    <button class="button has-text-white" style="background-color: #005395; font-weight:bold;" @click="Activar" >Yes,cancel</button>
                </footer>
            </div>
        </div>
    </div>
</template>

<script>
import {ref} from '@vue/reactivity'
export default {
    name:'Action',
    props:['data']
    ,
    setup(props){

    }

}
</script>

<style scoped>
.modal-background {
    background-color: rgba(10,10,10,.86);
}

</style>