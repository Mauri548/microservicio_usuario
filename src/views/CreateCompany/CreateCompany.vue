<template>
    <div class="conteiner-create-company">
        <div class="has-text-centered has-text-weight-bold py-4 is-size-4 blue-crenein">
            <h1 v-t="'createCompany.crear'"></h1>
        </div>
        <div>
            <CompanyForm
                :nameFantasy="nameFantasy"
                :bussinesName="bussinesName"
                :owner="owner"
                :cuit="cuit"
                :email="email"
                :phone="phone"
                :selectTaxCondition="selectTaxCondition"
                :direction="direction"
                :location="location"
                :province="province"
                :country="country"
                :isLoading="isLoading"
                :msg_error="msg_error"
                @onSaveChange="saveChange"
            />
        </div>
    </div>
</template>

<script>
import store from '@/store'
import FetchMe from '../../helper/FetchMe'
import { ref } from '@vue/reactivity'
import isEmpty from '../../helper/FieldIsEmpty'
import { GraphQLClient } from 'graphql-request'
import { useRouter } from 'vue-router'
import emailValidate from '../../helper/EmailValidate'
import { watchEffect } from '@vue/runtime-core'
import CompanyForm from '../Companies/CompanyForm.vue'


export default {
    components: {
        CompanyForm
    },

    setup() {
        const nameFantasy = ref('')
        const bussinesName = ref('')
        const owner = ref('')
        const cuit = ref('')
        const email = ref('')
        const phone = ref('')
        const direction = ref('')
        const location = ref('')
        const province = ref('')
        const country = ref('')
        const selectTaxCondition = ref(0)
        const msg_error = ref({nameFantasy: '', bussinesName: '', cuit: '', email: '', taxCondition: '',
            location: '', province: '', country: ''
        })
        const endpoint = store.state.url_backend
        const router = useRouter()
        const isLoading = ref(false)

        /**
         * 
         * Setea los valores de los mensajes de error a vacio
         * 
         */
        const resetErrorMessage = () => {
            for (let i in msg_error.value) {
                msg_error.value[i] = ''
            }
        }

        const register = async () => {
            isLoading.value = true
            resetErrorMessage()

            if (isValid()) {
                await createCompany()
            }

            isLoading.value = false
        }

        const isValid = () => {
            fieldsIsEmpty()

            for (let i in msg_error.value) {
                if (msg_error.value[i] != '') return false
            }
            return true
        }

        /**
         * 
         * Verifica si los campos requeridos estan vacios
         * 
         */
        const fieldsIsEmpty = () => {
            isEmpty(nameFantasy.value, msg_error.value ,'nameFantasy')
            isEmpty(bussinesName.value, msg_error.value , 'bussinesName')
            isEmpty(cuit.value, msg_error.value , 'cuit')
            
            if (!isEmpty(email.value, msg_error.value , 'email')) {
                emailValidate(email.value, msg_error.value)
                
            }
            isEmpty(location.value, msg_error.value , 'location')
            isEmpty(province.value, msg_error.value , 'province')
            isEmpty(country.value, msg_error.value , 'country')

            if (selectTaxCondition.value == 0) {
                msg_error.value.taxCondition = 'Este campo no puede estar vacio'
            }
        }

        const createCompany = async () => {
            const client = new GraphQLClient(endpoint)
            await client.rawRequest(/* GraphQL */ `
            mutation($name_fantasy: String!, $business_name: String!, $owners: String, 
                $cuit: String!, $email: String!, $phones: String, $tax_condition: Tax_condition!,
                $direction: String, $location: String!, $province: String!, $country: String!, $user_id: ID) {
                    createsUse_company(input: {
                        name_fantasy: $name_fantasy,
                        business_name: $business_name,
                        owners: $owners,
                        cuit: $cuit,
                        email: $email,
                        phones: $phones,
                        tax_condition: $tax_condition,
                        direction: $direction,
                        location: $location,
                        province: $province,
                        country: $country,
                        user_id: $user_id
                    }) {
                        id, name_fantasy, business_name, owners, cuit, email, phones, tax_condition,
                        direction, location, province, country, user_id,
                        users {
                            id, name, email
                        }
                    }
                }
            `,
            {
                name_fantasy: nameFantasy.value, 
                business_name: bussinesName.value, 
                owners: owner.value, 
                cuit: cuit.value, 
                email: email.value, 
                phones: phone.value, 
                tax_condition: selectTaxCondition.value,
                direction: direction.value, 
                location: location.value,
                province: province.value, 
                country: country.value, 
                user_id: store.state.user_id
            },
            {
                authorization: `Bearer ${localStorage.getItem('user-token')}`
            })
            .then((data) => {
                
                store.commit("setCreatingCompany",false)
                localStorage.setItem('id_company_selected', data.data.createsUse_company.id)
                store.commit("setCompanyId", data.data.createsUse_company.id)
                setTimeout(() => {
                    router.push({name: 'CreateFinishedCompany'})
                },2000)
            })
        }

        watchEffect( async () => {
            await FetchMe()
            console.log(store.state.comes_from_register)
            if (store.state.comes_from_register) {
                store.commit("setCreatingCompany",true)
                store.commit("setComesfromRegister", false)
            }
        })

        /**
         * 
         * Guarda los valores ingresado en el campo y recibido por el componente "CompanyForm"
         * 
         * @param data es un objeto con los campos del formulario
         * 
         */
        const saveChange = (data) => {
            nameFantasy.value = data.nameFantasy
            bussinesName.value = data.bussinesName 
            owner.value = data.owner 
            cuit.value = data.cuit 
            email.value = data.email
            phone.value = data.phone 
            direction.value = data.direction 
            location.value = data.location 
            province.value = data.province 
            country.value = data.country 
            selectTaxCondition.value = data.selectTaxCondition
            register()
        }

        return {
            nameFantasy, bussinesName, owner, cuit, email, phone, direction, 
            location, province, country, selectTaxCondition, msg_error,
            isLoading,

            register, saveChange
        }
    }
}
</script>

<style scoped>
.conteiner-create-company {
    width: 80%;
    margin: 20px auto;
}

@media (min-width: 1024px) {
    .conteiner-create-company {
        width: 40%;
        margin: auto;
    }
}

</style>