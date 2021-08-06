<template>
    <div>
        <button class="button btn-crenein">
            <span>PuWiC permissions</span>
            <span class="icon is-small">
                <i class="fas fa-chevron-down"></i>
            </span>
        </button>
        <div>
            <div class="conteiner-head mt-3">
                <div class="buttons">
                    <ButtonIcon class="is-success has-text-weight-semibold" positionIcon="left" icon="far fa-save" >Save</ButtonIcon>
                    <!-- <button class="button is-success has-text-weight-semibold">
                        <span class="icon is-small">
                            <i class="far fa-save"></i>
                        </span>
                        <span>Save</span>
                    </button> -->
                    <ButtonIcon class="btn-crenein" icon="far fa-check-square" >Select all</ButtonIcon>
                    <!-- <button class="button btn-crenein">
                        <span>Select all</span>
                        <span class="icon is-small">
                            <i class="far fa-check-square"></i>
                        </span>    
                    </button> -->
                    <ButtonIcon class="btn-crenein" icon="far fa-square" >Clear selected</ButtonIcon>
                    <!-- <button class="button btn-crenein">
                        <span>Clear selected</span>
                        <span class="icon is-small">
                            <i class="far fa-square"></i>
                        </span>
                    </button> -->
                </div>
                <Searcher/>
            </div>
            <div class="conteiner-body my-4">
                <div>
                    <div class="conteiner-head has-background-light p-2">
                        <h3>Client list (6/6)</h3>
                        <div class="buttons">
                            <ButtonIcon class="btn-crenein px-2" icon="far fa-lg fa-check-square" classIcon="mx-0"/>
                            <ButtonIcon class="btn-crenein px-2" icon="far fa-lg fa-square" classIcon="mx-0" />
                        </div>
                        <Searcher/>
                    </div>
                    <div>
                        <li>
                            <span>See list</span>
                            
                        </li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Searcher from '../Board/Searcher.vue'
import ButtonIcon from '../Buttons/ButtonIcon.vue'
export default {
    name: 'PermissionsList',
    components: {
        Searcher,
        ButtonIcon,
    }
}
</script>

<style scoped>

.conteiner-head, .conteiner-head2 {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
/* .conteiner-head2 {
    background-color: #F7F7F7;
} */
.conteiner-head .buttons, .conteiner-head .buttons .button {
    margin-bottom: 0;
}
.conteiner-head input {
    width: 40%;
}

.color-succes {
    background: #28A745;
}

/* .conteiner-body {
    border: 1px solid #ccc;
} */
</style>