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