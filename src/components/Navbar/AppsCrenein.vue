<template>
    <div class="column is-one-third">
        <img :src="logo" :alt="name" width="35">
        <p>{{name}}</p>
    </div>
</template>

<script>
export default {
    name: 'AppCrenein',
    props:{
        name: String,
        logo: String,
    }

}
</script>

<style>

</style>