<template>
    <div class="conteiner-pagination px-4 mt-3">
          <!--   con la expresion {{$t('')}} podemos traer la palabra que queremos mostrar traducida en el lenguaje seleccionado -->
        <nav class="pagination is-right" role="navigation" aria-label="pagination">
            <p class="ml-1">{{firstItem}} {{$t('board.pagination.al')}} {{lastItem}} {{$t('board.pagination.de')}} {{total}}</p>
            <ul class="pagination-list">
                <!-- <li v-show="(currentPage-2)>=0"><a class="pagination-link" >{{currentPage - firstItem}}</a></li>  -->
                <!-- <li><span class="pagination-ellipsis">&hellip;</span></li> -->
                <li v-show="(currentPage-1)>0 &&  currentPage-1!=currentPage"><a @click="$emit('previous',!valorNext)" class="pagination-link" >{{currentPage - 1}}</a></li>
                <li><a class="pagination-link is-current"  aria-current="page">{{currentPage}}</a></li>
                
                <li v-show="hasMorePages">
                    <a @click="$emit('next',valorNext)"   class="pagination-link" >{{currentPage + 1}}</a>
                </li>

                <!-- <li><span class="pagination-ellipsis">&hellip;</span></li> -->
                <!-- <li v-show="(currentPage+2)>=0"><a class="pagination-link" >{{lastPage}}</a></li>   -->
            </ul>
        </nav>
    </div>
</template>

<script>

import { useRoute, useRouter } from 'vue-router'

export default {
    name: 'Pagination',
    data () {
        return {
            valorNext:true, 
        }
    },
    emits:['next','previous']
    ,
    props: {
        count:Number,
        total:Number,
        currentPage:Number,
        firstItem:Number,
        lastItem:Number,
        perPage:Number,
        lastPage:Number,
        hasMorePages:Boolean,
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