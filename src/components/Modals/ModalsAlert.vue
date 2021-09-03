<template>
    <transition name="modalAlert" >
        <div v-show="activador" class="alert-conteiner">
            <div class="alert-msg has-background-success">
                Se cargo con exito la App
            </div>
        </div>
    </transition>
</template>

<script>
export default {
 props: ['activador']
}
</script>

<style scoped>
.alert-conteiner {
    position: fixed;
    width: 100%;
    top: 80px;
}
.alert-msg {
    text-align: center;
    padding: 15px;
    color: white;
    /* background: #ff0062; */
    border-radius: 10px;
    box-shadow: 1px 3px 5px rgba(0,0,0,0.2);
    max-width: 400px;
    margin: 0 auto;
}
/* modalAlert transitions */
.modalAlert-leave-to {
    opacity: 0;
    transform: translateY(-90px)
}
.modalAlert-enter-active {
    animation: temblor .5s ease
}
.modalAlert-leave-active {
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