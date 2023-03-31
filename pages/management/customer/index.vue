<template>
  <div class="col-12">
    <f-header-page :headerPage="headerPage"></f-header-page>
    <customer :headers="tableHeaders" :customers="customerList"></customer>
    <pagination :page="pagination.page" :size="pagination.size" :number="pagination.number" :numberOfPages="pagination.numberOfPages" :numberOfElements="pagination.numberOfElements" :totalPages="pagination.totalPages" :totalElements="pagination.totalElements" :first="pagination.first" :last="pagination.last" ></pagination>
  </div>
</template>
<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useI18n } from 'vue-i18n'; 

import FHeaderPage from '~~/components/common/FHeaderPage';
import Customer from '~~/components/admin/customer';
import Pagination from '~~/components/common/table/Pagination.vue';

import CustomerService from '~~/services/model/customer.service';

const {t} = useI18n();
const customerList = ref(null);
const pagination = reactive({
  page: 0,
  size: 10,
  number: 1,
  numberOfElements: 5,
  totalPages: 1,
  totalElements: 5,
  first: false,
  last: false
});
const headerPage = reactive({
  titlePage: t('label.customer.title.list'),
  routerLink: '/management/customer/form',
  routerName: t('label.button.create')
});

const tableHeaders = [
  {text: "customerCode", value: "code", style: "col-2"},
  {text: "recentLogin", value: "recentLogin", style: "col-2"},
  {text: "customerName", value: "name", style: "col-2"},
  {text: "status", value: "status", style: "col-2 text-center"},
  {text: "action", style: "col-3 text-end pe-10"}
];

// mock customers data
const mockCustomers = [
  { id: 1, code: "MV127381", recentLogin: new Date(), name: "Nguyen Van A", status: 1 },
  { id: 2, code: "MV121356", recentLogin: new Date(), name: "Nguyen Van B", status: 1 },
  { id: 3, code: "MV102183", recentLogin: new Date(), name: "Nguyen Van C", status: 1 },
  { id: 4, code: "MV203134", recentLogin: new Date(), name: "Nguyen Thi A", status: 1 },
  { id: 5, code: "MV213511", recentLogin: new Date(), name: "Nguyen Van AAA", status: 0 }
];

function getAllOrSearch() {
  let criteria = {};
  CustomerService.getAllOrSearch(criteria)
  .then(res => {
    if (res.data) customerList.value = Object.assign(res.data)
  })
  .catch(err => console.log(err))
  .then(() => customerList.value = Object.assign(mockCustomers))
}

onMounted(() => {
  getAllOrSearch();
})
</script>
<style lang="scss">
  
</style>