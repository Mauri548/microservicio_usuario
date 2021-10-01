<template>
  
  
    <div v-show="isMobile==false">
        <form action="" class="column is-half is-offset-one-quarter mt-1 is-mobile" style="width:560px">     
        <!-- <div class="column is-half is-offset-one-quarter mt-1 is-mobile" style="width:560px"> -->
            
            <div class="column has-text-centered blue-crenein">
               <h2 style="font-size:1.5em; font-weight:bold;" >{{$t('app.agregarApp')}}</h2>
            </div>    
            
            <div class="column is-relative">
                <div class="columns">
                    <div class="column  has-text-left label" style="position: absolute">Logo</div>
                    <div class="column  ">
                        <figure class="image is-128x128" style="margin: auto">
                            <img class="is-rounded" src="https://bulma.io/images/placeholders/128x128.png" >
                        </figure>
                    </div>
                </div>
            </div>
         
            <div class="file column has-name is-fullwidth is-right">
                <label class="file-label">
                    <input class="file-input"  type="file" name="resume" @change="selectFile($event)">
                    <span class="file-cta">
                    <span class="file-icon">
                        <i class="fas fa-upload"></i>
                    </span>
                    <span class="file-label">
                         {{$t('app.escogeArchivo')}}
                    </span>
                    </span>
                    <span class="file-name">
                     {{nombreImg ? nombreImg :'Screen Shot 2017-07-29 at 15.54.25.png'}}
                    </span>
                </label>
            </div>

            <div class="column">
                <CampoForm type="text" v-show="$i18n.locale=='en'" place="Name" v-model="nombre" :error="msg_error.name" />
                <CampoForm type="text" v-show="$i18n.locale=='es'" place="Nombre" v-model="nombre" :error="msg_error.name" />
                <!-- <input placeholder="Nombre de la aplicacion" type="text" class="input" v-model="nombre" /> -->
            </div>
          
            <div class="field  column has-text-centered">
        
                    <div class="select is-fullwidth">
                        <select class="options is-fullwidth" v-model="visible" value="visible" >
                            <option value="positive">{{$t('app.positivo')}}</option>
                            <option value="negative">{{$t('app.negativo')}}</option>
                        </select>
                    </div>
            </div>

            <div class="column ">
                <div v-show="$i18n.locale=='es'">
                    <textarea class="textarea" v-model="observation" placeholder="Observación"></textarea>
                </div>
                <div v-show="$i18n.locale=='en'">
                    <textarea class="textarea" v-model="observation" placeholder="Observation"></textarea>
                </div>
            </div>
            
            <div class="column ">
                <div class="columns  ">
                    <div class="column  is-flex-grow-0">
                        <button class=" button  has-text-white has-background-danger " type="button" @click="volver" style="font-weight:bold;">{{$t('app.cancel')}}</button>
                    </div>
                    <div class="column   pl-0  ">
                        <button class=" button has-text-white button1 " type="button" @click="validar" style="background-color:#005395; font-weight:bold;">{{$t('app.guardar')}}</button>
                    </div>     
                </div>
            </div>
       <!--  </div>  -->
        </form> 
    </div>
    
    <div v-show="isMobile==true">
        <form action="" class="column has-text-centered  mt-5 ml-6">

  <!--       <div class="column has-text-centered  mt-5 ml-6"> -->

            <div class="column has-text-centered blue-crenein">
               <h2 style="font-size:1.5em; font-weight:bold;" >{{$t('app.agregarApp')}}</h2>
            </div>    
            
            <div class="column  label ">Logo</div>
            <div class="column  " style="font">
                    <img class=" iamge  imgred" width="200" height="200" src="https://bulma.io/images/placeholders/128x128.png">
            </div>
         
            <div class="file columns has-name is-right">
                <label class="column file-label">
                    <input class="file-input" type="file"   name="resume" @change="selectFile($event)">
                    <span class="file-cta">
                    <span class="file-icon">
                        <i class="fas fa-upload"></i>
                    </span>
                    <span class="file-label">
                        {{$t('app.escogeArchivo')}}
                    </span>
                    </span>
                    <span class="file-name">
                       {{nombreImg ? nombreImg :'Screen Shot 2017-07-29 at 15.54.25.png'}}
                    </span>
                </label>
            </div>

            <div class="column">
                <CampoForm type="text" :place="$i18n.locale=='en' ? 'Name':'Nombre'" v-model="nombre" :error="msg_error.name" />
               <!--  <input placeholder="Nombre de la aplicacion" type="text" class="input" v-model="nombre" /> -->
            </div>

            <div class="field  column has-text-centered">
        
                <div class="select is-fullwidth">
                    <select class="options is-fullwidth" v-model="visible" value="Visible">
                        <option value="positive">{{$t('app.positivo')}}</option>
                        <option value="negative">{{$t('app.negativo')}}</option>
                    </select>
                </div>
            </div>

            <div class="column ">
                <div v-show="$i18n.locale=='es'">
                    <textarea class="textarea" v-model="observation" placeholder="Observación"></textarea>
                </div>
                <div v-show="$i18n.locale=='en'">
                    <textarea class="textarea" v-model="observation" placeholder="Observation"></textarea>
                </div>
            </div>
            <div class="column">
                <button class=" button has-text-white button1 " type="button" @click="validar" style="background-color:#005395; font-weight:bold;">{{$t('app.guardar')}}</button>
            </div>  
            <div class="column">
                <button class="button  button1 has-text-white has-background-danger " type="button" @click="volver" style="font-weight:bold;">{{$t('app.cancel')}}</button>
            </div>
     <!--    </div>       -->        
        </form>
    </div>


