<template>
  	<div>
		<div class="form-row columns is-mobile mb-1">
			<div class="column">
				<div class="control">
					<input class="input" :type="type"  v-model="modelValue"
					@input="$emit('update:modelValue', $event.target.value)"
					:class="{'active': modelValue}"
					>
					<label alt="Label" :data-placeholder="place" style="color: grey"></label>
				</div>
				<p v-show="error != '' && error" class="msg-error">{{error}}</p>
			</div>
		</div>
  	</div>
</template>

<script>
import {ref} from 'vue';
export default {

    name:'CampoFormPass',
    props: ['place','type','modelValue','error'],

    setup() {

         const type = ref('password');
         let password = ref('');

        const switchVisibility = () => {
            type.value = type.value === 'password' ? 'text' : 'password'
        }

        return {
            type,
            password,
            switchVisibility,

        }

    }
    



}
</script>

<style scoped>

.msg-error{
  font-size: .7em;
  color: red
}

form {
  /* Temp */
  padding: 1rem;
  background-color: #fff;
/*   border: 1px solid #ddd;
  border-radius: 4px; */
  width: 20rem;
  /* End Temp */
}
form .form-row {
  margin-bottom: 1rem;
  position: relative;
}
form .form-row:last-child {
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
form .form-row input:focus, form .form-row input.active {
  border: 1px solid #005395;
}
form .form-row input:focus + label[data-placeholder]:after, form .form-row input.active + label[data-placeholder]:after {
  transform: translate(-5%, -150%) scale(0.9, 0.9);
  color: #005395;
  background-color: white;
}

.btn{
    background-color: white; 
     
    color:#005395;
    
}

/* .btn:hover{
    
    color:white;
} */




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