<template>
    <transition name="alert-error">
        <div v-show="activator" class="w-100 has-background-danger p-4 has-text-centered login-error">
            <span class="has-text-white is-size-5">Usuario o contraseña incorrecta</span>
        </div>    
    </transition>
</template>

<script>
import { watchEffect } from '@vue/runtime-core'
export default {
    name: 'AlertErrorLogin',
    props: ['activator'],
    emits: ['onChangeActivator'],

    setup(props, {emit}) {

        /**
         * 
         * Activa la ventana emergente para informar del error
         * Luego de 3 segundo lo desactiva
         * 
         */
        watchEffect(() => {
            if (props.activator == true) {
                setTimeout(() => {
                    emit("onChangeActivator")
                },3000)
            }
        })
        
    }
}
</script>

<style scoped>

.login-error {
    position: absolute;
    top: 0;
    z-index: 2;
}

.alert-error-leave-to {
    opacity: 0;
    transform: translateY(-90px)
}
.alert-error-enter-active {
    animation: temblor .5s ease
}
.alert-error-leave-active {
    transition: all .3s ease
}

@keyframes temblor {
    0% {transform: translateY(-90px); opacity: 0;}
    50% {transform: translateY(0); opacity: 1;}
    60% {transform: translateX(8px);}
    70% {transform: translateX(-8px);}
    80% {transform: translateX(4px);}
    90% {transform: translateX(-4px);}
    100% {transform: translateX(0px);}
}

</style>