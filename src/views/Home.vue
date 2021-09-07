<template>
  <div>
      <Navbar />
      <div class="contenedor-principal mt-5">
          <NavbarV />
          <router-view/>
      </div> 
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from '../components/Navbar/Navbar.vue'
import NavbarV from '../components/NavbarV/NavbarV.vue'
import EditCompany from '../views/Companies/EditCompany.vue'
import AddPermission from '../views/Permissions/AddPermission.vue'

export default {
  name: 'Home',
  components: {
    Navbar,
    NavbarV,
    AddPermission,
    EditCompany,
  }
}
</script>

<style scoped>
.contenedor-principal {
  display: flex;
  flex-wrap: wrap;
}

/* @media (max-width: 1024px) {
  .contenedor-principal {
    width: 100%;
  }
} */
</style>
