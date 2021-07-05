<template>
    <div class="column is-one-third">
        <img :src="logo" :alt="name" width="35">
        <p class="has-text-weight-medium" :class="{'text-inactivo':!activo}" >{{name}}</p>
    </div>
</template>

<script>
export default {
    name: 'AppCrenein',
    props:{
        name: String,
        logo: String,
        activo: Boolean,
    }

}
</script>

<style scoped>
.text-inactivo {
    color: grey
}

div:hover {
    background-color: rgba(204,204,204,0.27);
    border-radius: 15px;
    cursor: pointer;
}

</style>