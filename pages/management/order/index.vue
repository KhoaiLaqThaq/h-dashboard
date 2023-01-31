<template>
  <div class="col-12">
    <title-header :title="titlePage"></title-header>
    <sell :headers="headers" :data="sellList"></sell>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';

import TitleHeader from '~~/components/common/TitleHeader.vue';
import Sell from '~~/components/admin/order';
import OrderService from '~~/services/model/order.service';

// define state
const sellList = ref(null);
const { t } = useI18n();
const titlePage = t('label.title.order');
const headers = [
  {text: 'orderCode', value: 'code'},
  {text: 'time', value: 'createdDate'},
  {text: 'customer', value: 'customer'},
  {text: 'status', value: 'status', style: 'text-center'},
];

// mock orders data
const mockOrders = [
  {code: "MAV1238762139", createdDate: new Date(), cid: "14123", customerName: "Nguyen Van A", status: 1},
  {code: "MAV1234556122", createdDate: new Date(), cid: "11442", customerName: "Nguyen Van B", status: 2}
];

// Fetch API
function getAllOrSearch() {
  OrderService.getAllOrSearch({})
  .then((res) => {
    if (res.data) {
      sellList.value = res.data;
    }
  }).catch(err => {
    console.log(err);
  }).finally(() => sellList.value = Object.assign([], mockOrders));
}

onMounted(() => {
  getAllOrSearch();
})

</script>
<style lang="scss">
  
</style>