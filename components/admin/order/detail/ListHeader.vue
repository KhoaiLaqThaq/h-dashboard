<template>
  <div class="row pb-3 text-theme">
    <div 
      class="w20p text-uppercase"
      :class="item.style"
      v-for="(item, index) in headers"
      :key="index"
    >
      {{ $t(`label.product.${item.text}`) }}
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  headers: Array
})
</script>
