<template>
  <list-header :headers="headers"></list-header>
  <template v-if="customers">
    <list-item :item="customer" v-for="(customer, index) in customers" :key="index"></list-item>
  </template>
</template>
<script setup>
import ListHeader from '~~/components/admin/customer/ListHeader.vue';
import ListItem from '~~/components/admin/customer/ListItem.vue';

const props = defineProps({
  headers: Array,
  customers: Array
})

</script>