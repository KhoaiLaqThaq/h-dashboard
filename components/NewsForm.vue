<template>
  <Form @submit.prevent="onSubmit()" enctype="multipart/form-data">
    <div class="d-flex">
      <TitleHeader :title="titleForm" />
      <PreviewButton
        class="btn-light box ms-auto d-flex items-center"
        :btnType="'button'"
        :name="'Preview'"
        :textSize="'text-small'"
      />
      <BaseButton
        class="btn-primary ms-2"
        :btnType="'submit'"
        :name="'Save'"
        :textSize="'text-small'"
      />
      <NewsPreview
        :title="title"
        :avatar="avatar"
        :content="content"
        :createdDate="createdDate"
      />
    </div>
    <div class="row mt-3">
      <div class="col-8">
        <!-- title -->
        <div class="form-floating mb-3">
          <Field
            name="title"
            v-model="title"
            type="text"
            class="form-control box"
            required="required"
            autocomplete="false"
            :rules="validateField"
          />
          <ErrorMessage name="title" class="text-danger" />
          <label for="">Tiêu đề <span class="text-danger">*</span></label>
        </div>
        <!-- brief -->
        <div class="form-floating mb-3">
          <Field
            as="textarea"
            name="brief"
            v-model="brief"
            class="form-control"
            id="floatingTextarea2"
            style="height: 100px"
            :rules="validateField"
          />
          <ErrorMessage name="brief" class="text-danger" />
          <label for="">Mô tả ngắn <span class="text-danger">*</span></label>
        </div>

        <div class="form-group">
          <TabsWrapper>
            <TabItem title="Ảnh đại diện">
              <div class="card">
                <div class="card-body">
                  <UseDropZone @changeImage="avatar = $event" />
                </div>
              </div>
            </TabItem>
            <TabItem title="Nội dung">
              <!-- content -->
              <div class="form-group box pb-3">
                <div class="card m-3">
                  <div class="card-body">
                    <Field
                      as="ckeditor"
                      name="content"
                      :editor="editor"
                      :config="editorConfig"
                      v-model="content"
                      :rules="validateField"
                    />
                  </div>
                  <ErrorMessage name="content" class="text-danger" />
                </div>
              </div>
            </TabItem>
          </TabsWrapper>
        </div>
      </div>
      <div class="col-4">
        <div class="box p-3">
          <!-- type -->
          <div class="mb-3">
            <label for="" class="form-label"
              >Loại tin tức <span class="text-danger">*</span></label
            >
            <Field
              as="select"
              name="type"
              v-model="type"
              id=""
              class="form-select"
              required="required"
              :value="option"
              :rules="validateField"
            >
              <option
                v-for="(option, index) in options"
                :key="index"
                :value="option"
              >
                {{ option }}
              </option>
              <ErrorMessage name="type" class="text-danger" />
            </Field>
          </div>

          <!-- ngay viet -->
          <div class="mb-3">
            <label for="" class="form-label"
              >Ngày viết <span class="text-danger">*</span></label
            >
            <datepicker-lite
              :class-attr="'form-control'"
              :name-attr="'createdDate'"
              :show-bottom-button="true"
              :value-attr="createdDate"
              :locale="locale"
            />
          </div>

          <!-- topic -->
          <div class="mb-3">
            <label for="" class="form-label"
              >Chủ đề <span class="text-danger">*</span></label
            >
            <Field
              as="select"
              name="topic"
              v-model="topic"
              id=""
              class="form-select"
              required="required"
              :value="topic"
              :rules="validateField"
            >
              <option
                v-for="(option, index) in topics"
                :key="index"
                :value="option.id"
              >
                {{ option.name }}
              </option>
              <ErrorMessage name="topic" class="text-danger" />
            </Field>
          </div>

          <!-- tag -->
          <div class="form-floating mb-3">
            <Field
              name="tag"
              type="text"
              class="form-control"
              autocomplete="false"
              v-model="tag"
              @keyup.space="addTags()"
              :rules="validateField"
            />
            <ErrorMessage name="tag" class="text-danger" />
            <label for="">Thêm tag <span class="text-danger">*</span></label>
            <div class="tags mt-2">
              <span
                class="tag-item bg-primary"
                v-for="(tag, index) in tags"
                :key="index"
                >{{ tag }}<XIcon class="ms-1" @click="removeTag(index)"
              /></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Form>
