<template>
    <li>
        <!-- <a :class="{'is-active':data.activo}" :to="{name: data.path}" >{{data.name}}</a> -->
    </li>
</template>

<script>
export default {
    name: 'ButtonMenu',
    props: ['data'],
    emits: ['onActive'],

    setup(props, {emits}) {
        const activar = (data) => {
            emits("onActive", data.id)
        }
    }
}
</script>

<style scoped>
a:hover {
    border: 1px solid #005395;
    color: #005395;
}
a.is-active {
    background-color: #005395;
    color: #fff
}


@media screen and (min-width: 1025px) {
    a {
        margin: 0 0 8px 0;
        box-shadow: 0px 0px 16px 0px rgba(0,0,0,0.2);
        border-radius: 5px;
        color: #005395;
        border: 1px solid #fff
    }
}
</style>