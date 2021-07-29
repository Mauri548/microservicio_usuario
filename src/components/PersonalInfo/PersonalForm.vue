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
            
            <div class="column ">
                <div class="columns  ">
                    <div class="column  is-flex-grow-0">
                        <button class=" button  has-text-white has-background-danger " style="font-weight:bold;">Cancel</button>
                    </div>
                    <div class="column   pl-0  ">
                        <button class=" button has-text-white button1 "  @click="Activar" style="background-color:#005395; font-weight:bold;">Save</button>
                    </div>     
                </div>
            </div>
        </form>
    </div>
    
    <div v-show="isMobile==true">
        <form action="" class="column mt-1">
            <div class="columns ">
                <div class="column  label ">Avatar</div>
                <div class="column  " style="font">
                        <img class=" iamge  imgred" width="200" height="200" src="https://bulma.io/images/placeholders/128x128.png">
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
                        Choose a file…
                    </span>
                    </span>
                    <span class="file-name">
                    Screen Shot 2017-07-29 at 15.54.25.png
                    </span>
                </label>
            </div>
            <div class="column ">
                <CampoForm  type="text" place="Email" />
                <CampoForm   type="text" place="Full name"/>
                <CampoForm   type="password" place="Password"/> 
            </div>
            <div class="column    ">
                <button class=" button has-text-white button1 "  style="background-color:#005395; font-weight:bold;">Save</button>
            </div>  
            <div class="column  ">
                <button class=" button  button1 has-text-white has-background-danger "  style="font-weight:bold;">Cancel</button>
            </div>
                      
        </form>
    </div>


   <!--  <Action activo=activo /> -->

</template>

<script>
import CampoForm from '../../components/CampoForm.vue'
import { inject } from '@vue/runtime-core'
/* import Action from '../../components/Modals/ActionsModal.vue' */
import {ref} from '@vue/reactivity'

export default {
    name:'PersonalForm',
    components: {
        CampoForm,
       /*  Action */
    }, 
    setup(){
        const isMobile = inject('isMobile')
        const activo = ref(false)

        const Activar = () => {
            activo.value = !activo.value
            console.log(activo.value)
        }

        return{ 
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