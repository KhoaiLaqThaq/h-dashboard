<template>
  <div class="row">
    <div class="col-12 pt-4">
      <h2 class="font-medium text-lg lucide">Báo cáo chung</h2>
      <PreviewReport />

      <!-- other reports -->
    </div>
  </div>
</template>
<script>
import PreviewReport from "~~/components/dashboard/PreviewReport.vue";

export default {
  components: {
    PreviewReport
  }
};
</script>
<style lang=""></style>
