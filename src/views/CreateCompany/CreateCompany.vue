<template>
    <div class="conteiner-create-company">
        <div class="has-text-centered has-text-weight-bold py-4 is-size-4 blue-crenein">
            <h1 v-t="'createCompany.crear'"></h1>
        </div>
        <div>
            <form>
                <!-- <CampoForm type="text" :place="$i18n.locale=='en'? 'Name': 'Nombre'" v-model="name" :error="msg_error.name" /> -->

                <CampoForm v-model="nameFantasy" :place="$i18n.locale=='en'? 'Name fantasy': 'Nombre de fantasia'" type="text" :required="true" :error="msg_error.nameFantasy" />

                <CampoForm v-model="bussinesName" :place="$i18n.locale=='en'? 'Business name': 'Nombre del negocio'" type="text" :required="true" :error="msg_error.bussinesName" />

                <CampoForm v-model="owner" :place="$i18n.locale=='en'? 'Owner': 'Propietario'" type="text" />

                <CampoForm v-model="cuit" place="Cuit" type="number" :required="true" :error="msg_error.cuit" />

                <CampoForm v-model="email" :place="$i18n.locale=='en'? 'Email': 'Correo'" type="email" :required="true" :error="msg_error.email" />

                <CampoForm v-model="phone" :place="$i18n.locale=='en'? 'Phone': 'Teléfono'" type="number" />

                <!-- <CampoForm :place="$i18n.locale=='en'? 'Tax condition': 'Condición Fiscal'" type="text" :required="true" /> -->
                <div class="mb-4">
                    <div class="select w-100" style="position: relative">
                        <select class="w-100 mb-4" v-model="selectTaxCondition" >
                            <option disabled selected :value="0">Condición Fiscal</option>
                            <option v-for="condition in taxCondition" :key="condition.id" :value="condition">{{condition.name}}</option>
                        </select>
                        <span class="required">*</span>
                    </div>
                    <p v-show="msg_error.taxCondition" class="msg-error">{{msg_error.taxCondition}}</p>

                </div>

                <CampoForm v-model="direction" :place="$i18n.locale=='en'? 'Direction': 'Dirección'" type="text" />

                <CampoForm v-model="location" :place="$i18n.locale=='en'? 'Location': 'Localidad'" type="text" :required="true" :error="msg_error.location" />

                <CampoForm v-model="province" :place="$i18n.locale=='en'? 'Province': 'Provincia'" type="text" :required="true" :error="msg_error.province" />

                <CampoForm v-model="country" :place="$i18n.locale=='en'? 'Country': 'País'" type="text" :required="true" :error="msg_error.country" />

                <div class="field is-grouped is-justify-content-space-between">
                    <button type="button" class="button has-background-danger has-text-weight-semibold has-text-white cancel">{{$t('personalForm.cancel')}}</button>
                    <button type="button" class="button btn-crenein accept" @click="register">{{$t('personalForm.guardar')}}</button>
                </div>

            </form>
        </div>
    </div>
</template>

<script>
import CampoForm from '../../components/CampoForm.vue'
import store from '@/store'
import FetchMe from '../../helper/FetchMe'
import { ref } from '@vue/reactivity'
import isEmpty from '../../helper/FieldIsEmpty'
import { GraphQLClient } from 'graphql-request'
import { useRouter } from 'vue-router'
import emailValidate from '../../helper/EmailValidate'


export default {
    components: {
        CampoForm
    },

    created(){
        store.commit("setCreatingCompany",true)
        FetchMe()
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
        const taxCondition = ref([
            {id: 1 ,name: 'IVA Responsable Inscripto', value: 'IVA_Resp_Inscripto'},
            {id: 2 ,name: 'IVA Sujeto Exento', value: 'IVA_Sujeto_Exento'},
            {id: 3 ,name: 'Consumidor Final', value: 'Consumidor_Final'},
            {id: 4 ,name: 'Responsable Monotributo', value: 'Resp_Monotributo'},
            {id: 5 ,name: 'Cliente Exterior', value: 'Cliente_Exterior'},
        ])
        const selectTaxCondition = ref(0)
        const msg_error = ref({nameFantasy: '', bussinesName: '', cuit: '', email: '', taxCondition: '',
            location: '', province: '', country: ''
        })
        const endpoint = store.state.url_backend
        const router = useRouter()

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

        const register = () => {
            resetErrorMessage()

            if (isValid()) {
                createCompany()
            }
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

        const createCompany = () => {
            const client = new GraphQLClient(endpoint)
            client.rawRequest(/* GraphQL */ `
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
                tax_condition: selectTaxCondition.value.value,
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
                router.push({name: 'CreateFinishedCompany'})
            })
        }


        return {
            nameFantasy, bussinesName, owner, cuit, email, phone, direction, 
            location, province, country, taxCondition, selectTaxCondition, msg_error,

            register
        }
    }
}
</script>

<style scoped>
.conteiner-create-company {
    width: 80%;
    margin: 20px auto;
    
}
.accept {
    width: 70%;
}
.cancel {
    width: 28%;
}


.required{
  color: red;
  position: absolute;
  left: -6px;
  top: -9px;
}

.msg-error{
  font-size: .7em;
  color: red
}

@media (min-width: 1024px) {
    .conteiner-create-company {
        width: 40%;
        margin: auto;
    }
}

</style>