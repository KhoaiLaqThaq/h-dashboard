<template>
  <div class="row py-1">
    <div class="w20p">{{ orderItem.code }}</div>
    <div class="w20p">{{ orderItem.name }}</div>
    <div class="w20p text-center">{{ orderItem.amount }}</div>
    <div class="w20p text-center">{{ $n(orderItem.price) }}</div>
    <div class="w20p text-end">{{ $n(orderItem.finalPrice) }}</div>
  </div>
</template>
<script setup>
const props = defineProps({
  orderItem: Object
});
</script>
