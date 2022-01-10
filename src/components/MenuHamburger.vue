<template>
    <a @click="OpenMenuNavbar" role="button" class="navbar-burger" :class="{'is-active':active}" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
    </a>
</template>

<script>
import { ref } from '@vue/reactivity'
import store from '@/store'
import { watchEffect } from '@vue/runtime-core'

export default {
    name: 'MenuHamburger',

    setup() {
        const active = ref(false)

        const OpenMenuNavbar = () => {
            store.commit('setActiveMenuMovile')
        }

        watchEffect(() => {
            active.value = store.state.active_menu_movile
        })

        return {
            OpenMenuNavbar, active
        }
    }
}
</script>

<style>

</style>