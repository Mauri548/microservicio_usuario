<template>
    <div class="dropdown is-right mx-2 close-apps" :class="{'is-active':activo}">
        <div class="dropdown-trigger">
            <button @click="activar" id="app-menu" class="button p-2 close-apps" aria-haspopup="true" aria-controls="dropdown-menu">
                <span class="is-align-self-flex-start close-apps">
                    <i class="fas fa-th menu-app close-apps"></i>
                </span>
            </button>  
        </div>
     
        <div class="dropdown-menu shadow close-apps" id="dropdown-menu" role="menu" style="width: 18rem; margin-top:10px;">
            <div class="dropdown-content close-apps has-text-centered">
                <h2 class="blue-crenein has-text-weight-medium close-apps">{{$t('navbar.menuApp.creneinProduct')}}</h2>
                <hr class="my-1 close-apps">
                <div class="p-4 is-flex is-flex-direction-column is-align-items-flex-start close-apps">
                    <h5 class="blue-crenein has-text-weight-semibold close-apps">{{$t('navbar.menuApp.conectarse')}}</h5>
                    <div class="columns is-multiline is-flex is-justify-content-space-between w-100 my-2 close-apps is-align-items-center" style="margin: auto">
                      <!--   <AppCrenein v-for="app in apps" :key="app.id" :name="app.nombre" :licencia="app.licencia" :logo="app.logo" :activo="app.activo" /> -->
                      <AppCrenein v-for="app in apps" :key="app.id" :name="app.nombre" :cant="apps.length" :logo="app.logo" :activo="app.activo" />
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
import blog from '@/assets/blog.jpg'
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
    setup(){
        const endpoint = store.state.url_backend
        const apps = ref([])
        const discovers = ref([])

        watchEffect(()=>{
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
            const client = new GraphQLClient(endpoint)
            
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
                    company_id: company_id.value
                })
                .then((data) => {
                    apps.value = []
                   
                    data.data.subscriptionsxcompany.data.forEach(element => {
                        apps.value.push({
                            id:element.app.id,
                            licencia:element.license.name, 
                            nombre: element.app.name,
                            logo: ispb, activo: true
                        })
                    })
                    console.log(apps.value)

                }).catch(error => {
                    console.log(error.response);
                })
            
        }

        watchEffect(()=>{
            if (company_id.value) {
                traerSuscripcionesxCompany()
            }
        })

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