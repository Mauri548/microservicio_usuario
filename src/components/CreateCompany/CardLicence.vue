<template>
    <div class="card-license">
        <h1 class="card-title has-text-white has-text-weight-semibold">{{license.name}}</h1>
        <span v-show="coinSelect.name == 'ARS'" class="card-price has-text-white">${{license.price_arg}}</span>
        <span v-show="coinSelect.name == 'USD'" class="card-price has-text-white">${{license.price_usd}}</span>

        <Button :loading="loading"
            class="has-background-white has-text-dark"
            @click="validar(license)"
            >
            {{$t('selectLicence.btnQuiero')}}
        </Button>
    </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import Button from '../Buttons/Button.vue'

export default {
    name: 'CardLicence',

    components: {
        Button,
    },

    props: ['coinSelect','license'],

    emits: ['onValidate'],

    setup(props,{emit}) {
		const loading = ref(false)

        const validar = (license) => {
            loading.value = true
            emit("onValidate", license)
        }

        return {
            loading,
            validar
        }
    }
}
</script>

<style>

</style>