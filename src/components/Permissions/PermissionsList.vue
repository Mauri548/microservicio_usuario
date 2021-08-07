<template>
    <div>
        <button @click="activePermissionApp(data.id)" class="button btn-crenein">
            <span>{{data.app}} permissions</span>
            <span class="icon is-small">
                <i class="fas fa-chevron-down"></i>
            </span>
        </button>
        <div v-show="data.activo" class="contenedor">
            <div class="conteiner-head mt-3">
                <div class="buttons">
                    <ButtonIcon class="is-success has-text-weight-semibold" positionIcon="left" icon="far fa-save" >Save</ButtonIcon>
                    <ButtonIcon class="btn-crenein" icon="far fa-check-square" >Select all</ButtonIcon>
                    <ButtonIcon class="btn-crenein" icon="far fa-square" >Clear selected</ButtonIcon>
                </div>
                <Searcher/>
            </div>
            <div v-for="permission in data.permissions" :key="permission.name" class="conteiner-body my-4">
                <div>
                    <div @click="activarHeader(data,permission)" class="conteiner-head has-background-light p-2">
                        <h3>{{permission.name}} ({{permission.permissions_activo}}/{{permission.total}})</h3>
                        <div class="buttons">
                            <ButtonIcon class="btn-crenein px-2" icon="far fa-lg fa-check-square" classIcon="mx-0"/>
                            <ButtonIcon class="btn-crenein px-2" icon="far fa-lg fa-square" classIcon="mx-0" />
                        </div>
                        <Searcher/>
                    </div>
                    <div v-if="permission.activo" class="column is-flex is-flex-wrap-wrap is-align-items-center" style="border: 1px solid #cccccc78">
                        <PermissionsItem v-for="item in permission.lista" :key="item.name" :appId="data.id" :permissionId="permission.id" :item="item" @onActiveButton="activeButton" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Searcher from '../Board/Searcher.vue'
import ButtonIcon from '../Buttons/ButtonIcon.vue'
import PermissionsItem from './PermissionsItem.vue'
export default {
    name: 'PermissionsList',
    components: {
        Searcher,
        ButtonIcon,
        PermissionsItem,
    },
    props: ['data'],
    emits: ['onActiveButton','onActivePermissionApp','onActiveList'],
    setup(props,{emit}) {
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

        return {
            activeButton,
            activePermissionApp,
            activarHeader,
        }
    }
}
</script>

<style scoped>
.contenedor {
    transition: 0.9s ease;
}
.conteiner-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
/* .conteiner-head2 {
    background-color: #F7F7F7;
} */
.conteiner-head .buttons, .conteiner-head .buttons .button {
    margin-bottom: 0;
}
.conteiner-head input {
    width: 40%;
}
.conteiner-body div .conteiner-head:hover {
    cursor: pointer;
}

.color-succes {
    background: #28A745;
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
