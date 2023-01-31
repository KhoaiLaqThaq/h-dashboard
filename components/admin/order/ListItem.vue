<template>
  <div class="row border-theme rounded-10 py-3 px-2 bg-white">
    <div class="col-1 m-auto text-yl cursor-pointer flex-center-vertical">
      <a :href="`#collapse__${item.code}`" data-bs-toggle="collapse" role="button" aria-expanded="false" :aria-controls="`collapse__${item.code}`"><font-awesome-icon icon="fa-solid fa-angles-down" /></a>
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
import OrderExpandItem from '~~/components/admin/order/OrderExpandItem.vue';
export default {
  components: {OrderExpandItem},
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    function displayColorStatus(status) {
      switch(status) {
        case 1:
          return 'text-danger';
        case 99:
          return 'text-success';
        default:
          return 'text-primary';
      }
    }

    /*
      1: pending, 2: approved, 3: exported, 4: rejected, 99: invoice
    */
    function displayStatus(status) {
      switch (status) {
        case 1:
          return 'pending';
        case 2:
          return 'approved';
        case 3:
          return 'exported';
        case 4:
          return 'rejected';
        case 99:
          return 'invoiced';
        default: 
          return 'unknown';
      }
    }

    return {
      displayStatus,
      displayColorStatus
    }
  }
}
</script>
