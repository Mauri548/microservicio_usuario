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
import { onMounted } from '@vue/runtime-core'
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
  },

  setup(){
    onMounted(() => {
        let input = document.querySelectorAll('.input-prueba')
        console.log(input)
  
        input.forEach(item => {
          item.addEventListener('keyup',function(e) {
            console.log(this)
            if (this.value.length > 0) {
              this.classList.add('active')
            } else {
              this.classList.remove('active')
            }
          })
        })
      })
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
