<template>
  
    <div v-show="isMobile==false" class="column tam-box mt-2 container  has-text-centered">
        <div class="column title-box ">
            <h2 class="color-letras">{{$t('contraseña.msmRecupera')}}</h2>
        </div>
        <div class="column is-centered cuadro-border">
            <form class="column  mx-5  px-0">
                <CampoForm v-if="valorLocale=='en'" place="Email" type="text" />
                <CampoForm v-if="valorLocale=='es'" place="Correo" type="text" />
            </form>
            <div class="column mx-5 ">
                <div class="columns">
                    <div class="column px-0 is-flex-grow-0 ">
                        <button class=" button color-btn has-background-danger ">{{$t('contraseña.cancel')}}</button>
                    </div>
                    <div class="column has-text-right  px-0  " >
                            <button class="button tam-btn color-btn title-box">{{$t('contraseña.enviar')}}</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div v-show="isMobile==true" class="column tam-box mt-2 container has-text-centered  ">
        <div class="column title-box">
            <h2 class="color-letras">{{$t('contraseña.msmRecupera')}}</h2>
        </div>
        <div class="column  cuadro-border" >
            <form class="column  mx-5  px-0" >
                <CampoForm v-if="$i18n.locale=='en'" place="Email" type="text" />
                <CampoForm v-if="$i18n.locale=='es'" place="Correo" type="text" />

                <div class="column ">
                    <button class="button  color-btn title-box " style="width:100%">{{$t('contraseña.enviar')}}</button>
                    <button class="button color-btn has-background-danger mt-2 " style="width:100%">{{$t('contraseña.cancel')}}</button>
                </div>
              
                
                
            </form>
        </div>
    </div>


</template>

<script>
import CampoForm from '../../components/CampoForm.vue'
import { inject, watchEffect } from '@vue/runtime-core'
import { ref } from '@vue/reactivity'
import i18n from '@/i18n.js'
export default {
    
    name:'RecoverPass1',
    components:{
        CampoForm
    }, 
    setup(){
        const isMobile = inject('isMobile')
        const valorLocale = ref('')

        watchEffect(()=>{
            valorLocale.value = i18n.global.locale
            console.log(valorLocale.value)
        })
        

        return { 
            isMobile,
            valorLocale
        }
    }

}
</script>

<style scoped>

.cuadro-border{

    box-shadow:0px 5px 12px;
}

.title-box{
    background-color:#005395;
   
}

.input2{
    width:14rem;
    
}
.color-letras{
    color:white;
    font-family: Arial,  sans-serif;
    font-weight: bold;
}

.color-btn{
    color:white;
    font-size: 0.9em;
    font-weight: 20px;
    font-family: Arial,  sans-serif;
    
}
.tam-btn{
    width: 16rem;
}

.tam-box{
    width: 28rem;
}


.color-btn:hover{
     color:white;
}
.color-btn:focus{
    color:white;
}

@media screen and (max-width: 1000px) {

  .input2 {
    width: 100%; /* The width is 100%, when the viewport is 800px or smaller */
  }
   .tam-btn {
    width: 100%; /* The width is 100%, when the viewport is 800px or smaller */
  }
}



</style>