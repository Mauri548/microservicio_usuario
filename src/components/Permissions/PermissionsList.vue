<template>
    <div class="prueba">
        <button @click="activePermissionApp(data.id)" class="button btn-crenein button-permission-app ">
            <span >{{data.app}}</span>
            <span class="icon is-small">
                <i class="fas fa-chevron-down"></i>
            </span>
        </button>

        <!-- Lista de permisos para asignar o deshabilitar -->
        <ActionPermission v-if="isTablet" :data="data"
            @onActivePermissionApp="activePermissionApp"
            @onMoveAvailableToAssigned="moveAvailableToAssigned"
            @onMoveAssignedToAvailable="moveAssignedToAvailable"
            @onMoveAllAvailableToAssigned="moveAllAvailableToAssigned"
            @onMoveAllAssignedToAvailable="moveAllAssignedToAvailable"
        />
    </div>
</template>

<script>
import ActionPermission from '../../components/Permissions/ActionPermission.vue'
import { inject } from '@vue/runtime-core'
export default {
    name: 'PermissionsList',
    components: {
        ActionPermission
    },
    props: ['data'],
    emits: ['onActivePermissionApp',
            'onMoveAvailableToAssigned',
            'onMoveAssignedToAvailable',
            'onMoveAllAvailableToAssigned',
            'onMoveAllAssignedToAvailable',
            ],

    setup(props,{emit}) {
        const isTablet = inject('isTablet')

        // Activamos el boton para mostrar la lista de permiso de esa app
        const activePermissionApp = (id) => {
            emit("onActivePermissionApp",id)
        }

        // emitimos la accion de mover un elemento de la lista
        const moveAvailableToAssigned = ( appId, permissionId, permissionIdAvailable) => {
            emit("onMoveAvailableToAssigned", appId, permissionId, permissionIdAvailable)
        }

        // emitimos la accion de mover un elemento de la lista
        const moveAssignedToAvailable = (appId, permissionId, permissionIdAvailable) => {
            emit("onMoveAssignedToAvailable", appId, permissionId, permissionIdAvailable)
        }

        // emitimos la accion de mover todos los elementos de la lista
        const moveAllAvailableToAssigned = (id_app, id_permission) => {
            emit("onMoveAllAvailableToAssigned", id_app, id_permission)
        }

        // emitimos la accion de mover todos los elementos de la lista
        const moveAllAssignedToAvailable = (id_app, id_permission) => {
            emit("onMoveAllAssignedToAvailable", id_app, id_permission)
        }

        return {
            isTablet,
            activePermissionApp,
            moveAvailableToAssigned,
            moveAssignedToAvailable,
            moveAllAvailableToAssigned,
            moveAllAssignedToAvailable,
        }
    }
}
</script>

<style scoped>
.prueba {
    width: 33%;
}
.button-permission-app {
    width: 100%;
}
@media (max-width: 768px) {
    .button-permission-app {
        margin: 2px 0;
    }
    .prueba {
        width: 100%;
    }
}
@media (max-width: 425px) {
    .button-permission-app {
        width: 100%;
    }
}

</style>
