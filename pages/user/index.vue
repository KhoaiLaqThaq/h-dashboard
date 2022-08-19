<template>
  <div class="mt-3">
    <div class="d-flex">
      <TitleHeader :title="title" />
    </div>

    <div class="d-flex mt-3">
      <AddButton
        :textSize="'text-small'"
        :title="'Thêm mới'"
        :routerPush="routerPush"
      />
      <div class="ms-auto">
        <input type="text" class="form-control" placeholder="Tìm kiếm..." />
      </div>
    </div>

    <div class="table-content box p-3 mt-3">
      <table-component
        :headers="headers"
        :items="items"
        :actionEdit="true"
        :actionDelete="true"
      />

      <pagination
        :page="page"
        :size="size"
        :number="number"
        :numberOfElements="numberOfElements"
        :totalElements="totalElements"
        :totalPages="totalPages"
        :first="first"
        :last="last"
        @change-page="page = $event"
        @change-size="size = $event"
      />
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import TitleHeader from "~~/components/common/TitleHeader.vue";
import AddButton from "~~/components/common/AddButton.vue";
import BaseInput from "~~/components/common/BaseInput.vue";
import TableComponent from "~~/components/common/table/TableUsersComponent.vue";
import Pagination from "~~/components/common/table/Pagination.vue";
import { usersData } from "./data";
import { usersData1 } from "./data1";
import { usersData2 } from "./data2";

export default {
  components: {
    TitleHeader,
    AddButton,
    BaseInput,
    TableComponent,
    Pagination,
  },
  data() {
    return {
      title: "Danh sách người dùng",
      itemsSelected: [],
      themeColor: "#1e40af",
      routerPush: "/user/form",
    };
  },
  setup() {
    const page = ref(0);
    const size = ref(10);
    const number = ref(0);
    const numberOfElements = ref(10);
    const totalPages = ref(3);
    const totalElements = ref(30);
    const first = ref(false);
    const last = ref(false);
    //const currentPage = ref(0);
    const headers = [
      { text: "No", value: "no" },
      { text: "Fullname", value: "name" },
      { text: "Email", value: "email" },
      { text: "Firstname", value: "first_name" },
      { text: "Lastname", value: "last_name" },
      { text: "Age", value: "age" },
      { text: "Role", value: "role" },
    ];
    const items = ref([]);
    const tempItems = [usersData, usersData1, usersData2];
    function setPagination(news) {
      items.value = news.items;
    }
    function getListUsers() {
      items.value = tempItems[page.value];
      number.value = page.value;
    }
    watch([page, size], () => {
      getListUsers();
    });
    return {
      headers,
      items,
      page,
      size,
      numberOfElements,
      number,
      totalPages,
      totalElements,
      first,
      last,
      getListUsers,
    };
  },
  created() {
    this.getListUsers();
  },
};
</script>

<style lang=""></style>
