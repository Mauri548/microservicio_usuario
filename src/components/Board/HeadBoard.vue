<template>
    <div class="columns is-align-items-center">
        <ShowRows />
        
        <div class="column has-text-centered">
            <!-- <input type="text" placeholder="Search .."> -->
            <Searcher/>
        </div>
        <div class="column has-text-right">

            <div>
                <button v-if="buttonDefault" @click="push" class="button btn-crenein">{{$t('board.headBoard.agregar')}}</button>
                <slot></slot>
                <button class="button btn-crenein">{{$t('board.headBoard.masOps')}}</button>
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
}

</style>