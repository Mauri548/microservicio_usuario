<template>
    <div class="columns is-align-items-center">
        <ShowRows />
        
        <div class="column has-text-centered">
            <!-- <input type="text" placeholder="Search .."> -->
            <Searcher/>
        </div>
        <div class="column has-text-right">
            <button @click="push" class="button btn-crenein">+ Add</button>
            <button class="button btn-crenein">More options</button>
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
    props: ['namePath'],

    setup(props) {
        const router = useRouter()

        const push = () => {
            router.push({name: props.namePath})
        }

        return {push}
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