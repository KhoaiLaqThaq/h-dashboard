<template>
  <div class="col-9 border-end-2px-theme">
    <list-header :headers="headers"></list-header>
    <list-item v-for="(item, index) in items" :key="index" :orderItem="item"></list-item>
    <div class="row mt-3 text-theme">
      <div class="w60p"></div>
      <div class="w40p">
        <div class="row mb-2">
          <div class="col-6 text-theme">{{ $t('label.order.totalPriceProduct') }}:</div>
          <div class="col-6 text-theme text-end">{{ displayCurrency(15000000) }}</div>
        </div>

        <div class="row mb-2">
          <div class="col-6 text-theme">{{ $t('label.order.discount') }}:</div>
          <div class="col-6 text-theme text-end">{{ displayCurrency(1000000) }}</div>
        </div>

        <div class="row mb-2">
          <div class="col-6 text-theme">{{ $t('label.order.tax') }}:</div>
          <div class="col-6 text-theme text-end">{{ displayCurrency(0) }}</div>
        </div>

        <div class="row mb-2">
          <div class="col-6 text-theme">{{ $t('label.order.totalPricePayment') }}:</div>
          <div class="col-6 text-theme text-end">{{ displayCurrency(14000000) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { useI18n } from 'vue-i18n';
import {
  SYMBOL_ENUM
} from '~~/constants/symbol.enum'
import ListHeader from '~~/components/admin/order/detail/ListHeader.vue';
import ListItem from '~~/components/admin/order/detail/ListItem.vue';

export default {
  components: { ListHeader, ListItem },
  data() { 
    return {
      SYMBOL_ENUM
    }
  },
  setup() {
    const { n } = useI18n();

    const headers = [
      {text: 'code', value: 'code', style: 'fw-bold'},
      {text: 'name', value: 'name', style: 'fw-bold'},
      {text: 'amount', value: 'amount', style: 'text-center fw-bold'},
      {text: 'price', value: 'price', style: 'text-center fw-bold'},
      {text: 'finalPrice', value: 'finalPrice', style: 'text-end fw-bold'}
    ];

    const mockOrderDetails = [
      { code: 'AB1235', name: 'Xúc xích Hong Khói', amount: 100, price: 50000, finalPrice: 5000000 },
      { code: 'AB2341', name: 'Xúc xích Mavinia', amount: 100, price: 50000, finalPrice: 5000000 },
      { code: 'AB1235', name: 'Thịt hun khói', amount: 100, price: 50000, finalPrice: 5000000 }
    ];

    const displayCurrency = (price) => price ? n(price).concat(SYMBOL_ENUM.SPACE).concat(SYMBOL_ENUM.DONG_SIGN) : '0'.concat(SYMBOL_ENUM.SPACE).concat(SYMBOL_ENUM.DONG_SIGN);

    return {
      headers,
      items: mockOrderDetails,

      displayCurrency
    }
  }
}
</script>
<style lang="scss">
  
</style>