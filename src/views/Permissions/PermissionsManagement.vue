<template>
    <div class="conteiner-tablero mt-2 mb-4 py-4">

        <!-- Titulo del tablero -->
        <div  class="head-tablero">
            <div v-if="$i18n.locale=='es'">
                <TitleBoard title="Permisos"/>
                <hr>
            </div>
            <div v-if="$i18n.locale=='en'">
                <TitleBoard title="Permissions"/>
                <hr>
            </div>
        </div>


        <div class="columns m-0 mx-2">
            <div class="column is-3">
                <!-- Lista de usuarios -->
                <UserList :users="users"/>
            </div>
            <div class="conteiner-permissions">
                <div class="column buttons-permission">
                    <!-- Botones de los permisos de las App contratada -->
                    <PermissionsList v-for="data in datas" :key="data.id" :data="data"
                        @onActivePermissionApp="activePermissionApp"
                        @onActiveList="activeList"
                        @onMoveAvailableToAssigned="moveAvailableToAssigned"
                        @onMoveAssignedToAvailable="moveAssignedToAvailable"
                        @onMoveAllAvailableToAssigned="moveAllAvailableToAssigned"
                        @onMoveAllAssignedToAvailable="moveAllAssignedToAvailable"
                    />
                </div>
                <div v-if="!isTablet">
                    <!-- Lista de permisos para asignar o deshabilitar -->
                    <ActionPermission v-for="data in datas" :key="data.id" :data="data"
                        @onActivePermissionApp="activePermissionApp"
                        @onActiveList="activeList"
                        @onMoveAvailableToAssigned="moveAvailableToAssigned"
                        @onMoveAssignedToAvailable="moveAssignedToAvailable"
                        @onMoveAllAvailableToAssigned="moveAllAvailableToAssigned"
                        @onMoveAllAssignedToAvailable="moveAllAssignedToAvailable"
                    />
                </div>
            </div>
            
        </div>
    </div>
</template>

<script>
import TitleBoard from '../../components/Board/TitleBoard.vue'
import UserList from '../../components/Permissions/UserList.vue'
import PermissionsList from '../../components/Permissions/PermissionsList.vue'
import ActionPermission from '../../components/Permissions/ActionPermission.vue'
import { ref } from '@vue/reactivity'
import store from '@/store'
import {  watchEffect } from '@vue/runtime-core'
import { inject } from '@vue/runtime-core'
import { GraphQLClient } from 'graphql-request'
export default {
    components: {
        TitleBoard,
        UserList,
        PermissionsList,
        ActionPermission,
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
                    {id: 6, name: 'See customer fileses', activo: false},
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
            ]},
        ])
        const users = ref([])
        const isTablet = inject('isTablet')
        const company_id = ref(store.state.company_id)
        const endpoint = store.state.url_backend

        const traerUsersxCompany = () => {
            console.log(company_id.value)
            const client = new GraphQLClient(endpoint)
            client.rawRequest(/* GraphQL */ `
            query($company_id:ID){
                company(id:$company_id) {
                    users {
                        id
                        name
                    }
                }
            }`,
            {
                company_id:company_id.value
            })
            .then((data) => {
                console.log(data)
                users.value = []
                /* console.log(data.data.company) */
                data.data.company.users.forEach(element => {
                    users.value.push({id:element.id, nombre: element.name ,activo: false})
                })
            }).catch(error => console.log(error))
        }

        watchEffect(() => {
            traerUsersxCompany()
        })


        // ************************************************************************************
        // Estas functiones moveran el permiso al sector contrario de la tabla

        // recibe por parametro las id de la app, el permiso principal y su lista de items
        const moveAvailableToAssigned = (id_app, id_permission, permissions) => {
            let aux = searchListPermission(id_app, id_permission)
            let permiso
            // Si el id de la lista existe dentro del array de permission entonces cambiaremos su valor
            permissions.forEach(element => {
                permiso = aux.lista.find(e => e.id == element)
                permiso.activo = true
            })
        }

        // recibe por parametro las id de la app, el permiso principal y su lista de items
        const moveAssignedToAvailable = (id_app, id_permission, permissions) => {
            let aux = searchListPermission(id_app, id_permission)
            let permiso
            // Si el id de la lista existe dentro del array de permission entonces cambiaremos su valor
            permissions.forEach(element => {
                permiso = aux.lista.find(e => e.id == element)
                permiso.activo = false
            })
        }

        // Recibe por parametro la id de la app y el id de permiso principal
        // Cambia el valor de activo de todos los elemento a True para que se pasen a la lista de assigned
        const moveAllAvailableToAssigned = (id_app, id_permission) => {
            let aux = searchListPermission(id_app, id_permission)
            aux.lista.forEach(element => {
                element.activo = true
            })
        }

        // Recibe por parametro la id de la app y el id de permiso principal
        // Cambia el valor de activo de todos los elemento a False para que se pasen a la lista de Available
        const moveAllAssignedToAvailable = (id_app, id_permission) => {
            let aux = searchListPermission(id_app, id_permission)
            aux.lista.forEach(element => {
                element.activo = false
            })
        }

        // buscamos la app correspondiente y luego el permiso principal al que corresponde las id
        const searchListPermission = (id_app, id_permission) => {
            let aux = datas.value.find(element => element.id == id_app)
            aux = aux.permissions.find(element => element.id == id_permission)
            return aux
        }
        // ************************************************************************************************

        const activePermissionApp = (id) => {
            datas.value.forEach(element => {
                element.activo = false
                // element.id == id ? element.activo = !element.activo : element.activo = false
            })
            let aux = datas.value.find(element => element.id == id)
            // Esperamos 3 milisegundo para hacer que se visualice el msj de exito
            setTimeout(() => {
                aux.activo = true
            },300)
        }


        // Modifica el valor para que se visualize el tablero con los permisos activables
        const activeList = (id_app, id_permission) => {
            let aux = datas.value.find(element => element.id == id_app)
            let aux2 = aux.permissions.find(element => element.id == id_permission)
            aux2.activo = !aux2.activo
        }

        return {
            datas,
            users,
            isTablet,
            activePermissionApp,
            activeList,
            moveAvailableToAssigned,
            moveAssignedToAvailable,
            moveAllAvailableToAssigned,
            moveAllAssignedToAvailable,
        }
    }
}
</script>

<style scoped>

.conteiner-permissions {
    width: 56%;
    margin: 0 auto
}
.buttons-permission {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

@media (max-width: 768px) {
    .conteiner-permissions {
        width: 100%;
    }
    .buttons-permission {
        flex-direction: column;
    }
}
/* @media (max-width: 425px) {
    .buttons-permission {
        justify-content: left;
        overflow-x: scroll;
    }
} */

</style>