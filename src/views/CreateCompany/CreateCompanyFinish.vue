<template>
    <div class="conteiner">
        <h1 class="is-size-3">{{$t('createCompanyFinish.initext')}}</h1>
        <div class="my-5">
            <img src="../../assets/emoji-smile.png" width="100" alt="">
        </div>
        <span class="is-size-5" v-t="'createCompanyFinish.subtext'"></span>
        <div class="mt-5">
            <button class="button btn-crenein" v-t="'createCompanyFinish.buttontext'"></button>
        </div>
    </div>
</template>


<script>
export default {

}
</script>

<style scoped>
.conteiner {
    width: 90%;
    margin: 50px auto;
    text-align: center;
}

@media (min-width: 1024px) {
    .conteiner {
        width: 80%;
        margin: auto;
    }
}
</style>