<template>

        <div class="column  is-mobile  container mt-2 mb-2 cuadro-form" >

            <div class="column " >
                <img src="../assets/logo_crenein.png" width="250" height="200" alt="">
            </div>
        
            <div class="column ">
                <form>

                    <div class="column mx-4 cuadro-central " >
                        
                        <div class="columns">
                            <div class="column is-flex-grow-0 pl-0 pt-4">
                                <label class="label is-size-4" style="color: #005395;"><i class="fas fa-user-alt"></i></label>
                            </div>
                            <div class="column px-0 ">
                                <div class="control ">
                                    <input class="input" type="text" placeholder="Email">
                                </div>
                            </div>    
                        </div> 

                        <div class="columns">
                            <div class="column is-flex-grow-0 pl-0 mr-1 pt-4">
                                <label class="label is-size-4" style="color: #005395;"><i class="fas fa-lock"></i></label>
                            </div>
                            <div class="column px-0 ">
                                <div class="control ">
                                    <input class="input" type="text" placeholder="Password">
                                </div>
                            </div>   

                           
                        </div> 
                        
                    </div>      

                    <div class="column">
                        <button class="button button2 has-text-white" style="font-weight:5px;">Login</button>
                        <p style="color: #005395">¿Olvidaste tu contraseña?</p>
                    </div>

                    <div class="column">
                        <p >o inicia sesion usando: </p>
                        <button class="button button2 has-background-info has-text-white" ><i class="fab fa-facebook-f"></i></button>
                        <button class="button mt-1 button2 has-background-danger has-text-white" ><i class="fab fa-google-plus-g"></i></button>
                        <p style="color: #005395">¿No eres mienbro aun?</p>
                        <p  style="color: #005395; font-weight:bold;">Registrate gratis</p>
                    </div>
                </form>
            </div>
        </div>
        
</template>

<script>

export default {
    name:'Login',
    
}
</script>

<style>



@media screen and (max-width: 800px) {
  .button2 {
    width: 100%; /* The width is 100%, when the viewport is 800px or smaller */
  }
  .input2 {
    width: 120%; /* The width is 100%, when the viewport is 800px or smaller */
  }
   .borde-form {
    width: 100%; /* The width is 100%, when the viewport is 800px or smaller */
  }
}

.button2{
    width:15rem;
    background-color:#005395;
}

.input2{
     width:12.49rem;
}

.cuadro-form{
    /* box-shadow: -2px 2px 10px; */
    width: 20rem;
}

.cuadro-central{
    width: 15rem;
}
</style>