<template>
  <form @submit.prevent="onSubmit()" enctype="multipart/form-data">
    <div class="d-flex">
      <TitleHeader :title="titleForm" />
      <!-- <PreviewButton
      class="btn-light box ms-auto d-flex items-center"
      :btnType="'button'"
      :name="'Preview'"
      :textSize="'text-small'"
    /> -->
      <BaseButton
        class="btn-primary ms-auto"
        :btnType="'submit'"
        :name="'Save'"
        :textSize="'text-small'"
      />
      <!-- <NewsPreview /> -->
    </div>
    <div class="row mt-3">
      <div class="col-8">
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
        <!-- password -->
        <div class="form-floating mb-3">
          <input
            type="password"
            class="form-control box"
            required="required"
            autocomplete="false"
            v-model="password"
          />
          <label for="">Password <span class="text-danger">*</span></label>
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
        <!-- avatar -->
        <div class="form-group">
          <h4>Ảnh đại diện</h4>
          <div class="card">
            <div class="card-body">
              <UseDropZone @changeImage="avatar = $event" />
            </div>
          </div>
        </div>
      </div>
      <div class="col-4">
        <div class="box p-3">
          <!-- unit -->
          <div class="mb-3">
            <label for="" class="form-label"
              >Đơn vị <span class="text-danger">*</span></label
            >
            <select
              v-model="unit"
              id=""
              class="form-select"
              required="required"
              :value="option"
            >
              <option
                v-for="(option, index) in options"
                :key="index"
                :value="option"
              >
                {{ option }}
              </option>
            </select>
          </div>

          <!-- ngày sinh -->
          <div class="mb-3">
            <label for="" class="form-label"
              >Ngày sinh <span class="text-danger">*</span></label
            >
            <datepicker-lite
              :class-attr="'form-control'"
              :name-attr="'birthday'"
              :show-bottom-button="true"
              :value-attr="birthday"
              :locale="locale"
            />
          </div>

          <!-- Role -->
          <div class="mb-3">
            <label for="" class="form-label"
              >Quyền hạn <span class="text-danger">*</span></label
            >
            <select
              v-model="role"
              id=""
              class="form-select"
              required="required"
              :value="role"
            >
              <option
                v-for="(option, index) in topics"
                :key="index"
                :value="option.id"
              >
                {{ option.name }}
              </option>
            </select>
          </div>
          <!-- end of user form -->
        </div>
      </div>
    </div>
  </form>
</template>
<script>
import { ref, watch } from "vue";

import DatepickerLite from "vue3-datepicker-lite";

// components
import BaseButton from "~~/components/common/BaseButton.vue";
import BaseSelect from "~~/components/common/BaseSelect.vue";
import BaseInput from "~~/components/common/BaseInput.vue";
import FormCheck from "~~/components/common/FormCheck.vue";
import TitleHeader from "~~/components/common/TitleHeader.vue";
import UploadAdapter from "~~/composables/UploadAdapter.js";
import FloatSelect from "~~/components/common/FloatSelect.vue";
import FloatInput from "~~/components/common/FloatInput.vue";
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
    const password = ref("");
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

    // function uploader(editor) {
    //   editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
    //     return new UploadAdapter(loader);
    //   };
    // }

    //call API get lisTopics
    function getListTopic() {
      axios
        .get(`${CONFIG.BASE_URL}/api/topics`)
        .then((response) => {
          const data = response.data;
          topics.value = data;
          topic.value = data[0] && data[0].id;
        })
        .catch((e) => {
          console.log(e.toString());
        });
    }

    //Call post API news
    function addNews() {
      console.log("avatar.value", avatar.value);
      const news = {
        avatar: avatar.value ? avatar.value : null,
        type: option.value,
        title: title.value,
        brief: brief.value,
        content: content.value,
        status: 2,
        topicId: topic.value,
      };
      const headers = { "Content-Type": "multipart/form-data" };
      axios
        .post(`${CONFIG.BASE_URL}/api/news`, news, { headers })
        .then((res) => {
          console.log(res.data);
          success = true;
        })
        .catch((error) => {
          console.log(error);
        });
    }

    function onSubmit() {
      addNews();
    }

    return {
      // config editor
      locale,
      // editor: ClassicEditor,
      // editorConfig: {
      //   // The configuration of the editor.
      //   extraPlugins: [uploader],
      //   language: "en",
      // },
      // variables
      unit,
      birthday,
      topics,
      topic,
      option,
      success,
      password,
      fullname,
      email,
      avatar,
      status,
      // function
      onSubmit,
      getListTopic,
      addNews,
    };
  },
  created() {
    this.getListTopic();
  },
};
</script>
<style lang="scss">
.tags {
  display: block;
  position: relative;
  width: 100%;

  .tag-item {
    margin-left: 0.2rem;
    border-radius: 10px;
    padding: 2px 25px 2px 5px;
    display: inline-block;
    font-size: 14px;
    font-weight: 500;
    line-height: 1;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
    position: relative;

    svg {
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      width: 18px;
      height: 18px;
      cursor: pointer;
      border-top-right-radius: 10px;
      border-bottom-right-radius: 10px;
      margin-left: 1rem;

      &:hover {
        background-color: #1f71b4;
      }
    }
  }
}
</style>
