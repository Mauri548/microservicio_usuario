<template>
  <div>
    <section class="modal-card-body px-0">
      <form id="form-create-app" action="" class="column px-0">
  
        <div v-if="Datas == 0" class="mb-5">
          <Loading/>
        </div>

        <ul v-for="data in Datas" :key="data.id">
          <li class="p-2 is-flex select-key" @click="hanldeDataSelected(data)">
            <span class="column has-text-left ">{{data.name}}</span>
            <span class="column has-text-right  icon is-small">
              <i  class="fas fa-chevron-down"></i>
            </span>
          </li>
          <div class="my-4" v-show="data.selected" >

            <CampoForm class="mx-2" type="number" :place="data.name" v-model="tope" :error="msg_error_label.tope" />
            <CampoForm class="mx-2" type="number" place="level-v" v-model="level_v" :error="msg_error_label.level_v" />
            <CampoForm class="mx-2" type="number" place="level-h" v-model="level_h" :error="msg_error_label.level_h" />

            <Button :loading="loading" class="ml-2"
              @click="addTope(data)"> 
              {{$t('permisos.guardar')}}
            </Button>
          </div>
        </ul>

      </form>
    </section>
</div>
</template>

<script>
import { ref } from '@vue/reactivity'
import Button from '../../components/Buttons/Button.vue'
import CampoForm from '../../components/CampoForm.vue'
import isEmpty from '../../helper/FieldIsEmpty'
import Loading from '../../components/loading.vue'
import resetErrorMessage from '../../helper/resetErrorMessage'

export default {
  name: 'ModalAddLabelKey',

  components: {
    Button,
    CampoForm,
    Loading,
  },

  props: ['Datas', 'loading', 'edit', 'tope', 'level_h', 'level_v'],
  emits: ['onHandleDataSelected', 'onAddData'],

  setup(props, {emit} ) {

    const tope = ref(null)
    const level_h = ref(null)
    const level_v = ref(null)

    const msg_error_label = ref({
      tope: '', level_h: '', level_v: ''
    })

    const hanldeDataSelected = (data) => {
      if (!props.edit) {
        tope.value = null
        level_h.value = null
        level_v.value = null
      }

      if (props.edit) {
        tope.value = data.top
        level_h.value = data.level_h
        level_v.value = data.level_v
      }

      emit("onHandleDataSelected", data, props.edit)
    }

    const addTope = (data) => {
      resetErrorMessage(msg_error_label.value)

      isEmpty(tope.value, msg_error_label.value, 'tope')
      isEmpty(level_h.value, msg_error_label.value, 'level_h')
      isEmpty(level_v.value, msg_error_label.value, 'level_v')

      if (checkMessageError(msg_error_label.value)) {
        console.log('valio')
        emit("onAddData", data, tope.value, level_h.value, level_v.value, props.edit)
      } else {
        console.log('no valido')
      }

    }

    const checkMessageError = (list) => {
      for (let i in list) {
        if (list[i] != '') return false 
      }
      return true
    }

    return{
      addTope,
      hanldeDataSelected,
      level_h,
      level_v,
      msg_error_label,
      tope,
    }
  }
}
</script>

<style scoped>
.select-key:hover {
  background: rgba(232,232,232,0.4);
  cursor: pointer;
}
</style>