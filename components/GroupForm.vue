<template>
  <form @submit.prevent="onSubmit()" enctype="multipart/form-data">
    <div class="d-flex">
      <TitleHeader :title="titleForm" />
      <BaseButton
        class="btn-primary ms-auto"
        :btnType="'submit'"
        :name="'Save'"
        :textSize="'text-small'"
      />
    </div>
    <div class="row mt-3">
      <div class="col-12">
        <!-- Họ -->
        <!-- Tên  -->
        <div class="form-floating mb-3 col-6">
          <input
            type="text"
            class="form-control box"
            required="required"
            autocomplete="false"
            v-model="name"
          />
          <label for=""
            >Tên nhóm quyền <span class="text-danger">*</span></label
          >
        </div>
        <!-- Tên đăng nhập -->

        <label for="">Phân quyền <span class="text-danger">*</span></label>
        <div class="form-floating mb-3 row">
          <MultiCheckboxVue v-model:value="priority" :options="options" />
        </div>
      </div>
    </div>
  </form>
</template>
<script>
import { ref } from "vue";
import DatepickerLite from "vue3-datepicker-lite";
// components
import BaseButton from "~~/components/common/BaseButton.vue";
import BaseSelect from "~~/components/common/BaseSelect.vue";
import BaseInput from "~~/components/common/BaseInput.vue";
import FormCheck from "~~/components/common/FormCheck.vue";
import TitleHeader from "~~/components/common/TitleHeader.vue";
import FloatSelect from "~~/components/common/FloatSelect.vue";
import UseDropZone from "~~/components/common/UseDropZone.vue";
import MultiCheckboxVue from "./common/MultiCheckbox.vue";
// functions
import { getNowDate } from "~~/constants/format-date.js";
// icons
import XIcon from "~~/assets/images/icons/XIcon.vue";

import axios from "axios";
import CONFIG from "~~/config";

export default {
  components: {
    TitleHeader,
    FloatSelect,
    BaseButton,
    BaseSelect,
    BaseInput,
    FormCheck,
    UseDropZone,
    DatepickerLite,
    XIcon,
    MultiCheckboxVue,
  },
  props: ["user"],
  data() {
    return {
      titleForm: "Giao diện thêm mới nhóm quyền",
    };
  },
  setup(props) {
    const name = ref("");
    const priority = ref([]);
    const options = ref([]);

    function onSubmit() {
      console.log("Form Submmitted");
    }

    const getOptions = () => {
      options.value = [
        { name: "Thêm", id: 1 },
        { name: "Sửa", id: 2 },
        { name: "Xoá", id: 3 },
        { name: "Thêm 2", id: 4 },
        { name: "Sửa 2", id: 5 },
        { name: "Xoá 2", id: 6 },
        { name: "Phê duyệt", id: 7 },
        { name: "Phê duyệt 2", id: 8 },
      ];
    };

    onMounted(() => {
      getOptions();
    });

    return {
      name,
      priority,
      options,

      // function
      onSubmit,
    };
  },
};
</script>
<style lang="scss"></style>
