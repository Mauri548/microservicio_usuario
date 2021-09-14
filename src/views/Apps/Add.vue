<template>
  
  
    <div v-show="isMobile==false">
        <form action="" class="column is-half is-offset-one-quarter mt-1 is-mobile" style="width:560px">   
            
            <div class="column has-text-centered blue-crenein">
               <h2 style="font-size:1.5em; font-weight:bold;" >{{$t('app.agregarApp')}}</h2>
            </div>    
            
            
            
            
            <div class="column is-relative">
                <div class="columns">
                    <div class="column  has-text-left label" style="position: absolute">Logo</div>
                    <div class="column  ">
                        <figure class="image is-128x128" style="margin: auto">
                            <img class="is-rounded" src="https://bulma.io/images/placeholders/128x128.png">
                        </figure>
                    </div>
                </div>
            </div>
         
            <div class="file column has-name is-fullwidth is-right">
                <label class="file-label">
                    <input class="file-input" type="file" name="resume">
                    <span class="file-cta">
                    <span class="file-icon">
                        <i class="fas fa-upload"></i>
                    </span>
                    <span class="file-label">
                         {{$t('app.escogeArchivo')}}
                    </span>
                    </span>
                    <span class="file-name">
                    Screen Shot 2017-07-29 at 15.54.25.png
                    </span>
                </label>
            </div>

            <div class="column ">
                <div v-show="$i18n.locale=='es'">
                    <textarea class="textarea" placeholder="Observación"></textarea>
                </div>
                <div v-show="$i18n.locale=='en'">
                    <textarea class="textarea" placeholder="Observation"></textarea>
                </div>
            </div>
            
            <div class="column ">
                <div class="columns  ">
                    <div class="column  is-flex-grow-0">
                        <button class=" button  has-text-white has-background-danger " @click="volver" style="font-weight:bold;">{{$t('app.cancel')}}</button>
                    </div>
                    <div class="column   pl-0  ">
                        <button class=" button has-text-white button1 "  @click="verificar " style="background-color:#005395; font-weight:bold;">{{$t('app.guardar')}}</button>
                    </div>     
                </div>
            </div>
        </form>
    </div>
    
    <div v-show="isMobile==true">
        <form action="" class="column has-text-centered  mt-5 ml-6">
            <div class="column has-text-centered blue-crenein">
               <h2 style="font-size:1.5em; font-weight:bold;" >{{$t('app.agregarApp')}}</h2>
            </div>    
            
            
        
            <div class="column  label ">Logo</div>
            <div class="column  " style="font">
                    <img class=" iamge  imgred" width="200" height="200" src="https://bulma.io/images/placeholders/128x128.png">
            </div>
         
            <div class="file columns has-name is-right">
                <label class="column file-label">
                    <input class="file-input" type="file" name="resume">
                    <span class="file-cta">
                    <span class="file-icon">
                        <i class="fas fa-upload"></i>
                    </span>
                    <span class="file-label">
                        {{$t('app.escogeArchivo')}}
                    </span>
                    </span>
                    <span class="file-name">
                    Screen Shot 2017-07-29 at 15.54.25.png
                    </span>
                </label>
            </div>
            <div class="column ">
                <div v-show="$i18n.locale=='es'">
                    <textarea class="textarea" placeholder="Observación"></textarea>
                </div>
                <div v-show="$i18n.locale=='en'">
                    <textarea class="textarea" placeholder="Observation"></textarea>
                </div>
            </div>
            <div class="column    ">
                <button class=" button has-text-white button1 "  @click="verificar" style="background-color:#005395; font-weight:bold;">{{$t('app.guardar')}}</button>
            </div>  
            <div class="column  ">
                <button class=" button  button1 has-text-white has-background-danger " @click="volver" style="font-weight:bold;">{{$t('app.cancel')}}</button>
            </div>
                      
        </form>
    </div>


</template>

<script>
import CampoForm from '../../components/CampoForm.vue'
import { inject } from '@vue/runtime-core'
/* import Action from '../../components/Modals/ActionsModal.vue' */
import {ref} from '@vue/reactivity'
import { useRouter } from 'vue-router';
import store from '@/store';
import {GraphQLClient, request as fetchGQL} from 'graphql-request';

export default {
    name:'AddApp',
    components: {
        CampoForm,
       
    }, 
    setup(){
        const router = useRouter()
        const isMobile = inject('isMobile')
        const activo = ref(false)
        const observation = ref('')
        const nombre = ref('')
        const visible = ref('')
        const logo = ref('')

        const Activar = () => {
            activo.value = !activo.value
            console.log(activo.value)
        }
        const volver = () => {
            router.go(-1)
        }
       const verificar = () => {
                router.push({name: 'AppDashboard'})
                let accion = "cargarApp"
                store.commit('verificar_carga',accion)
        }

        const registrarApp = () => {
            const client = new GraphQLClient(endpoint) // creamos la consulta para usarlo luego
            // Estructura FetchQL(url, query, variable, opcions)
            client.rawRequest(/* GraphQL */ `
            mutation($observation:String, $name:String!,$logo:String,$visible:Visible!){
              		createsUse_app (input:{
                    name: $nombre,
                    logo: $logo,
                    visible: $visible,
                    observation: $obvservation,
                    }){
                            id
                            name
                            logo
                            observation
                            visible
                    }
            }`,
            {
                name: nombre.value,       
                observation: observation.value,
                logo: logo.value,
                visible: visible.value,
            },
            {
               /*  authorization: `Bearer ${ localStorage.getItem('user_token') }` */
            })
            .then((data) => {
                router.push({name: 'AppDashboard'})
            /*     let accion = "nuevoanunciante"
                store.commit('verificar_carga',accion) */
            }).catch(error => {
              console.log(error.response);
            })
        }


        return{ 
            logo ,
            visible,
            nombre,
            registrarApp,
            observation,
            verificar ,
            volver,
            isMobile,
            activo,
            Activar
         }
    }
}
</script>

<style scoped>

.button1{
    width:100%;
}

.imgred{
    border-radius: 100px;
}


@media screen and (max-width: 1200px) {

 
.button1{
    width: 100%; /* The width is 100%, when the viewport is 800px or smaller */
  }
}
</style>