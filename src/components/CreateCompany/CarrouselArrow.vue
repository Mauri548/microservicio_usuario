<template>
    <div class="conteiner-arrow">
        <Arrow arrow="arrow-prev" icon="fa-chevron-left" :conteiner="conteiner" :punto="punto"
        :cantSection="cantSection" :desplazamiento="desplazamiento" />
        <Arrow arrow="arrow-next" icon="fa-chevron-right" :conteiner="conteiner" :punto="punto"
        :cantSection="cantSection" :desplazamiento="desplazamiento" />
    </div>
</template>

<script>
import Arrow from './Arrow.vue'
import { ref } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core'
export default {
    name: 'CarrouselArrow',

    components: {
        Arrow,
    },

    props: ['conteiner','punto','cantSection','desplazamiento'],

    setup(props) {
        const positionApp = ref(0)
        const positionLic = ref(0)

        onMounted(() => {
        })

    }

}
</script>

<style>
/* .conteiner-arrow {
    position: absolute;
    display: flex;
    width: 100%;
    min-height: 80%;
    align-items: flex-start;
    justify-content: space-between;
    flex-direction: row;
    z-index: 0;
    top: 0px;
}

.conteiner-arrow:hover {
  z-index: -1;
}

.arrow {
  display: flex;
  align-items: center;
  width: 25px;
  min-height: 100%;
  position: absolute;
  background-color: rgba(204,204,204,0.13);
}

.arrow-next {
  top:0%;
  right: 0%;
  border-radius: 0 5px 5px 0;
  z-index: 0;
}

.arrow-prev {
  display: none;
  border-radius: 5px 0 0 5px;
  z-index: 0;

}

.arrow i{
  font-size: 35px;
  color: rgba(128,128,128,0.38)
}

.arrow:hover {
  cursor: pointer;
  background-color: rgba(204,204,204,0.3);
}

.arrow:hover i {
  color: #005395
} */
</style>