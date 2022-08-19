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
        <!-- email -->
        <div class="form-floating mb-3">
          <input
            type="email"
            class="form-control box"
            required="required"
            autocomplete="false"
            v-model="email"
          />
          <label for="">Email <span class="text-danger">*</span></label>
        </div>
        <!-- fullname -->
        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control box"
            required="required"
            autocomplete="false"
            v-model="fullname"
          />
          <label for="">Họ và tên <span class="text-danger">*</span></label>
        </div>
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
      titleForm: "Giao diện thêm mới người dùng",
      options: ["Loại tin 1", "Loại tin 2", "Loại tin 3"],
    };
  },
  setup(props) {
    const email = ref("");
    const fullname = ref("");
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
      fullname,
      email,
      priority,
      options,

      // function
      onSubmit,
    };
  },
};
</script>
<style lang="scss"></style>
