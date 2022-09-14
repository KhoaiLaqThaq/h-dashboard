<template>
  <div class="mt-3">
    <div class="d-flex">
      <TitleHeader :title="titleForm" />
    </div>

    <AddButton v-if="useCurrentsRole(currentRole,[ROLES.ROLE_ADMIN, ROLES.ROLE_SYS_PARAM_CREATE])" class="mb-4"
      :title="btnTitle" :routerPush="routerPush" />
    <div class="col-12 table-content">
      <TableComponent :headers="tableHeader" :items="systemParams" :actionEdit="true" :actionDelete="false"
        :routerPush="routerPush" />
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
import TitleHeader from "~~/components/common/TitleHeader.vue";
import AddButton from "~~/components/common/AddButton.vue";
import TableComponent from "~~/components/common/table/TableParamsComponent.vue";
import Pagination from "~~/components/common/table/Pagination.vue";
import { useCurrentsRole } from "~~/services/common.js"

import CONFIG from "~~/config";
import { ROLES } from "~~/constants/roles.js";
import axios from "axios";

export default {
  components: { TitleHeader, AddButton, TableComponent, Pagination },
  data() {
    return {
      titleForm: "Danh sách tham số hệ thống",
      btnTitle: "Thêm mới",
      routerPush: "/system/systemParams/form",
    };
  },
  setup() {
    const tableHeader = [
      { text: "STT", value: "id" },
      { text: "Tên tham số", value: "paramName" },
      { text: "Giá trị", value: "paramValue" },
      { text: "Ý nghĩa", value: "description" },
    ];
    const systemParams = ref([]);
    const header = useHeader();
    const currentRole = useCurrentRole();
    // call api
    function searchCallApi() {
      let tokenHeader = {
        'Authorization': header.value,
        'Content-Type': 'application/json'
      };
      axios
        .get(`${CONFIG.BASE_URL}/${CONFIG.NEWS_GATEWAY}/api/systemParameters`, { headers: tokenHeader })
        .then((response) => {
          const data = response.data;
          systemParams.value = data;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    }

    return {
      tableHeader,
      systemParams,
      currentRole,
      ROLES,
      searchCallApi,
      useCurrentsRole,
    };
  },
  mounted() {
    this.searchCallApi();
  },
};
</script>
<style lang=""></style>
