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
                <UserList :users="users"
                 @onChangeUserSelected="changeUserSelected"
                />
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
                        @onSavePermission="savePermission"
                    />
                </div>
                <div v-if="!isTablet">
                    <!-- Lista de permisos para asignar o deshabilitar -->
                    <ActionPermission v-for="data in datas" :key="data.id" :data="data"
                        :isLoading="loadingSave"
                        @onActivePermissionApp="activePermissionApp"
                        @onMoveAvailableToAssigned="moveAvailableToAssigned"
                        @onMoveAssignedToAvailable="moveAssignedToAvailable"
                        @onMoveAllAvailableToAssigned="moveAllAvailableToAssigned"
                        @onMoveAllAssignedToAvailable="moveAllAssignedToAvailable"
                        @onSavePermission="savePermission"
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
import { watch, watchEffect } from '@vue/runtime-core'
import { inject } from '@vue/runtime-core'
import { GraphQLClient } from 'graphql-request'
import createPermission from '../../helper/createPermission'
import removePermission from '../../helper/removePermission'

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
        const userSelected = ref('')
        const userPermission = ref([])
        const loadingSave = ref(false)

        const generalQuery = (id) => {
            const client = new GraphQLClient(endpoint)
            client.rawRequest(/* GraphQL */`
            query($id: ID) {
                company_user(id: $id) {
                    id
                    use_user_id
                    use_company_id
                    company {
                        users {
                            id
                            name
                        }
                        subscriptions {
                            id
                            use_app_id
                            app {
                                id
                                name
                                permits {
                                    id
                                    key
                                    detail
                                }
                            }
                        }
                    }
                }
            }`,
            {
                id: id
            })
            .then( async (data) => {
                datas.value = []
                await data.data.company_user.company.subscriptions.forEach(app => {
                    datas.value.push({id: app.app.id, app: app.app.name, activo: false, permissions: app.app.permits})
                })
                let user_id = data.data.company_user.use_user_id
                changeUserSelected(user_id)
            })
            .catch(error => console.log(error))
        }

        /**
         * 
         * Trae los usuarios que pertenecen a una empresa
         * 
         * @param id Id de la empresa
         * 
         */
        const traerUsersxCompany = async (id) => {
            const client = new GraphQLClient(endpoint)
            await client.rawRequest(/* GraphQL */ `
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
                data.data.company.users.forEach( async (element) => {
                    users.value.push({id:element.id, name: element.name, user_company_id: '' ,activo: false})
                    fetchUsersCompaniesXUser(element.id)
                })
            })
            return
        }

        watchEffect( async () => {
            store.state.company_id
            if (localStorage.getItem('id_company_selected')) {
                await traerUsersxCompany(localStorage.getItem('id_company_selected'))
                generalQuery(localStorage.getItem('user_company_id'))
            }
        })

        watch(userSelected, async () => {
            if (userSelected.value.user_company_id) {
                await fetchPermissionXCompanyUser(userSelected.value.user_company_id)
                resetPermits()
                changeVisibilityByUser()
            }
        })

        const resetPermits = () => {
            datas.value.forEach(app => {
                app.permissions.forEach(permit => {
                    permit.activo = false
                }) 
            })
        }

        const changeVisibilityByUser = () => {
            userPermission.value.forEach(permit => {
                datas.value.forEach(app => {
                    let aux = app.permissions.find(item => item.id == permit.permit_id)
                    if (aux) {
                        aux.activo = true
                        return
                    }
                })
            })
        }

        /**
         * 
         * Cambia al usuario seleccionado visualmente 
         * 
         * @param id Es el id del usuario seleccionado
         * 
         */
        const changeUserSelected = async (id) => {
            users.value.forEach(user => user.activo = false)
            let aux = users.value.find(user => user.id == id)
            aux.activo = true
            userSelected.value = aux
        }

        const savePermission = async (id_app) => {
            let app = searchApp(id_app)
            let listAssignedPermission = app.permissions.filter(permit => permit.activo == true)
            compareList(listAssignedPermission, userPermission.value)
        }

        /**
         * 
         * Traigo el companyuser_id de cada usuario
         * 
         * @param id id del usuario
         * 
         */
        const fetchUsersCompaniesXUser = (id) => {
            const client = new GraphQLClient(endpoint)
            client.rawRequest(/* GraphQL */`
            query($user_id: ID){
                userscompaniesxuser(first: 999, page: 1, user_id: $user_id) {
                    data {
                        id, use_user_id, use_company_id
                    }
                }
            }`,
            {
                user_id: id
            })
            .then((data) => {
                let user_company_id = data.data.userscompaniesxuser.data.find(el => el.use_company_id == localStorage.getItem('id_company_selected'))
                let aux = users.value.find(user => user.id == id)
                aux.user_company_id = user_company_id.id
            })
            // .catch(error => console.log(error.response))
        }

        /**
         * 2°
         * Traeria los permisos que tiene asignado el usuario
         * 
         * @param id id del user_company
         * 
         */
        const fetchPermissionXCompanyUser = async (id) => {
            const client = new GraphQLClient(endpoint)
            await client.rawRequest(/* GraphQL */`
            query($companyuser_id: ID) {
                permissionsxcompanyuser(first: 999, page: 1, companyuser_id: $companyuser_id) {
                    data {
                        id, use_permit_id, use_company_use_user_id
                    }
                }
            }`,
            {
                companyuser_id: id
            })
            .then((data) => {
                userPermission.value = []
                data.data.permissionsxcompanyuser.data.forEach(item => {
                    userPermission.value.push({ id: item.id, permit_id: parseInt(item.use_permit_id) })
                })
            })
            // .catch(error => console.log(error))
        }

        /**
         * 
         * Compara la lista de permisos asignados y los permisos del usuario
         * Si el permiso existe en ambos no hace nada
         * Si existe solo en el de usuario lo elimina de la lista de usuario
         * si existe en solo en la lista de permiso se agrega a la lista de usuario
         */
        const compareList = async (list1, list2) => {
            loadingSave.value = true
            list1 = list1.map(item => parseInt(item.id))
            list2 = list2.sort((a,b) => a.permit_id - b.permit_id)

            let index1 = 0
            let index2 = 0

            while ((index1 <= list1.length-1) && (index2 <= list2.length-1)) {
                if (list1[index1] == list2[index2].permit_id) {
                    index1 ++
                    index2 ++
                } else if (list1[index1] > list2[index2].permit_id) {
                    await removePermission(list2[index2].id, localStorage.getItem('user_company_id'))
                    index2++
                } else {
                    await createPermission(list1[index1], userSelected.value.user_company_id, localStorage.getItem('user_company_id'))
                    index1++
                }
            }

            if (index1 <= list1.length-1) {
                for (let i = index1; i <= list1.length-1; i++) {
                    await createPermission(list1[i], userSelected.value.user_company_id, localStorage.getItem('user_company_id'))
                }
                index1 = list1.length-1
            }

            if (index2 <= list2.length-1) {
                for (let i = index2; i <= list2.length-1; i++) {
                    await removePermission(list2[i].id, localStorage.getItem('user_company_id'))
                }
                index2 = list2.length-1
            }

            loadingSave.value = false
        }


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
            datas, users, isTablet, loadingSave, 
            activePermissionApp, moveAvailableToAssigned, moveAssignedToAvailable,
            moveAllAvailableToAssigned, moveAllAssignedToAvailable, movePermits,
            changeUserSelected, savePermission
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
</style>