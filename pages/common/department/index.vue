<template>
  <div class="mt-3">
    <div class="d-flex">
      <TitleHeader :title="titleForm" />
    </div>
    <AddButton class="mb-4" :title="btnTitle" :routerPush="routerPush" />
    <div class="col-12 table-content">
      <TableDepartmentComponent
        :headers="tableHeader"
        :items="departments"
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
import TableDepartmentComponent from "~~/components/common/table/TableDepartmentComponent.vue";
import Pagination from "~~/components/common/table/Pagination.vue";

import CONFIG from "~~/config";
import axios from "axios";

export default {
  components: { TitleHeader, AddButton, TableDepartmentComponent, Pagination },
  data() {
    return {
      titleForm: "Danh sách đơn vị",
      btnTitle: "Thêm mới",
      routerPush: "/common/department/form/",
    };
  },
  setup() {
    const tableHeader = [
      { text: "No", value: "no" },
      { text: "Code", value: "code" },
      { text: "Name", value: "name" },
    ];
    const departments = ref([]);

    // call api
    function searchCallApi() {
      axios
        .get(`${CONFIG.BASE_URL}/api/departments`)
        .then((response) => {
          const data = response.data;
          departments.value = data;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    }

    return {
      tableHeader,
      departments,
      searchCallApi,
    };
  },
  mounted() {
    this.searchCallApi();
  },
};
</script>
<style lang=""></style>
