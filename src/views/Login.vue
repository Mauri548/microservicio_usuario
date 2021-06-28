<template>

        <div class="column is-mobile is-3 container mt-2 mb-2 borde-form" style="border:1px solid grey;">

            <div class="column is-mobile" >
                <img src="../assets/logo_crenein.png" width="250" height="200" alt="">
            </div>
        
            <div class="column is-mobile">
                <form>

                    <div class="column  is-mobile " >

                        <div class="columns  is-centered">

                            <div class="column  pb-2 ">

                                 <label class="label"><i class="fas fa-user-alt"></i></label>

                            </div>
                            <div class="column has-text-left pl-0">
                                <div class="control ">
                                    <input class="input input2 " type="text" placeholder="Password">
                                </div>
                            </div>
                        </div>
                    </div>
                
                    <div class="column is-mobile ">

                        <div class="columns  is-centered">

                            <div class="column pb-2">

                                 <label class="label"><i class="fas fa-lock"></i></label>

                            </div>
                            <div class="column  has-text-left pl-0">
                                <div class="control">
                                    <input class="input input2 " type="text" placeholder="Password">
                                </div>
                            </div>
                        </div>
                    </div>
                    

                    <div class="column">
                        <button class="button button2 has-text-white" style="font-weight:5px;">Login</button>
                        <p style="color: #005395">¿Olvidaste tu contraseña?</p>
                    </div>

                    <div class="column is-mobile">
                        <p >o inicia sesion usando: </p>
                        <button class="button button2 has-background-info has-text-white" >f</button>
                        <button class="button mt-1 button2 has-background-danger has-text-white" >g</button>
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





.button2{
    width:16rem;
    background-color:#005395;
}

.input2{
    width:13rem;
}

.borde-form{
    box-shadow: -2px 2px 10px;
}

</style>