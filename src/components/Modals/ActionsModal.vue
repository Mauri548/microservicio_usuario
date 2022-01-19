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
                    <div>
                        <h1 class="modal-card-title">{{$t('modal.actionsModal.msmPregunta')}}</h1> 
                        <p>{{$t('modal.actionsModal.msmAccion')}} {{data.id}} </p>
                    </div>

                </section>
                <footer class="column modal-card-foot">
                    <div>
                        <button class="button btn-cancel" @click="closeModal(data)" style=" font-weight:bold;">{{$t('modal.actionsModal.noCancel')}}</button>
                        <button class="button has-text-white" style="background-color: #005395; font-weight:bold;" @click="deleteModal(data)" >{{$t('modal.actionsModal.siCancel')}}</button>
                    </div>
                </footer>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'Action',
    props:['data'],
    emits: ['onCloseModalAction','onDeleteModal'],
    
    setup(props,{emit}){
        const closeModal = (e) => {
            emit("onCloseModalAction", e.id)
        }
        const deleteModal = (e) => {
            emit("onDeleteModal", e.id)
        }
        return{
            deleteModal,
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