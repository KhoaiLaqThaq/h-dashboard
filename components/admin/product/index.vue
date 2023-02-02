<template>
  <list-filter :items="productTypes"></list-filter>
  <list-header :headers="headers"></list-header>
  <template v-if="products">
    <list-item :item="product" v-for="(product, index) in products" :key="index"></list-item>
  </template>
</template>
<script setup>
import ListFilter from '~~/components/admin/product/ListFilter.vue';
import ListHeader from '~~/components/admin/product/ListHeader.vue';
import ListItem from '~~/components/admin/product/ListItem.vue';

const props = defineProps({
  headers: Array,
  productTypes: Array,
  products: Array
});

</script>
<style lang="scss" scoped>
  
</style>