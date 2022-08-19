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
  },
  props: ["user"],
  data() {
    return {
      titleForm: "Giao diện thêm mới người dùng",
      options: ["Loại tin 1", "Loại tin 2", "Loại tin 3"],
    };
  },
  setup(props) {
    const birthday = ref(getNowDate());
    const avatar = ref(undefined);
    const email = ref("");
    const fullname = ref("");
    const status = ref(0);
    const topics = ref([]);
    const topic = ref(null);
    const option = ref("Loại tin 1");
    const unit = ref("");
    let success = false;

    const locale = {
      format: "YYYY/MM/DD",
      weekday: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      months: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
      startsWeeks: 0,
      todayBtn: "Today",
      clearBtn: "Clear",
      closeBtn: "Close",
    };

    function onSubmit() {
      addNews();
    }

    return {
      locale,
      unit,
      birthday,
      topics,
      topic,
      option,
      success,
      fullname,
      email,
      avatar,
      status,
      // function
      onSubmit
    };
  }
};
</script>
<style lang="scss">

</style>
