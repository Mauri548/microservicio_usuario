<template>
    <transition name="slide-down">
        <div class="conteiner-modal">
            <div class="body-modal">
                <div class="modal-card " >
                    <header class="modal-card-head has-background-white " >
                        <p class="modal-card-title has-text-centered blue-crenein" style="font-size:1.5em; font-weight:bold;">{{$t(title)}}</p>
                        <button class="delete" @click="closeModal"  aria-label="close"></button>
                    </header>
                    <!-- Aqui van los input del formulario y los botones -->
                    <slot></slot>
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