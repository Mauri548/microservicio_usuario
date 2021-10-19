<template>
    <div class="dropdown mx-2" :class="{'is-active':activo}">
        <div class="dropdown-trigger">
            <button @click="activar" id="select-company" class="button" aria-haspopup="true" aria-controls="dropdown-menu">
                <span class="blue-crenein has-text-weight-semibold">{{$t('navbar.selectCompany.company')}} {{companyActual.name_fantasy}}</span>
                <span class="icon is-small">
                    <i id="select-company" class="fas fa-chevron-down blue-crenein"></i>
                </span>
            </button>
        </div>
        <div class="dropdown-menu shadow" id="dropdown-menu" role="menu" style="min-width: 10rem">
            <div class="dropdown-content">

                <a v-for="company in companies" :key="company.id" href="#" 
                    @click="changeCompany(company)" class="dropdown-item blue-crenein has-text-weight-semibold" :class="{'is-active': company.id == companyActual.id}"
                    >{{$t('navbar.selectCompany.company')}} {{company.name_fantasy}}
                </a>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import store from '@/store'
import { watch, watchEffect } from '@vue/runtime-core'
import { GraphQLClient } from 'graphql-request'
export default {
    name: 'SelectCompany',

    setup(){

        const endpoint = store.state.url_backend

        // Remplaza el 2 por el valor de la id de la compañia de tu usuario
        // localStorage.setItem('id_company_selected', "2")

        const companies = ref([])
        const companyActual = ref({id: localStorage.getItem('id_company_selected'), name_fantasy: ''})

        const activo = ref(false)

        /**
         * Cambia la compañia que se va a mostrar
         * 
         * @param el objeto con los valores de la compañia actual
         * 
         */
        const changeCompany = (company) => {
            changeValueCompany(company)
            activar()
        }

        /**
         * completa los datos de la compañia actual
         * 
         * @param company el objeto con los valores de la compañia actual
         */
        const changeValueCompany = (company) => {
            companyActual.value.id = company.id
            companyActual.value.name_fantasy = company.name_fantasy
        }

        /**
         * 
         * Cada vez que se cambie la compañia seleccionada se cambiara en el localStorage
         * 
         */
        watch(companyActual.value, () => {
            localStorage.setItem('id_company_selected', companyActual.value.id)
        })

        const companySelected = async () => {
            const client = new GraphQLClient(endpoint)
            await client.rawRequest(/* GraphQL */ `
            query($id: ID) {
                user(id: $id) {
                    name, email,
                    companies {
                        id,
                        name_fantasy
                    }
                }
            }`,
            {
                id: store.state.user_id
            })
            .then( (data) => {
                let companiesData = data.data.user.companies
                companiesData.forEach(company => {
                    if (company.id == localStorage.getItem('id_company_selected')) {
                        changeValueCompany(company)
                    }
                    companies.value.push({id: company.id, name_fantasy: company.name_fantasy})
                })
            })
            .catch(error => console.log(error))
            return
        }

        watchEffect(() => {
            store.state.company_id
            if (store.state.user_id) {
                companySelected()
            }
        })

        const activar = () => {
            activo.value = !activo.value
        }

        // Oculta el Selector de company cuando se hace click fuera de este
        document.addEventListener('click', function(e) {
            let clic = e.target.getAttribute('id')
            if ((clic != "select-company") && (e.path[1].getAttribute('id') != 'select-company')) {
                activo.value = false
            }
        }, false)

        return {
            activo,
            activar,
            changeCompany,

            companies,
            companyActual,
        }
    }
}
</script>

<style>

</style>