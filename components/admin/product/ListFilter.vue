<template>
  <div class="row mb-3">
    <div class="col-6 d-flex ">
      <div class="mx-3 flex-center-vertical">{{ $t('label.filter.title') }}</div>
      <button
        type="button"
        class="product__type py-1 px-3 text-theme border-1px-primary rounded-5 me-3"
        :id="`product__type--item-${item.id}`"
        v-for="(item, index) in items"
        :key="index"
        @click="filterCondition(item.id)"
      >{{ item.name }}</button>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  items: Array
})

function filterCondition(productTypeId) {
  let prefixSelectorId = 'product__type--item-';
  document.getElementById(prefixSelectorId.concat(productTypeId))
            .classList
            .toggle('active')

  const productTypeSelectors = document.getElementsByClassName('product__type');
  if (productTypeSelectors.length) {
    for(let i = 0; i< productTypeSelectors.length; i++) {
      let element = productTypeSelectors[i];
      if (prefixSelectorId.concat(productTypeId) != element.id) {
        element.classList.remove('active')
      }
    }
  }
}

</script>
<style lang="scss" scoped>
button {
  background-color: #fff;
  &.active {
    background-color: #014683;
    color: #FFFFFF;
  }
}
</style>