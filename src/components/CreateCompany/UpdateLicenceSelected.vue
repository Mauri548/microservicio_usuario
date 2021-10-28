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
		<div class="card-license" v-for="license in licenses" :key="license.id">
			<h1 class="card-title has-text-white has-text-weight-semibold">{{license.name}}</h1>
			<span v-show="coinSelect.name == 'ARS'" class="card-price has-text-white">${{license.price_arg}}</span>
			<span v-show="coinSelect.name == 'USD'" class="card-price has-text-white">${{license.price_usd}}</span>
			<button  :class="{'is-static': license.tengo}" @click="informar(license)" class="button has-text-weight-semibold is-primary">{{license.tengo ? $t('licence.tengo') : $t('licence.quiero')}}</button>
		</div>
  	</div>

	<div>
        <div class="modal" :class="{'is-active' : mostrar}">
            <div class="modal-background"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                    <div class="modal-card-title" style="margin-left: 20px">
                        <img class="image is-rounded is-48x48" style="margin: auto" src="../../assets/exclamation.png"> 
                    </div> 
                    <button class="delete " aria-label="close" @click="mostrar = false" ></button>
                </header> 
                <section class="modal-card-body">
                    <div>
                        <h1 class="modal-card-title text">{{$t('licence.modalTitulo')}}</h1> 
                        <p class="text">{{$t('licence.modalParrafo')}}</p>
                    </div>
                </section>
                <footer class="column modal-card-foot text">
                    <div>
                        <button class="button btn-cancel" @click="mostrar = false" style=" font-weight:bold;">Cancelar</button>
                        <button class="button has-text-white" @click="mostrar = false" style="background-color: #005395; font-weight:bold;" >Confirmar</button>
                    </div>
                </footer>
            </div>
        </div>
    </div>

</template>

<script>
import { ref } from '@vue/reactivity'
import {GraphQLClient} from 'graphql-request';
import store from '@/store';
import { useRouter } from 'vue-router';

export default {
  	name:"UpdateLicenceSelected",

  	props: ['app'],
	created() {
		  this.traerLicencias()
		  this.traerLicenciaActual()
	},

  	setup(props) {
		const coins = ref([
            {id: 1, name: 'ARS'},{id:2, name: 'USD'}
        ])
		const endpoint = store.state.url_backend
		const use_app_id = ref("")
		const lic_license_id =  ref("")
		const use_company_id = ref(localStorage.getItem('id_company_selected'))
        const coinActivo = ref(false)
        const coinSelect = ref({id: 1, name: 'ARS'})
		const router = useRouter()
		const licenses = ref([])
		const id_suscripcion_actual =  ref("")
		const id_licencia_actual  = ref("")
		const mostrar = ref(false)

		

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

		const agarrar = (dato) => {
	/* 		use_app_id.value = props.app.id
			lic_license_id.value = dato.id
			console.log(use_company_id.value)
			console.log(use_app_id.value)
			console.log(lic_license_id.value) */
		}


		const traerLicenciaActual = () => {
			id_suscripcion_actual.value = props.app.id_suscription
			const client = new GraphQLClient(endpoint)
			client.rawRequest(/* GraphQL */ `
            query($id:ID)
			{
              	subscription(id:$id){
					id
					lic_license_id
                } 
            }`,
            {
                id: id_suscripcion_actual.value
            },
            {
             	authorization: `Bearer ${ localStorage.getItem('user-token')}` 
            })
            .then((data) => {
				 id_licencia_actual.value = data.data.subscription.lic_license_id
			
				/* let buscarLicencia = licenses.value.find(licencia => licencia.id = id_licencia_actual)
				
				buscarLicencia.tengo = true
				console.log(buscarLicencia.tengo) */


            }).catch(error => {
                console.log(error.response);
            })


		} 


		const traerLicencias = () => {
			use_app_id.value = props.app.id
			const client = new GraphQLClient(endpoint)
			client.rawRequest(/* GraphQL */ `
            query($id:ID)
			{
              	licensesxapp(first:999,page:1,app_id:$id){
					paginatorInfo {
						count
						currentPage
						firstItem
						hasMorePages
						lastItem
						lastPage
						perPage
						total
						}
						data{
						id
						name
						price_arg
						price_usd

					}
                } 
            }`,
            {
                id: use_app_id.value,
            },
            {
             	authorization: `Bearer ${ localStorage.getItem('user-token')}` 
            })
            .then((data) => {
				
				let licencias = data.data.licensesxapp.data
                console.log(data.data.licensesxapp.data)

				licencias.forEach(element => {
					licenses.value.push({
						id:element.id,
						name:element.name,
						price_arg:element.price_arg, 
						price_usd:element.price_usd,
						tengo: false
					})
				});

				let buscarLicencia = licenses.value.find(licencia => licencia.id = id_licencia_actual)
				
				buscarLicencia.tengo = true
				

				console.log(licenses.value)


            }).catch(error => {
                console.log(error.response);
            })

		}


		const informar = (licence) => {
			console.log(licence.name)
			mostrar.value = !mostrar.value
		}



		const crearSuscripcion = (dato) => {

			use_app_id.value = props.app.id
			lic_license_id.value = dato.id
			console.log(use_company_id.value)
			console.log(use_app_id.value)
			console.log(lic_license_id.value)

			const client = new GraphQLClient(endpoint) // creamos la consulta para usarlo luego
            // Estructura FetchQL(url, query, variable, opcions)
            client.rawRequest(/* GraphQL */ `
            mutation($use_company_id:ID!, $use_app_id:ID!,$lic_license_id:ID!){
              		createsUse_subscription (input:{
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
                use_company_id: use_company_id.value,       
                use_app_id: use_app_id.value,
                lic_license_id: lic_license_id.value,
        
            },
            {
             	authorization: `Bearer ${ localStorage.getItem('user_token')}` 
            })
            .then((data) => {
				console.log("Paso la carga de suscripcion")
                router.push({name: 'SubscriptionsDashboard'}) 
                let accion = "cargarSus"
                store.commit('verificar_carga',accion) 
            }).catch(error => {
                console.log(error.response);
            })
		}




		return {
		mostrar,
		informar,
		id_licencia_actual,
		id_suscripcion_actual,
		traerLicenciaActual,
		licenses,traerLicencias,
		crearSuscripcion,use_company_id ,
		lic_license_id,use_app_id ,agarrar,coins,
		coinActivo, coinSelect, changeCoin,
		openSelectCoin}
  	}

}
</script>

<style scoped>
.conteiner-license {
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	margin-top: 40px;
}

.is-static{
	background-color:rgb(230, 77, 66);
	color: white;
	border-color:rgb(230, 77, 66);
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

.modal-background {
    background-color: rgba(10,10,10,.86);
}
.btn-cancel {
    background-color: #ce2d22;
    color: #fff;
}
.btn-cancel:hover {
    background-color: #F93023;
}
.text{
	text-align: center;
}

</style>