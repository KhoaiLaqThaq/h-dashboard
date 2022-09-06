<template>
  <div class="mt-3">
    <div class="d-flex">
      <TitleHeader :title="titleForm" />
    </div>
    <AddButton class="mb-4" :title="btnTitle" :routerPush="routerPush" />
    <div class="col-12 table-content">
      <TableComponent
        :headers="tableHeader"
        :items="topics"
        :actionEdit="true"
        :page="page"
        :size="size"
        :routerPush="routerPush"
      />
      <pagination
        :page="page"
        :size="size"
        @change-page="page = $event"
        @change-size="size = $event"
      />
    </div>
  </div>
</template>
<script>
import { ref, watch } from "vue";
import TitleHeader from "~~/components/common/TitleHeader.vue";
import AddButton from "~~/components/common/AddButton.vue";
import TableComponent from "~~/components/common/table/TableGroupsComponent.vue";
import Pagination from "~~/components/common/table/Pagination.vue";

import CONFIG from "~~/config";
import axios from "axios";

export default {
  components: { TitleHeader, AddButton, TableComponent, Pagination },
  data() {
    return {
      titleForm: "Danh sách nhóm quyền",
      btnTitle: "Thêm mới",
      routerPush: "/system/group/form",
    };
  },
  setup() {
    const tableHeader = [
      { text: "STT", value: "no" },
      { text: "Tên nhóm quyền", value: "name" },
    ];

    const topics = ref([
      {
        no: 1,
        name: "Nhóm quyền Admin",
      },
      {
        no: 2,
        name: "Nhóm quyền duyệt tin",
      },
      {
        no: 2,
        name: "Nhóm quyền thêm nội dung",
      },
    ]);
    const page = ref(0);
    const size = ref(10);
    const itemsSelected = ref([]);
    const themeColor = ref("#1e40af");

    return {
      tableHeader,
      topics,
      itemsSelected,
      themeColor,
      page,
      size,
    };
  },
  //   created() {
  //     this.searchCallApi();
  //   },
};
</script>
<style lang=""></style>
