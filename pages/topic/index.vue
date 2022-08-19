<template>
  <div class="mt-3">
    <div class="d-flex">
      <TitleHeader :title="titleForm" />
    </div>
    <AddButton class="mb-4" :title="btnTitle" :routerPush="routerPush" />
    <div class="col-8 table-content box p-3">
      <TableComponent
        :headers="tableHeader"
        :items="topics"
        :actionEdit="true"
        :actionDelete="true"
        :page="page"
        :size="size"
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
import TableComponent from "~~/components/common/table/TableTopicsComponent.vue";
import Pagination from "~~/components/common/table/Pagination.vue";

import CONFIG from "~~/config";
import axios from "axios";

export default {
  components: { TitleHeader, AddButton, TableComponent, Pagination },
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
    const topics = ref([]);
    const page = ref(0);
    const size = ref(10);
    const itemsSelected = ref([]);
    const themeColor = ref("#1e40af");

    function setPagination(data) {
      topics.value = data;
    }
    // call api
    function searchCallApi() {
      let criteria = {
        page: page.value,
        size: size.value,
      };

      // TODO: Call api
      axios
        .get(`${CONFIG.BASE_URL}/api/topics`, criteria)
        .then((response) => {
          //   console.log(response.data);
          const data = response.data;
          setPagination(data);
        })
        .catch((e) => {
          this.errors.push(e);
        });
    }

    watch([page, size], () => {
      searchCallApi();
    });

    return {
      tableHeader,
      topics,
      itemsSelected,
      themeColor,
      page,
      size,

      searchCallApi,
    };
  },
  created() {
    // console.log("enter created()...");
    this.searchCallApi();
  },
};
</script>
<style lang=""></style>
