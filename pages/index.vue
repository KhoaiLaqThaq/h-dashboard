<template>
  <div>
    <div class="col-12 pt-4 mb-5" v-if="useCurrentsRole(currentRole, [ROLES.ROLE_REPORT_VIEW])">
      <h2 class="font-medium text-lg lucide fw-bold">Thống kê chung</h2>
      <PreviewReport />
      <!-- other reports -->
    </div>
    <hr>
    <!-- chart -->
    <div class="row">
      <!-- Statistic news by topic -->
      <div class="col-md-6 col-xs-12" v-if="useCurrentsRole(currentRole, [ROLES.ROLE_REPORT_VIEW])">
        <h2 class="font-medium text-lg lucide fw-bold">Thống kê số lượng tin theo từng chuyên mục</h2>
        <StatisticNewsByTopic />
      </div>
      <!-- /Statistic news by topic -->
      
      <!-- Statistic user by department -->
      <div class="col-md-6 col-xs-12" v-if="useCurrentsRole(currentRole, [ROLES.ROLE_REPORT_VIEW])">
        <h2 class="font-medium text-lg lucide fw-bold">Thống kê số lượng người dùng theo từng đơn vị thành viên</h2>
        <StatisticUsersByDepartment />
      </div>
      <!-- /Statistic user by department -->
    </div>

  </div>
</template>
<script>
import { useCurrentsRole } from "~~/services/common.js";
import PreviewReport from "~~/components/dashboard/PreviewReport.vue";

import {ROLES} from "~~/constants/roles.js";
import StatisticNewsByTopic from "~~/components/dashboard/StatisticNewsByTopic.vue";
import StatisticUsersByDepartment from "~~/components/dashboard/StatisticUsersByDepartment.vue";

export default {
  components: {
    PreviewReport,
    StatisticNewsByTopic,
    StatisticUsersByDepartment
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
