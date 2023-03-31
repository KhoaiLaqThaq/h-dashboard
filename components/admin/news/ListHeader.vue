<template>
  <div class="row mx-0 py-3 rounded-10 fw-bold bgc-primary text-white">
    <div class="text-uppercase" :class="item.style" v-for="(item, index) in tableHeaders" :key="index">{{ $t(`label.table.th.${item.text}`) }}</div>
  </div>
</template>
<script setup>
import { inject } from "vue"

const tableHeaders = inject("tableHeaders");
</script>
<style lang="scss">
  
</style>