<template>
	<div class="">
		<div class="dropdown mt-4 mb-2" :class="{'is-active': coinActivo}">
			<div class="dropdown-trigger">
				<button @click="openSelectCoin" id="select-coin" class="button" aria-haspopup="true" aria-controls="dropdown-menu">
				<span id="select-coin">{{coinSelect.name}}</span>
				<span class="icon is-small" id="select-coin">
					<i class="fas fa-angle-down" id="select-coin" aria-hidden="true"></i>
				</span>
				</button>
			</div>
			<div class="dropdown-menu" id="dropdown-menu" role="menu">
				<div class="dropdown-content mt-0">
					<a @click="changeCoin(coin.id)" v-for="coin in coins" :key="coin.id" class="dropdown-item"
						:class="{'is-active': coin.id == coinSelect.id}">
						{{coin.name}}
					</a>
				</div> 
			</div>
		</div>

		
	</div>

	<div class="conteiner-license">
		<CardLicence v-for="license in app.licenses" :key="license.id" 
			:coinSelect="coinSelect" :license="license"
			@onValidate="validar"
		/> 
  	</div>

	<ModalAlert :activador="activeAlert" :state="false">
		<div>
			<p v-if="typeAction == 'licence.agregar'" v-t="'licence.modalCargaError'"></p>
			<p v-else v-t="'licence.modalEdicionError'"></p>
		</div>
	</ModalAlert>

</template>

<script>
import { ref } from '@vue/reactivity'
import {GraphQLClient} from 'graphql-request';
import store from '@/store';
import { useRouter } from 'vue-router';
import CardLicence from './CardLicence.vue'
import ModalAlert from '../Modals/ModalsAlert.vue'

export default {
  	name:"SelectLicence",

	components: {
		CardLicence,
		ModalAlert,
	},

  	props: ['app'],

  	setup(props) {
		const coins = ref([
            {id: 1, name: 'ARS'},{id:2, name: 'USD'}
        ])
		const endpoint = store.state.url_backend
		const use_company_id = ref(localStorage.getItem('id_company_selected'))
        const coinActivo = ref(false)
        const coinSelect = ref({id: 1, name: 'ARS'})
		const router = useRouter()
		const activeAlert = ref(false)

		// Abre el desplegable de monedas
        const openSelectCoin = () => {
            coinActivo.value = !coinActivo.value 
        }

        // Cambia el valor del desplegable de monedas
        const changeCoin = (id) => {
            let aux = coins.value.find(element => element.id == id)
            coinSelect.value = aux
            openSelectCoin()
        }

		const crearSuscripcion = async (dato, user_company_id) => {
			const client = new GraphQLClient(endpoint)
            await client.rawRequest(/* GraphQL */ `
            mutation($company_user_id:ID!,$use_company_id:ID!, $use_app_id:ID!,$lic_license_id:ID!){
              		createsUse_subscription (company_user_id:$company_user_id, input:{
                    use_company_id: $use_company_id,
                    use_app_id: $use_app_id,
                    lic_license_id: $lic_license_id,
            
                    }){
                    	id
                        use_company_id
						use_app_id
						lic_license_id   
                           
                    }
            }`,
            {
				company_user_id:user_company_id,
                use_company_id: use_company_id.value,       
                use_app_id: props.app.id,
                lic_license_id: dato.id,
            },
            {
             	authorization: `Bearer ${ localStorage.getItem('user_token')}` 
            })
            .then((data) => {
				console.log("Paso la carga de suscripcion")
                let accion = "cargarSus"
                store.commit('verificar_carga',accion) 
                setTimeout(() => {
					router.push({name: 'SubscriptionsDashboard'}) 
				},2000)
            }).catch(error => {
				activeAlert.value = true
				checkLoad()
                console.log(error.response);
            })
		}

		const checkLoad = () => {
            if (activeAlert.value == true) {
                setTimeout(() => {
                    activeAlert.value = false
                },3000)
            }
        }

		const validar = async (data) => {
			let user_company_id = localStorage.getItem('user_company_id')

			if (user_company_id) {
				await crearSuscripcion(data, user_company_id)
			}
		}

		return {
			activeAlert,
			coins, 
			coinActivo, 
			coinSelect, 
			use_company_id, 
			changeCoin, 
			crearSuscripcion,
			openSelectCoin, 
			validar,
		}
  	}

}
</script>

<style scoped>
.conteiner-license {
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	margin-top: 40px;
}

.card-license {
	display: flex;
	background-color: #1c8ce5;
	flex-direction: column;
	justify-content: space-between;
	height: 250px;
	align-items: center;
	box-sizing: border-box;
	margin: 10px;
	padding: 30px;
	border-radius: 5px;
	box-shadow: 0px 0px 8px 2px #ccc;
}

</style>