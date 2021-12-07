<template>
    <button type="button" 
      class="button btn-crenein" :class="{'is-loading': loading}"
      :disabled="loading"
      >
        <slot></slot>
    </button>
</template>

<script>
export default {
    name: 'Button',
    props: ['loading']
}
</script>

<style scoped>
.btn-crenein {
  background: #005395;
  color: #fff;
  font-weight: 600;
}

.btn-crenein:hover {
  background: #0572ca;
  color: #fff;
}
.btn-crenein:focus {
  color: #fff
}

</style>