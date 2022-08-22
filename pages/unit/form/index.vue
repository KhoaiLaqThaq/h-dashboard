<template>
  <div class="content-news mt-3">
    <div class="d-flex">
      <TitleHeader :title="titleForm" />
    </div>
    <UnitForm />
  </div>
</template>
<script>
import UnitForm from "~~/components/UnitForm.vue";
import TitleHeader from "~~/components/common/TitleHeader.vue";
export default {
  components: {
    UnitForm,
    TitleHeader,
  },

  data() {
    return {
      titleForm: "Thêm đơn vị mới",
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
