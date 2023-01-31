<template>
  <list-header :headers="headers"></list-header>
  <template v-if="data">
    <list-item :item="item" v-for="(item, index) in data" :key="index"></list-item>
  </template>
</template>
<script setup>
import ListHeader from '~~/components/admin/order/ListHeader.vue';
import ListItem from '~~/components/admin/order/ListItem.vue';

const props = defineProps({
  headers: Array,
  data: Array
});
</script>
