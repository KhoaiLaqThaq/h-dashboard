<template>
  <div class="mt-3">
    <div class="d-flex">
      <TitleHeader :title="titleForm" />
    </div>

    <AddButton class="mb-4" :title="btnTitle" :routerPush="routerPush" />
    <div class="col-12 table-content">
      <TableComponent
        :headers="tableHeader"
        :items="systemParams"
        :actionEdit="true"
        :actionDelete="false"
        :routerPush="routerPush"
      />
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
import TitleHeader from "~~/components/common/TitleHeader.vue";
import AddButton from "~~/components/common/AddButton.vue";
import TableComponent from "~~/components/common/table/TableParamsComponent.vue";
import Pagination from "~~/components/common/table/Pagination.vue";

import CONFIG from "~~/config";
import axios from "axios";

export default {
  components: { TitleHeader, AddButton, TableComponent, Pagination },
  data() {
    return {
      titleForm: "Danh sách tham số hệ thống",
      btnTitle: "Thêm mới",
      routerPush: "/system/system-params/form/",
    };
  },
  setup() {
    const tableHeader = [
      { text: "No", value: "id" },
      { text: "Name", value: "paramName" },
      { text: "Value", value: "paramValue" },
      { text: "Description", value: "description" },
    ];
    const systemParams = ref([]);

    // call api
    function searchCallApi() {
      axios
        .get(`${CONFIG.BASE_URL}/api/systemParameters`)
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
      searchCallApi,
    };
  },
  mounted() {
    this.searchCallApi();
  },
};
</script>
<style lang=""></style>
