<template>
  
    <div v-show="isMobile==false">
        <div class="columns is-mobile">
            <div class="column is-flex-grow-0  has-text-left ml-5 ">
                <ButtonMenu  @click="Act()" nombre="Home" class="mt-2" />
                <ButtonMenu  @click="Act()" nombre="Personal info" class="mt-2" />
                <ButtonMenu  @click="Act()" nombre="Permissions management" class="mt-2" />
                <ButtonMenuDesp @click="Des()"  :desplegar="avisar" class="mt-2"  />
            </div>
        </div>
    </div>
    <div v-show="isMobile==true">
        <div class="column">
            <div class="column is-flex-grow-0  has-text-left mx-5 mt-5">
                <ButtonMenu  @click="Act()" nombre="Home" class="mt-2" />
                <ButtonMenu  @click="Act()" nombre="Personal info" class="mt-2" />
                <ButtonMenu  @click="Act()" nombre="Permissions management" class="mt-2" />
                <ButtonMenuDesp @click="Des()"  :desplegar="avisar" class="mt-2 "  />
            </div>
            <div class="column  " >
               <!--  <PersonalForm  /> -->
            </div>
        </div>
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

<style >




</style>