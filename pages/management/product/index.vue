<template>
  <div class="col-12">
    <f-header-page :headerPage="headerPage"></f-header-page>
    <product :headers="headers" :productTypes="mockProductTypes" :products="productList"></product>
    <pagination :page="pagination.page" :size="pagination.size" :number="pagination.number" :numberOfPages="pagination.numberOfPages" :numberOfElements="pagination.numberOfElements" :totalPages="pagination.totalPages" :totalElements="pagination.totalElements" :first="pagination.first" :last="pagination.last" ></pagination>
  </div>
</template>
<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useI18n } from 'vue-i18n';

import FHeaderPage from '~~/components/common/FHeaderPage';
import Product from '~~/components/admin/product';
import Pagination from '~~/components/common/table/Pagination.vue';
import ProductService from '~~/services/model/product.service';

// define state
const { t } = useI18n();
const headerPage = reactive({
  titlePage: t('label.title.product'),
  routerLink: '/management/product/form',
  routerName: t('label.button.create')
});

const productList = ref(null);
const headers = [
  {text: 'code', value: 'code', style: 'col-2'},
  {text: 'name', value: 'name', style: 'col-3'},
  {text: 'type', value: 'type', style: 'col-2'},
  {text: 'size', value: 'size', style: 'col-2 text-center'},
  {text: 'spec', value: 'spec', style: 'col-2 text-center'},
];

// mock products data
const mockProducts = [
  {code: "HD213204", name: "Xúc xích Hong khói", type: "Xúc xích", size: "28mm", spec: "200g"},
  {code: "HD213205", name: "Xúc xích Hong khói", type: "Xúc xích", size: "28mm", spec: "200g"},
  {code: "HD213206", name: "Xúc xích Hong khói", type: "Xúc xích", size: "28mm", spec: "200g"},
  {code: "HD213207", name: "Xúc xích Hong khói", type: "Xúc xích", size: "28mm", spec: "200g"},
  {code: "HD213208", name: "Xúc xích Hong khói", type: "Xúc xích", size: "28mm", spec: "200g"},
  {code: "HD213209", name: "Xúc xích Hong khói", type: "Xúc xích", size: "28mm", spec: "200g"},
  {code: "HD213321", name: "Xúc xích Hong khói", type: "Xúc xích", size: "28mm", spec: "200g"}
]

const mockProductTypes = [
  {id: 1, name: "Xúc xích"},
  {id: 2, name: "Cắt lát/xay nhuyễn"},
  {id: 3, name: "Cá viên"}
]

const pagination = reactive({
  page: 0,
  size: 10,
  number: 1,
  numberOfElements: 7,
  totalPages: 1,
  totalElements: 7,
  first: false,
  last: false
});

// Fetch API
function getAllOrSearch() {
  ProductService.getAllOrSearch({})
    .then((res) => {
      if (res.data) {
        productList.value = res.data;
      }
    }).catch((err) => console.log(err))
    .finally(() => productList.value = Object.assign([], mockProducts));
}

onMounted(() => {
  getAllOrSearch();
})

</script>
<style lang="scss">
  
</style>