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
                    <CampoForm   type="text" place="Correo" />
                    <CampoForm   type="text" place="Nombre completo"/>
                    <CampoForm   type="password" place="Contraseña"/> 
                </div>
                <div v-show="$i18n.locale=='en'">
                    <CampoForm   type="text" place="Email" />
                    <CampoForm   type="text" place="Full name"/>
                    <CampoForm   type="password" place="Password"/> 
                </div>
            </div>
            
            <div class="column ">
                <div class="columns  ">
                    <div class="column  is-flex-grow-0">
                        <button class=" button  has-text-white has-background-danger " @click="volver"  style="font-weight:bold;">{{$t('personalForm.cancel')}}</button>
                    </div>
                    <div class="column   pl-0  ">
                        <button class=" button has-text-white button1 "   style="background-color:#005395; font-weight:bold;">{{$t('personalForm.guardar')}}</button>
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
                <CampoForm   type="text" place="Email" />
                <CampoForm   type="text" place="Full name"/>
                <CampoForm   type="password" place="Password"/> 
            </div>
            <div class="column    ">
                <button class=" button has-text-white button1 "  style="background-color:#005395; font-weight:bold;">Save</button>
            </div>  
            <div class="column  ">
                <button class=" button  button1 has-text-white has-background-danger " @click="volver" style="font-weight:bold;">Cancel</button>
            </div> 
                      
        </form>
    </div>


</template>

<script>
import { useRouter } from 'vue-router';
import CampoForm from '../../components/CampoForm.vue'
import { inject } from '@vue/runtime-core'
import {ref} from '@vue/reactivity'
export default {
    name:'PersonalForm',
    components: {
        CampoForm,
    }, 
 
    setup(){
        const router = useRouter()
        const isMobile = inject('isMobile')
        const activo = ref(false)
        


 


        const Activar = () => {
            activo.value = !activo.value
            console.log(activo.value)
        }
        const volver = () => {
            router.go(-1)
        }


        return{ 
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