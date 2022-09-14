<template>
  <div class="mt-3">
    <div class="d-flex">
      <TitleHeader :title="titleForm" />
      <AddButton
        class="ms-auto mb-4"
        :title="btnTitle"
        :routerPush="routerPush"
      />
    </div>
    <div class="col-12 table-content">
      <TableComponent
        :headers="tableHeader"
        :items="newsTypes"
        :actionEdit="true"
        :actionDelete="false"
      />
    </div>
  </div>
</template>
<script>
import { ref, watch } from "vue";
import TitleHeader from "~~/components/common/TitleHeader.vue";
import AddButton from "~~/components/common/AddButton.vue";
import TableComponent from "~~/components/common/table/TableNewsTypeComponent.vue";

import CONFIG from "~~/config";
import axios from "axios";

export default {
  components: { TitleHeader, AddButton, TableComponent },
  data() {
    return {
      titleForm: "Danh sách loại tin tức",
      btnTitle: "Thêm mới",
      routerPush: "/common/newsType/form",
    };
  },
  setup() {
    const tableHeader = [
      { text: "STT", value: "no" },
      { text: "Mã", value: "code" },
      { text: "Tên loại tin tức", value: "name" },
    ];

    const newsTypes = ref([]);
    const header = useHeader();

    // call api
    function searchCallApi() {
      let tokenHeader = {
        'Authorization': header.value,
        'Content-Type': 'application/json'
      };
      // TODO: Call api
      axios
        .get(`${CONFIG.BASE_URL}/${CONFIG.NEWS_GATEWAY}/api/newsTypes`, {headers: tokenHeader})
        .then((response) => {
          //   console.log(response.data);
          const data = response.data;
          newsTypes.value = data;
        })
        .catch((e) => {
          console.log(e);
        });
    }

    return {
      tableHeader,
      newsTypes,

      searchCallApi,
    };
  },
  created() {
    this.searchCallApi();
  },
};
</script>
<style lang=""></style>
