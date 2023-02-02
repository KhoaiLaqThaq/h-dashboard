<template>
  <div class="row mx-0 border-theme rounded-10 px-2 py-3 bg-white">
    <div class="col-1 m-auto text-yl cursor-pointer flex-center-vertical">
      <a :href="`#collapse__${item.code}`" data-bs-toggle="collapse" role="button" aria-expanded="false" :aria-controls="`collapse__${item.code}`" @click="arrowExpanding(item.code)">
        <font-awesome-icon icon="fa-solid fa-angles-down" class="arrow-expanding text-yl" :id="`arrow__${item.code}`" />
      </a>
    </div>
    <div class="col-2">{{ item.code }}</div>
    <div class="col-3">{{ item.name }}</div>
    <div class="col-2">{{ item.type }}</div>
    <div class="col-2 text-center">{{ item.size }}</div>
    <div class="col-2 text-center">{{ item.spec }}</div>

    <div class="col-12 collapse" :id="`collapse__${item.code}`">
      <product-expand-item :product="product" v-if="isExpanded"></product-expand-item>
      <f-loading class="py-5" v-else></f-loading>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import ProductExpandItem from '~~/components/admin/product/ProductExpandItem.vue';
import ProductService from '~~/services/model/product.service';
import FLoading from '~~/components/common/FLoading/index.vue'

const props = defineProps({
  item: Object
});

// define state
const product = ref(null);
const isExpanded = ref(false);

// mock data
const productDetail = {
  code: "HD213204",
  name: "Xúc xích Hong khói",
  type: "Xúc xích",
  producer: "Tự sản xuất",
  weight: 500,
  unit: "g",
  cost: 40000,
  sale: 90000,
  inventory: 250
};

function loadingProductDetail(code) {
  ProductService.getByCode(code)
    .then(res => {
      if (res.data) {
        product.value = Object.assign({}, res.data);
      }
    })
    .catch(err => console.log(err))
    .finally(() => {
      product.value = Object.assign({}, productDetail);
      isExpanded.value = true;
    });
}

function arrowExpanding(code) {
  document.getElementById('arrow__'.concat(code)).classList.toggle('expanded');
  const selectorExpandeds = document.getElementsByClassName('expanded');

  const selectorShowings = document.getElementsByClassName('show');
  for (let i = 0; i < selectorShowings.length; i++) {
    const element = selectorShowings[i];
    if ("collapse__".concat(code) !== element.id) {
      element.classList.remove("show");
    }
  }

  for (let i = 0; i < selectorExpandeds.length; i++) {
    const element = selectorExpandeds[i];
    if ("arrow__".concat(code) !== element.id) {
      element.classList.remove("expanded")
    }
  }

  if (selectorExpandeds && selectorExpandeds.length > 0) {
    nextTick();
    loadingProductDetail(code);
  }
  else isExpanded.value = false;
}
</script>
<style lang="scss" scoped>
.arrow-expanding {
  transition: transform 0.25s;
  &.expanded {
    transform: rotate(180deg);
  }
}
</style>