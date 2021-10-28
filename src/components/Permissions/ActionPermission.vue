<template>
    <transition name="actionPermission" mode="out-in">
        <div v-if="data.activo" class="contenedor">
            <div style="margin: auto">
                <div class="conteiner-body my-4">
                    <div>
                        <div class="conteiner-head has-background-light p-2">
                            <h3 class="has-text-centered">Title</h3>
                        </div>
                        <div class="column is-flex is-flex-wrap-wrap is-align-items-center" style="border: 1px solid #cccccc78">
                            <div class="columns is-flex w-100" style="margin: 0">
                                <div class="permissions-available">
                                    <SelectPermission @onMovePermission="asignarPermisos" :appId="data.id" 
                                        :title="$i18n.locale=='en'? 'Availables': 'Disponibles'" :assigned="false" >
                                        <option v-for="item in data.permissions" :key="item.id" 
                                        v-show="!item.activo" :value="item.id">{{item.key}}</option>
                                    </SelectPermission>
                                </div>
                                <div class="buttons-action-permission mt-5">
                                    <button @click="moveAvailableToAssigned()" class="button my-1">
                                        <i class="fas fa-angle-right"></i>
                                    </button>
                                    <button @click="moveAssignedToAvailable()" class="button my-1">
                                        <i class="fas fa-angle-left"></i>
                                    </button>
                                    <button @click="moveAllAvailableToAssigned(data.id)" class="button my-1">
                                        <i class="fas fa-angle-double-right"></i>
                                    </button>
                                    <button @click="moveAllAssignedToAvailable(data.id)" class="button my-1">
                                        <i class="fas fa-angle-double-left"></i>
                                    </button>
                                </div>
                                <div class=" permissions-assigned">
                                    <SelectPermission  @onMovePermission="asignarPermisos" :appId="data.id" 
                                        :title="$i18n.locale=='en'? 'Assigneds': 'Asignados'" :assigned="true">
                                        <option v-for="item in data.permissions" :key="item.id" 
                                        v-show="item.activo" :value="item.id">{{item.key}}</option>
                                    </SelectPermission>
                                </div>
                            </div>
                        </div>

                        <div class="column is-flex is-justify-content-flex-end px-0">
                            <button class="button btn-crenein" @click="savePermission(data.id)">Guardar cambios</button>
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
            'onMoveAvailableToAssigned',
            'onMoveAssignedToAvailable',
            'onMoveAllAvailableToAssigned',
            'onMoveAllAssignedToAvailable',
            'onSavePermission'
            ],
    setup(props,{emit}) {
        /**
         * 
         * Variables para almacenar las id de los datos que se van a pasar en la tabla
         * 
         */
        const permissionIdAvailable = ref()
        const appId = ref(99999)

        const activePermissionApp = (id) => {
            emit("onActivePermissionApp",id)
        }

        const asignarPermisos = (permission, appID) => {
            permissionIdAvailable.value = permission
            appId.value = appID
        }

        // emite la accion de mover los item de la lista available a assigned
        const moveAvailableToAssigned = () => {
            emit("onMoveAvailableToAssigned", appId.value, permissionIdAvailable.value)
        }

        // emite la accion de mover los item de la lista assigned a available
        const moveAssignedToAvailable = () => {
            emit("onMoveAssignedToAvailable", appId.value, permissionIdAvailable.value)
        }

        // emite la accion de mover todos los items de la lista de available a assigned
        const moveAllAvailableToAssigned = (id_app) => {
            emit("onMoveAllAvailableToAssigned", id_app)
        }

        // emite la accion de mover todos los items de la lista de assigned a available
        const moveAllAssignedToAvailable = (id_app) => {
            emit("onMoveAllAssignedToAvailable", id_app)
        }

        const savePermission = (id_app) => {
            console.log('save')
            console.log('id_app: ' + id_app)
            emit("onSavePermission", id_app)
            console.log('aaa')
        }

        return {
            permissionIdAvailable,
            activePermissionApp,
            moveAvailableToAssigned,
            moveAssignedToAvailable,
            moveAllAvailableToAssigned,
            moveAllAssignedToAvailable,
            asignarPermisos,
            savePermission,
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