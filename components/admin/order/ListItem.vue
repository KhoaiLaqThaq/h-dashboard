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
      <button type="button" class="btn btn-submit text-uppercase minW-80 text-white me-2">{{ $t('label.button.approve') }}</button>
      <button type="button" class="btn btn-theme text-uppercase minW-80 text-yl me-2">{{ $t('label.button.edit') }}</button>
      <button type="button" class="btn btn-theme text-uppercase minW-80 text-yl">{{ $t('label.button.reject') }}</button>
    </div>
    <!-- expand -->
    <div class="col-12 collapse" :id="`collapse__${item.code}`">
      <order-expand-item></order-expand-item>
    </div>
  </div>
</template>
<script>
import {
  displayStatus,
  displayColorStatus
} from '~~/constants/order/status.enum';
import OrderExpandItem from '~~/components/admin/order/OrderExpandItem.vue';
export default {
  components: {OrderExpandItem},
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      displayStatus,
      displayColorStatus
    }
  },
  setup(props) {
    const arrowExpanding = (code) => document.getElementById('arrow__'.concat(code)).classList.toggle('expanded');

    return {
      arrowExpanding
    }
  }
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