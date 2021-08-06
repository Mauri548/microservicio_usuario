<template>
    <div class="conteiner-tablero mt-2 py-4">
        <div class="head-tablero">
            <TitleBoard title="Permissions" />
            <hr>
        </div>
        <div class="columns m-0 mx-2">
            <div class="column is-3">
                <UserList/>
            </div>
            <div class="column">
                <PermissionsList/>
            </div>
        </div>
    </div>
</template>

<script>
import TitleBoard from '../../components/Board/TitleBoard.vue'
import UserList from '../../components/Permissions/UserList.vue'
import PermissionsList from '../../components/Permissions/PermissionsList.vue'
export default {
    components: {
        TitleBoard,
        UserList,
        PermissionsList
    }
}
</script>

<style scoped>



</style>