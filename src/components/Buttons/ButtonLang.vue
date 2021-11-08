<template>
  
    <div>

        <div class="select blue-crenein has-text-weight-semibold">
            <select  v-model="$i18n.locale"> <!--  con el v-model capturamos la opcion seleccionada y lo asignamos al atributo de locale -->
                    <option 
                        v-for="(lang,i) in langs"
                        :key="`lang-${i}`"
                        :value="lang.id">
                        {{lang.lan}}
                    </option> <!-- recorro una lista de objetos langs con id y el lenguaje que queremos seleccionar -->
            </select>
        </div>
    
    </div>

</template>

<script>
import {ref} from '@vue/reactivity'
import i18n from '@/i18n.js' 
import { watchEffect } from '@vue/runtime-core'

export default {
    name:'ButtonLang',
    setup(){
        const langs = ref([{id:'es',lan:'Español'},{id:'en',lan:'English'}])
        let langStorage = window.localStorage

        watchEffect(()=>{

            langStorage.setItem('lang',i18n.global.locale)

            console.log(langStorage.getItem('lang'))
        })

        return{ 
            langs
        }
    },

}
</script>

<style>

</style>