<template>
  <div class="row pt-5">
    <div class="col-1"></div>
    <div class="col-11">
      <div class="row">
        <div class="col-3">
          <div class="row">
            <label for="customerName" class="col-3 flex-center-vertical">{{ $t('label.createdBy') }}</label>
            <div class="col-9">
              <input type="text" id="customerName" class="form-control rounded-10" />
            </div>
          </div>
        </div>
        <div class="col-3">
          <div class="row">
            <label for="merchantName" class="col-3 text-end flex-center-vertical">{{ $t(('label.customer.merchant.name')) }}</label>
            <div class="col-9">
              <input type="text" id="merchantName" class="form-control rounded-10" />
            </div>
          </div>
        </div>
        <div class="col-6">
          <div class="row">
            <label for="merchantStaff" class="col-4 text-end flex-center-vertical">{{ $t('label.customer.merchant.staff') }}</label>
            <div class="col-8">
              <input type="text" id="merchantStaff" class="form-control rounded-10" />
            </div>
          </div>
        </div>
      </div>

      <div class="row mb-3">
        <div class="col-6">
          <div class="row">
            <label for="note" class="col-1 flex-center-vertical">{{ $t('label.note') }}</label>
            <div class="col-10 w662px ps-5">
              <input type="text" id="note" class="form-control rounded-10" autocomplete="off" />
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-9 border-end-2px-theme">
          <order-detail></order-detail>
        </div>

        <div class="col-3">
          
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import OrderDetail from '~~/components/admin/order/detail'

export default {
  components: { OrderDetail }
}
</script>
<style lang="scss">
  
</style>