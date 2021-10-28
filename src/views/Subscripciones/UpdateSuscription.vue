<template>
    <div class="conteiner-inicial-app">
        <div class="has-text-centered has-text-weight-bold py-4 is-size-4 blue-crenein mb-3">
            <h1>{{$t('appSuscription.actualizar')}}</h1>
        </div>
        <EditAppSelected :apps="apps" />
    </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import EditAppSelected from '../../components/CreateCompany/EditAppSelected.vue'
import store from '@/store.js';
import ispb from '@/assets/ispb2.png'
import { useRoute, useRouter } from 'vue-router'
import { watchEffect } from '@vue/runtime-core';
import { GraphQLClient } from 'graphql-request';

export default {
    components: {
        EditAppSelected
    },

    created(){
        this.traerApp()
    },

    setup() {
        const apps = ref([])
        const endpoint = store.state.url_backend
        const route = useRoute()


        const traerApp = () => {
            console.log("Id suscripcion: ",route.params.id)
            const client = new GraphQLClient(endpoint)
            client.rawRequest(/* GraphQL */ `
            query($id:ID) {
                subscription(id: $id) {
                        id
                        app{
                            id 
                            name
                            observation
                        }
                        license{
                            id
                            name
                            price_arg
                            price_usd
                        }
                    }
            }`,
            {
                id : route.params.id
            },
            {
                authorization: `Bearer ${localStorage.getItem('user-token')}`
            }).then((data) => {

                let app = data.data.subscription
               /*  console.log(app.app.id)
                console.log(app.app.name)
                console.log(app.app.observation) */
               /*  console.log(app.license)  */
                apps.value = []
                apps.value.push({id: app.app.id, name: app.app.name, logo: ispb, observation: app.app.observation, id_suscription:route.params.id,mostrar:true}) 
                console.log(apps) 
            })
            .catch(error => console.log(error.response))

        }


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
               /*  apps.value = []
                data.data.appsVisible.data.forEach(element => {
                    apps.value.push({id: element.id, name: element.name, logo: ispb, observation: element.observation, licenses: element.licenses})
                }) */
            })
            .catch(error => console.log(error.response))
        })

        return {
            route,
            traerApp ,
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