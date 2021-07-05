<template>
  

    <div class="column tam-box mt-2 container is-centered  ">
                <div class="column title-box ">
                    <h2 class="color-letras">Recover your password</h2>
                </div>
                <div class="column is-centered  cuadro-border">
                    <!-- <div class="column  mx-5  px-0 has-background-grey"> -->
                  <!--       <form class="column  mx-5  px-0 ">
                            <div class="form-row">
                                <input type="text" required>
                                <label alt="Label" data-placeholder="New password"></label>
                            </div>
                            <div class="form-row">
                                <input type="text" required>
                                <label alt="Label" data-placeholder="Confirm password"></label>
                            </div>
                        
                        </form> -->
                    <CampoForm place="New password" type="text" />
                    <CampoForm place="Confirm password" type="text" />
                   

                    <div class="column  mx-5">

                         <div class="columns ">
                            <div class="column px-0 is-flex-grow-0 ">
                                <button class=" button color-btn has-background-danger ">Cancel</button>
                            </div>
                            <div class="column   has-text-right px-0 ">
                                <button class="button tam-btn color-btn title-box">Save</button>
                            </div>
                        </div>
                    </div>
                </div>
    </div>



</template>

<script>
import CampoForm from '../../components/CampoForm.vue';
import {ref} from 'vue';
export default {
    
    name:'RecoverPass3',
    components:{
       CampoForm
    }, 
 
}
</script>

<style scoped>


form {
  /* Temp */
  padding: 1rem;
  background-color: #fff;
/*   border: 1px solid #ddd;
  border-radius: 4px; */
  width: 22rem;
  /* End Temp */
}
form .form-row {
  margin-bottom: 1rem;
  position: relative;
}
form .form-row:last-child {
  margin-bottom: 0;
}
form .form-row input[type=text] {
  box-sizing: border-box;
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  transition: all 0.5s ease-in-out;
  outline: 0;
}
form .form-row input[type=text] + label[data-placeholder] {
  pointer-events: none;
}
form .form-row input[type=text] + label[data-placeholder]:after {
  content: attr(data-placeholder);
  display: block;
  position: absolute;
  top: 50%;
  left: 0.5rem;
  transform: translate(0%, -50%);
  transition: all 0.5s ease-in-out;
  padding: 0 0.25rem;
  background-color: rgba(255, 255, 255, 0);
}
form .form-row input[type=text]:focus, form .form-row input[type=text]:valid {
  border: 1px solid #005395;
}
form .form-row input[type=text]:focus + label[data-placeholder]:after, form .form-row input[type=text]:valid + label[data-placeholder]:after {
  transform: translate(-5%, -150%) scale(0.9, 0.9);
  color: #005395;
  background-color: white;
}



.tam-box{
    width: 28rem;
}

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
    width: 16.5rem;
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
    .form {
        /* Temp */
        padding: 1rem;
        background-color: #fff;
        /*   border: 1px solid #ddd;
        border-radius: 4px; */
        width: 100%;
        /* End Temp */
    }
}



</style>