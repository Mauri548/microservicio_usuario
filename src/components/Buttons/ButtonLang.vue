<template>
  
  <div>
      <!-- <button @click="cambiarLang" class="button blue-crenein has-text-weight-semibold">{{language}}</button> -->

        <div class="select mb-2 blue-crenein has-text-weight-semibold">
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

export default {
    name:'ButtonLang',
    data(){
        return {
           /*  langs: ['es','en'], */
            langs: [{id:'es',lan:'Español'},{id:'en',lan:'English'}]
        }
    },

}
</script>

<style>

</style>