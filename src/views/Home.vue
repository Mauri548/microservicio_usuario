<template>
  <div>
    <Navbar />
    <NavbarV />
    


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
