<template>
  <div class="mt-3">
    <div class="d-flex">
      <TitleHeader :title="titleForm" />
      <AddButton v-if="useCurrentsRole(currentRole,[ROLES.ROLE_ADMIN, ROLES.ROLE_TOPIC_CREATE])" class="ms-auto mb-4"
        :title="btnTitle" :routerPush="routerPush" />
    </div>
    <div class="col-12 table-content">
      <TableComponent :headers="tableHeader" :items="topics" :actionEdit="true" :actionDelete="true" :page="page"
        :size="size" />
    </div>
  </div>
</template>
<script>
import { ref, watch } from "vue";
import TitleHeader from "~~/components/common/TitleHeader.vue";
import AddButton from "~~/components/common/AddButton.vue";
import TableComponent from "~~/components/common/table/TableTopicsComponent.vue";
import Pagination from "~~/components/common/table/Pagination.vue";
import { useCurrentsRole } from "~~/services/common.js"

import CONFIG from "~~/config";
import { ROLES } from "~~/constants/roles.js";
import axios from "axios";

export default {
  components: { TitleHeader, AddButton, TableComponent, Pagination },
  data() {
    return {
      titleForm: "Danh sách chuyên mục",
      btnTitle: "Thêm mới",
      routerPush: "/common/topic/form",
    };
  },
  setup() {
    const tableHeader = [
      { text: "STT", value: "no" },
      { text: "Tên chuyên mục", value: "name" },
    ];

    const topics = ref([]);
    const page = ref(0);
    const size = ref(10);
    const itemsSelected = ref([]);
    const themeColor = ref("#1e40af");
    const header = useHeader();
    const currentRole = useCurrentRole();

    function setPagination(data) {
      topics.value = data;
    }
    // call api
    function searchCallApi() {
      let criteria = {
        page: page.value,
        size: size.value,
      };
      let tokenHeader = {
        'Authorization': header.value,
        'Content-Type': 'application/json'
      };
      // TODO: Call api
      axios
        .get(`${CONFIG.BASE_URL}/${CONFIG.NEWS_GATEWAY}/api/topics`, { headers: tokenHeader })
        .then((response) => {
          //   console.log(response.data);
          const data = response.data;
          setPagination(data);
        })
        .catch((e) => {
          console.log(e);
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
      currentRole,
      ROLES,

      searchCallApi,
      useCurrentsRole,
    };
  },
  created() {
    this.searchCallApi();
  },
};
</script>
<style lang=""></style>
