<template>
    <div class="conteiner-inicial-app">
        <div class="has-text-centered has-text-weight-bold py-4 is-size-4 blue-crenein mb-3">
            <h1>{{$t('appSuscription.title')}}</h1>
        </div>
        <SelectApp :apps="apps" />
    </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import SelectApp from '../../components/CreateCompany/SelectApp.vue'
import store from '@/store.js';

import ispb from '@/assets/ispb2.png'

import { watchEffect } from '@vue/runtime-core';
import { GraphQLClient } from 'graphql-request';

export default {
    components: {
        SelectApp
    },

    setup() {
        const apps = ref([])
        const endpoint = store.state.url_backend

        watchEffect(() => {
            const client = new GraphQLClient(endpoint)

            client.rawRequest(/* GraphQL */ `
            query{
                appsVisible(first: 999, page: 1) {
                    data{
                        id
                        name
                        logo
                        observation
                        visible
                        licenses {
                            id
                            name
                            price_arg
                            price_usd
                        }
                    }
                    paginatorInfo {
                        count, currentPage, hasMorePages, total
                    }
                 
                }
            }
            `)
            .then((data) => {
                apps.value = []
                data.data.appsVisible.data.forEach(element => {
                    apps.value.push({id: element.id, name: element.name, logo: ispb, observation: element.observation, licenses: element.licenses})
                })
            })
            .catch(error => console.log(error.response))
        })

        return {
            apps
        }
    }
    
}
</script>

<style>
.conteiner-inicial-app {
    width: 60%;
    margin: 0 auto;
}

</style>