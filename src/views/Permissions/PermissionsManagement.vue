<template>
    <div class="conteiner-tablero mt-2 mb-4 py-4">

        <!-- Titulo del tablero -->
        <div  class="head-tablero">
            <TitleBoard :title="$i18n.locale=='en'? 'Permissions' : 'Permisos'" />
            <hr>
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
import { watchEffect } from '@vue/runtime-core'
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

        const datas = ref([])
        const users = ref([])
        const isTablet = inject('isTablet')
        const endpoint = store.state.url_backend

        const traerUsersxCompany = (id) => {
            const client = new GraphQLClient(endpoint)
            client.rawRequest(/* GraphQL */ `
            query($company_id:ID){
                company(id:$company_id) {
                    users {
                        id, name
                    }
                }
            }`,
            {
                company_id: id
            })
            .then((data) => {
                users.value = []
                data.data.company.users.forEach(element => {
                    users.value.push({id:element.id, name: element.name ,activo: false})
                })
            })
            // .catch(error => console.log(error))
        }

        const traerSubscriptionsxCompany = (id) => {
            const client = new GraphQLClient(endpoint)
            client.rawRequest(/* GraphQL */`
            query($company_id: ID){
                subscriptionsxcompany(first: 999, page: 1, company_id: $company_id) {
                    data {
                        use_app_id,
                        app {
                            name
                        }
                    }
                }
            }`,
            {
                company_id: id
            })
            .then((data) => {
                datas.value = []
                data.data.subscriptionsxcompany.data.forEach(app => {
                    datas.value.push({id: app.use_app_id, app: app.app.name, activo: false, permissions: []})
                    traerPermitsxApp(app.use_app_id)
                })
                // console.log(datas.value)
            })
            // .catch(error => console.log(error.response))
        }

        const traerPermitsxApp = async (id) => {
            const client = new GraphQLClient(endpoint)
            client.rawRequest(/* GraphQL */`
            query($app_id: ID) {
                permitsxapp(app_id: $app_id) {
                    id, key
                }
            }`,
            {
                app_id: id
            })
            .then((data) => {
                let aux = datas.value.find(app => app.id == id)
                data.data.permitsxapp.forEach(permit => {
                    aux.permissions.push({id: permit.id, key: permit.key, activo: false})
                })
            })
            // .catch(error => console.log(error))
            
        }

        /**
         * Hay un retraso en esta consulta.. intentar mejorarla luego
         */
        watchEffect(() => {
            store.state.company_id
            if (localStorage.getItem('id_company_selected')) {
                // console.log(localStorage.getItem('id_company_selected'))
                traerUsersxCompany(localStorage.getItem('id_company_selected'))
                traerSubscriptionsxCompany(localStorage.getItem('id_company_selected'))
            }
        })


        // ************************************************************************************
        // Estas functiones moveran el permiso al sector contrario de la tabla

        /**
         * 
         * Mueve los permisos de Asignados a Disponibles
         * 
         * @param id_app Es el id de la applicación que tiene el permiso actual
         * @param permissions Es un arreglo con el id de los permisos seleccionados
         * 
         */
        const moveAvailableToAssigned = (id_app, permissions) => {
            movePermits(id_app, permissions, true)

        }

        /**
         * 
         * Mueve los permisos de Disponibles a Asignados
         * 
         * @param id_app Es el id de la applicación que tiene el permiso actual
         * @param permissions Es un arreglo con el id de los permisos seleccionados
         * 
         */
        const moveAssignedToAvailable = (id_app, permissions) => {
            movePermits(id_app, permissions, false)
        }

        /**
         * 
         * Mueve los permisos seleccionado de una tabla a otra
         * 
         * @param id_app Es el id de la applicación que tiene el permiso actual
         * @param permissions Es un arreglo con el id de los permisos seleccionados
         * @param value Es un booleano para pasar un permiso de activo o no
         * 
         */
        const movePermits = (id_app, permissions, value) => {
            let aux = searchApp(id_app)
            permissions.forEach(element => {
                let permiso = aux.permissions.find(permit => permit.id == element)
                permiso.activo = value
            })
        }

        /**
         * 
         * Emits que mueve TODOS los permisos de Asignados a Disponible
         * 
         * @param id_app Es el id de la applicación que tiene el permiso actual
         * 
         */
        const moveAllAvailableToAssigned = (id_app) => {
            moveAllPermits(id_app, true)
        }

        /**
         * 
         * Emits que mueve TODOS los permisos de Disponible a Asignados
         * 
         * @param id_app Es el id de la applicación que tiene el permiso actual
         * 
         */
        const moveAllAssignedToAvailable = (id_app) => {
            moveAllPermits(id_app, false)
        }

        /**
         * 
         * Mueve TODOS los permisos de una tabla a otra
         * 
         * @param id_app Es el id de la applicación que tiene el permiso actual
         * @param value Es un booleano para pasar un permiso de activo o no
         */
        const moveAllPermits = (id_app, value) => {
            let aux = searchApp(id_app)
            aux.permissions.forEach(element => {
                element.activo = value
            })
        }


        /**
         * 
         * Buscamos la app correspondiente y se la devolvemos
         * 
         * @param id_app Es el id de la app que se desea buscar
         * 
         */
        const searchApp = (id_app) => {
            let aux = datas.value.find(element => element.id == id_app)
            return aux
        }


        const activePermissionApp = (id) => {
            datas.value.forEach(element => {
                element.activo = false
            })
            let aux = datas.value.find(element => element.id == id)

            /**
             * 
             * Esperamos 3 milisegundo para hacer que se visualice el msj de exito
             * Es para el efecto de animación
             * 
             */
            setTimeout(() => {
                aux.activo = true
            },300)
        }

        return {
            datas,
            users,
            isTablet,
            activePermissionApp,
            moveAvailableToAssigned,
            moveAssignedToAvailable,
            moveAllAvailableToAssigned,
            moveAllAssignedToAvailable,
            movePermits
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