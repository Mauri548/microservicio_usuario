<template>
    <div class="has-text-centered">
        <h3 class="fondo-crenein has-text-white py-1">Usuarios</h3>
        <ul>
            <li v-for="user in users" :key="user.id" >
                <a>{{user.name}}</a>
            </li>
            <!-- <li><a>Mauri</a></li>
            <li><a>Mauri</a></li>
            <li><a>Mauri</a></li>
            <li><a>Mauri</a></li>
            <li><a>Mauri</a></li>
            <li><a>Mauri</a></li> -->
        </ul>
    </div>
</template>

<script>
export default {
    name: 'UserList',
    props: ['users']
}
</script>

<style scoped>
li {
    border: 1px solid #ccc;
    padding: 4px
}
li:hover {
    background: #cccccc4a;
    cursor: pointer;
}
li a {
    color: black
}
</style>