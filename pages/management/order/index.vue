<template>
  <div class="col-12">
    <f-header-page :headerPage="headerPage"></f-header-page>
    <sell :headers="headers" :data="sellList"></sell>
    <pagination :page="pagination.page" :size="pagination.size" :number="pagination.number" :numberOfPages="pagination.numberOfPages" :numberOfElements="pagination.numberOfElements" :totalPages="pagination.totalPages" :totalElements="pagination.totalElements" :first="pagination.first" :last="pagination.last" ></pagination>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';

import FHeaderPage from '~~/components/common/FHeaderPage';
import Sell from '~~/components/admin/order';
import Pagination from '~~/components/common/table/Pagination.vue';
import OrderService from '~~/services/model/order.service';

// define state
const sellList = ref(null);
const pagination = reactive({
  page: 0,
  size: 10,
  number: 1,
  numberOfElements: 2,
  totalPages: 1,
  totalElements: 2,
  first: false,
  last: false
});
const { t } = useI18n();
const headerPage = ref({
  titlePage: t('label.title.order')
});

const headers = [
  {text: 'orderCode', value: 'code', style: 'col-2'},
  {text: 'time', value: 'createdDate', style: 'col-2'},
  {text: 'customer', value: 'customer', style: 'col-2'},
  {text: 'status', value: 'status', style: 'col-2 text-center'},
  {text: 'action', style: 'col-3 text-center ps-5'}
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