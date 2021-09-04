<template>
  
  <div>
      <!-- <button @click="cambiarLang" class="button blue-crenein has-text-weight-semibold">{{language}}</button> -->

        <div class="select mb-2 blue-crenein has-text-weight-semibold">
            <select  v-model="$i18n.locale"> 
                    <option 
                        v-for="(lang,i) in langs"
                        :key="`lang-${i}`"
                        :value="lang.id">
                        {{lang.lan}}
                    </option>
            </select>
        </div>
       <!--  <div class="select">
            <select>
                <option>Select dropdown</option>
                <option>With options</option>
            </select>
        </div> -->
 



  </div>

</template>

<script>

/* import { ref } from '@vue/reactivity'
import store from '@/store'

 */
export default {
    name:'ButtonLang',
    data(){
        return {
           /*  langs: ['es','en'], */
            langs: [{id:'es',lan:'Español'},{id:'en',lan:'English'}]
        }
    },

    /* emits:['pasarLan'], */

    setup(){
   /*      const language = ref("English")
        const cambiar = ref("false")


        const cambiarLang = () => {
            if( language.value == "English"){
                language.value = "Español"
                store.commit('cambiarLan')
                cambiar.value = store.state.cambio_lang
                
                
            }else{
                language.value = "English"
                store.commit('cambiarLan')
                cambiar.value = store.state.cambio_lang
              
            }
        }
        return { 
            cambiar,
            cambiarLang,
            language
        } */
    }
}
</script>

<style>

</style>