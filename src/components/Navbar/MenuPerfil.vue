<template>
    <div class="dropdown mx-2 close-perfil" :class="{'is-active':activo, 'is-right':!isMobile}">
        <div class="dropdown-trigger">
            <a @click="activar" href="#" class="close-perfil">
                <img class="circle close-perfil" src="@/assets/perfil.jpg" alt="">
            </a>
        </div>
        <div  class="dropdown-menu shadow close-perfil" id="dropdown-menu" role="menu" style="width: 16rem; margin-top:16px;">
            <div class="dropdown-content close-perfil has-text-centered">
                <div class="mt-2 mb-2 close-perfil">
                    <img class="circle close-perfil" src="@/assets/perfil.jpg" alt="" style="max-height: 6rem;">
                </div>
                <h3>{{nombre}}</h3>
                <p class="is-size-7 has-text-grey close-perfil">{{email}}</p>
                  <!--   con la expresion {{$t('')}} podemos traer la palabra que queremos mostrar traducida en el lenguaje seleccionado -->
                <p class="is-size-7 has-text-grey close-perfil">{{$t('navbar.menuPerfil.company')}} {{companyName}}</p>
                <div class="buttons-perfil my-1 close-perfil">
                    <button class="button fondo-crenein has-text-white is-size-7 w-100 my-2 has-text-weight-bold">{{$t('navbar.menuPerfil.GestionCuenta')}}</button>
                    <router-link :to="{name: 'CreateCompany'}" class="button fondo-crenein has-text-white is-size-7 w-100 my-1 has-text-weight-bold">{{$t('navbar.menuPerfil.crearEmpresa')}}</router-link>
                    <!-- <button class="button fondo-crenein has-text-white is-size-7 w-100 my-1 has-text-weight-bold">Create Company</button> -->
                </div>
                <hr>
                <div>
                    <img class="close-perfil" src="@/assets/logo_crenein.png" alt="" style="max-height: 8rem">
                </div>
                <div class="buttons-perfil close-perfil">
                    <button @click="logout" class="button fondo-crenein has-text-white is-size-7 w-100 my-2 has-text-weight-bold">{{$t('navbar.menuPerfil.cerrarSesion')}}</button>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { inject, watchEffect } from '@vue/runtime-core'
import store from '@/store';
import {GraphQLClient} from 'graphql-request';
import { useRouter } from 'vue-router';

export default {
    name: 'MenuPerfil',
    created(){
        this.traerDatosUser()
        this.traerCompanyxUser()
    },

    setup(){
        const isMobile = inject('isMobile')
        const activo = ref(false)
        const email = ref("")
        const user_id = ref()
        const nombre = ref("")
        const companyName = ref("")
        const endpoint = store.state.url_backend
        const company_id = ref();
        const router = useRouter()

        watchEffect(()=>{
            store.state.company_id 
            store.state.user_id 
            company_id.value = localStorage.getItem('id_company_selected')
            user_id.value = localStorage.getItem('user_id')
        })

        const activar = () => {
            activo.value = !activo.value
        }

        const logout = () => {
            const client = new GraphQLClient(endpoint) // creamos la consulta para usarlo luego
              /*   console.log(localStorage.getItem('user-token')) */
                client.rawRequest(/* GraphQL */ `
                    mutation{
                        logout{
                            status,
                            message,
                        }
                    }`,
                {                 
                                 
                },
                {
                    authorization: `Bearer ${ localStorage.getItem('user-token') }` 
                })
                .then((data) => {
                   /*  let status = data.data.logout */
              /*       console.log(status)  */
                    localStorage.clear()
              /*      localStorage.remove('id_company_selected')
                    localStorage.remove('user_id') */
                   /*  localStorage.clear()
                    */
               
                  router.push({name: 'login'})  
                      
                }).catch(error => {
                    
                    console.log(error.response);
                })
            
        }

        const traerCompanyxUser = () => {
            const client = new GraphQLClient(endpoint) // creamos la consulta para usarlo luego
             watchEffect(() => {
                client.rawRequest(/* GraphQL */ `
                query($id:ID) {
                    company(id:$id){
                        id
                        name_fantasy
                        business_name
                        
                    }
                }`,
                {                 
                    id:company_id.value                
                },
                {
                    /* authorization: `Bearer ${ localStorage.getItem('user_token') }` */
                })
                .then((data) => {
                    let company = data.data.company
                    companyName.value = company.name_fantasy
                   /*  console.log(companyName.value) */

                      
                }).catch(error => {
                    console.log(error.response);
                })
            })

        }


        const traerDatosUser = () => {
            const client = new GraphQLClient(endpoint) // creamos la consulta para usarlo luego
            watchEffect(() => {
                client.rawRequest(/* GraphQL */ `
                query($id:ID) {
                    user(id:$id){
                        id
                        name
                        email
                        companies {
                              	id
                                name_fantasy
                                business_name
                        }
                    }
                }`,
                {                 
                    id:user_id.value                
                },
                {
                    /* authorization: `Bearer ${ localStorage.getItem('user_token') }` */
                })
                .then((data) => {
                    let user = data.data.user
                    nombre.value = user.name
                    email.value = user.email
                    /* console.log(email.value) */

                      
                }).catch(error => {
                    console.log(error.response);
                })
            })
        }


        // Agrege una clase vacia llamada "close-perfil" que al hacer click fuera de esa clase se cierra el menu app
        document.addEventListener('click', function(e){
            let clic = e.target.className
            if (!clic.includes('close-perfil')) {
                activo.value = false
            }
        }, false)

        return{
            router ,
            nombre,
            traerCompanyxUser,
            companyName,
            email,
            traerDatosUser,
            user_id,
            isMobile,
            activo,
            activar,
            company_id,
            logout
        }
    }
}
</script>

<style scoped>
.buttons-perfil{
    width: 70%;
    margin: auto;
}

.buttons-perfil .button {
    border-radius: 15px;
}

.buttons-perfil .button:hover {
    background-color: #0572ca;
}

.circle{
  border-radius: 50%;
}

</style>