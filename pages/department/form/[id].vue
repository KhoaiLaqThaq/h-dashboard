<template>
  <div class="content-news mt-3">
    <div class="d-flex">
      <TitleHeader :title="titleForm" />
    </div>
    <DepartmentForm :department="department"/>
  </div>
</template>
<script>
import axios from "axios";
import { ref, reactive } from "vue";

import DepartmentForm from "~~/components/DepartmentForm.vue";
import TitleHeader from "~~/components/common/TitleHeader.vue";
export default {
  components: {
    DepartmentForm,
    TitleHeader,
  },
  data() {
    return {
      titleForm: "Chỉnh sửa đơn vị",
    };
  },
  setup() {
    // define variables
    const department = reactive({
      code: "",
      name: ""
    });

    // TODO: Call api to get a department have id
    // const onSubmit = () => {
      
    // }

    return {
      department: department
    };
  },
  mounted() {},
};
</script>
<style lang="scss"></style>
