<template>
  <div class="content-news mt-3">
    <div class="d-flex">
      <TitleHeader :title="title" />
      <!-- <AddButton class="ms-auto" :title="btnTitle" :routerPush="routerPush" /> -->
    </div>
    <div class="d-flex mt-3">
      <AddButton
        :textSize="'text-small'"
        :title="btnTitle"
        :routerPush="routerPush"
      />
      <div class="ms-auto input-suggest__event">
        <input type="text" v-model="keyword" class="form-control pr-5" placeholder="Tìm kiếm..." @keyup.enter="searchCallApi()" />
        <span class="btn-suggest">Enter</span>
      </div>
    </div>
    <div class="table-content mt-3 radius-20">
      <table-news-component
        :headers="headers"
        :items="content"
        :actionEdit="true"
        :actionDelete="false"
        :page="page"
        :size="size"
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
import { ref, watch } from "vue";
import TitleHeader from "~~/components/common/TitleHeader.vue";
import AddButton from "~~/components/common/AddButton.vue";
import TableNewsComponent from "~~/components/common/table/TableNewsComponent.vue";
import Pagination from "~~/components/common/table/Pagination.vue";

import CONFIG from "~~/config";
import axios from "axios";

export default {
  components: {
    TitleHeader,
    AddButton,
    TableNewsComponent,
    Pagination,
  },
  data() {
    return {
      news: [],
      errors: [],
      routerPush: "/news/form",
      title: "Danh sách tin tức",
      btnTitle: "Thêm mới",
    };
  },
  setup() {
    const page = ref(0);
    const size = ref(10);
    const number = ref(0);
    const numberOfElements = ref(10);
    const totalPages = ref(0);
    const totalElements = ref(0);
    const first = ref(false);
    const last = ref(false);
    const content = ref([]);
    const keyword = ref('');

    const itemsSelected = ref([]);
    const themeColor = ref("#1e40af");

    const headers = [
      { text: "STT", value: "no" },
      { text: "Tiêu đề", value: "title" },
      { text: "Mô tả ngắn", value: "sub_desc" },
      { text: "Ngày tạo", value: "created_date" },
      { text: "Trạng thái", value: "status" },
    ];

    function setPagination(news) {
      content.value = news.content;
      page.value = news.page;
      size.value = news.size;
      number.value = news.number;
      numberOfElements.value = news.numberOfElements;
      totalPages.value = news.totalPages;
      totalElements.value = news.totalElements;
    }

    // call api
    function searchCallApi() {
      let criteria = {
        page: page.value,
        size: size.value,
        keyword: keyword.value
      };

      // TODO: Call api
      axios
        .post(`${CONFIG.BASE_URL}/api/news/list`, criteria)
        .then((response) => {
          // console.log(response.data);
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
      headers,
      itemsSelected,
      themeColor,
      page,
      size,
      number,
      numberOfElements,
      totalPages,
      totalElements,
      first,
      last,
      content,
      keyword,

      searchCallApi
    };
  },
  created() {
    // console.log("enter created()...");
    this.searchCallApi();
  },
};
</script>
<style lang="scss">
.input-suggest__event {
  position: relative;
  
  .btn-suggest {
    position: absolute;
    top: 0.25rem;
    right: 10px;
    border: 3px solid rgb(141, 141, 141);
    padding: 2px 4px;
    border-radius: 4px;
    background-color: rgb(168, 167, 167);
    color: #FFFFFF;
    font-weight: bold;
  }

}

</style>
