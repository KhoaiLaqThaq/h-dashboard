<template>
  <div class="content-news mt-3">
    <div class="d-flex">
      <TitleHeader :title="titleForm" />
    </div>
    <GroupForm />
  </div>
</template>
<script>
import axios from "axios";
import { ref } from "vue";
import GroupForm from "~~/components/GroupForm.vue";
import TitleHeader from "~~/components/common/TitleHeader.vue";
export default {
  components: {
    GroupForm,
    TitleHeader,
  },
  data() {
    return {
      titleForm: "Chỉnh sửa chủ đề bài viết",
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
