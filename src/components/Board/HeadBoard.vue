<template>
    <div class="columns is-align-items-center">
        <Searcher class="mt-3 mb-0 movile" />

        <div class="w-100 is-flex">
            <ShowRows />
            <Searcher class="mt-3 mb-0 desktop" />
            <div class="column has-text-right">

                <div>
                    <button v-if="buttonDefault" @click="push" class="button btn-crenein">
                        {{$t('board.headBoard.agregar')}}
                    </button>
                    <slot></slot>
                </div>

            </div>

        </div>
    </div>
</template>

<script>
import ShowRows from './ShowRows.vue'
import Searcher from './Searcher.vue'
import { useRouter } from 'vue-router'


export default {
    name: 'HeadBoard',
    components: {
        ShowRows,
        Searcher,
    },
    props: {
        namePath: String,
        buttonDefault: {
            type: Boolean,
            default: true
        }
    },

    setup(props) {
        const router = useRouter()

        // Te redirecciona al path indicado por el prop "namePath"
        const push = () => {
            router.push({name: props.namePath})
        }

        return {
            push
        }
    }
}
</script>

<style scoped>

.columns {
    display: flex;
}


@media (max-width: 425px) {
    .columns {
        flex-direction: column;
    }
    .movile {
        display: flex;
    }
    .desktop {
        display: none;
    }
}

@media screen and (min-width: 426px) {
    .desktop {
        display: flex;
    }
    .movile {
        display: none;
    }
}

</style>