<template>
  <div>
    <Navbar />

    <div class="is-flex mt-5">
      <NavbarV />
      <router-view/>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from '../components/Navbar/Navbar.vue'
import NavbarV from '../components/NavbarV/NavbarV.vue'
export default {
  name: 'Home',
  components: {
    Navbar,
    NavbarV,
  }
}
</script>
