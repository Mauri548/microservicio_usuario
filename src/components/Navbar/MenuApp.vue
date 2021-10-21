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
            <div class="dropdown-content close-apps has-text-centered">
                <h2 class="blue-crenein has-text-weight-medium close-apps">{{$t('navbar.menuApp.creneinProduct')}}</h2>
                <hr class="my-1 close-apps">
                <div class="p-4 is-flex is-flex-direction-column is-align-items-flex-start close-apps">
                    <h5 class="blue-crenein has-text-weight-semibold close-apps">{{$t('navbar.menuApp.conectarse')}}</h5>
                    <div class="columns is-multiline is-flex is-justify-content-space-between w-100 my-2 close-apps is-align-items-center" style="margin: auto">
                      <!--   <AppCrenein v-for="app in apps" :key="app.id" :name="app.nombre" :licencia="app.licencia" :logo="app.logo" :activo="app.activo" /> -->
                      <AppCrenein v-for="app in apps" :key="app.id" :name="app.nombre"  :logo="app.logo" :activo="app.activo" />
                    </div>
                    <h2 class="has-text-weight-semibold close-apps">{{$t('navbar.menuApp.descubrir')}}</h2>
                    <div class="is-flex is-flex-direction-column close-apps">
                        <div class="is-flex my-2 is-align-items-center discover" v-for="item in discovers" :key="item.id">
                            <img class="img-rounded" :src="item.image" :alt="item.name" width="35">
                           <!--  <a  href="https://blog.crenein.com/" target="_blank" class="ml-3">{{item.name}}</a>
                            -->
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
import i18n from '@/i18n.js' 
import { watchEffect } from '@vue/runtime-core'
import store from '@/store' 
import {GraphQLClient} from 'graphql-request';

export default {
    name: 'MenuApp',
    components: {
        AppCrenein,
    },
    created() {
        this.traerSuscripcionesxCompany()
    },

    setup(){
        const endpoint = store.state.url_backend
        // ****** Datos de prueba ******
        const apps = ref([
       /*      {id: 1, name: 'ISPBrain', logo: ispb, activo: true},
            {id: 2, name: 'PuWiC', logo: puwic, activo: true},
            {id: 3, name: 'Geston', logo: geston, activo: true},
            {id: 3, name: 'Geston', logo: geston, activo: false},
            {id: 3, name: 'Geston', logo: geston, activo: false},
            {id: 3, name: 'Geston', logo: geston, activo: false},
            {id: 3, name: 'Geston', logo: geston, activo: false} */
        ])

        const discovers = ref([])
        // ******************************

        watchEffect(()=>{ // utilizamos watcheffect para detectar que valor tiene el atributo locale del objeto i18n al momento de estar en la pagina o al momento de cambiar el valor a traves del boton del lenguaje
            if(i18n.global.locale == 'en'){
                discovers.value = [
                    {id: 1, name: 'Blog', image: blog},
                    {id: 2, name: 'More Crenein Products', image: blog}
                ]
            }
            if(i18n.global.locale == 'es'){
                 discovers.value = [
                    {id: 1, name: 'Blog', image: blog},
                    {id: 2, name: 'Mas Productos de Crenein', image: blog}
                ]
            }
        })

        const activo = ref(false)
        const company_id = ref();
   
        watchEffect(()=>{
            store.state.company_id 
            company_id.value = localStorage.getItem('id_company_selected')
        })

        
        const traerSuscripcionesxCompany = () => {
            const client = new GraphQLClient(endpoint) // creamos la consulta para usarlo luego
            watchEffect(() => {
                client.rawRequest(/* GraphQL */ `
                query($company_id:ID) {
                     subscriptionsxcompany(first: 999, page: 1,company_id:$company_id) {
                       data{
                            id
                            use_company_id
                            lic_license_id
                            use_app_id
                            company{
                                id
                                business_name
                            }
                            app{
                                id
                                name
                            }
                            license{
                                id
                                name
                            }
                        }
                        paginatorInfo{
                            count
                            currentPage
                            firstItem
                            hasMorePages
                            lastItem
                            lastPage
                            perPage
                            total
                        }
                    }
                }`,
                {
                    /* page: parseInt(route.params.page),
                    first: mostrar_cantidad.value */
                    company_id: company_id.value
                },
                {
                    /* authorization: `Bearer ${ localStorage.getItem('user_token') }` */
                })
                .then((data) => {
                  /*   let datos = data.data.subscriptionsxcompany.data
                    console.log(datos)  */
                    apps.value = []
                   
                    data.data.subscriptionsxcompany.data.forEach(element => {
                        apps.value.push({id:element.app.id,licencia:element.license.name, nombre: element.app.name,logo: ispb, activo: true})
                        
                    })
                    console.log(apps.value)

                }).catch(error => {
                    console.log(error.response);
                })
            })
        }


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
            company_id,
            traerSuscripcionesxCompany,
            apps,
            discovers,
            activo,
            activar
        }
    }
}
</script>

<style scoped>

a{
    text-decoration: none;
    color: #413e3e;

}

.menu-app {
  font-size: 23px;
  color: #928d8d;
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
    cursor: pointer;
}

</style>