</template>
<script>
import { ref, watch } from "vue";

import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import DatepickerLite from "vue3-datepicker-lite";

// components
import PreviewButton from "~~/components/common/PreviewButton.vue";
import BaseButton from "~~/components/common/BaseButton.vue";
import BaseSelect from "~~/components/common/BaseSelect.vue";
import BaseInput from "~~/components/common/BaseInput.vue";
import FormCheck from "~~/components/common/FormCheck.vue";
import TitleHeader from "~~/components/common/TitleHeader.vue";
import UploadAdapter from "~~/composables/UploadAdapter.js";
import FloatSelect from "~~/components/common/FloatSelect.vue";
import FloatInput from "~~/components/common/FloatInput.vue";
import UseDropZone from "~~/components/common/UseDropZone.vue";
import TabsWrapper from "~~/components/common/tab/TabsWrapper.vue";
import TabItem from "~~/components/common/tab/TabItem.vue";
import NewsPreview from "~~/components/NewsPreview.vue";

// functions
import { getNowDate } from "~~/constants/format-date.js";

// icons
import XIcon from "~~/assets/images/icons/XIcon.vue";

import { Form, Field, ErrorMessage } from "vee-validate";
import axios from "axios";
import CONFIG from "~~/config";

export default {
  components: {
    TitleHeader,
    FloatSelect,
    FloatInput,
    PreviewButton,
    BaseButton,
    BaseSelect,
    BaseInput,
    FormCheck,
    UseDropZone,
    TabItem,
    NewsPreview,
    DatepickerLite,
    TabsWrapper,
    XIcon,
    Form,
    Field,
    ErrorMessage,
  },
  props: ["news"],
  data() {
    return {
      titleForm: "Giao diện thêm mới tin tức",
      options: ["Loại tin 1", "Loại tin 2", "Loại tin 3"],
    };
  },
  setup(props) {
    const createdDate = ref(getNowDate());
    const avatar = ref(undefined);
    const title = ref("");
    const brief = ref("");
    const status = ref(0);
    const content = ref(
      "<br/><br/><p>Nội dung bài viết ở đây..</p><br/><br/><br/>"
    );
    const tag = ref("");
    const tags = ref([]);
    const topics = ref([]);
    const topic = ref(null);
    const option = ref("Loại tin 1");
    const type = ref("");
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

    function uploader(editor) {
      editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
        return new UploadAdapter(loader);
      };
    }

    function addTags() {
      tags.value.push(tag.value);
      tag.value = "";
    }

    const removeTag = (index) => tags.value.splice(index, 1);

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

    function validateField(value) {
      // if the field is empty
      if (!value) {
        return "Trường này là bắt buộc";
      }
      // if the field is not a valid email
      if (value.length < 3)
        // if (valu < 3) {
        return "Trường này phải có hơn 3 ký tự";
      // }
      // All is good
      return true;
    }

    function onSubmit() {
      addNews();
    }

    return {
      // config editor
      locale,
      editor: ClassicEditor,
      editorConfig: {
        // The configuration of the editor.
        extraPlugins: [uploader],
        language: "en",
      },
      // variables
      type,
      tag,
      tags,
      createdDate,
      topics,
      topic,
      option,
      success,
      brief,
      content,
      title,
      avatar,
      status,
      // function
      addTags,
      removeTag,
      onSubmit,
      getListTopic,
      addNews,
      validateField,
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
    margin-bottom: 0.2rem;
    border-radius: 10px;
    padding: 4px 25px 4px 5px;
    display: inline-block;
    font-size: 14px;
    font-weight: 500;
    line-height: 1;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
    position: relative;
    color: #ffffff;

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
