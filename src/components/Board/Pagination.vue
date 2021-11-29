<template>
    <div class="conteiner-pagination px-4 mt-3">
          <!--   con la expresion {{$t('')}} podemos traer la palabra que queremos mostrar traducida en el lenguaje seleccionado -->
        <nav class="pagination is-right" role="navigation" aria-label="pagination">
            <p class="ml-1">{{currentPage}} {{$t('board.pagination.al')}} {{count}} {{$t('board.pagination.de')}} {{total}}</p>
            <ul class="pagination-list">
                <li><a class="pagination-link" aria-label="Goto page 1">{{firstItem}}</a></li>
                <li><span class="pagination-ellipsis">&hellip;</span></li>
                <li><a class="pagination-link" aria-label="Goto page 45">45</a></li>
                <li><a class="pagination-link is-current" aria-label="Page 46" aria-current="page">{{currentPage}}</a></li>
                <li><a class="pagination-link" aria-label="Goto page 47">47</a></li>
                <li><span class="pagination-ellipsis">&hellip;</span></li>
                <li><a class="pagination-link" aria-label="Goto page 86">{{lastItem}}</a></li>
            </ul>
        </nav>
    </div>
</template>

<script>
/* import { ref } from '@vue/reactivity'; */
export default {
    name: 'Pagination',
    props: {
        count:Number,
        total:Number,
        currentPage:Number,
        firstItem:Number,
        lastItem:Number,
        perPage:Number,
        hasMorePages:Boolean,
    },
    setup(props) {
        console.log(props.count)
    }

   /*  setup(props) { 
        const count = ref(props.count);
        const total = ref(props.total)
        const currentPage = ref(props.currentPage)
        const firstItem = ref(props.firstItem)
        const lastItem = ref(props.lastItem)
        const perPage = ref(props.perPage)
        const hasMorePages = ref(props.hasMorePages)

        console.log(count.value)
        console.log(total.value)    
        console.log(currentPage.value) 
        console.log(firstItem.value) 
        console.log(lastItem.value) 
        console.log(perPage.value) 
        console.log(hasMorePages.value) 

        return {
            count,
            total,
            currentPage,
            firstItem,
            lastItem, 
            perPage,
            hasMorePages,
        }

    } */
}
</script>

<style scoped>
.is-current {
    background-color: #005395;
}
</style>