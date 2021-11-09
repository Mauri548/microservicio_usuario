<template>
    <div class="field">
        <p class="control has-icons-right">
            <input @keyup.enter="searching" class="input" v-model="text" type="text" 
                :placeholder="$i18n.locale=='es'? 'Buscar' : 'Search'">
            <span class="icon is-small is-right">
                <i class="fas fa-search"></i>
            </span>
        </p>
    </div>
</template>

<script>

import { ref } from '@vue/reactivity'

export default {
    name: 'Searcher',

    setup() {
        const text = ref('')

        const searching = () => {
            console.log(text.value)
        }
        return {
            text,
            searching,
        }
    }
}
</script>

<style scoped>
input {
    border-radius: 25px;
}

</style>