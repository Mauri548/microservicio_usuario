<template>
  <div class="column mt-2 py-2">
    <div class="has-text-centered">
      <p class="is-size-3">{{license_name}}</p>
      <p class="has-text-grey">Los campos que queden vacios se autocompletaran con el valor 1</p>
    </div>
    <div class="column">
      <form action="">
        <div class="column conteiner-form">
          <div v-for="label in labels" :key="label.id" class="conteiner-campo-form">
            <div class="conteiner-campo-form-title pr-3">
              <p class="mb-3">{{label.label.label}}</p>
            </div>
            <div class="conteiner-campo-form-inputs">
              <CampoForm class="mx-2" type="number" place="tope" v-model="label.top" />
              <CampoForm class="mx-2" type="number" :place="$i18n.locale=='en'? 'vertical level' : 'nivel vertical' " v-model="label.level_v" />
              <CampoForm class="mx-2" type="number" :place="$i18n.locale=='en'? 'horizontal level' : 'nivel horizontal' " v-model="label.level_h" />
            </div>
          </div>
        </div>

        <Loading v-show="loadingContent" />

        <div class="column p-0 has-text-right conteiner-form p-3">
          <Button class="has-background-danger mr-2"
            @click="redirectToTable">
            {{$t('permisos.cancel')}}
          </Button>
          <Button :loading="loading" class="mx-2"
            @click="register">
            {{$t('permisos.guardar')}}
          </Button>
        </div>

      </form>

    </div>
  </div>

  <ModalAlert :activador="activeAlert" :state="succesLoad">
    <div v-if="succesLoad">
      <p v-t="'licence.modalCargaLimit'"></p>
    </div>
    <div v-else>
      <p v-t="'licence.modalCargaLimitError'"></p>
    </div>
  </ModalAlert>
  
</template>

<script>
import { ref } from '@vue/reactivity'
import CampoForm from '../../components/CampoForm.vue'
import { useRoute, useRouter } from 'vue-router'
import { watch, watchEffect } from '@vue/runtime-core'
import { GraphQLClient } from 'graphql-request'
import store from '@/store'
import Button from '../../components/Buttons/Button.vue'
import ModalAlert from '../../components/Modals/ModalsAlert.vue'
import Loading from '../../components/loading.vue'

