<template>
  <div class="row pt-5">
    <div class="col-1"></div>
    <div class="col-11">
      <div class="row">
        <div class="col-3">
          <div class="row">
            <label for="customerName" class="col-3 flex-center-vertical">{{ $t('label.createdBy') }}</label>
            <div class="col-9">
              <input type="text" id="customerName" class="form-control rounded-10" v-model="mockCustomer.name" />
            </div>
          </div>
        </div>
        <div class="col-3">
          <div class="row">
            <label for="merchantName" class="col-3 text-end flex-center-vertical">{{ $t(('label.customer.merchant.name')) }}</label>
            <div class="col-9">
              <input type="text" id="merchantName" class="form-control rounded-10" v-model="mockCustomer.merchantName" />
            </div>
          </div>
        </div>
        <div class="col-6">
          <div class="row">
            <label for="merchantStaff" class="col-4 text-end flex-center-vertical">{{ $t('label.customer.merchant.staff') }}</label>
            <div class="col-8">
              <input type="text" id="merchantStaff" class="form-control rounded-10" v-model="mockCustomer.merchantStaff" />
            </div>
          </div>
        </div>
      </div>

      <div class="row mb-3">
        <div class="col-6">
          <div class="row">
            <label for="note" class="col-1 flex-center-vertical">{{ $t('label.note') }}</label>
            <div class="col-10 w653px ps-5">
              <input type="text" id="note" class="form-control rounded-10" autocomplete="off" v-model="mockCustomer.note" />
            </div>
          </div>
        </div>
      </div>

      <div class="row mb-3">
        <order-detail></order-detail>
        <history-payment :payment="mockPayment"></history-payment>
      </div>

      <div class="row">
        <div class="col-12">
          <button type="button" class="btn bgc-primary w150px me-1 rounded-10 text-white">{{ $t('label.button.export.file') }}</button>
          <button type="button" class="btn bgc-primary w150px me-1 rounded-10 text-white">{{ $t('label.button.export.bill') }}</button>
          <button type="button" class="btn bgc-primary w150px me-1 rounded-10 text-yl">{{ $t('label.button.save') }}</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { reactive } from 'vue';
import OrderDetail from '~~/components/admin/order/detail';
import HistoryPayment from '~~/components/admin/order/detail/HistoryPayment.vue';

const mockCustomer = reactive({
  name: "Khách hàng",
  merchantName: "Chị Lan - Hà Đông",
  merchantStaff: "Trần Văn A",
  note: "Giao hàng hôm nào cũng được."
});

const mockPayment = {
  status: 99,
  timePayment: new Date(),
  method: 1,
  paid: 9000000,
  unpaid: 6000000
}
</script>
<style lang="scss">
  
</style>