<template>
  <div>
      <Navbar />
      


      <AddPermission />
     <!--  <InviteUser />  -->

   <!--    <div class="is-flex mt-5">
        <NavbarV />
        <router-view/>
      </div>  -->
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from '../components/Navbar/Navbar.vue'
import NavbarV from '../components/NavbarV/NavbarV.vue'
/* import InviteUser from '../views/InviteUser/InviteUser.vue' */

import AddPermission from '../views/Permissions/AddPermission.vue'
import AddApp from '../views/Apps/Add.vue'
import EditApp from '../views/Apps/Edit.vue'

export default {
  name: 'Home',
  components: {
    Navbar,
    NavbarV,
    AddPermission,
   
/*     InviteUser */
    /* AddApp,
    EditApp */

  }
}
</script>
