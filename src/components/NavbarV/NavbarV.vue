<template>
  



    <div v-show="isMobile==false">
        <div class="columns  is-mobile">
            <div class="column is-flex-grow-0  has-text-left ml-5 mt-5">
                <ButtonMenu  @click="Act()" nombre="Home" class="mt-2" />
                <ButtonMenu  @click="Act()" nombre="Personal info" class="mt-2" />
                <ButtonMenu  @click="Act()" nombre="Permissions management" class="mt-2" />
                <ButtonMenuDesp @click="Des()"  :desplegar="avisar" class="mt-2"  />
            </div>
         <!--    <div class="column mx-6 mt-5 " >
                <PersonalForm  />
            </div> -->
        </div>
    </div>
    <div v-show="isMobile==true">
        

            <div class="column btns is-flex-grow-0  has-text-left" style="padding:0;">
                <ButtonMenu  @click="Act()" nombre="Home" class="button1 mt-2" />
                <ButtonMenu  @click="Act()" nombre="Personal info" class="button1 mt-2" />
                <ButtonMenu  @click="Act()" nombre="Permissions management" class="button1 mt-2" />
                <ButtonMenuDesp @click="Des()"  :desplegar="avisar" class="button1 mt-2 "  />
            </div>

            <!-- <div class="column  " > -->
               <!--  <PersonalForm  /> -->
           <!--  </div> -->
        
    </div>
   
        

</template>

<script>

import ButtonMenu from '../../components/Buttons/ButtonMenu.vue'
import ButtonMenuDesp from '../../components/Buttons/ButtonMenuDesp.vue'
/* import PersonalForm from '../../components/PersonalInfo/PersonalForm.vue' */
import {ref} from '@vue/reactivity' 
import { inject } from '@vue/runtime-core'


export default {
    name:'NavbarV',
    components: {
        ButtonMenu,
        ButtonMenuDesp,
       /*  PersonalForm, */
    },
    setup(){
        const avisar = ref(true)
        const isMobile = inject('isMobile')
        const Act = () => {
          
            avisar.value = false
            console.log(avisar)
        }
         const Des = () => {
          
            avisar.value = true
            console.log(avisar)
        }
        console.log(avisar)
        return {
            Des,
            avisar,
            Act,
            isMobile
        }
    } 
}
</script>

<style scoped>


.button1 {

    display:flex;
}
.btns{
    display:inline-flex;
    width:100%;
    overflow-x: hidden;
}

@media screen and (max-width: 1000px) {

   .btns{
        overflow-x: scroll;
        width:100%;
    }
    
}

</style>