<template>
    <div v-show="data.activo" class="contenedor">
        <div style="width: 80%; margin: auto">
            <div v-for="permission in data.permissions" :key="permission.name" class="conteiner-body my-4">
                <div>
                    <div @click="activarHeader(data,permission)" class="conteiner-head has-background-light p-2">
                        <h3 class="has-text-centered">{{permission.name}} ({{permission.permissions_activo}}/{{permission.total}})</h3>
                    </div>
                    <div v-if="permission.activo" class="column is-flex is-flex-wrap-wrap is-align-items-center" style="border: 1px solid #cccccc78">
                        <div class="columns w-100" style="margin: 0">
                            <div class="permissions-available">
                                <SelectPermission @onMovePermission="asignarPermisos" :appId="data.id" :data="permission" title="Available" :assigned="false" >
                                    <option v-for="item in permission.lista" :key="item.id" 
                                    v-show="!item.activo" :value="item.id">{{item.name}}</option>
                                </SelectPermission>
                            </div>
                            <div class="buttons-action-permission mt-5">
                                <button @click="moveAvailableToAssigned" class="button my-1">
                                    <i class="fas fa-angle-right"></i>
                                </button>
                                <button @click="moveAssignedToAvailable" class="button my-1">
                                    <i class="fas fa-angle-left"></i>
                                </button>
                                <button @click="moveAllAvailableToAssigned(data.id,permission.id)" class="button my-1">
                                    <i class="fas fa-angle-double-right"></i>
                                </button>
                                <button @click="moveAllAssignedToAvailable(data.id,permission.id)" class="button my-1">
                                    <i class="fas fa-angle-double-left"></i>
                                </button>
                            </div>
                            <div class=" permissions-assigned">
                                <SelectPermission  @onMovePermission="asignarPermisos" :appId="data.id" :data="permission" title="Assigned" :assigned="true">
                                    <option v-for="item in permission.lista" :key="item.id" 
                                    v-show="item.activo" :value="item.id">{{item.name}}</option>
                                </SelectPermission>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import Searcher from '../Board/Searcher.vue'
import ButtonIcon from '../Buttons/ButtonIcon.vue'
import PermissionsItem from './PermissionsItem.vue'
import SelectPermission from './SelectPermission.vue'
export default {
    name: 'ActionPermission',
    components: {
        Searcher,
        ButtonIcon,
        PermissionsItem,
        SelectPermission,
    },
    props: ['data'],
    emits: ['onActiveButton',
            'onActivePermissionApp',
            'onActiveList',
            'onMoveAvailableToAssigned',
            'onMoveAssignedToAvailable',
            'onMoveAllAvailableToAssigned',
            'onMoveAllAssignedToAvailable'
            ],
    setup(props,{emit}) {
        const permissionIdAvailable = ref()
        const permissionId = ref(999999)
        const appId = ref(99999)
        const activeButton = (e) => {
            emit("onActiveButton",e)
        }

        const activePermissionApp = (id) => {
            emit("onActivePermissionApp",id)
        }

        // Funcion que pasa al padre el id de la app principal y de la lista que le pertenece 
        // Para modificar el valor y visualizar la vista
        const activarHeader = (app, permission) => {
            emit("onActiveList", app.id, permission.id)
        }

        const asignarPermisos = (permission, id, appID) => {
            permissionIdAvailable.value = permission
            permissionId.value = id
            appId.value = appID
        }

        // emite la accion de mover los item de la lista available a assigned
        const moveAvailableToAssigned = () => {
            emit("onMoveAvailableToAssigned", appId.value, permissionId.value, permissionIdAvailable.value)
        }

        // emite la accion de mover los item de la lista assigned a available
        const moveAssignedToAvailable = () => {
            emit("onMoveAssignedToAvailable", appId.value, permissionId.value, permissionIdAvailable.value)
        }

        // emite la accion de mover todos los items de la lista de available a assigned
        const moveAllAvailableToAssigned = (id_app, id_permission) => {
            emit("onMoveAllAvailableToAssigned", id_app, id_permission)
        }

        // emite la accion de mover todos los items de la lista de assigned a available
        const moveAllAssignedToAvailable = (id_app, id_permission) => {
            emit("onMoveAllAssignedToAvailable", id_app, id_permission)
        }

        return {
            permissionIdAvailable,
            activeButton,
            activePermissionApp,
            activarHeader,
            moveAvailableToAssigned,
            moveAssignedToAvailable,
            moveAllAvailableToAssigned,
            moveAllAssignedToAvailable,
            asignarPermisos,
        }
    }
}
</script>

<style scoped>
.permissions-assigned, .permissions-available {
    width: 40%;
}
.buttons-action-permission {
    display: flex;
    flex-direction: column;
    align-items: center;
    align-content: center;
    width: 20%;
}
.buttons-action-permission button {
    width: 50px;
}


.contenedor {
    width: 100%;
    transition: 0.9s ease;
}
.conteiner-head {
    display: flex;
    justify-content: center;
    align-items: center;
}
.conteiner-head .buttons, .conteiner-head .buttons .button {
    margin-bottom: 0;
}
.conteiner-head input {
    width: 40%;
}
.conteiner-head h3 {
    width: 20%;
}
.conteiner-body div .conteiner-head:hover {
    cursor: pointer;
}

.color-succes {
    background: #28A745;
}
.button-permission-app {
    width: 100%;
}

@media (max-width: 670px) {
    .button-permission-app {
        width: 60%;
    }
}
@media (max-width: 425px) {
    .button-permission-app {
        width: 100%;
    }
}

</style>