<template>
  <div class="mt-3">
    <div class="d-flex mb-3">
      <TitleHeader :title="titleForm" />
      <AddButton class="ms-auto" :title="btnTitle" :routerPush="routerPush" />
    </div>

    <div class="table-content box p-3">
      <TableComponent
        :headers="tableHeader"
        :items="tableData"
        :actionEdit="true"
      />
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
import TitleHeader from "~~/components/common/TitleHeader.vue";
import AddButton from "~~/components/common/AddButton.vue";
import TableComponent from "~~/components/common/table/TableNewsComponent.vue";
export default {
  components: { TitleHeader, AddButton, TableComponent },
  data() {
    return {
      titleForm: "Danh sách chủ đề",
      btnTitle: "Thêm mới",
      routerPush: "/topic/form",
    };
  },
  setup() {
    const tableHeader = [
      { text: "No", value: "no" },
      { text: "Name", value: "name" },
    ];

    const tableData = ref([]);

    return {
      tableHeader,
      tableData,
    };
  },
};
</script>
<style lang=""></style>
