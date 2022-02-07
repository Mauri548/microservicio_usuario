<template>
  
    <div>

        <!-- <div class="select blue-crenein has-text-weight-semibold">
            <select  v-model="$i18n.locale"> 
                    <option 
                        v-for="(lang,i) in langs"
                        :key="`lang-${i}`"
                        :value="lang.id">
                        {{lang.lan}}
                    </option> 
            </select>
        </div> -->
        <button class="button has-background-success is-success"><span><i class="fas fa-bell"></i></span> <span class="ml-1">{{cant_notification}}</span></button>
        <button class="button has-background-success is-success"><span><i class="fas fa-exclamation-triangle"></i></span> <span class="ml-1">{{cant_alert}}</span></button>
        <button class="button has-background-success is-success"><span><i class="fas fa-times"></i></span> <span class="ml-1">{{cant_error}}</span></button>
    
    </div>

</template>

<script>
import {ref} from '@vue/reactivity'
import i18n from '@/i18n.js' 
import { watchEffect } from '@vue/runtime-core'
import store from '@/store'
import { GraphQLClient } from 'graphql-request'

export default {
    name:'ButtonLang',
    created() {
        this.amount_notific_not_viewed()
        this.amount_alert_not_viewed()
        this.amount_error_not_viewed()
    },
    setup(){
        /*query{
            amount_notific_not_viewed(company_id:101,user_id:2,type:"error")
        } */
        const cant_notification = ref(0)
        const cant_error = ref(0)
        const cant_alert = ref(0)
        const endpoint = store.state.url_backend
        const langs = ref([{id:'es',lan:'Español'},{id:'en',lan:'English'}])
        let langStorage = window.localStorage

        watchEffect(()=>{
            langStorage.setItem('lang',i18n.global.locale)
            /* console.log(langStorage.getItem('lang')) */
        })


        const amount_notific_not_viewed = () => {
            const cliente = new GraphQLClient(endpoint)
            cliente.rawRequest(/* GraphQL */ `
            query($company_id:ID,$user_id:ID,$type:String) {
                  amount_notific_not_viewed(company_id:$company_id,user_id:$user_id,type:$type)
            }`,
            {
                company_id:parseInt(localStorage.getItem('id_company_selected')),
                user_id: parseInt(localStorage.getItem('user_id')),
                type:"notification"
            })
            .then((data) => {
                cant_notification.value = data.data.amount_notific_not_viewed
            })
            .catch(error => console.log(error))
        }
        const amount_alert_not_viewed = () => {
            const cliente = new GraphQLClient(endpoint)
            cliente.rawRequest(/* GraphQL */ `
            query($company_id:ID,$user_id:ID,$type:String) {
                  amount_notific_not_viewed(company_id:$company_id,user_id:$user_id,type:$type)
            }`,
            {
                company_id:parseInt(localStorage.getItem('id_company_selected')),
                user_id: parseInt(localStorage.getItem('user_id')),
                type:"alert"
            })
            .then((data) => {
                cant_alert.value = data.data.amount_notific_not_viewed
            })
            .catch(error => console.log(error))
        }

        const amount_error_not_viewed = () => {
            const cliente = new GraphQLClient(endpoint)
            cliente.rawRequest(/* GraphQL */ `
            query($company_id:ID,$user_id:ID,$type:String) {
                  amount_notific_not_viewed(company_id:$company_id,user_id:$user_id,type:$type)
            }`,
            {
                company_id:parseInt(localStorage.getItem('id_company_selected')),
                user_id: parseInt(localStorage.getItem('user_id')),
                type:"error"
            })
            .then((data) => {
                cant_error.value = data.data.amount_notific_not_viewed
            })
            .catch(error => console.log(error))
        }

        return{ 
            amount_notific_not_viewed,
            amount_alert_not_viewed,
            amount_error_not_viewed,
            cant_notification ,
            cant_alert ,
            cant_error ,
            endpoint ,
            langs,
            
        }
    },

}
</script>

<style>

</style>