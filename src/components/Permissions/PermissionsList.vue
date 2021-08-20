<template>
    <div>
        <button @click="activePermissionApp(data.id)" class="button btn-crenein button-permission-app ">
            <span >{{data.app}} permissions</span>
            <span class="icon is-small">
                <i class="fas fa-chevron-down"></i>
            </span>
        </button>
        <ActionPermission v-if="isTablet" :data="data"
            @onActivePermissionApp="activePermissionApp"
            @onActiveList="activeList"
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
            'onActiveList',
            'onMoveAvailableToAssigned',
            'onMoveAssignedToAvailable',
            'onMoveAllAvailableToAssigned',
            'onMoveAllAssignedToAvailable',
            ],

    setup(props,{emit}) {
        const isTablet = inject('isTablet')
        const activePermissionApp = (id) => {
            emit("onActivePermissionApp",id)
        }

        const activeList = (app, permission) => {
            emit("onActiveList",app, permission)
        }

        const moveAvailableToAssigned = ( appId, permissionId, permissionIdAvailable) => {
            emit("onMoveAvailableToAssigned", appId, permissionId, permissionIdAvailable)
        }

        const moveAssignedToAvailable = (appId, permissionId, permissionIdAvailable) => {
            emit("onMoveAssignedToAvailable", appId, permissionId, permissionIdAvailable)
        }

        const moveAllAvailableToAssigned = (id_app, id_permission) => {
            emit("onMoveAllAvailableToAssigned", id_app, id_permission)
        }

        const moveAllAssignedToAvailable = (id_app, id_permission) => {
            emit("onMoveAllAssignedToAvailable", id_app, id_permission)
        }

        return {
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

.button-permission-app {
    width: 100%;
}
@media (max-width: 768px) {
    .button-permission-app {
        margin: 2px 0;
    }
}
@media (max-width: 425px) {
    .button-permission-app {
        width: 100%;
    }
}

</style>
