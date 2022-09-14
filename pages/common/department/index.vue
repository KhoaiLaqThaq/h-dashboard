<template>
  <div class="mt-3">
    <div class="d-flex mb-3">
      <TitleHeader :title="titleForm" />
      <AddButton
        class="ms-auto"
        :textSize="'text-small'"
        :title="btnTitle"
        :routerPush="routerPush"
      />
    </div>

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
      { text: "STT", value: "no" },
      { text: "Mã đơn vị thành viên", value: "code" },
      { text: "Tên đơn vị thành viên", value: "name" },
    ];
    const departments = ref([]);
    const header = useHeader();
    // call api
    function searchCallApi() {
      let tokenHeader = {
        'Authorization': header.value,
        'Content-Type': 'application/json'
      };
      axios
        .get(`${CONFIG.BASE_URL}/${CONFIG.NEWS_GATEWAY}/api/departments`, {headers: tokenHeader})
        .then((response) => {
          const data = response.data;
          console.log(response);
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
