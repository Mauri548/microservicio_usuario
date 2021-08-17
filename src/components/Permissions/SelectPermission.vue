<template>
    <div style="height: 100%">
        <p class="has-text-centered has-text-weight-semibold">{{title}}:</p>
        <div class="select is-multiple w-100" style="height: 100%">
            <select class="w-100" multiple size="5" style="height: 89%" v-model="permission_id" >
                <slot></slot>
            </select>
        </div>
    </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { watch } from '@vue/runtime-core'
export default {
    name: 'SelectPermission',
    props: ['data','title','assigned','appId'],
    emits: ['onMovePermission'],

    setup(props,{emit}) {
        const permission_id = ref([])

        watch(permission_id, () => {
            emit("onMovePermission",permission_id.value, props.data.id, props.appId)
        })


        const mostrar_permisos = () => {
            console.log(permission_id.value)
        }

        return {
            permission_id,
            mostrar_permisos
        }
    }
}
</script>

<style>

</style>