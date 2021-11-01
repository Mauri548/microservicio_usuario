<template>

   <div v-show="isMobile==false">
        <form action="" class="column is-half is-offset-one-quarter mt-1 is-mobile" style="width:600px">   
            <div class="column ">
                <div class="columns">
                    <div class="column  has-text-left label ">Avatar</div>
                    <div class="column  ">
                        <figure class="image is-128x128">
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
                        {{$t('personalForm.escogeArchivo')}}
                    </span>
                    </span>
                    <span class="file-name">
                    Screen Shot 2017-07-29 at 15.54.25.png
                    </span>
                </label>
            </div>

            <div class="column ">
                <div v-show="$i18n.locale=='es'">
                    
                    <CampoForm   type="text" v-model="passVieja" place="Contraseña vieja" :error="msg_error.oldPass"/> 
                    <CampoForm   type="text" v-model="passNueva" place="Contraseña nueva" :error="msg_error.newPass"/>  
                    <CampoForm   type="text" v-model="passConfirm" place="Confirmar contraseña" :error="msg_error.confirmPass"/>  
                </div>
                <div v-show="$i18n.locale=='en'">
                    
                    <CampoForm   type="text" v-model="passVieja" place="Old password" :error="msg_error.oldPass"/> 
                    <CampoForm   type="text" v-model="passNueva" place="New password" :error="msg_error.newPass"/> 
                    <CampoForm   type="text" v-model="passConfirm" place="Confirm Password" :error="msg_error.confirmPass"/> 
                </div>
            </div>
            
            <div class="column ">
                <div class="columns  ">
                    <div class="column  is-flex-grow-0">
                        <button class=" button  has-text-white has-background-danger " @click="volver"  style="font-weight:bold;">{{$t('personalForm.cancel')}}</button>
                    </div>
                    <div class="column   pl-0  ">
                        <button class="button has-text-white button1" type="button" @click="validar" style="background-color:#005395; font-weight:bold;">{{$t('personalForm.guardar')}}</button>
                    </div>     
                </div>
            </div>
        </form>
    </div>
    
    <div v-show="isMobile==true">
        <form action="" class="column has-text-centered  mt-5 ml-6"  >
           
                <div class="label column ">Avatar</div>
                <div class="column ml-1" >
                        <img class=" image  imgred" width="200" height="200" src="https://bulma.io/images/placeholders/128x128.png">
                </div>
           

            <div class="file columns  has-name  is-right">
                <label class="column file-label">
                    <input class="file-input" type="file" name="resume">
                    <span class="file-cta">
                    <span class="file-icon">
                        <i class="fas fa-upload"></i>
                    </span>
                    <span class="file-label">
                        Choose a file…
                    </span>
                    </span>
                    <span class="file-name">
                    Screen Shot 2017-07-29 at 15.54.25.png
                    </span>
                </label>
            </div> 



            <div class="column ">
                <div v-show="$i18n.locale=='es'">
                    <CampoForm   type="text" v-model="passVieja" place="Contraseña vieja" :error="msg_error.oldPass"/> 
                    <CampoForm   type="text" v-model="passNueva" place="Contraseña nueva" :error="msg_error.newPass"/>  
                    <CampoForm   type="text" v-model="passConfirm" place="Confirmar contraseña" :error="msg_error.confirmPass"/>  
                </div>
                <div v-show="$i18n.locale=='en'">
                    <CampoForm   type="text" v-model="passVieja" place="Old password" :error="msg_error.oldPass"/> 
                    <CampoForm   type="text" v-model="passNueva" place="New password" :error="msg_error.newPass"/> 
                    <CampoForm   type="text" v-model="passConfirm" place="Confirm Password" :error="msg_error.confirmPass"/> 
                </div>
            </div>
            <div class="column    ">
                <button class=" button has-text-white button1 "  type="button" @click="validar" style="background-color:#005395; font-weight:bold;">{{$t('personalForm.guardar')}}</button>
            </div>  
            <div class="column  ">
                <button class=" button  button1 has-text-white has-background-danger " @click="volver" style="font-weight:bold;">{{$t('personalForm.cancel')}}</button>
            </div> 
                      
        </form>
    </div>


</template>

<script>
import { useRouter } from 'vue-router';
import CampoForm from '../../components/CampoForm.vue'
import { inject } from '@vue/runtime-core'
import {ref} from '@vue/reactivity'
import {GraphQLClient} from 'graphql-request';
import store from '@/store';
import i18n from '@/i18n.js'
import FetchMe from '../../helper/FetchMe'

export default {
    name:'PersonalForm',
    components: {
        CampoForm,
    }, 
 
    setup(){
        const router = useRouter()
        const isMobile = inject('isMobile')
        const activo = ref(false)
        const passVieja = ref("")
        const passNueva = ref("")
        const passConfirm = ref("")
        const endpoint = store.state.url_backend
        const msg_error = ref({ oldPass: '',newPass: '',confirmPass: ''})
        FetchMe()



        const validar = () => {
            msg_error.value.oldPass = ''
            msg_error.value.newPass = ''
            msg_error.value.confirmPass = ''

            if (passVieja.value == ""){
                if(i18n.global.locale == 'en'){
                    msg_error.value.oldPass = 'Old password is required'
                }
                if(i18n.global.locale == 'es'){
                    msg_error.value.oldPass = 'La contraseña vieja es requerido'
                }
            } 
            
            if (passNueva.value == ""){
                if(i18n.global.locale == 'en'){
                    msg_error.value.newPass = 'New password is required'
                }
                if(i18n.global.locale == 'es'){
                    msg_error.value.newPass = 'La contraseña nueva es requerido'
                }
            } 
            
            if (passConfirm.value == ""){
                if(i18n.global.locale == 'en'){
                    msg_error.value.confirmPass = 'Confirm Password is required'
                }
                if(i18n.global.locale == 'es'){
                    msg_error.value.confirmPass = 'Se requiere confirmar la contraseña nueva'
                }
            } 



            if (msg_error.value.oldPass == '' && msg_error.value.newPass == '' && msg_error.value.confirmPass == ''){
                console.log("Paso las validaciones")
                updatePassword()
            } else {
                console.log('no paso')
            } 
        }



        const updatePassword = () => {
            const client = new GraphQLClient(endpoint)
            client.rawRequest(/* GraphQL */ `
            mutation($old_password:String!,$password:String!, $password_confirmation:String!){
              		updatePassword(input:{
                        old_password:$old_password,
                        password:$password,
                        password_confirmation: $password_confirmation
                    }){
                        status
                        message
                    }
            }`,
            {
                old_password:passVieja.value,
                password:passNueva.value,
                password_confirmation: passConfirm.value
            },
            {
               authorization: `Bearer ${localStorage.getItem('user-token')}` 
            })
            .then((data) => {
                /* router.push({name: 'AppDashboard'}) 
                let accion = "cargarApp"
                store.commit('verificar_carga',accion)  */

                console.log("Se actualizo con exito")
                console.log(data.data.updatePassword.message)

            }).catch(error => {
                console.log(error.response);
            })

        }




        const Activar = () => {
            activo.value = !activo.value
            console.log(activo.value)
        }
        const volver = () => {
            router.go(-1)
        }


        return{ 
            validar,
            msg_error,
            updatePassword,
            passVieja,
            passNueva,
            passConfirm, 
            isMobile,
            activo,
            Activar,
            volver 
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