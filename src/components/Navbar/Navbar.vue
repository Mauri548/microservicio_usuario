<template>
  <div>
    <nav class="navbar shadow-navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="#">
          <img src="@/assets/logo_crenein.png" style="max-height: 3rem">
        </a>
        
        <div class="group-navbar">
          <MenuPerfil  style="width: 30px"/>
          <MenuHamburger />
        </div>
        
      </div>

      <div id="navbarBasicExample" class="navbar-menu">

        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons" :class="{'buttons-mobile':isMobile}">
              <ButtonLang class="mb-2" />
              <SelectCompany/>
              <MenuApp v-show="!isMobile"/>
              <MenuPerfil />
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { inject, watchEffect } from '@vue/runtime-core'
import SelectCompany from './SelectCompany.vue'
import MenuApp from './MenuApp.vue'
import MenuPerfil from './MenuPerfil.vue'
import store from '@/store'
import ButtonLang from '../../components/Buttons/ButtonLang.vue'
import MenuHamburger from '../MenuHamburger.vue'


export default {
  name: 'Navbar',

  components: {
    SelectCompany,
    MenuApp,
    MenuPerfil,
    ButtonLang,
    MenuHamburger,
  },


  setup(){
    const optionActive = ref(false)
    const isMobile = inject('isMobile')
    const isTablet = inject('isTablet')
    let Lan = store.state.cambio_lang


    const showOption = () => {
      optionActive.value = !optionActive.value
    }

    return{  
      Lan,
      optionActive,
      isMobile,
      showOption,
      isTablet,
    }
  }

}
</script>

<style scoped>
.navbar-item img {
  max-height: 2.5rem;
}

.buttons-mobile {
  flex-direction: row-reverse;
  justify-content: flex-end;
}

.shadow-navbar{
  box-shadow: 0px 4px 4px 0px rgb(0, 0, 0, 25%);
}


.group-navbar{
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-left: auto;
}

@media screen and (min-width: 1024px) {
  .group-navbar {
    display: none;
  }
}

</style>