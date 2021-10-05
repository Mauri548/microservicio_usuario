<template>
    <div class="conteiner-create-company">
        <div class="has-text-centered has-text-weight-bold py-4 is-size-4 blue-crenein">
            <h1 v-t="'createCompany.crear'"></h1>
        </div>
        <div>
            <form>
                <!-- <CampoForm type="text" :place="$i18n.locale=='en'? 'Name': 'Nombre'" v-model="name" :error="msg_error.name" /> -->

                <CampoForm :place="$i18n.locale=='en'? 'Name fantasy': 'Nombre de fantasia'" type="text" :required="true" />

                <CampoForm :place="$i18n.locale=='en'? 'Business name': 'Nombre del negocio'" type="text" :required="true" />

                <CampoForm :place="$i18n.locale=='en'? 'Owner': 'Propietario'" type="text" />

                <CampoForm place="Cuit" type="number" :required="true" />

                <CampoForm :place="$i18n.locale=='en'? 'Email': 'Correo'" type="email" :required="true" />

                <CampoForm :place="$i18n.locale=='en'? 'Phone': 'Teléfono'" type="number" />

                <CampoForm :place="$i18n.locale=='en'? 'Tax condition': 'Condición Fiscal'" type="text" :required="true" />

                <CampoForm :place="$i18n.locale=='en'? 'Direction': 'Dirección'" type="text" />

                <CampoForm :place="$i18n.locale=='en'? 'Location': 'Localidad'" type="text" :required="true" />

                <CampoForm :place="$i18n.locale=='en'? 'Province': 'Provincia'" type="text" :required="true" />

                <CampoForm :place="$i18n.locale=='en'? 'Country': 'País'" type="text" :required="true" />

                <div class="field is-grouped is-justify-content-space-between">
                    <button type="button" class="button has-background-danger has-text-weight-semibold has-text-white cancel">{{$t('personalForm.cancel')}}</button>
                    <button type="button" class="button btn-crenein accept">{{$t('personalForm.guardar')}}</button>
                </div>

            </form>
        </div>
    </div>
</template>

<script>
import CampoForm from '../../components/CampoForm.vue'

export default {
    components: {
        CampoForm
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

@media (min-width: 1024px) {
    .conteiner-create-company {
        width: 40%;
        margin: auto;
    }
}

</style>