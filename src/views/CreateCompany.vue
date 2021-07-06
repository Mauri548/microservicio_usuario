<template>
    <div class="mt-6 shadow" style="width: 50%; margin: auto">
        <h1 class="pt-2 has-text-weight-bold is-size-4">Create Company</h1>
        <!-- <hr class="my-2 has-background-info"> -->
        <div class="columns">
            <div class="column is-flex is-justify-content-space-between mt-2">
                <div class="w-100 section-form"><h3>Data</h3></div>
                <div class="w-100"><h3>Apps</h3></div>
                <div class="w-100"><h3>Resumen</h3></div>
            </div>
        </div>
        <div class="w-100">
            <form action="" style="width: 40%; margin: auto">
                <CampoForm place="Name fantasy" type="text" />
                <CampoForm place="Bussines name" type="text" />
                <CampoForm place="Owner" type="text" />
                <CampoForm place="Cuit" type="number" />
                <CampoForm place="Email" type="email" />
                <CampoForm place="Phone" type="number" />
                <CampoForm place="Tax condition" type="text" />
                <CampoForm place="Direcction" type="text" />
                <CampoForm place="Location" type="text" />
                <CampoForm place="Province" type="text" />
                <CampoForm place="Country" type="text" />
            </form>
        </div>
    </div>
</template>

<script>
import CampoForm from '../components/CampoForm.vue'
export default {
    name: 'CreateCompany',
    components: {
        CampoForm
    },
}
</script>

<style scoped>
.section-form {
    border-bottom: 2px solid #005395;
}

</style>