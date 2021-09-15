<template>
    <transition name="slide-down">
        <div class="conteiner-modal">
            <div class="body-modal">
                <div class="modal-card " >
                    <header class="modal-card-head has-background-white " >
                        <p class="modal-card-title has-text-centered blue-crenein" style="font-size:1.5em; font-weight:bold;">{{$t(title)}}</p>
                        <button class="delete" @click="closeModal"  aria-label="close"></button>
                    </header>
                    <slot></slot>
                    <!-- <section class="modal-card-body">
                        <form action="" class="column">
                            <CampoForm type="text" place="Name" />

                            <div class="select w-100 mb-4">
                                <select class="w-100" >
                                    <option value="puwic">Puwic</option>
                                    <option value="ispb">ISPB</option>
                                </select>
                            </div>

                            <CampoForm type="number" place="Price ARG" />
                            <CampoForm type="numbre" place="Price USD" />
                        
                            <div class="column p-0 has-text-centered" >
                                <button class="button has-background-danger has-text-white mr-2"  style="font-weight:bold;" @click="closeModal" >{{$t('permisos.cancel')}}</button>
                                <button class="button  has-text-white  ml-2" style="background-color:#005395; font-weight:bold;" @click="verificar">{{$t('permisos.guardar')}}</button>
                            </div>
                        </form>
                    </section> -->
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import CampoForm from '../../components/CampoForm.vue'
export default {
    components: {
        CampoForm,
    },
    props: ['title'],
    emits: ['closeModal'],

    setup(props, { emit }) {
        const closeModal = () => {
            emit("closeModal")
        }

        return {closeModal}
    }

}
</script>

<style scoped>
.conteiner-modal {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: 40;

    display: flex;
    align-items: center;
    justify-content: center;
}
.body-modal {
    background-color: #fff;
    box-shadow: 0 1px 6px 3px rgb(3 0 71 / 9%);
    border-radius: 15px;
}
.modal-card {
    margin: 0;
}
@media (min-width: 768px) {
    .modal-card {
        width: 100%;
    }
}

/* Tancisiones slide-down */

.slide-down-enter-from, .slide-down-leave-to {
    transform: translateY(-550px);
}
/* .slide-down-enter-to {} */
.slide-down-enter-active, .slide-down-leave-active {
    transition: all .5s ease;
}
/* .slide-down-leave-from {} */
/* .slide-down-leave-to {} */
/* .slide-down-leave-active {} */

</style>