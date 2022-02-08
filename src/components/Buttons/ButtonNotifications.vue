<template>
  
    <div>
            <button @click="activar" class="button has-background-success is-success">
                <span><i class="fas fa-bell"></i></span> <span class="ml-1">{{cant_notification}}</span>
            </button>
    <!--    <button class="button has-background-success is-success">
            <span><i class="fas fa-exclamation-triangle"></i></span> <span class="ml-1">{{cant_alert}}</span>
        </button>
        <button class="button has-background-success is-success">
            <span><i class="fas fa-times"></i></span> <span class="ml-1">{{cant_error}}</span>
        </button> -->
    </div>

    <div class="dropdown mr-1 mt-3  is-right" :class="{'is-active':activo }">
        <div  class="dropdown-menu shadow has-text-left" id="dropdown-menu" role="menu" style="width: 16rem; margin-top:16px;">
            <div class="dropdown-content pl-4" v-for="not in list_notifications" :key="not.id" >
                <p v-show="!not.viewed">
                    <input 
                    type="checkbox" 
                    :value="not.id"     
                    id="not.id" 
                    v-model="checkedNot" 
                    @change="visto(not,$event)"
                    > {{not.message}}
                <!--<input   @change="visto($event,not)" class="mr-2" type="checkbox" name="my-checkbox" id="not">  {{not.message}} -->
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import {ref} from '@vue/reactivity'
import i18n from '@/i18n.js' 
import { watchEffect } from '@vue/runtime-core'
import store from '@/store'
import { GraphQLClient } from 'graphql-request'

export default {
    name:'ButtonNotifications',
    created() {
        this.amount_notific_not_viewed()
        this.amount_alert_not_viewed()
        this.amount_error_not_viewed()
    },
    setup(){
        const checkedNot = ref([])
        const id_notification = ref()
        const activo = ref(false)
        const cant_notification = ref(0)
        const cant_error = ref(0)
        const cant_alert = ref(0)
        const endpoint = store.state.url_backend
        const list_notifications = ref([])

        const notifications = ref([
            {
                id:1, 
                message: "Nuevo Cliente",
                viewed:false
            },
            {
                id:2, 
                message: "Nuevo Punto",
                viewed:false
            },
            {
                id:3, 
                message: "Nuevo Anuncio",
                viewed:false
            }
        ])   
        
        const cant = ref(notifications.value.length)

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

        const notificationsxcompanyxuser = () => {
            const cliente = new GraphQLClient(endpoint)
            cliente.rawRequest(/* GraphQL */ `
            query($company_id:ID,$user_id:ID,$type:String) {
                  notificationsxcompanyxuser(company_id:$company_id,user_id:$user_id,type:$type){
                        id
                        config_id
                        message
                        viewed
                  }
            }`,
            {
                company_id:parseInt(localStorage.getItem('id_company_selected')),
                user_id: parseInt(localStorage.getItem('user_id')),
                type:"notification"
            })
            .then((data) => {
                let notifications = data.data.notificationsxcompanyxuser
                notifications.forEach((notification) => {
                    list_notifications.value.push({
                        id:element.id,
                        config_id:element.config_id,
                        message:element.message,
                        viewed:element.viewed,
                    })
                })
                console.log(list_notifications.value);
            })
            .catch(error => console.log(error))
        }
     
        const modifiesNot_notification = (id_notification) => {
            const cliente = new GraphQLClient(endpoint)
            cliente.rawRequest(/* GraphQL */ `
            mutation($id:ID){
                modifiesNot_notification(id: $id,input: {
                    id
                    config_id
                    viewed
                    message
                }) 
            }`,
            {
                id: id_notification
            })
            .then((data) => {
                console.log(data.data.modifiesNot_notification);
            })
            .catch(error => console.log(error))
        }

        const activar = () => {
            console.log(cant.value);
            activo.value =  !activo.value
        }
        const visto = (not,e) => {
            if(e.target.checked){
                not.viewed = true
                /* modifiesNot_notification(not.id) */
            }
            console.log(not);
        }

        return{ 
            notificationsxcompanyxuser,
            list_notifications ,
            id_notification,
            checkedNot,
            cant,
            visto,
            activar,
            notifications ,
            activo,
            amount_notific_not_viewed,
            amount_alert_not_viewed,
            amount_error_not_viewed,
            modifiesNot_notification,
            cant_notification ,
            cant_alert ,
            cant_error ,
            endpoint ,
        }
    },

}
</script>

<style>

</style>