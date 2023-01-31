<template>
  <list-header :headers="headers"></list-header>
  <list-item v-for="(item, index) in items" :key="index" :orderItem="item"></list-item>
</template>
<script>
import ListHeader from '~~/components/admin/order/detail/ListHeader.vue';
import ListItem from '~~/components/admin/order/detail/ListItem.vue';

export default {
  components: { ListHeader, ListItem },
  setup() {
    const headers = [
      {text: 'code', value: 'code'},
      {text: 'name', value: 'name'},
      {text: 'amount', value: 'amount', style: 'text-center'},
      {text: 'price', value: 'price', style: 'text-center'},
      {text: 'finalPrice', value: 'finalPrice', style: 'text-end'}
    ];

    const mockOrderDetails = [
      { code: 'AB1235', name: 'Xúc xích Hong Khói', amount: 100, price: 50000, finalPrice: 5000000 },
      { code: 'AB2341', name: 'Xúc xích Mavinia', amount: 100, price: 50000, finalPrice: 5000000 },
      { code: 'AB1235', name: 'Thịt hun khói', amount: 100, price: 50000, finalPrice: 5000000 }
    ];

    return {
      headers,
      items: mockOrderDetails
    }
  }
}
</script>
<style lang="scss">
  
</style>