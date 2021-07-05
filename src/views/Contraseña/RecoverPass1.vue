<template>
  

    <div class="column is-4 mt-2 container is-centered  ">
                <div class="column title-box">
                    <h2 class="color-letras">Recover your password</h2>
                </div>
                <div class="column is-centered cuadro-border">
                    <div class="column  mx-5  px-0">
                        <input  class="input  " type="text" placeholder="Email"  />
                    </div>
                    <div class="column mx-5 ">
                        <div class="columns">
                            <div class="column px-0 is-flex-grow-0 ">
                                <button class=" button color-btn has-background-danger ">Cancel</button>
                            </div>
                            <div class="column has-text-right  px-0  " >
                                    <button class="button tam-btn color-btn title-box">Send</button>
                            </div>
                        </div>
                    </div>
                </div>
    </div>


</template>

<script>
export default {
    name:'RecoverPass1'
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
    width: 17rem;
  
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