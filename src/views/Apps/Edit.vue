<template>
    
    <div class="conteiner-edit-app">
        <form class="column has-text-centered mt-5 form-app">
            <div class="column has-text-centered blue-crenein">
               <h2 style="font-size:1.5em; font-weight:bold;" >{{$t('app.editarApp')}}</h2>
            </div>    

            <div class="column  label">Logo</div>
            <div class="column" style="font">
                <img class=" iamge  imgred" width="200" height="200" src="https://bulma.io/images/placeholders/128x128.png">
            </div>
            
            <div class="file columns has-name  is-right">
                <label class="column file-label">
                    <input class="file-input" type="file"  @change="selectFile($event)" name="resume">
                    <span class="file-cta">
                    <span class="file-icon">
                        <i class="fas fa-upload"></i>
                    </span>
                    <span class="file-label">
                         {{$t('app.escogeArchivo')}}
                    </span>
                    </span>
                    <span class="file-name input-img">
                     {{nombreImg ? nombreImg :'Screen Shot 2017-07-29 at 15.54.25.png'}}
                    </span>
                </label>
            </div>

             <div class="column">
                <CampoForm type="text" :place="$i18n.locale=='en' ? 'Name':'Nombre'" v-model="nombre" :error="msg_error.name" />
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
                <textarea class="textarea" v-model="observation" :placeholder="$i18n.locale=='es'? 'Observación': 'Observation'"></textarea>
            </div>

            <div class="column is-flex is-grouped is-justify-content-space-between">
                <button class="button button-cancel has-text-white has-background-danger" type="button" @click="volver" style="font-weight:bold;">{{$t('app.cancel')}}</button>
                <button class="button has-text-white button-confirm " type="button" @click="validar" style="background-color:#005395; font-weight:bold;">{{$t('app.guardar')}}</button>
            </div>
            
        </form>
    </div>

</template>

<script>
import { useRouter,useRoute } from 'vue-router';
import CampoForm from '../../components/CampoForm.vue'
import { inject } from '@vue/runtime-core'
/* import Action from '../../components/Modals/ActionsModal.vue' */
import {ref} from '@vue/reactivity'
import store from '@/store';
import { GraphQLClient } from 'graphql-request'
import i18n from '@/i18n.js'

export default {
    name:'EditApp',
      components: {
        CampoForm,
       
    }, 
    created(){
        this.traerApp()
    },
    setup(){
        const endpoint = store.state.url_backend
        const router = useRouter()
        const route = useRoute()
        const isMobile = inject('isMobile')
        const activo = ref(false)
        const id = ref(null);
        const observation = ref('')
        const nombre = ref('')
        const visible = ref('positive')
        const logo = ref('')
        const imagen = ref('')
        const nombreImg = ref('')
        const imgUrl = ref([])
        const nuevo_app = ref(false)
        const subiendo_imagen = ref(false)
        const path = ref('');
        const msg_error = ref({ name: ''})


        const Activar = () => {
            activo.value = !activo.value
        }
        const volver = () => {
            router.push({name: 'AppDashboard'})
        }

        const validar = () => {

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
                modificarApp()
            } else {
                console.log('no paso')
                // Saltar los errores
            } 

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

        const modificarApp = () => {
            const client = new GraphQLClient(endpoint) // creamos la consulta para usarlo luego
            // Estructura FetchQL(url, query, variable, opcions)
            client.rawRequest(/* GraphQL */ `
            mutation($company_user_id:ID!,$id:ID!,$observation:String, $name:String!,$logo:String,$visible:Visible!){
              	modifiesUse_app (company_user_id:$company_user_id,id: $id, input: {
                    name: $name,
                    logo:  $logo,
                    observation: $observation,
                    visible:  $visible,
                }) {
                    id
                    name
                    logo
                    observation
                    visible
                }
            }`,
            {
                company_user_id:localStorage.getItem('user_company_id'),
                id: id.value,
                name: nombre.value,       
                observation: observation.value,
                logo: logo.value,
                visible: visible.value,
            },
            {
               /*  authorization: `Bearer ${ localStorage.getItem('user_token') }` */
            })
            .then((data) => {
                let accion = "edicionApp"
                store.commit('verificar_carga',accion)
                router.push({name: 'AppDashboard'})
            }).catch(error => {
                console.log(error.response);
            })
        }




        const traerApp = () => {
             const client = new GraphQLClient(endpoint) // creamos la consulta para usarlo luego
            // Estructura FetchQL(url, query, variable, opcions)
            client.rawRequest(/* GraphQL */ `
            query($id:ID) {
                    app(id: $id) {
                        id
                        name
                        logo
                        observation
                        visible
                    }
                }
            `,
            {
               id : route.params.id
            },
            {
               authorization: `Bearer ${ localStorage.getItem('user-token') }` 
            })
            .then((data) => {
              /*   console.log(data.data.app) */
                let app = data.data.app
                id.value = app.id
                observation.value = app.observation
                nombre.value = app.name
                visible.value =  app.visible
                logo.value = app.logo
                nombreImg.value = app.logo
             /*    console.log(observation.value,"\n",nombre.value,"\n",visible.value,"\n",logo.value) */

            }).catch(error => {
                console.log(error.response);
            })
        }


        return{ 
            msg_error ,
            validar,
            modificarApp,
            traerApp,
            observation,
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
            id,
            volver,
            isMobile,
            activo,
            Activar
         }
    }
}
</script>

<style scoped>

.imgred{
    border-radius: 100px;
}

.form-app {
    margin: auto;
}

.input-img {
    margin: auto
}

.button-confirm {
    width: 65%;
    margin-left: 6px;
}

.button-cancel {
    width:35%
}

.conteiner-edit-app {
    width: 100%;
}

@media screen and (max-width: 1200px) {
 
.button1{
    width: 100%; /* The width is 100%, when the viewport is 800px or smaller */
  }
}

@media (min-width: 1024px) {
    .conteiner-edit-app {
        width: 80%;
    }
    .form-app {
        width: 50%;
    }
}
</style>