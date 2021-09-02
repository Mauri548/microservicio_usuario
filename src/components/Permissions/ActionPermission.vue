<template>
    <transition name="actionPermission" mode="out-in">
        <div v-if="data.activo" class="contenedor">
            <div style="margin: auto">
                <div v-for="permission in data.permissions" :key="permission.name" class="conteiner-body my-4">
                    <div>
                        <div @click="activarHeader(data,permission)" class="conteiner-head has-background-light p-2">
                            <h3 class="has-text-centered">{{permission.name}} ({{permission.permissions_activo}}/{{permission.total}})</h3>
                        </div>
                        <div v-if="permission.activo" class="column is-flex is-flex-wrap-wrap is-align-items-center" style="border: 1px solid #cccccc78">
                            <div class="columns is-flex w-100" style="margin: 0">
                                <div class="permissions-available">
                                    <SelectPermission @onMovePermission="asignarPermisos" :appId="data.id" :data="permission" title="Available" :assigned="false" >
                                        <option v-for="item in permission.lista" :key="item.id" 
                                        v-show="!item.activo" :value="item.id">{{item.name}}</option>
                                    </SelectPermission>
                                </div>
                                <div class="buttons-action-permission mt-5">
                                    <button @click="moveAvailableToAssigned(permission.id)" class="button my-1">
                                        <i class="fas fa-angle-right"></i>
                                    </button>
                                    <button @click="moveAssignedToAvailable(permission.id)" class="button my-1">
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
    </transition>
</template>

<script>
import { ref } from '@vue/reactivity'
import Searcher from '../Board/Searcher.vue'
import ButtonIcon from '../Buttons/ButtonIcon.vue'
import SelectPermission from './SelectPermission.vue'
export default {
    name: 'ActionPermission',
    components: {
        Searcher,
        ButtonIcon,
        SelectPermission,
    },
    props: ['data'],
    emits: ['onActivePermissionApp',
            'onActiveList',
            'onMoveAvailableToAssigned',
            'onMoveAssignedToAvailable',
            'onMoveAllAvailableToAssigned',
            'onMoveAllAssignedToAvailable'
            ],
    setup(props,{emit}) {
        // Variables para almacenar las id de los datos que se van a pasar en la tabla
        const permissionIdAvailable = ref()
        const permissionId = ref(999999)
        const appId = ref(99999)

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
        const moveAvailableToAssigned = (clave) => {
            if (clave == permissionId.value) {
                emit("onMoveAvailableToAssigned", appId.value, permissionId.value, permissionIdAvailable.value)
            }
        }

        // emite la accion de mover los item de la lista assigned a available
        const moveAssignedToAvailable = (clave) => {
            if (clave == permissionId.value) {
                emit("onMoveAssignedToAvailable", appId.value, permissionId.value, permissionIdAvailable.value)
            }
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
    padding: .75rem;
}
.conteiner-head {
    display: flex;
    justify-content: center;
    align-items: center;
}
.conteiner-head .buttons, .conteiner-head .buttons .button {
    margin-bottom: 0;
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

/* actionPermission transitions */

.actionPermission-enter-from, .actionPermission-leave-to {
    opacity: 0;
    /* transform: translateY(20px) */
    transform: scale(.6);
}
/* .actionPermission-enter-to, .actionPermission-leave-from {
    opacity: 1;
} */
.actionPermission-enter-active {
    transition: all .3s ease;
}
.actionPermission-leave-active {
    transition: all .3s ease;
}



</style>