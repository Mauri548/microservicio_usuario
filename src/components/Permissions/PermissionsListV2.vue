<template>
    <div>
        <button @click="activePermissionApp(data.id)" class="button btn-crenein button-permission-app ">
            <span >{{data.app}} permissions</span>
            <span class="icon is-small">
                <i class="fas fa-chevron-down"></i>
            </span>
        </button>
        <!-- <div v-show="data.activo" class="contenedor">
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
                                    <button @click="movePermissions" class="button my-1">
                                        <i class="fas fa-angle-right"></i>
                                    </button>
                                    <button class="button my-1">
                                        <i class="fas fa-angle-left"></i>
                                    </button>
                                    <button class="button my-1">
                                        <i class="fas fa-angle-double-right"></i>
                                    </button>
                                    <button class="button my-1">
                                        <i class="fas fa-angle-double-left"></i>
                                    </button>
                                </div>
                                <div class=" permissions-assigned">
                                    <SelectPermission v-model="permissionIdAvailable" :data="permission" title="Assigned" :assigned="true">
                                        <option v-for="item in permission.lista" :key="item.id" 
                                        v-show="item.activo" :value="item.id">{{item.name}}</option>
                                    </SelectPermission>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> -->
    </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import Searcher from '../Board/Searcher.vue'
import ButtonIcon from '../Buttons/ButtonIcon.vue'
import PermissionsItem from './PermissionsItem.vue'
import SelectPermission from './SelectPermission.vue'
export default {
    name: 'PermissionsListV2',
    components: {
        Searcher,
        ButtonIcon,
        PermissionsItem,
        SelectPermission,
    },
    props: ['data'],
    emits: ['onActiveButton','onActivePermissionApp','onActiveList','onMovePermission'],
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

        
        const movePermissions = () => {
            console.log(permissionIdAvailable.value)
            console.log(permissionId.value)
            emit("onMovePermission", appId.value, permissionId.value, permissionIdAvailable.value)
        }

        return {
            permissionIdAvailable,
            activeButton,
            activePermissionApp,
            activarHeader,
            movePermissions,
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
    position: absolute;
    left: 0;
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




.switch-button {
    display: inline-block;
}

.switch-button .switch-button__checkbox {
    display: none;
}
.switch-button .switch-button__label {
    background-color: #fff;
    border: 1px solid #ccc;
    width: 4rem;
    height: 2rem;
    /* border-radius: 3rem; */
    border-radius: 5px;
    display: inline-block;
    position: relative;
}
.switch-button .switch-button__label:before {
    transition: .2s;
    display: block;
    position: absolute;
    width: 2rem;
    height: 1.9rem;
    background-color: red;
    content: '';
    /* border-radius: 50%; */
    border-radius: 5px;
}
.switch-button .switch-button__checkbox:checked + .switch-button__label {
    background-color:#48c774;
    border: 1px solid #48c774
}
.switch-button .switch-button__checkbox:checked + .switch-button__label:before {
    transform: translateX(2rem);
}

</style>
