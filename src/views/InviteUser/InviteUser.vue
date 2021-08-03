<template>
  
        <div class="column  is-half is-offset-one-quarter mt-5 " >

            <div class="column has-text-centered " >

                <h2  style="font-weight:bold; font-size:1.6em">There is only one more step left!
                invite users to your company to 
                help you manage it</h2>

                <h3 class="mt-4">Enter the email of the person you want to invite</h3>
                <div class=" field has-addons column "  >
                    
                        <input class="input" type="text" placeholder="Email">
                        <button class="button is-info">Send</button>
                   
                </div>
                <button class=" mt-4 px-6 button btn">Continue</button>

            </div>
    

        
        </div>


</template>

<script>
import { inject } from '@vue/runtime-core'

export default {
    name:'InviteUser',
    setup(){
        const isMobile = inject('isMobile')
        return{ 
            isMobile
        }
    }

}
</script>

<style scoped>


.btn{
    background-color:#005395;
    color:white;
    font-weight:bold;
    border-color: #0a518b;
}

.ancho{
    width:600px ;
}


.margen-campo{
    margin-left:103px;
    
}

.ancho-campo{
    width:278px;
    margin-left:140px;
}


@media screen and (max-width: 990px) {

  .ancho-campo{
    width:278px;
    margin-left:0px;
}

  

}


</style>