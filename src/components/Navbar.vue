<template>
  <div>
    <nav class="navbar shadow-navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="https://bulma.io">
          <img src="../assets/logo_crenein.png" >
        </a>

        <div class="group-navbar">
          <button v-show="isMobile" @click="showOption" class="button p-2 mr-4">
            <img src="../assets/menu_apps.png" width="35" alt="">
          </button>
          <a @click="OpenMenuNavbar" role="button" class="navbar-burger" :class="{'is-active':menuNavbar}" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
        
      </div>

      <div id="navbarBasicExample" class="navbar-menu" :class="{'is-active':menuNavbar}">
        <!-- <div class="navbar-start"></div> -->

        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons" :class="{'buttons-mobile':isMobile}">
              <SelectCompany/>
              <button v-show="!isMobile" @click="showOption" class="button p-2 mr-4">
                <!-- <img src="../assets/menu_apps.png" alt=""> -->
                <i class="fas fa-th menu-app"></i>
              </button>
              <a href="#">
                <img class="circle" src="../assets/perfil.jpg" alt="">
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { inject } from '@vue/runtime-core'
import SelectCompany from './SelectCompany.vue'
export default {
  name: 'Navbar',

  components: {
    SelectCompany,
  },

  setup(){
    const optionActive = ref(false)
    const menuNavbar = ref(false)
    const isMobile = inject('isMobile')

    const showOption = () => {
      optionActive.value = !optionActive.value
      console.log(optionActive.value)
    }

    const OpenMenuNavbar = () => {
      menuNavbar.value = !menuNavbar.value
      console.log(menuNavbar.value)
    }

    return{
      optionActive,
      isMobile,
      menuNavbar,
      showOption,
      OpenMenuNavbar,
    }
  }

}
</script>

<style>
.buttons-mobile {
  flex-direction: row-reverse;
  justify-content: flex-end;
}

.shadow-navbar{
  box-shadow: 0px 4px 4px 0px rgb(0, 0, 0, 25%);
}

.circle{
  border-radius: 50%;
}

.group-navbar{
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-left: auto;
}

.menu-app {
  font-size: 23px;
  color: #A9A9A9;
}
</style>