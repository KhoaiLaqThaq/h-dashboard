<template>
  <div class="col-3">
    <div class="w100p mb-3">
      <p class="fw-bold text-theme text-uppercase text-center">{{ $t('label.order.payment.history') }}</p>
    </div>
    <div class="w100p mb-2">
      <span class="text-theme">{{ $t('label.status') }}:</span>
      <template v-if="payment.status">
        <span class="ms-1" :class="displayColorStatus(payment.status)">{{ $t(`label.sell.status.${displayStatus(payment.status)}`) }}</span>
      </template>
    </div>
    <div class="w100p mb-2">
      <span class="text-theme">{{ $t('label.time') }}:</span>
      <span class="text-theme ms-2">{{ $d(payment.timePayment, 'long') }}</span>
    </div>
    <div class="w100p mb-2">
      <span class="text-theme">{{ $t('label.order.payment.method.title') }}:</span>
      <span class="text-theme ms-2">{{ $t(`label.order.payment.method.${payment.method}`) }}</span>
    </div>
    <div class="w100p mb-2">
      <span class="text-theme">{{ $t('label.order.payment.paid') }}:</span>
      <span class="text-success ms-2" v-if="payment.paid">{{ $n(payment.paid) }} {{ SYMBOL_ENUM.DONG_SIGN }}</span>
    </div>
    <div class="w100p mb-2">
      <span class="text-theme">{{ $t('label.order.payment.unpaid') }}:</span>
      <span class="text-danger ms-2" v-if="payment.unpaid">{{ $n(payment.unpaid) }} {{ SYMBOL_ENUM.DONG_SIGN }}</span>
    </div>
  </div>
</template>
<script setup>
import {
  displayStatus,
  displayColorStatus
} from '~~/constants/order/status.enum';
import {
  SYMBOL_ENUM
} from '~~/constants/symbol.enum';

const props = defineProps({
  payment: Object
});
</script>
<style lang="scss" scoped>
  
</style>