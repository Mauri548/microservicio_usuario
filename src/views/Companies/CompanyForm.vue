<template>
    <form>
        <CampoForm v-model="nameFantasy" type="text"
            :place="$i18n.locale=='en'? 'Name fantasy': 'Nombre de fantasia'"  
            :required="true" 
            :error="msg_error.nameFantasy" 
        />

        <CampoForm v-model="bussinesName" type="text"
            :place="$i18n.locale=='en'? 'Business name': 'Nombre del negocio'" 
            :required="true" 
            :error="msg_error.bussinesName" 
        />

        <CampoForm v-model="owner" type="text"
            :place="$i18n.locale=='en'? 'Owner': 'Propietario'"
        />

        <CampoForm v-model="cuit" place="Cuit" type="number" 
            :required="true" :error="msg_error.cuit" 
        />

        <CampoForm v-model="email" type="email"
            :place="$i18n.locale=='en'? 'Email': 'Correo'" 
            :required="true" 
            :error="msg_error.email" 
        />

        <CampoForm v-model="phone" type="number"
            :place="$i18n.locale=='en'? 'Phone': 'Teléfono'" 
        />

        <div class="mb-4">
            <div class="select w-100" style="position: relative">
                <select class="w-100 mb-4" v-model="selectTaxCondition" >
                    <option disabled selected :value="0">Condición Fiscal</option>
                    <option v-for="condition in taxCondition" 
                        :key="condition.id" 
                        :value="condition.value"
                     >
                        {{condition.name}}
                    </option>
                </select>
                <span class="required">*</span>
            </div>
            <p v-show="msg_error.taxCondition" class="msg-error">{{msg_error.taxCondition}}</p>
        </div>

        <CampoForm v-model="direction" type="text"
            :place="$i18n.locale=='en'? 'Direction': 'Dirección'"
        />

        <CampoForm v-model="location" type="text"
            :place="$i18n.locale=='en'? 'Location': 'Localidad'" 
            :required="true" 
            :error="msg_error.location" 
        />

        <CampoForm v-model="province" type="text"
            :place="$i18n.locale=='en'? 'Province': 'Provincia'" 
            :required="true" 
            :error="msg_error.province" 
        />

        <CampoForm v-model="country" type="text"
            :place="$i18n.locale=='en'? 'Country': 'País'" 
            :required="true" 
            :error="msg_error.country" 
        />

        <div class="field is-grouped is-justify-content-space-between">
            <Button class="has-background-danger cancel"
                >
                {{$t('personalForm.cancel')}}
            </Button>
            <Button class="accept" :loading="isLoading"
                @click="register"
                >
                {{$t('personalForm.guardar')}}
            </Button>
        </div>

    </form>
</template>

<script>
import CampoForm from '../../components/CampoForm.vue'
import Button from '../../components/Buttons/Button.vue'
import { ref } from '@vue/reactivity'

export default {
    name: 'CompanyForm',

    components: {
        CampoForm,
        Button,
    },

    props: [
        'nameFantasy',
        'bussinesName', 
        'owner', 
        'cuit', 
        'email',
        'phone', 
        'direction', 
        'location', 
        'province', 
        'country', 
        'selectTaxCondition', 
        'isLoading',
        'msg_error'
    ],

    emits: ['onSaveChange'],

    setup(props,{emit}) {
        const taxCondition = ref([
            {id: 1 ,name: 'IVA Responsable Inscripto', value: 'IVA_Resp_Inscripto'},
            {id: 2 ,name: 'IVA Sujeto Exento', value: 'IVA_Sujeto_Exento'},
            {id: 3 ,name: 'Consumidor Final', value: 'Consumidor_Final'},
            {id: 4 ,name: 'Responsable Monotributo', value: 'Resp_Monotributo'},
            {id: 5 ,name: 'Cliente Exterior', value: 'Cliente_Exterior'},
        ])

        const register = () => {
            let data = {
                nameFantasy: props.nameFantasy,
                bussinesName: props.bussinesName, 
                owner: props.owner, 
                cuit: props.cuit, 
                email: props.email,
                phone: props.phone, 
                direction: props.direction, 
                location: props.location, 
                province: props.province, 
                country: props.country, 
                selectTaxCondition: props.selectTaxCondition, 
            }
            emit("onSaveChange", data)
        }

        return {
            taxCondition, register
        }
    }
}
</script>

<style scoped>
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

.accept {
    width: 70%;
}
.cancel {
    width: 28%;
}
</style>