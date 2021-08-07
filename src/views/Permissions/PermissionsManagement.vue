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
                <PermissionsList v-for="data in datas" :key="data.id" :data="data"
                 @onActiveButton="activeButton"
                 @onActivePermissionApp="activePermissionApp"
                 @onActiveList="activeList"
                />
                <!-- @onActiveButton="activeButton" -->
            </div>
        </div>
    </div>
</template>

<script>
import TitleBoard from '../../components/Board/TitleBoard.vue'
import UserList from '../../components/Permissions/UserList.vue'
import PermissionsList from '../../components/Permissions/PermissionsList.vue'
import { ref } from '@vue/reactivity'
export default {
    components: {
        TitleBoard,
        UserList,
        PermissionsList
    },

    setup() {
        const datas = ref([
            {id: 1, app: 'PuWiC', activo: false, permissions: [
                {id: 1, name: 'Client list', total: 7, permissions_activo: 0, activo: false, lista: [
                    {id: 1, name: 'See list', activo: false},
                    {id: 2, name: 'Add client', activo: false},
                    {id: 3, name: 'See customer file', activo: false},
                    {id: 4,name: 'Export client', activo: false},
                    {id: 5,name: 'Archive client', activo: false},
                    {id: 6, name: 'See customer file', activo: false},
                    {id: 7, name: 'tag individually', activo: false},
                ]},
                {id: 2, name: 'Mail', total: 2, permissions_activo: 0, activo: false, lista: [
                    {id: 1, name: 'Create email', activo: false},
                    {id: 2, name: 'Send email', activo: false},
                ]},
                {id: 3, name: 'Sms', total: 11, permissions_activo: 0, activo: false, lista: [
                    {id: 1, name: 'Prueba1', activo: false},
                    {id: 2, name: 'Prueba2', activo: false},
                    {id: 3, name: 'Prueba3', activo: false},
                    {id: 4, name: 'Prueba4', activo: false},
                    {id: 5, name: 'Prueba5', activo: false},
                    {id: 6, name: 'Prueba6', activo: false},
                    {id: 7, name: 'Prueba7', activo: false},
                    {id: 8, name: 'Prueba8', activo: false},
                    {id: 9, name: 'Prueba9', activo: false},
                    {id: 10, name: 'Prueba10', activo: false},
                    {id: 11, name: 'Prueba11', activo: false},
                ]}  
            ]},
            {id: 2, app: 'ISPB', activo: false, permissions: [
                {id: 1, name: 'Client list', total: 7, permissions_activo: 0, activo: false, lista: [
                    {id: 1, name: 'See list', activo: false},
                    {id: 2, name: 'Add client', activo: false},
                    {id: 3, name: 'See customer file', activo: false},
                    {id: 4, name: 'Export client', activo: false},
                    {id: 5, name: 'Archive client', activo: false},
                    {id: 6, name: 'See customer file', activo: false},
                    {id: 7, name: 'tag individually', activo: false},
                ]},
                {id: 2, name: 'Mail', total: 2, permissions_activo: 0, activo: false, lista: [
                    {id: 1, name: 'Create email', activo: false},
                    {id: 2, name: 'Send email', activo: false},
                ]},
                {id: 3, name: 'Sms', total: 11, permissions_activo: 0, activo: false, lista: [
                    {id: 1, name: 'Prueba1', activo: false},
                    {id: 2, name: 'Prueba2', activo: false},
                    {id: 3, name: 'Prueba3', activo: false},
                    {id: 4, name: 'Prueba4', activo: false},
                    {id: 5, name: 'Prueba5', activo: false},
                    {id: 6, name: 'Prueba6', activo: false},
                    {id: 7, name: 'Prueba7', activo: false},
                    {id: 8, name: 'Prueba8', activo: false},
                    {id: 9, name: 'Prueba9', activo: false},
                    {id: 10, name: 'Prueba10', activo: false},
                    {id: 11, name: 'Prueba11', activo: false},
                ]} 
            ]},
            {id: 3, app: 'Geston', activo: false, permissions: [
                {id: 1, name: 'Client list', total: 7, permissions_activo: 0, activo: false, lista: [
                    {id: 1, name: 'See list', activo: false},
                    {id: 2, name: 'Add client', activo: false},
                    {id: 3, name: 'See customer file', activo: false},
                    {id: 4, name: 'Export client', activo: false},
                    {id: 5, name: 'Archive client', activo: false},
                    {id: 6, name: 'See customer file', activo: false},
                    {id: 7, name: 'tag individually', activo: false},
                ]},
                {id: 2, name: 'Mail', total: 2, permissions_activo: 0, activo: false, lista: [
                    {id: 1, name: 'Create email', activo: false},
                    {id: 2, name: 'Send email', activo: false},
                ]},
                {id: 3, name: 'Sms', total: 11, permissions_activo: 0, activo: false, lista: [
                    {id: 1, name: 'Prueba1', activo: false},
                    {id: 2, name: 'Prueba2', activo: false},
                    {id: 3, name: 'Prueba3', activo: false},
                    {id: 4, name: 'Prueba4', activo: false},
                    {id: 5, name: 'Prueba5', activo: false},
                    {id: 6, name: 'Prueba6', activo: false},
                    {id: 7, name: 'Prueba7', activo: false},
                    {id: 8, name: 'Prueba8', activo: false},
                    {id: 9, name: 'Prueba9', activo: false},
                    {id: 10, name: 'Prueba10', activo: false},
                    {id: 11, name: 'Prueba11', activo: false},
                ]} 
            ]}
        ])

        const activeButton = (data) => {
            console.log(data)
            let aux = datas.value.find(element => element.id == data.appId)
            let permission = aux.permissions.find(element => element.id == data.permissionID)
            aux = permission.lista.find(element => element.id == data.itemID)
            aux.activo = data.valor
            console.log(permission)
            data.valor ? permission.permissions_activo+= 1 : permission.permissions_activo -= 1
            
        }

        const activePermissionApp = (id) => {
            let aux = datas.value.find(element => element.id == id)
            console.log(aux)
            aux.activo = !aux.activo
        }

        // Modifica el valor para que se visualize el tablero con los permisos activables
        const activeList = (id_app, id_permission) => {
            let aux = datas.value.find(element => element.id == id_app)
            let aux2 = aux.permissions.find(element => element.id == id_permission)
            aux2.activo = !aux2.activo
        }

        return {
            datas,
            activeButton,
            activePermissionApp,
            activeList,
        }
    }
}
</script>

<style scoped>



</style>