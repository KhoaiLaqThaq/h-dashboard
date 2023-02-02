<template>
  <div class="row mx-0 border-theme rounded-10 py-3 px-2 bg-white">
    <div class="col-1 m-auto text-yl cursor-pointer flex-center-vertical">
      <a :href="`#collapse__${item.code}`" data-bs-toggle="collapse" role="button" aria-expanded="false" :aria-controls="`collapse__${item.code}`" @click="arrowExpanding(item.code)">
        <font-awesome-icon icon="fa-solid fa-angles-down" class="arrow-expanding text-yl" :id="`arrow__${item.code}`" />
      </a>
    </div>
    <div class="col-2 flex-center-vertical">{{ item.code }}</div>
    <div class="col-2 flex-center-vertical">{{ $d(item.createdDate, 'long') }}</div>
    <div class="col-2 flex-center-vertical">{{ item.code }} {{ item.customerName }}</div>
    <div :class="`col-2 flex-center-vertical text-center ${displayColorStatus(item.status)}`">{{ $t(`label.sell.status.${displayStatus(item.status)}`) }}</div>
    <div class="col-3 text-end">
      <button type="button" class="btn bgc-warning text-uppercase minW-80 text-white me-2">{{ $t('label.button.approve') }}</button>
      <button type="button" class="btn bgc-primary text-uppercase minW-80 text-yl me-2">{{ $t('label.button.edit') }}</button>
      <button type="button" class="btn bgc-primary text-uppercase minW-80 text-yl">{{ $t('label.button.reject') }}</button>
    </div>
    <!-- expand -->
    <div class="col-12 collapse" :id="`collapse__${item.code}`">
      <order-expand-item v-if="isExpanded"></order-expand-item>
      <f-loading class="py-5" v-else></f-loading>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import {
  displayStatus,
  displayColorStatus
} from '~~/constants/order/status.enum';
import OrderExpandItem from '~~/components/admin/order/OrderExpandItem.vue';
import FLoading from '~~/components/common/FLoading/index.vue'
import OrderService from '~~/services/model/order.service';

const props = defineProps({
  item: Object
});

// define state
const order = ref(null);
const isExpanded = ref(false);

// mock data detail
const orderDetail = {

};

function loadingOrderDetail(code) {
  OrderService.getByCode(code)
    .then(res => {
      if (res.data) {
        order.value = Object.assign({}, res.data);
      }
    })
    .catch(err => console.log(err))
    .finally(() => {
      order.value = Object.assign({}, orderDetail);
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
    loadingOrderDetail(code);
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