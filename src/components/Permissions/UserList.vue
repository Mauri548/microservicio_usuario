<template>
    <div class="has-text-centered">
        <h3 class="fondo-crenein has-text-white py-1">{{$t('user.usuarios')}}</h3>
        <ul>
            <li v-for="user in users" :key="user.id" 
             :class="{'active': user.activo}"
             @click="selectUser(user.id)"
            >
                <a>{{user.name}}</a>
            </li>
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
    emits: ['onChangeUserSelected'],
    setup(props,{emit}){
        const Lan = ref(false)
        watchEffect(()=>{
            Lan.value = store.state.cambio_lang
        })

        const selectUser = (id) => {
            console.log(id)
            emit("onChangeUserSelected", id)
        }

        return{
            Lan, 
            selectUser
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

li.active {
    /* color: #fff; */
    background-color: #005395;
}

li.active > a {
    color: #fff;
}


</style>