<template>
    <div class="dropdown is-right mx-2 close-apps" :class="{'is-active':activo}">
        <div class="dropdown-trigger">
            <button @click="activar" id="app-menu" class="button p-2 close-apps" aria-haspopup="true" aria-controls="dropdown-menu">
                <span class="is-align-self-flex-start close-apps">
                    <i class="fas fa-th menu-app close-apps"></i>
                </span>
            </button>  
        </div>
        <div class="dropdown-menu shadow close-apps" id="dropdown-menu" role="menu" style="width: 18rem">
            <div class="dropdown-content close-apps">
                <h2 class="blue-crenein has-text-weight-medium close-apps">Crenein products</h2>
                <hr class="my-1 close-apps">
                <div class="p-4 is-flex is-flex-direction-column is-align-items-flex-start close-apps">
                    <h5 class="blue-crenein has-text-weight-semibold close-apps">Switch to:</h5>
                    <div class="columns is-multiline is-flex is-justify-content-space-between w-100 my-2 close-apps is-align-items-center" style="margin: auto">
                        <AppCrenein v-for="app in apps" :key="app.id" :name="app.name" :logo="app.logo" :activo="app.activo" />
                    </div>
                    <h2 class="has-text-weight-semibold close-apps">Discover</h2>
                    <div class="is-flex is-flex-direction-column close-apps">
                        <div class="is-flex my-2 is-align-items-center discover" v-for="item in discovers" :key="item.id">
                            <img class="img-rounded" :src="item.image" :alt="item.name" width="35">
                            <p class="ml-3">{{item.name}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

// ****** dato de prueba ******
import ispb from '@/assets/ispb2.png'
import puwic from '@/assets/puwic2.png'
import geston from '@/assets/geston2.png'
import blog from '@/assets/blog.jpg'
// import '../../assets/candado.png'
// *****************************
import AppCrenein from './AppsCrenein.vue'
import { ref } from '@vue/reactivity'
export default {
    name: 'MenuApp',
    components: {
        AppCrenein,
    },

    setup(){

        // ****** Datos de prueba ******
        const apps = ref([
            {id: 1, name: 'ISPBrain', logo: ispb, activo: true},
            {id: 2, name: 'PuWiC', logo: puwic, activo: true},
            {id: 3, name: 'Geston', logo: geston, activo: true},
            {id: 3, name: 'Geston', logo: geston, activo: false},
            {id: 3, name: 'Geston', logo: geston, activo: false},
            {id: 3, name: 'Geston', logo: geston, activo: false},
            {id: 3, name: 'Geston', logo: geston, activo: false}
        ])

        const discovers = ref([
            {id: 1, name: 'Blog', image: blog},
            {id: 2, name: 'More Crenein Products', image: blog}
        ])
        // ******************************

        const activo = ref(false)

        const activar = () => {
            activo.value = !activo.value
        }

        // agrege una clase vacia llamada "close-apps" que al hacer click fuera de esa clase se cierre el menu de app
        document.addEventListener('click', function(e) {
            let clic = e.target.className
            if (!clic.includes('close-apps')) {
                activo.value = false
            }
        }, false)

        return {
            apps,
            discovers,
            activo,
            activar
        }
    }
}
</script>

<style scoped>
.menu-app {
  font-size: 23px;
  color: #A9A9A9;
}

.img-rounded {
    border-radius: 50%;
}

.discover {
    padding-right: 1rem;
}

.discover:hover {
    background-color: rgba(204,204,204,0.27);
    border-radius: 15px;
    cursor: pointer;;
}

</style>