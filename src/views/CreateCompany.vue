<template>
    <div class="mb-5 mt-2 has-text-centered shadow container-form">
        <h1 class="pt-2 has-text-weight-bold is-size-4">Create Company</h1>

        <ProgressBar/>

        <div class="form-outer pt-3">
            <form action="">
                <div class="page slidepage">    
                    <CampoForm place="Name fantasy" type="text" />
                    <CampoForm place="Bussines name" type="text" />
                    <CampoForm place="Owner" type="text" />
                    <CampoForm place="Cuit" type="number" />
                    <CampoForm place="Email" type="email" />
                    <CampoForm place="Phone" type="number" />
                    <div class="" >
                        <button type="button" class="button btn-crenein next" style="width:100%">Next</button>
                    </div>
                </div>

                <div class="page">
                    <CampoForm place="Tax condition" type="text" />
                    <CampoForm place="Direcction" type="text" />
                    <CampoForm place="Location" type="text" />
                    <CampoForm place="Province" type="text" />
                    <CampoForm place="Country" type="text" />
                    <div class="field is-grouped is-justify-content-space-between">
                        <button type="button" class="button btn-crenein prev">Prev</button>
                        <button type="button" class="button btn-crenein next">Next</button>
                    </div>
                </div>

                <div class="page">
                    <SelectApp />
                    <div class="field is-grouped is-justify-content-space-between">
                        <button type="button" class="button btn-crenein prev">Prev</button>
                        <button type="button" class="button btn-crenein next">Next</button>
                    </div>
                </div>

                <!-- Probablemente se pueda hacer en un componente -->
                <div class="page">
                    <div class="mb-5">
                        <div v-for="data in datas" :key="data.id" class="is-flex is-align-items-center">
                            <img :src="data.logo" width="35" alt="">
                            <div class="w-100 m-4 is-flex is-align-items-center is-justify-content-space-between">
                                <div class="has-text-left" style="width: 25%">
                                    <p>{{data.name}}</p>
                                </div>
                                <div style="width: 100%">
                                    <p>{{data.licencia}}</p>
                                </div>
                                <div class="has-text-right" style="width: 20%">
                                    <p>${{data.price}}</p>
                                </div>
                                <div class="ml-2">
                                    <i @click="removeResumen(data.id)" class="fas fa-times mt-1"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="field is-grouped is-justify-content-space-between">
                        <button type="button" class="button btn-crenein prev">Prev</button>
                        <button class="button btn-crenein submite">Submite</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { onMounted, ref } from '@vue/runtime-core';
import CampoForm from '../components/CampoForm.vue';
import ProgressBar from '../components/CreateCompany/ProgressBar.vue'
import SelectApp from '../components/CreateCompany/SelectApp.vue'
import ispb from '@/assets/ispb2.png'
import puwic from '@/assets/puwic2.png'
import geston from '@/assets/geston2.png'


export default {
    name: 'CreateCompany',
    components: {
        CampoForm,
        ProgressBar,
        SelectApp,
    },

    setup(){

        // ****** Dato prueba *******
        const datas = ref([
            {id: 2, name: 'PuWiC', licencia: 'Licencia 60x8', price: 3800, logo: puwic},
            {id: 1, name: 'ISPBrain', licencia: 'Licencia 60x8', price: 3800, logo: ispb},
            {id: 3, name: 'Geston', licencia: 'Licencia 60x8', price: 3800, logo: geston},
        ])
        // **************************

        onMounted(() => {
            const slidepage = document.querySelector('.slidepage')

            const progressText = document.querySelectorAll('.step p')
            const progressCheck = document.querySelectorAll('.step .check')
            const bullet = document.querySelectorAll('.step .bullet')
            const form = document.querySelector('.form-outer')
            let current = 1

            const next = () => {
                bullet[current - 1].classList.add('active')
                progressText[current - 1].classList.add('active')
                progressCheck[current - 1].classList.add('active')
                current += 1
            }

            const prev = () => {
                bullet[current - 2].classList.remove('active')
                progressText[current - 2].classList.remove('active')
                progressCheck[current - 2].classList.remove('active')
                current -= 1
            }

            const btnNext = document.querySelectorAll('.next')
            const btnPrev = document.querySelectorAll('.prev')
            console.log(btnPrev)

            btnNext.forEach((btn, i) => {
                btnNext[i].addEventListener('click', () => {
                    let operacion = (i + 1) * -20
                    slidepage.style.marginLeft = `${operacion}%`
                    next()
                    if (i == 1) {
                        form.style.maxHeight = '100%'
                    } else if (i == 2) {
                        datas.value.length <= 6? form.style.maxHeight = '430px' : form.style.maxHeight = '100%'
                    }
                })
            })

            btnPrev.forEach((btn, i) => {
                btnPrev[i].addEventListener('click', () => {
                    let operacion = i * -20
                    slidepage.style.marginLeft = `${operacion}%`
                    prev()
                    i == 1 ? form.style.maxHeight = '430px' : ''
                    i == 2 ? form.style.maxHeight = '100%' : ''
                })
            })
        })

        // Elimino una app de resumen
        const removeResumen = (id) => {
            let pos = datas.value.findIndex(element => element.id == id)
            datas.value.splice(pos, 1)
        }

        return {
            datas,
            removeResumen
        }

    }

}
</script>

<style scoped>

.container-form {
    width: 50%;
    margin: auto;
}

.section-form {
    border-bottom: 2px solid #005395;
}

.form-outer {
    max-height: 430px;
    width: 70%;
    margin: auto;
    padding-bottom: 20px;
    overflow: hidden;
}

.form-outer form {
    width: 500%;
    display: flex;
}

.form-outer form .page {
    /* display: none; */
    width: 20%;
    padding: 0 2px;
    transition: margin-left 0.3s ease-in-out;
}

.form-outer form .slidepage {
    display: block;
}

.prev {
    width: 30%;
}

.next, .submite {
    width: 69%;
}

.fa-times{
    font-size: 1.25rem;
}
.fa-times:hover {
    cursor: pointer;
}


@media (max-width: 768px) {
    p{
        font-size: 12px;
    }

    .fa-times {
        font-size: 0.85rem;
    }
}

@media (max-width: 425px) {
    .container-form {
        width: 90%;
    }
}


</style>