</template>

<script>
import CampoForm from '../../components/CampoForm.vue'
import { inject } from '@vue/runtime-core'
/* import Action from '../../components/Modals/ActionsModal.vue' */
import {ref} from '@vue/reactivity'
import { useRouter } from 'vue-router';
import i18n from '@/i18n.js'
import {GraphQLClient, request as fetchGQL} from 'graphql-request';
import store from '@/store';
export default {
    name:'AddApp',
    components: {
        CampoForm,
       
    }, 
    setup(){
        const endpoint = store.state.url_backend
        const router = useRouter()
        const isMobile = inject('isMobile')
        const activo = ref(false)
        const observation = ref('')
        const nombre = ref('')
        const visible = ref('positive')
        const logo = ref('')
        const imagen = ref('')
        const nombreImg = ref('')
        const imgUrl = ref([])
        const nuevo_app = ref(false)
        const subiendo_imagen = ref(false)
       /*  const url_storage = store.state.url_storage */
        const path = ref('');
        const msg_error = ref({ name: ''})

        const validar = () => {

          /*console.log(nombre.value)
            console.log(observation.value)
            console.log(logo.value)
            console.log(visible.value) */
            msg_error.value.name = ''
        
            if (nombre.value == ""){
                if(i18n.global.locale == 'en'){
                    msg_error.value.name = 'Name is required'
                }
                if(i18n.global.locale == 'es'){
                    msg_error.value.name = 'El nombre es requerido'
                }
                
            } 
            if (msg_error.value.name == ''){
                registrarApp()
            } else {
                console.log('no paso')
                // Saltar los errores
            } 

        }


        const Activar = () => {
            activo.value = !activo.value
            console.log(activo.value)
        }
        const volver = () => {
            router.push({name: 'AppDashboard'}) 
        }
      
        const selectFile = (e) => {
            imagen.value = e.target.files[0]
        /*     message_error.value.imagen_error = ''
            if (imagen.value.type.includes('jpg') || imagen.value.type.includes('jpeg') || imagen.value.type.includes('png')) {
                if (imagen.value.size < 16000000) {
                    SubirImage()
                } else {
                    subiendo_imagen.value = false
                    message_error.value.imagen_error = 'El Archivo es muy pesado, asegurese de subir un archivo menor de 16MB'
                }
            } else {
                message_error.value.imagen_error = 'Solo se puede subir jpg, jpeg, png'
            } */

         /*    console.log(file) */
            nombreImg.value = e.target.files[0].name
            logo.value = nombreImg.value

        }

        const SubirImage = () => {
            // console.log(imagen.value)
            subiendo_imagen.value = true
            const client = new GraphQLClient(endpoint)
            client.rawRequest(/* GraphQL */ `
                mutation($file: Upload!) {
                    uploadFile(file: $file)
                }`,
                {
                    file: imagen.value
                },
                {
                    authorization: `Bearer ${ localStorage.getItem('user_token') }`
                }
            ).then((data) => {
                // console.log(data.data.uploadFile)
                path.value = data.data.uploadFile
                nuevo_app.value = true
                subiendo_imagen.value = false
                imagen_url.value = url_storage + path.value
                // registrar()
            })
            .catch(error => {
                // console.log(error)
                nuevo_app.value = false
                subiendo_imagen.value = false
            })
        }

        const registrarApp = () => {
            const client = new GraphQLClient(endpoint) // creamos la consulta para usarlo luego
            // Estructura FetchQL(url, query, variable, opcions)
            client.rawRequest(/* GraphQL */ `
            mutation($observation:String, $name:String!,$logo:String,$visible:Visible!){
              		createsUse_app (input:{
                    name: $name,
                    logo: $logo,
                    visible: $visible,
                    observation: $observation,
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
                let accion = "cargarApp"
                store.commit('verificar_carga',accion) 
            }).catch(error => {
                console.log(error.response);
            })
        }

        return{   
            validar,
            msg_error ,
            path,
            nuevo_app ,
            subiendo_imagen,
            SubirImage,
            imagen,
            nombreImg,
            imgUrl,
            selectFile,
            logo ,
            visible,
            nombre,
            registrarApp,
            observation,
            volver,
            isMobile,
            activo,
            Activar,
            endpoint
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