<template>
  <div class="row mx-0 py-3 rounded-10 fw-bold bgc-template text-white">
    <div class="col-1"></div>
    <div class="text-uppercase" :class="item.style" v-for="(item, index) in headers" :key="index">{{ $t(`label.table.th.product.${item.text}`) }}</div>
  </div>
</template>
<script setup>
const props = defineProps({
  headers: Array
})
</script>
<style lang="scss">
  
</style>