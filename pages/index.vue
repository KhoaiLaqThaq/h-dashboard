<template>
  <div class="row">
    <div class="col-12 pt-4" v-if="useCurrentsRole(currentRole, [ROLES.ROLE_REPORT_VIEW])">
      <h2 class="font-medium text-lg lucide">Báo cáo chung</h2>
      <PreviewReport />

      <!-- other reports -->
    </div>
  </div>
</template>
<script>
import { useCurrentsRole } from "~~/services/common.js";
import PreviewReport from "~~/components/dashboard/PreviewReport.vue";

import {ROLES} from "~~/constants/roles.js";

export default {
  components: {
    PreviewReport
  },
  setup() {
    const currentRole = useCurrentRole();
    return {
      ROLES, currentRole,
      useCurrentsRole,
    }
  }
};
</script>
<style lang=""></style>
