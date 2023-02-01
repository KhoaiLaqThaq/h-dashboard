<template>
  <div class="row py-1">
    <div class="w20p">{{ orderItem.code }}</div>
    <div class="w20p">{{ orderItem.name }}</div>
    <div class="w20p text-center">{{ $n(orderItem.amount) }}</div>
    <div class="w20p text-center">{{ displayCurrency(orderItem.price) }}</div>
    <div class="w20p text-end">{{ displayCurrency(orderItem.finalPrice) }}</div>
  </div>
</template>
<script setup>
import { useI18n } from 'vue-i18n';
import {
  SYMBOL_ENUM
} from '~~/constants/symbol.enum'

// props
const props = defineProps({
  orderItem: Object
});

// define state
const { n } = useI18n();
const displayCurrency = (price) => price ? n(price).concat(SYMBOL_ENUM.SPACE).concat(SYMBOL_ENUM.DONG_SIGN) : '0'.concat(SYMBOL_ENUM.SPACE).concat(SYMBOL_ENUM.DONG_SIGN);

</script>
