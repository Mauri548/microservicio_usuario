<template>
    <div class="column is-one-third">
        <li>
            <span>{{item.name}}</span>
            <div class="buttons ml-3">
                <button @click="activarButton(item.id, false)" :class="{'is-active': !item.activo}" class="button btn-switch-no mx-0">No</button>
                <button @click="activarButton(item.id, true)" :class="{'is-active': item.activo}" class="button btn-switch-yes mx-0">Yes</button>
            </div>
        </li>
    </div>
</template>

<script>
export default {
    name: 'PermissionsItem',
    props: ['item','permissionId','appId'],
    emits: ['onActiveButton'],

    setup(props,{emit}) {
        const activarButton = (item, valor) => {
            emit("onActiveButton", {appId: props.appId ,permissionID: props.permissionId ,itemID: item, valor: valor})
        }

        return {
            activarButton
        }
    }
}
</script>

<style scoped>
li {
    list-style: none;
    display: flex;
    align-items: center;
}

li span {
    width: 40%;
}

.btn-switch-no {
    border-radius: 5px 0px 0px 5px;
}
.btn-switch-yes {
    border-radius: 0px 5px 5px 0px;
}
.btn-switch-no.is-active , .btn-switch-yes.is-active {
    background-color: #48c774;
    color: #fff;
    border: none
}
</style>