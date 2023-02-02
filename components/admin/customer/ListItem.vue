<template>
  <div class="row mx-0 border-theme rounded-10 py-3 px-2 bg-white">
    <div class="col-1 m-auto text-yl cursor-pointer flex-center-vertical">
      <a :href="`#collapse__${item.code}`" data-bs-toggle="collapse" role="button" aria-expanded="false" :aria-controls="`collapse__${item.code}`" @click="arrowExpanding(item.code)">
        <font-awesome-icon icon="fa-solid fa-angles-down" class="arrow-expanding text-yl" :id="`arrow__${item.code}`" />
      </a>
    </div>
    <div class="col-2 flex-center-vertical">{{ item.code }}</div>
    <div class="col-2 flex-center-vertical">{{ $d(item.recentLogin, 'long') }}</div>
    <div class="col-2 flex-center-vertical">{{ item.name }}</div>
    <div
      class="col-2 text-center flex-center-vertical"
      :class="item.status === 1 ? 'text-success': 'text-danger'"
    >
      {{ $t(`label.customer.status.${item.status}`) }}
    </div>
    <div class="col-3 text-end">
      <button type="button" class="btn bgc-primary minW-80 me-3 px-3 py-2 rounded-10 text-uppercase text-yl">{{ $t('label.button.edit') }}</button>
      <button type="button" class="btn bgc-primary minW-80 me-3 px-3 py-2 rounded-10 text-uppercase text-yl">{{ $t('label.button.delete') }}</button>
    </div>

    <div class="col-12 collapse" :id="`collapse__${item.code}`">
      <customer-expand-item :customer="customer" v-if="isExpanded"></customer-expand-item>
      <f-loading class="py-3" v-else></f-loading>
    </div>
  </div>
</template>
<script>
import { ref } from 'vue';
import CustomerExpandItem from '~~/components/admin/customer/CustomerExpandItem.vue';
import FLoading from '~~/components/common/FLoading/index.vue';

import CustomerService from '~~/services/model/customer.service';

export default {
  components: { CustomerExpandItem, FLoading },
  props: {
    item: Object
  },
  setup(props) {
    const customer = ref(null);
    const isExpanded = ref(false);

    const setCustomer = (data) => customer.value = Object.assign({}, data);
    const setIsExpanded = (data) => isExpanded.value = data;
    
    // mock customer detail
    const customerDetail = {
      businessCode: "BS012",
      businessStaffName: "Nguyen Tien A",
      identityCard: "023463124823",
      businessPlace: "Quận Hà Đông, Hà Nội",
      phone: "0237123513",
      email: "nguyentiena@gmail.com",
      address: "Number XXX, YYY street, HaDong district, HaNoi city"
    };

    function loadingCustomerDetail(code) {
      CustomerService.getByCode(code)
        .then(res => {
          if (res.data) setCustomer(res.data);
        })
        .catch(err => console.log(err))
        .finally(() => {
          setCustomer(customerDetail);
          setIsExpanded(true);
        })
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
        loadingCustomerDetail(code);
      }
      else setIsExpanded(false);
    }

    return {
      customer,
      isExpanded,
      arrowExpanding
    }
  }
}

</script>
<style lang="scss">
  
</style>