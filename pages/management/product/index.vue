<template>
  <div class="col-12">
    <title-header :title="titlePage" class="mb-3"></title-header>
    <product :headers="headers" :productTypes="mockProductTypes" :products="mockProducts"></product>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n';

import TitleHeader from '~~/components/common/TitleHeader.vue';
import Product from '~~/components/admin/product';
import ProductService from '~~/services/model/product.service';

// define state
const { t } = useI18n();
const productList = ref(null);
const titlePage = t('label.title.product');
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