<template>
  <div class="content-news mt-3">
    <div class="d-flex">
      <TitleHeader :title="titleForm" />
    </div>
    <TopicForm />
  </div>
</template>
<script>
import TopicForm from "~~/components/TopicForm.vue";
import TitleHeader from "~~/components/common/TitleHeader.vue";
export default {
  components: {
    TopicForm,
    TitleHeader,
  },

  data() {
    return {
      titleForm: "Thêm mới chủ đề bài viết",
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
