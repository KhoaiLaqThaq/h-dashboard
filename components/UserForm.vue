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
        <div class="row gx-2">
          <div class="form-floating mb-3 col-6">
            <input
              type="text"
              class="form-control box"
              required="required"
              autocomplete="false"
              v-model="last_name"
            />
            <label for="">Họ <span class="text-danger">*</span></label>
          </div>
          <!-- Tên  -->
          <div class="form-floating mb-3 col-6">
            <input
              type="text"
              class="form-control box"
              required="required"
              autocomplete="false"
              v-model="first_name"
            />
            <label for="">Tên <span class="text-danger">*</span></label>
          </div>
          <!-- Tên đăng nhập -->
          <div class="form-floating mb-3 col-6">
            <input
              type="text"
              class="form-control box"
              required="required"
              autocomplete="false"
              v-model="username"
            />
            <label for=""
              >Tên đăng nhập <span class="text-danger">*</span></label
            >
          </div>
          <!-- Email  -->
          <div class="form-floating mb-3 col-6">
            <input
              type="email"
              class="form-control box"
              required="required"
              autocomplete="false"
              v-model="email"
            />
            <label for="">Email <span class="text-danger">*</span></label>
          </div>

          <label for=""
            >Phân nhóm quyền <span class="text-danger">*</span></label
          >
          <div class="form-floating mb-3 row">
            <MultiCheckboxVue
              v-model:value="groupPriority"
              :options="groupOptions"
            />
          </div>

          <label for="">Phân quyền <span class="text-danger">*</span></label>
          <div class="form-floating mb-3 row">
            <MultiCheckboxVue v-model:value="priority" :options="options" />
          </div>
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
    const groupOptions = ref([]);
    const groupPriority = ref([]);

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

    const getGroupOptions = () => {
      groupOptions.value = [
        { name: "Nhóm Admin", id: 1 },
        { name: "Nhóm Content Creator", id: 2 },
        { name: "Nhóm Phê duyệt", id: 3 },
        { name: "Nhóm Chỉnh sửa", id: 4 },
      ];
    };

    onMounted(() => {
      getOptions();
      getGroupOptions();
    });

    return {
      fullname,
      email,
      priority,
      options,
      groupOptions,
      groupPriority,

      // function
      onSubmit,
    };
  },
};
</script>
<style lang="scss"></style>
