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
        const companies = ref([])
        const companyActual = ref({id: '', name_fantasy: ''})

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
        const changeValueCompany = async (company) => {
            companyActual.value.id = company.id
            companyActual.value.name_fantasy = company.name_fantasy

            await fetchUserCompanyId(localStorage.getItem('user_id'))
            store.commit('setCompanyId', company.id)
        }

        const fetchUserCompanyId = async (id) => {
            const endpoint = store.state.url_backend
            const client = new GraphQLClient(endpoint)
            await client.rawRequest(/* GraphQL */`
            query($user_id: ID) {
                userscompaniesxuser(first: 999, page: 1, user_id: $user_id) {
                    data {
                        id, use_user_id, use_company_id
                    }
                }
            }`,
            {
                user_id: id
            })
            .then((data) => {
                let aux = data.data.userscompaniesxuser.data.find(item => item.use_company_id == localStorage.getItem('id_company_selected'))
                localStorage.setItem('user_company_id', aux.id)
            })
            .catch(error => console.log(error.response))
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
                companies.value = []
                let companiesData = data.data.user.companies
                companiesData.forEach(company => {
                    companies.value.push({id: company.id, name_fantasy: company.name_fantasy})
                })
            })
            .catch(error => console.log(error))
            return
        }

        watchEffect( async () => {
            localStorage.getItem('id_company_selected')
            store.state.company_id
            if (store.state.user_id) {
                await companySelected()
                if (localStorage.getItem('id_company_selected')) {
                    let company = companies.value.find(company => company.id == localStorage.getItem('id_company_selected'))
                    changeValueCompany(company)
                }
                if (!companyActual.value.id) {
                    changeValueCompany(companies.value[0])
                }
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