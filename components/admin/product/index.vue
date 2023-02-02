<template>
  <list-filter :items="productTypes"></list-filter>
  <list-header :headers="headers"></list-header>
  <list-item :item="product" v-for="(product, index) in products" :key="index"></list-item>
  <pagination
    :page="pagination.page"
    :size="pagination.size"
    :number="pagination.number"
    :numberOfPages="pagination.numberOfPages"
    :numberOfElements="pagination.numberOfElements"
    :totalPages="pagination.totalPages"
    :totalElements="pagination.totalElements"
    :first="pagination.first"
    :last="pagination.last"
  ></pagination>
</template>
<script setup>
import ListFilter from '~~/components/admin/product/ListFilter.vue';
import ListHeader from '~~/components/admin/product/ListHeader.vue';
import ListItem from '~~/components/admin/product/ListItem.vue';
import Pagination from '~~/components/common/table/Pagination.vue';

const props = defineProps({
  headers: Array,
  productTypes: Array,
  products: Array
});

const pagination = reactive({
  page: 0,
  size: 10,
  number: 1,
  numberOfElements: 7,
  totalPages: 1,
  totalElements: 7,
  first: false,
  last: false
});

</script>
<style lang="scss" scoped>
  
</style>