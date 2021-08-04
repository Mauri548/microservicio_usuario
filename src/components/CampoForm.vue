<template>
    <div class="form-row">
      <input class="input" :type="type" required>
      <label alt="Label" :data-placeholder="place" style="color: grey"></label>
    </div>
</template>

<script>
export default {

    name:'CampoForm',
    props: {
      place:String,
      type:String
    },
    
}
</script>

<style scoped>

form {

  padding: 1rem;
  background-color: #fff;
  width: 22rem;

}
.form-row {
  margin-bottom: 1rem;
  position: relative;
}
.form-row:last-child {
  margin-bottom: 0;
}

form .form-row input {
  box-sizing: border-box;
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  transition: all 0.5s ease-in-out;
  outline: 0;
}

form .form-row input + label[data-placeholder] {
  pointer-events: none;
}
form .form-row input + label[data-placeholder]:after {
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

form .form-row input:focus, form .form-row input:valid {
  border: 1px solid #005395;
}
form .form-row input:focus + label[data-placeholder]:after, form .form-row input:valid + label[data-placeholder]:after {
  transform: translate(-5%, -150%) scale(0.9, 0.9);
  color: #005395;
  background-color: white;
}


@media screen and (max-width: 1000px) {

   
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