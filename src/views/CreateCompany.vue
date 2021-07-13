<template>
    <div class="my-6 shadow container-form">
        <h1 class="pt-2 has-text-weight-bold is-size-4">Create Company</h1>

        <ProgressBar/>

        <div class="w-100 form-outer">
            <form action="">
                <div class="page slidepage">    
                    <CampoForm place="Name fantasy" type="text" />
                    <CampoForm place="Bussines name" type="text" />
                    <CampoForm place="Owner" type="text" />
                    <CampoForm place="Cuit" type="number" />
                    <CampoForm place="Email" type="email" />
                    <CampoForm place="Phone" type="number" />
                    <div class="" >
                        <button type="button" class="button btn-crenein nextBtn">Next</button>
                    </div>
                </div>

                <div class="page">
                    <CampoForm place="Tax condition" type="text" />
                    <CampoForm place="Direcction" type="text" />
                    <CampoForm place="Location" type="text" />
                    <CampoForm place="Province" type="text" />
                    <CampoForm place="Country" type="text" />
                    <div class="field is-grouped is-justify-content-space-evenly">
                        <button type="button" class="button btn-crenein prev-1 prev">Prev</button>
                        <button type="button" class="button btn-crenein next-1 next">Next</button>
                    </div>
                </div>

                <div class="page">
                    <SelectApp />
                    <div class="field is-grouped is-justify-content-space-evenly">
                        <button type="button" class="button btn-crenein prev-2 prev">Prev</button>
                        <button type="button" class="button btn-crenein next-2 next">Next</button>
                    </div>
                </div>

                <div class="page">
                    <CampoForm place="Tax condition" type="text" />
                    <CampoForm place="Direcction" type="text" />
                    <CampoForm place="Location" type="text" />
                    <CampoForm place="Province" type="text" />
                    <CampoForm place="Country" type="text" />
                    <div class="field is-grouped is-justify-content-space-evenly">
                        <button type="button" class="button btn-crenein prev-3 prev">Prev</button>
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

export default {
    name: 'CreateCompany',
    components: {
        CampoForm,
        ProgressBar,
        SelectApp,
    },

    setup(){

        onMounted(() => {
            const slidepage = document.querySelector('.slidepage')
            const firtNextBtn = document.querySelector('.nextBtn')
            const secPrevBtn = document.querySelector('.prev-1')
            const secNextBtn = document.querySelector('.next-1')
            const thirdPrevBtn = document.querySelector('.prev-2')
            const thirdNextBtn = document.querySelector('.next-2')
            const fourPrevBtn = document.querySelector('.prev-3')
            const containerCarrousel = document.querySelector('.conteiner-carrousel')

            const progressText = document.querySelectorAll('.step p')
            const progressCheck = document.querySelectorAll('.step .check')
            const bullet = document.querySelectorAll('.step .bullet')
            let max = 4
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

            firtNextBtn.addEventListener('click', function(){
                slidepage.style.marginLeft = '-20%'
                next()
            })

            secNextBtn.addEventListener('click', function(){
                slidepage.style.marginLeft = '-40%'
                next()
            })

            thirdNextBtn.addEventListener('click', function(){
                slidepage.style.marginLeft = '-60%'
                // containerCarrousel.style.display = 'none'
                next()
            })

            secPrevBtn.addEventListener('click', function(){
                slidepage.style.marginLeft = '0%'
                prev()
            })

            thirdPrevBtn.addEventListener('click', function(){
                slidepage.style.marginLeft = '-20%'
                // containerCarrousel.style.display = 'none'
                prev()
            })

            fourPrevBtn.addEventListener('click', function(){
                slidepage.style.marginLeft = '-40%'
                // containerCarrousel.style.display = 'block'
                prev()
            })
        })

    }

}
</script>

<style scoped>
.container-form {
    width: 50%;
    margin: auto;
}

/* .btn-crenein {
    background: #005395;
    color: #fff;
    font-weight: 600;
}

.btn-crenein:hover {
    background: #0572ca;
} */

.section-form {
    border-bottom: 2px solid #005395;
}

.form-outer {
    width: 70%;
    margin: auto;
    padding: 20px 0;
    overflow: hidden;
}

.form-outer form {
    width: 500%;
    display: flex;
}

.form-outer form .page {
    width: 20%;
    transition: margin-left 0.3s ease-in-out;
}

@media (max-width: 425px) {
    .container-form {
        width: 90%;
    }
}

</style>