<template>
    <div class="has-text-centered">
        <h3 class="fondo-crenein has-text-white py-1">{{$t('user.usuarios')}}</h3>
        <ul>
            <li v-for="user in users" :key="user.id" >
                <a>{{user.name}}</a>
            </li>
            <!-- <li><a>Mauri</a></li>
            <li><a>Mauri</a></li>
            <li><a>Mauri</a></li>
            <li><a>Mauri</a></li>
            <li><a>Mauri</a></li>
            <li><a>Mauri</a></li> -->
        </ul>
    </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import store from '@/store'
import {  watchEffect } from '@vue/runtime-core'
export default {
    name: 'UserList',
    props: ['users'],
    setup(){
        const Lan = ref(false)
        watchEffect(()=>{
            Lan.value = store.state.cambio_lang
        })
        return{
            Lan
        }
    }

}
</script>

<style scoped>
li {
    border: 1px solid #ccc;
    padding: 4px
}
li:hover {
    background: #cccccc4a;
    cursor: pointer;
}
li a {
    color: black
}
</style>