<template>
  <div class="row">
    <div class="col-12 pt-4" v-if="useCurrentsRole(currentRole, [ROLES.ROLE_REPORT_VIEW])">
      <h2 class="font-medium text-lg lucide">Báo cáo chung</h2>
      {{ time }}
      <PreviewReport />

      <!-- other reports -->
    </div>
  </div>
</template>
<script>
import {ref} from 'vue'
import { useCurrentsRole } from "~~/services/common.js";
import PreviewReport from "~~/components/dashboard/PreviewReport.vue";

import {ROLES} from "~~/constants/roles.js";

export default {
  components: {
    PreviewReport
  },
  setup() {
    const time = ref(60);
    const currentRole = useCurrentRole();

    function timeCountDown() {
      setTimeout(() => {
        console.log("time out")
        if (time.value > 0) {
          time.value = time.value-1;
        }
      }, 60000);
    }

    return {
      time,
      ROLES,
      currentRole,

      useCurrentsRole,
      timeCountDown
    }
  },
  created() {
    this.timeCountDown()
  }
};
</script>
<style lang=""></style>
