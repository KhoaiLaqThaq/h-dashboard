<template>
  <div class="row mx-0 border-theme rounded-10 py-3 px-2 bg-white">
    <div class="col-1 flex-center-vertical" v-if="stt">{{ stt }}</div>
    <div class="col-3 flex-center-vertical">{{ item.content }}</div>
    <div class="col-2 flex-center-vertical" v-if="item.publishDate">{{ $d(item.publishDate, "long") }}</div>
    <div class="col-2 flex-center-vertical">{{ item.content }}</div>
    <div class="col-1 flex-center-vertical text-center" :class="item.status == 1 ? 'text-success':'text-warning'">{{ displayStatus(item.status) }}</div>
    <div class="col-3 text-end">
      <button type="button" class="btn bgc-primary minW-80 me-3 py-2 rounded-20 text-uppercase text-yl">{{ $t('label.button.view') }}</button>
      <button type="button" class="btn bgc-primary minW-80 me-3 py-2 rounded-20 text-uppercase text-yl">{{ $t('label.button.edit') }}</button>
      <button type="button" class="btn bgc-primary minW-80 me-3 py-2 rounded-20 text-uppercase text-yl">{{ $t('label.button.delete') }}</button>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  item: Object,
  stt: Number
})

const displayStatus = (status) => status && status == 1 ? "Active":"Inactive";
</script>
<style lang="scss">
  
</style>