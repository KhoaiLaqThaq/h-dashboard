<template>
  <div class="content-news mt-3">
    <div class="d-flex">
      <TitleHeader :title="titleForm" />
    </div>
    <NewsTypeForm />
  </div>
</template>
<script>
import axios from "axios";
import { ref } from "vue";
import NewsTypeForm from "~~/components/NewsTypeForm.vue";
import TitleHeader from "~~/components/common/TitleHeader.vue";
export default {
  components: {
    NewsTypeForm,
    TitleHeader,
  },
  data() {
    return {
      titleForm: "Chỉnh sửa loại tin tức",
    };
  },
  setup() {
    // define variables
    return {
      //   addNews,
    };
  },
  mounted() {},
};
</script>
<style lang="scss"></style>
