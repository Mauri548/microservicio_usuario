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
		<div class="card-license" v-for="license in app.licenses" :key="license.id">
			<h1 class="card-title has-text-white has-text-weight-semibold">{{license.name}}</h1>
			<span v-show="coinSelect.name == 'ARS'" class="card-price has-text-white">${{license.price_arg}}</span>
			<span v-show="coinSelect.name == 'USD'" class="card-price has-text-white">${{license.price_usd}}</span>
			<button class="button has-text-weight-semibold">I want</button>
		</div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
export default {
  	name:"SelectLicence",

  	props: ['app'],

  	setup(props) {
		const coins = ref([
            {id: 1, name: 'ARS'},{id:2, name: 'USD'}
        ])
        const coinActivo = ref(false)
        const coinSelect = ref({id: 1, name: 'ARS'})

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

		return {coins, coinActivo, coinSelect, changeCoin, openSelectCoin}
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