<template>
  <div class="mt-3">
    <div class="d-flex">
      <TitleHeader :title="title" />
    </div>
    <div class="card">
      <div class="card-header search-header">
        <h6 class="card-title">Tìm kiếm</h6>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-md-4">
            <input type="text" v-model="newsTitle" class="form-control pr-5" placeholder="Bài viết" />
          </div>
          <div class="col-md-4">
            <input type="text" v-model="commentContent" class="form-control pr-5" placeholder="Nội dung" />
          </div>
          <div class="col-md-4">
            <input type="text" v-model="createdBy" class="form-control pr-5" placeholder="Người tạo" />
          </div>
        </div>
        <div class="row text-right">
          <div class="col-md-12">
            <button type="button" class="btn btn-secondary" @click="searchCallApi()">
              Tìm kiếm
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="d-flex mb-3">
      <button v-if="useCurrentsRole(currentRole,[ROLES.ROLE_ADMIN, ROLES.ROLE_COMMENT_APPROVE])" type="button"
        class="btn btn-primary shadow-md" @click="$refs.myChild.changeMultiStatus()" style="margin-top: 1%">
        <span class="mx-2" :class="textSize">Phê duyệt nhiều bình luận</span>
      </button>
    </div>
    <div class="table-content mt-3 radius-20">
      <table-comment-component ref="myChild" :headers="headers" :items="content" :actionEdit="true"
        :actionDelete="false" :page="page" :size="size" :reCallApi="searchCallApi" />

      <pagination :page="page" :size="size" :number="number" :numberOfElements="numberOfElements"
        :totalElements="totalElements" :totalPages="totalPages" :first="first" :last="last" @change-page="page = $event"
        @change-size="size = $event" />
    </div>
  </div>
</template>
<script>
import { ref } from "vue";

import TitleHeader from "~~/components/common/TitleHeader.vue";
import AddButton from "~~/components/common/AddButton.vue";
import TableCommentComponent from "~~/components/common/table/TableCommentComponent.vue";
import Pagination from "~~/components/common/table/Pagination.vue";

import { useCurrentsRole } from "~~/services/common";
import CONFIG from "~~/config";
import { ROLES } from "~~/constants/roles.js"
import axios from "axios";
import CommentService from "~~/services/model/comment.service";

export default {
  components: {
    TitleHeader,
    AddButton,
    TableCommentComponent,
    Pagination,
  },
  data() {
    return {
      title: "Danh sách các bình luận",
      textSize: "text-small",
      routerPush: "/common/comment/form",
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
    const newsTitle = ref("");
    const createdBy = ref("");
    const commentContent = ref("");
    const itemsSelected = ref([]);
    const themeColor = ref("#1e40af");
    const currentRole = useCurrentRole();

    const headers = [
      { text: "STT", value: "no" },
      { text: "Bài viết", value: "title" },
      { text: "Nội dung", value: "content" },
      { text: "Người tạo", value: "created_by" },
      { text: "Ngày tạo", value: "created_date" },
      { text: "Trạng thái", value: "status" },
    ];

    const header = useHeader();

    function setPagination(comment) {
      content.value = comment.content;
      page.value = comment.page;
      size.value = comment.size;
      number.value = comment.number;
      numberOfElements.value = comment.numberOfElements;
      totalPages.value = comment.totalPages;
      totalElements.value = comment.totalElements;
    }

    // call api
    function searchCallApi() {
      let criteria = {
        page: page.value,
        size: size.value,
        newsTitle: newsTitle.value,
        createdBy: createdBy.value,
        content: commentContent.value,
      };
      let tokenHeader = {
        'Authorization': header.value,
        'Content-Type': 'application/json'
      };
      // TODO: Call api
      CommentService.search(criteria)
        .then((response) => {
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
      newsTitle,
      createdBy,
      commentContent,
      currentRole,
      ROLES,

      useCurrentsRole,
      searchCallApi,
    };
  },
  created() {
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
    color: #ffffff;
    font-weight: bold;
  }
}

.search-header {
  background-color: #014683;
  color: white;

  .card-title {
    padding-top: 0.5%;
  }
}

.card-body .row {
  padding-bottom: 1%;
}
</style>
