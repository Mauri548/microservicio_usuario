<template>
  <div>
      <Navbar />
  
      <InviteUser /> 
     <!--  <div class="is-flex mt-5">
        <NavbarV />
        <router-view/>
      </div>  -->
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from '../components/Navbar/Navbar.vue'
import NavbarV from '../components/NavbarV/NavbarV.vue'
import InviteUser from '../views/InviteUser/InviteUser.vue'
export default {
  name: 'Home',
  components: {
    Navbar,
    NavbarV,
    InviteUser
  }
}
</script>
