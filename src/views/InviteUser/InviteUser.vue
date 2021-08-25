<template>
        <div class="column  ancho is-half is-offset-one-quarter mt-5 " >

            <div v-if="Lan==false" class="column has-text-centered " style="margin:auto;">
                <h2  style="font-weight:bold; font-size:1.6em">There is only one more step left!
                invite users to your company to 
                help you manage it</h2>
                <h3 class="mt-4">Enter the email of the person you want to invite</h3>
                <div class=" field has-addons column "  >
                        <input class="input" type="text" placeholder="Email">
                        <button class="button is-info">Send</button>
                </div>
                <button class=" mt-4 px-6 button btn" @click="irPermisos">Continue</button>
            </div>

            <div v-if="Lan==true" class="column has-text-centered " style="margin:auto;">
                <h2  style="font-weight:bold; font-size:1.6em">¡Solo queda un paso más! invitar a los usuarios a su empresa para
                ayudarlo a administrarlo</h2>
                <h3 class="mt-4">Ingrese el correo electrónico de la persona a la que desea invitar</h3>
                <div class=" field has-addons column "  >
                        <input class="input" type="text" placeholder="Email">
                        <button class="button is-info">Enviar</button>
                </div>
                <button class=" mt-4 px-6 button btn" @click="irPermisos">Continuar</button>
            </div>
        </div>
</template>

<script>
import { inject } from '@vue/runtime-core'
import { useRouter } from 'vue-router';
import store from '@/store'
import {  watchEffect } from '@vue/runtime-core'
import {ref} from '@vue/reactivity'
export default {
    name:'InviteUser',
    setup(){
        const router = useRouter()
        const isMobile = inject('isMobile')
        const Lan = ref(false)

        watchEffect(()=>{
            Lan.value = store.state.cambio_lang
        })

        const irPermisos = () => {
                 router.push({name: 'PermissionsManagement'})
        }

        return{ 
            Lan,
            irPermisos,
            isMobile
        }
    }

}
</script>

<style scoped>


.btn{
    background-color:#005395;
    color:white;
    font-weight:bold;
    border-color: #0a518b;
}

.ancho{
    margin:auto;
}


.margen-campo{
    margin:auto;
    
}

.ancho-campo{
    width:278px;
    margin:auto;
}


@media screen and (max-width: 990px) {

  .ancho-campo{
    width:278px;
    margin-left:0px;
}

  

}


</style>