export default {
  name: 'AddLabelKey',

  components: {
    Button,
    CampoForm,
    Loading,
    ModalAlert,
  },

  setup() {
    const route = useRoute()
    const router = useRouter()
    const license_id = ref(route.params.license_id)
    const license_name = ref(route.params.license_name)
    const app_id = ref(route.params.app_id)
    const labels = ref([])
    const labels_aux = ref([])
    const endpoint = store.state.url_backend
    const loading = ref(false)
    const cont_finished = ref(0)
    const cant_lables = ref(0)
    const succesLoad = ref(true)
    const activeAlert = ref(false)
    const loadingContent = ref(true)

    const fetchLabelxApp = (id) => {
      labels.value = []
      const cliente = new GraphQLClient(endpoint)
      cliente.rawRequest(/* GraphQL */ `
      query($app_id:ID){
        labelkeysxapp(first:999,page:1,app_id:$app_id){
          data {
            id
            label
            typekey
          }
        }
      }`,
      {
        app_id: id
      },
      {
        authorization: `Bearer ${ localStorage.getItem('user_token') }` 
      }).then((data) => {
        console.log(data)
        data.data.labelkeysxapp.data.forEach(label => {
          labels.value.push({label, top: null, level_h: null, level_v: null})
        })
        console.log(labels.value) 
        loadingContent.value = false
      }).catch(error => {
        console.log(error)}
      )
    }

    const fetchLabelxLicenese = (id) => {
      labels.value = []
      const client = new GraphQLClient(endpoint)
      client.rawRequest(/* GraphQL */ `
      query($license_id: ID) {
        keysxlicense(first: 999, page: 1, license_id: $license_id) {
          data {
            id
            top
            level_h
            level_v
            labelkey {
              label
            }
          }
        }
      }`,
      {
        license_id: id
      })
      .then((data) => {
        console.log(data)
        data.data.keysxlicense.data.forEach(label => {
          labels.value.push({label: {id: label.id, label: label.labelkey.label}, top: label.top, level_h: label.level_h, level_v: label.level_v})
          labels_aux.value.push({label: {id: label.id, label: label.labelkey.label}, top: label.top, level_h: label.level_h, level_v: label.level_v})
        })
        loadingContent.value = false
      })
      .catch(error => console.log(error.response))
    }

    watch(cont_finished, () => {
      if (cont_finished.value == cant_lables.value) {
        loading.value = false
        changeStateModal(true)
      } 
    })

    const register = async () => {
      cont_finished.value = 0
      cant_lables.value = labels.value.length
      loading.value = true
      initializeEmptyValue()

      if (route.params.add == 'true') {
        creatingLimits()
      } else {
        editLimits()
      }
    }

    const initializeEmptyValue = () => {
      let aux = labels.value.filter(label => !label.top || !label.level_v || !label.level_h)
      aux.forEach(label => {      
        if (!label.top) {
          label.top = 1
        }

        if (!label.level_h) {
          label.level_h = 1
        }

        if (!label.level_v) {
          label.level_v = 1
        }
      })
    }

    // crear la mutation para editar
    const editLimits = () => {
      let aux = labels.value.filter((label) => JSON.stringify(label) != JSON.stringify(labels_aux.value.find(item => item.label.id == label.label.id)))
      cant_lables.value = aux.length
      aux.forEach(async label => {
        await editTopLabel(license_id.value, label.label.id, label.top, label.level_v, label.level_h)
      })
    }

    const creatingLimits = () => {
      labels.value.forEach(async label => {
        await createTopLabel(license_id.value, label.label.id, label.top, label.level_v, label.level_h)
      })
    }

    const createTopLabel = async (licenseId, lableKeyId, top, level_v, level_h) => {
      const client = new GraphQLClient(endpoint)
      await client.rawRequest(/* GraphQL */`
      mutation($company_user_id:ID!, $license_id: Int!, $labelkey_id: Int!, $top: Float!, $level_h: Int!, $level_v: Int!) {
        createsLic_key(company_user_id: $company_user_id, input: {
          license_id: $license_id,
          labelkey_id: $labelkey_id,
          top: $top,
          level_h: $level_h,
          level_v: $level_v
        }) {
          id
          license_id
          labelkey_id
          top
          level_h
          level_v
        }
      }`,
      {
        company_user_id:localStorage.getItem('user_company_id'),
        license_id: parseInt(licenseId) ,
        labelkey_id: parseInt(lableKeyId),
        top: parseInt(top),
        level_h: parseInt(level_h),
        level_v: parseInt(level_v)
      })
      .then((data) => {
        console.log(data)
        cont_finished.value++
        
      })
      .catch(error => {
        console.log(error.response)
        changeStateModal(false)
      })
    }

    const editTopLabel = async (licenseId, lableKeyId, top, level_v, level_h) => {
      const client = new GraphQLClient(endpoint)
      client.rawRequest(/* GraphQL */`
      mutation($company_user_id:ID!, $license_id: Int!, $labelkey_id: ID!, $top: Float!, $level_h: Int!, $level_v: Int!) {
        modifiesLic_key(company_user_id: $company_user_id, id: $labelkey_id, input: {
          license_id: $license_id,
          top: $top,
          level_h: $level_h,
          level_v: $level_v
        }) {
          id
          license_id
          labelkey_id,
          top
          level_h
          level_v
        }
      }`,
      {
        company_user_id:localStorage.getItem('user_company_id'),
        license_id: parseInt(licenseId) ,
        labelkey_id: parseInt(lableKeyId),
        top: parseInt(top),
        level_h: parseInt(level_h),
        level_v: parseInt(level_v)
      })
      .then((data) => {
        console.log(data)
        cont_finished.value++
      })
      .catch(error => console.log(error.response))
    }

    const changeStateModal =(state) => {
      if (state == false) {
        loading.value = false
      }
      setTimeout(() => {
        succesLoad.value = state
        activeAlert.value = true
        checkLoad()
      },500)
    }

    const checkLoad = () => {
      if (activeAlert.value == true) {
        setTimeout(() => {
          activeAlert.value = false
          if (succesLoad.value) {
            router.push({name: 'LicencesDashboard'})
          }
        },3000)
      }
    }

    const redirectToTable = () => router.push({name: 'LicencesDashboard'})

    watchEffect(() => {
      if (route.params.add == 'true') {
        fetchLabelxApp(app_id.value)
      } else {
        fetchLabelxLicenese(license_id.value)
      }
    })

    return {
      activeAlert,
      labels,
      license_id,
      license_name,
      loading,
      loadingContent,
      redirectToTable,
      register,
      succesLoad,
    }
  }
}
</script>

<style scoped>
.conteiner-form {
  width: 80%;
  margin: auto;
}

.conteiner-campo-form {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.conteiner-campo-form-title {
  display: flex;
  justify-content: flex-end;
  width: 20%;
}

.conteiner-campo-form-inputs {
  display: flex;
  justify-content: flex-end;
}

@media (max-width: 425px) {
  .conteiner-form {
    width: 100%
  }
  .conteiner-campo-form, .conteiner-campo-form-inputs {
    flex-direction: column;
  }
  .conteiner-campo-form {
    align-items: normal;
  }
  .conteiner-campo-form-title {
    width: 100%;
    justify-content: flex-start;
    margin-left: 0.5rem;
  }
}
</style>