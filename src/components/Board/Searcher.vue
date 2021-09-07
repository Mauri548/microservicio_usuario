<template>
    <!-- <form action=""> -->
        <div class="field">
            <div v-if="$i18n.locale=='en'"> 
                <p class="control has-icons-right">
                    <input @keyup.enter="searching" class="input" v-model="text" type="text" placeholder="Search">
                    <span class="icon is-small is-right">
                        <i class="fas fa-search"></i>
                    </span>
                </p>
            </div>
            <div v-if="$i18n.locale=='es'"> 
                <p class="control has-icons-right">
                    <input @keyup.enter="searching" class="input" v-model="text" type="text" placeholder="Buscar">
                    <span class="icon is-small is-right">
                        <i class="fas fa-search"></i>
                    </span>
                </p>
            </div>
        </div>
    <!-- </form> -->
</template>

<script>

import { ref } from '@vue/reactivity'
/* import store from '@/store'
import {  watchEffect } from '@vue/runtime-core' */

export default {
    name: 'Searcher',

    setup() {
        const text = ref('')

       /*  const Lan = ref(false)

        watchEffect(()=>{
            Lan.value = store.state.cambio_lang
        }) */

        const searching = () => {
           /*  console.log('hola') */
            console.log(text.value)
        }
        return {
         /* Lan, */
            text,
            searching,
        }
    }
}
</script>

<style scoped>
input {
    border-radius: 25px;
}

</style>