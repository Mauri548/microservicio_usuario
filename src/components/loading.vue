<template>
    <div class="loader-wrapper is-active-loading py-3">
        <div class="loader is-loading"></div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>

.loader-wrapper {
  position: relative;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  opacity: 0;
  z-index: -1;
  transition: opacity .3s;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
}
.loader {
  height: 80px;
  width: 80px;
}
.is-active-loading {
  opacity: 1;
  z-index: 1;
}
.is-loading {
  margin-top: 20px;
  color:#005395;
  border-block-color: inherit;
  position: relative;
}

</style>