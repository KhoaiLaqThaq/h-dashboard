<template>
  <div class="mt-3">
    <div class="d-flex">
      <TitleHeader :title="titleForm" />
    </div>
    <AddButton class="mb-4" :title="btnTitle" :routerPush="routerPush" />
    <div class="col-8 table-content box p-3">
      <TableComponent
        :headers="tableHeader"
        :items="units"
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
import TableComponent from "~~/components/common/table/TableUnitsComponent.vue";
import Pagination from "~~/components/common/table/Pagination.vue";

import CONFIG from "~~/config";
import axios from "axios";

export default {
  components: { TitleHeader, AddButton, TableComponent, Pagination },
  data() {
    return {
      titleForm: "Danh sách đơn vị",
      btnTitle: "Thêm mới",
      routerPush: "/unit/form",
    };
  },
  setup() {
    const tableHeader = [
      { text: "No", value: "no" },
      { text: "Name", value: "name" },
    ];

    const units = ref([
      {
        id: 1,
        name: "Mavinex",
      },
      {
        id: 2,
        name: "Mavin Foods",
      },
      {
        id: 3,
        name: "Mavin Aqua",
      },
      {
        id: 4,
        name: "Mavin Fish",
      },
      {
        id: 5,
        name: "Mekovet",
      },
      {
        id: 6,
        name: "Mavin Pigfarm",
      },
      {
        id: 7,
        name: "Mavin Duckfarm",
      },
    ]);
    const page = ref(0);
    const size = ref(10);
    const itemsSelected = ref([]);
    const themeColor = ref("#1e40af");

    function setPagination(data) {
      units.value = data;
    }
    // call api
    function searchCallApi() {
      let criteria = {
        page: page.value,
        size: size.value,
      };

      // TODO: Call api
      axios
        .get(`${CONFIG.BASE_URL}/api/units`, criteria)
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
      units,
      itemsSelected,
      themeColor,
      page,
      size,

      searchCallApi,
    };
  },
  created() {
    //this.searchCallApi();
  },
};
</script>
<style lang=""></style>
