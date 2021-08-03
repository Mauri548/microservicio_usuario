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

                    <h1 class="modal-card-title">Do you want to cancel user upload?</h1> 
                    <p>this actions will clear the form {{data.id}} </p>
                </section>
                <footer class="column modal-card-foot">
                    <button class="button btn-cancel" style=" font-weight:bold;">No,cancel</button>
                    <button class="button has-text-white" style="background-color: #005395; font-weight:bold;" @click="closeModal(data)" >Yes,cancel</button>
                </footer>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'Action',
    props:['data'],
    emits: ['onCloseModalAction'],
    
    setup(props,{emit}){
        const closeModal = (e) => {
            emit("onCloseModalAction", e.id)
        }

        return{
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