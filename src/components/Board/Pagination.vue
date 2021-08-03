<template>
    <div class="conteiner-pagination px-4 mt-3">
        <nav class="pagination is-right" role="navigation" aria-label="pagination">
            <p class="ml-1">1 al 7 de 7</p>
            <ul class="pagination-list">
                <li><a class="pagination-link" aria-label="Goto page 1">1</a></li>
                <li><span class="pagination-ellipsis">&hellip;</span></li>
                <li><a class="pagination-link" aria-label="Goto page 45">45</a></li>
                <li><a class="pagination-link is-current" aria-label="Page 46" aria-current="page">46</a></li>
                <li><a class="pagination-link" aria-label="Goto page 47">47</a></li>
                <li><span class="pagination-ellipsis">&hellip;</span></li>
                <li><a class="pagination-link" aria-label="Goto page 86">86</a></li>
            </ul>
        </nav>
    </div>
</template>

<script>
export default {
    name: 'Pagination',
    props: ['data'],

    setup(props) {
        
    }
}
</script>

<style scoped>
.is-current {
    background-color: #005395;
}
</style>