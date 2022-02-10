<template>
  
    <div>
            <button @click="activarNot" class="button has-background-success is-success">
                <span><i class="fas fa-bell"></i></span> <span class="ml-1">{{cant_notification}}</span>
            </button>
            <button  @click="activarAler" class="button has-background-success is-success">
                <span><i class="fas fa-exclamation-triangle"></i></span> <span class="ml-1">{{cant_alert}}</span>
            </button>
            <button  @click="activarErr" class="button has-background-success is-success mr-2">
                <span><i class="fas fa-times"></i></span> <span class="ml-1">{{cant_error}}</span>
            </button> 
    </div>

    <div class="dropdown  tam3" :class="{'is-active':activoNot }">
        <div  class="dropdown-menu shadow " id="dropdown-menu" role="menu">
            <div class="dropdown-content centrar"  v-for="not in list_notifications" :key="not.id" >
                 <p class="item" v-if="not.viewed!=null" >
                    <input 
                    type="checkbox" 
                    :value="not.id" 
                    checked    
                    disabled
                    > {{not.message}}
                </p>
                <p v-if="not.viewed==null"  class="marcado">
                    <input 
                    type="checkbox" 
                    :value="not.id" 
                    checked    
                    id="not.id" 
                    v-model="checkedNot" 
                    @change="vistoNot(not,$event)"
                    > {{not.message}}
                </p> 
            </div>
        </div>
    </div>

     <div class="dropdown tam2" :class="{'is-active':activoAlert }">
        <div  class="dropdown-menu shadow " id="dropdown-menu" role="menu" style="width: 16rem; margin-top:16px;">
            <div class="dropdown-content centrar" v-for="not in list_alerts" :key="not.id" >
                   <p v-if="not.viewed!=null" class="item">
                    <input 
                    type="checkbox" 
                    :value="not.id" 
                    checked    
                    disabled
                    > {{not.message}}
                <!--<input   @change="visto($event,not)" class="mr-2" type="checkbox" name="my-checkbox" id="not">  {{not.message}} -->
                </p>
                <p v-if="not.viewed==null"  class="marcado">
                    <input 
                    type="checkbox" 
                    :value="not.id" 
                    checked    
                    id="not.id" 
                    v-model="checkedNot" 
                    @change="vistoNot(not,$event)"
                    > {{not.message}}
                <!--<input   @change="visto($event,not)" class="mr-2" type="checkbox" name="my-checkbox" id="not">  {{not.message}} -->
                </p>
            </div>
        </div>
    </div>

    <div class="dropdown tam1" :class="{'is-active':activoError }">
        <div  class="dropdown-menu shadow " id="dropdown-menu" role="menu" style="width: 16rem; margin-top:16px;">
            <div class="dropdown-content centrar" v-for="not in list_error" :key="not.id" >
                <p v-if="not.viewed!=null" class="marcado">
                <input 
                type="checkbox" 
                :value="not.id" 
                checked    
                disabled
                > {{not.message}}
                
                </p>
                <p v-if="not.viewed==null"  class="marcado">
                    <input 
                    type="checkbox" 
                    :value="not.id" 
                    checked    
                    id="not.id" 
                    v-model="checkedNot" 
                    @change="vistoNot(not,$event)"
                    > {{not.message}}
                
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
        this.notifications()
        this.errors()
        this.alerts()
    },
    setup(){
        const checkedNot = ref([])
        const activoNot = ref(false)
        const activoAlert = ref(false)
        const activoError = ref(false)
        const cant_notification = ref(0)
        const cant_error = ref(0)
        const cant_alert = ref(0)
        const endpoint = store.state.url_backend
        const list_notifications = ref([])
        const list_alerts = ref([])
        const list_error = ref([])

      

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
                console.log(data.data.amount_notific_not_viewed);
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
        //trae notificaciones tipo notification
        const notifications = () => {
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
                console.log(data);
    
                notifications.forEach((notification) => {
                    list_notifications.value.push({
                        id:notification.id,
                        config_id:notification.config_id,
                        message:notification.message,
                        viewed:notification.viewed,
                    })
                })
                console.log(list_notifications.value);
            })
            .catch(error => console.log(error))
        }
        //trae notificaciones tipo alert
        const alerts = () => {
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
                type:"alert"
            })
            .then((data) => {
                let notifications = data.data.notificationsxcompanyxuser
            /*     console.log(notifications); */
    
                notifications.forEach((notification) => {
                    list_alerts.value.push({
                        id:notification.id,
                        config_id:notification.config_id,
                        message:notification.message,
                        viewed:notification.viewed,
                    })
                })
               /*  console.log(list_alerts.value); */
            })
            .catch(error => console.log(error))
        }
        //trae notificaciones tipo error
        const errors = () => {
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
                type:"error"
            })
            .then((data) => {
                let notifications = data.data.notificationsxcompanyxuser
                /* console.log(notifications); */
    
                notifications.forEach((notification) => {
                    list_error.value.push({
                        id:notification.id,
                        config_id:notification.config_id,
                        message:notification.message,
                        viewed:notification.viewed,
                    })
                })
                /* console.log(list_error.value); */
            })
            .catch(error => console.log(error))
        }
     
        /* watchEffect(()=>{
            list_notifications.value.forEach((not) => {
                if (not.viewed==null) {
                    notifications() 
                    console.log(list_notifications.value);
                }
            })

            list_alerts.value.forEach((not) => {
                if (not.viewed==null) {
                    alerts() 
                    console.log(list_notifications.value);
                }
            })
            list_error.value.forEach((not) => {
                if (not.viewed==null) {
                    errors() 
                    console.log(list_notifications.value);
                }
            })
           
        }) */


        const modifiesNot_notification = (id_notification) => {
            console.log("dentro de la funcion: "+id_notification);
            const cliente = new GraphQLClient(endpoint)
            cliente.rawRequest(/* GraphQL */ `
            mutation($id:ID!){
                modifiesNot_notification(id: $id){
                    id
                    config_id
                    viewed
                    message
                }
            }`,
            {
                id: parseInt(id_notification)
            })
            .then((data) => {
                console.log(data.data.modifiesNot_notification);
            })
            .catch(error => console.log(error))
        }

        const activarNot = () => {
            activoAlert.value = false
            activoError.value = false
           activoNot.value =  !activoNot.value
        }
        const activarAler = () => {
            activoError.value = false
            activoNot.value = false
           activoAlert.value =  !activoAlert.value
        }
        const activarErr = () => {
            activoAlert.value = false
            activoNot.value = false
           activoError.value = !activoError.value 
        }
        const vistoNot = (not,e) => {

            if(e.target.checked){
                console.log(not.id);
                modifiesNot_notification(not.id)  
                
            }
            console.log(not);
        }
        const vistoAlert = (not,e) => {
            if(e.target.checked){
                console.log(not.id);
                modifiesNot_notification(not.id)  
            }
            console.log(not);
        }
        const vistoError = (not,e) => {
            if(e.target.checked){
                console.log(not.id);
                modifiesNot_notification(not.id)  
            }
            console.log(not);
        }

        return{ 
            activoNot,
            activoAlert,
            activoError,
            notifications,
            alerts,
            errors,
            list_notifications ,
            list_alerts ,
            list_error,
            checkedNot,
            vistoNot,
            vistoAlert,
            vistoError,
            activarNot ,
            activarAler,
            activarErr,
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

<style scoped>



.tam3{
    top:20px;
    right: 328px;
}


.tam2{
    top:5px;
    right: 320px;
}

.tam1{
    top:5px;
    right: 256px;
}

.item{
    padding-left: 20px;
}
.marcado{
    
    padding-left: 20px;
    background-color: #D6DBDF   ;
    border-style:none;

}

.centrar{
    padding-left:20px;
    cursor:pointer;
}

.centrar:hover{
    
    cursor:pointer;
    background-color:#F8F9F9;
}



</style>