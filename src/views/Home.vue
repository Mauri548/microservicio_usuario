<template>
  <div>
    <Navbar />
    <router-view/>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from '../components/Navbar/Navbar.vue'

export default {
  name: 'Home',
  components: {
    Navbar
  }
}
</script>
