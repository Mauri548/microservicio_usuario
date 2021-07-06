<template>
    <div class="dropdown mx-2 close-perfil" :class="{'is-active':activo, 'is-right':!isMobile}">
        <div class="dropdown-trigger">
            <a @click="activar" href="#" class="close-perfil">
                <img class="circle close-perfil" src="@/assets/perfil.jpg" alt="">
            </a>
        </div>
        <div class="dropdown-menu shadow close-perfil" id="dropdown-menu" role="menu" style="width: 18rem">
            <div class="dropdown-content close-perfil">
                <div class="mt-5 mb-2 close-perfil">
                    <img class="circle close-perfil" src="@/assets/perfil.jpg" alt="" style="max-height: 6rem;">
                </div>
                <p class="is-size-7 has-text-grey close-perfil">mauricioferreyra548@gmail.com</p>
                <p class="is-size-7 has-text-grey close-perfil">Company: Crenein</p>
                <div class="buttons-perfil my-1 close-perfil">
                    <button class="button fondo-crenein has-text-white is-size-7 w-100 my-2 has-text-weight-bold">Manage your Crenein Acount</button>
                    <button class="button fondo-crenein has-text-white is-size-7 w-100 my-1 has-text-weight-bold">Create Company</button>
                </div>
                <hr>
                <div>
                    <img class="close-perfil" src="@/assets/logo_crenein.png" alt="" style="max-height: 8rem">
                </div>
                <div class="buttons-perfil close-perfil">
                    <button class="button fondo-crenein has-text-white is-size-7 w-100 my-2 has-text-weight-bold">Sing out</button>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { inject } from '@vue/runtime-core'
export default {
    name: 'MenuPerfil',

    setup(){
        const isMobile = inject('isMobile')
        const activo = ref(false)

        const activar = () => {
            activo.value = !activo.value
        }


        // Agrege una clase vacia llamada "close-perfil" que al hacer click fuera de esa clase se cierra el menu app
        document.addEventListener('click', function(e){
            let clic = e.target.className
            if (!clic.includes('close-perfil')) {
                activo.value = false
            }
        }, false)

        return{
            isMobile,
            activo,
            activar,
        }
    }
}
</script>

<style scoped>
.buttons-perfil{
    width: 70%;
    margin: auto;
}

.buttons-perfil button {
    border-radius: 15px;
}

.buttons-perfil button:hover {
    background-color: #0572ca;
}

.circle{
  border-radius: 50%;
}

</style>