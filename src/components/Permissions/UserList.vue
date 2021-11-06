<template>
    <div class="has-text-centered">
        <h3 class="fondo-crenein has-text-white py-1">{{$t('user.usuarios')}}</h3>
        <ul>
            <li class="label-user" v-for="user in users" :key="user.id" 
             :class="{'active': user.activo}"
             @click="selectUser(user.id)"
            >
                <a class="label-user-text">{{user.name}}</a>
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
.label-user {
    border-bottom: 1px solid #ccc;
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
    padding: 4px;
}

.label-user:hover {
    background: #cccccc4a;
    cursor: pointer;
}

.label-user-text {
    color: black
}

.label-user.active {
    background-color: #0771c6;
}

.label-user.active > .label-user-text {
    color: #fff;
}


</style>