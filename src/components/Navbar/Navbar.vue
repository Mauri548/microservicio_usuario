<template>
  <div>
    <nav class="navbar shadow-navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="#">
          <img src="@/assets/logo_crenein.png" style="max-height: 3rem">
        </a>
        
        <div class="group-navbar">
          <MenuApp v-show="isMobile" />
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
              <!-- <button @click="cambiar" class="button blue-crenein has-text-weight-semibold">{{text}}</button> -->
              <ButtonLang  />
              <SelectCompany/>
              <MenuApp v-show="!isMobile"/>
              <MenuPerfil/>
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


export default {
  name: 'Navbar',

  components: {
    SelectCompany,
    MenuApp,
    MenuPerfil,
    ButtonLang,
    
  },


  setup(){
    const optionActive = ref(false)
    const menuNavbar = ref(false)
    const isMobile = inject('isMobile')
    let Lan = store.state.cambio_lang


    const showOption = () => {
      optionActive.value = !optionActive.value
      console.log(optionActive.value)
    }

    

    const OpenMenuNavbar = () => {
      store.commit('setActiveMenuMovile')
    }

    watchEffect(() => {
      menuNavbar.value = store.state.active_menu_movile
    })

    return{
      
      Lan,
      optionActive,
      isMobile,
      menuNavbar,
      showOption,
      OpenMenuNavbar,
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

</style>