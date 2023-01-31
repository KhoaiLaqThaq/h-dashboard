<template>
  <div class="row py-3 rounded-10 fw-bold bgc-template text-white">
    <div class="col-1"></div>
    <div class="col-2 text-uppercase" :class="item.style" v-for="(item, index) in headers" :key="index">{{ $t(`label.table.th.${item.text}`) }}</div>
    <div class="col-3 text-uppercase text-center"><span class="ps-5">{{ $t('label.table.th.action') }}</span></div>
  </div>
</template>
<script setup>
const props = defineProps({
  headers: Array
})
</script>
<style lang="scss">
  
</style>