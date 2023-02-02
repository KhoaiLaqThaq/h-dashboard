<template>
  <div class="row customer pt-3">
    <div class="col-1"></div>
    <div class="col-5">
      <div class="w100p mb-3">
        <span class="text-theme me-3">{{ $t('label.customer.businessCode') }}:</span>
        <span>{{ customer.businessCode }}</span>
      </div>
      <div class="w100p mb-3">
        <span class="text-theme me-3">{{ $t('label.customer.identityCard') }}:</span>
        <span>{{ customer.identityCard }}</span>
      </div>
      <div class="w100p mb-3">
        <span class="text-theme me-3">{{ $t('label.customer.phone') }}:</span>
        <span>{{ customer.phone }}</span>
      </div>
      <div class="w100p mb-3">
        <span class="text-theme me-3">{{ $t('label.email') }}:</span>
        <span>{{ customer.email }}</span>
      </div>
      <div class="w100p mb-3">
        <span class="text-theme me-3">{{ $t('label.address') }}:</span>
        <span>{{ customer.address }}</span>
      </div>
    </div>
    <div class="col-6">
      <div class="w100p mb-3">
        <span class="text-theme me-3">{{ $t('label.customer.businessStaffName') }}:</span>
        <span>{{ customer.businessStaffName }}</span>
      </div>
      <div class="w100p mb-3">
        <span class="text-theme me-3">{{ $t('label.customer.businessPlace') }}:</span>
        <span>{{ customer.businessPlace }}</span>
      </div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  customer: Object
})
</script>
<style lang="scss">
  
</style>