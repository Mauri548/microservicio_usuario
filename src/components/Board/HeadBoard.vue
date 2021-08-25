<template>
    <div class="columns is-align-items-center">
        <ShowRows />
        
        <div class="column has-text-centered">
            <!-- <input type="text" placeholder="Search .."> -->
            <Searcher/>
        </div>
        <div class="column has-text-right">
            <div v-show="Lan==true">
                <button v-if="buttonDefault" @click="push" class="button btn-crenein">+ Agregar</button>
                <slot></slot>
                <button class="button btn-crenein">Mas opciones</button>
            </div>

            <div v-show="Lan==false">
                <button v-if="buttonDefault" @click="push" class="button btn-crenein">+ Add</button>
                <slot></slot>
                <button class="button btn-crenein">More options</button>
            </div>
     
        </div>
    </div>
</template>

<script>
import ShowRows from './ShowRows.vue'
import Searcher from './Searcher.vue'
import { useRouter } from 'vue-router'
import { ref } from '@vue/reactivity'
import store from '@/store'
import {  watchEffect } from '@vue/runtime-core'

export default {
    name: 'HeadBoard',
    components: {
        ShowRows,
        Searcher,
    },
    props: {
        namePath: String,
        buttonDefault: {
            type: Boolean,
            default: true
        }
    },

    setup(props) {
        const router = useRouter()
        console.log(props.buttonDefault)
        const Lan = ref(false)

        watchEffect(()=>{
            Lan.value = store.state.cambio_lang
        })
        const push = () => {
            router.push({name: props.namePath})
        }

        return {
            Lan,
            push
        }
    }
}
</script>

<style scoped>

.columns {
    display: flex;
}

@media (max-width: 425px) {
    .columns {
        flex-direction: column;
    }
}

</style>