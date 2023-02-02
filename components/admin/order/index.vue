<template>
  <list-header :headers="headers"></list-header>
  <template v-if="data">
    <list-item :item="item" v-for="(item, index) in data" :key="index"></list-item>
  </template>

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
import { reactive } from 'vue';
import ListHeader from '~~/components/admin/order/ListHeader.vue';
import ListItem from '~~/components/admin/order/ListItem.vue';
import Pagination from '~~/components/common/table/Pagination.vue';

const pagination = reactive({
  page: 0,
  size: 10,
  number: 1,
  numberOfElements: 2,
  totalPages: 1,
  totalElements: 2,
  first: false,
  last: false
});

const props = defineProps({
  headers: Array,
  data: Array
});
</script>
