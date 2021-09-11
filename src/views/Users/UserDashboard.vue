<template>
    <div class="conteiner-tablero mt-2 py-4">
        <div class="head-tablero">
             <!--    Utilizo el atributo locale del objeto i18n para saber en que lenguaje esta seteado el sistema  -->
                <TitleBoard v-show="$i18n.locale=='es'" title="Usuarios" />
                <TitleBoard v-show="$i18n.locale=='en'" title="Users" />
         
            <hr>
            <div class="body-tablero my-3 px-4">
                <HeadBoard :buttonDefault="false">
                    <router-link :to="{name: 'InviteUser'}" class="button btn-crenein">{{$t('inviteUser.invitar')}}</router-link>
                </HeadBoard>             
            </div>
        </div>
        <div class="body-tablero px-4">
            <Board :datas="datas" :titles="titles" >
                <tr class="has-text-centered" v-for="data in datas" :key="data.id">
                    <th @click="actionModal(data)">{{data.id}}</th>
                    <td @click="actionModal(data)">{{data.avatar}}</td>
                    <td @click="actionModal(data)">{{data.fullName}}</td>
                    <td @click="actionModal(data)">{{data.email}}</td>
                    <td @click="actionModal(data)">{{data.created}}</td>
                    <td @click="actionModal(data)">{{data.state}}</td>
                    <Modal :data="data" :buttonDefault="false" @onCloseModal="actionModal" 
                     @onOpenModalDelete="actionModalDelete" >
                        <button @click="ChangeState(data)" v-if="data.state == 'Habilitado'" class="button btn-crenein w-100 my-1">{{$t('user.deshabilitar')}}</button>
                        <button @click="ChangeState(data)" v-else class="button btn-crenein w-100 my-1">{{$t('user.habilitar')}}</button>
                    </Modal>
                    <ActionModal :data="data" @onCloseModalAction="actionModalDelete" />
                </tr>
            </Board>
        </div>

        <Pagination/>
    </div>
</template>

<script>
import TitleBoard from '../../components/Board/TitleBoard.vue'
import HeadBoard from '../../components/Board/HeadBoard.vue'
import Board from '../../components/Board/Board.vue'
import Pagination from '../../components/Board/Pagination.vue'
import Modal from '../../components/Modal.vue'
import ActionModal from '../../components/Modals/ActionsModal.vue'
import { ref } from '@vue/reactivity'
/* import store from '@/store' */
import {  watchEffect } from '@vue/runtime-core'
import i18n from '@/i18n.js' 
import {GraphQLClient, request as fetchGQL} from 'graphql-request';


export default {
    components: {
        TitleBoard,
        HeadBoard,
        Board,
        Pagination,
        Modal,
        ActionModal,
    },
 /*    created(){
        this.traerUsers()
    }, */

    setup () {
        const datas = ref([
            {id: 1, avatar: 'foto', fullName: 'Mauricio Ferreyra', email: 'mauricioferreyra548@gmail.com', created: '24/07/2021', state: 'Habilitado', activo: false},
            {id: 2, avatar: 'foto', fullName: 'Luis Ferreyra', email: 'luis548@gmail.com', created: '24/07/2021', state: 'Habilitado', activo: false},
            {id: 3, avatar: 'foto', fullName: 'Ema Ferreyra', email: 'emaCorreo@gmail.com', created: '24/07/2021', state: 'Deshabilitado', activo: false},
            {id: 4, avatar: 'foto', fullName: 'Glo Ferreyra', email: 'gloquita@gmail.com', created: '24/07/2021', state: 'Habilitado', activo: false},
            {id: 5, avatar: 'foto', fullName: 'Leonardo Ferreyra', email: 'loreto@gmail.com', created: '24/07/2021', state: 'Pendiente', activo: false},
        ])
      

        const titles = ref([])
        const endpoint = store.state.url_backend
        const users = ref([])
        const users_aux = ref([])


        const traerUsers = () => {
            const client = new GraphQLClient(endpoint) // creamos la consulta para usarlo luego
            watchEffect(() => {
                client.rawRequest(/* GraphQL */ `
                query{
                    users {
                        id
                        name
                        email
                        avatar
                        created_at
                        updated_at
                        deleted_at
                        companies {
                            id
                            name_fantasy
                            business_name
                            deleted_at
                            created_at
                            updated_at
                        }
                        invitations{
                            id
                            name
                            email
                        }
                    }
                }`,
                {
                    /* page: parseInt(route.params.page),
                    first: mostrar_cantidad.value */
                },
                {
                    /* authorization: `Bearer ${ localStorage.getItem('user_token') }` */
                })
                .then((data) => {
                    users.value = []
                    data.data.users.forEach(element => {
                        users.value.push({id:element.id, nombre: element.name, avatar: element.avatar, email:element.email ,activo: false, modalDelete: false})
                      /*   console.log(typeof element.logo) */
                    })

                }).catch(error => {
                    console.log(error.response);
                })
            })
        }





        // Activa el valor para abrir una ventana modal de ese elemento
        const actionModal = (data) => {
            let aux = datas.value.find(element => element.id == data.id)
            aux.activo = !aux.activo
        }

        // Activa el valor de modalDelete para abrir el modal de aviso 
        const actionModalDelete = (data) => {
            let aux = datas.value.find(element => element.id == data)
            aux.activo = false
            aux.modalDelete = !aux.modalDelete
        }
        watchEffect(()=>{ // utilizamos watcheffect para detectar que valor tiene el atributo locale del objeto i18n al momento de estar en la pagina o al momento de cambiar el valor a traves del boton del lenguaje
            if(i18n.global.locale == 'en'){
                titles.value = ['Avatar','Full name','Email','Created','State']
            }
            if(i18n.global.locale == 'es'){
                titles.value = ['Avatar','Nombre completo','Correo','Creado','Estado']
            }
        })

        // Cambia el estado del usuario entre habilitado y deshabilitado
        const ChangeState = (data) => {
            data.state == 'Habilitado'? data.state = 'Deshabilitado' : data.state = 'Habilitado'
        }

        return {
            traerUsers ,
            endpoint,
            users,
            users_aux,
            datas,
            titles,
            actionModal,
            actionModalDelete,
            ChangeState
        }
    }
}
</script>

<style scoped></style>