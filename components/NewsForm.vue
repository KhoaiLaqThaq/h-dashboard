<template>
  <Form @submit="onSubmit()" enctype="multipart/form-data">
    <div class="d-flex">
      <TitleHeader :title="titleForm" />
      <PreviewButton
        class="ms-auto"
        :btnType="'button'"
        :name="'Preview'"
        :textSize="'text-small'"
      />
      <BaseButton
        class="btn-primary ms-2 box"
        :btnType="'submit'"
        :name="'Save'"
        :textSize="'text-small'"
      />
      <NewsPreview
        :title="title"
        :avatarUrl="avatarUrl"
        :content="content"
        :createdDate="createdDate"
      />
      <NewsTabletPreview
        :title="title"
        :avatarUrl="avatarUrl"
        :content="content"
        :createdDate="createdDate"
      />
    </div>

    <div class="row mt-3 py-3">
      <div class="col-lg-3 col-sm-12">
        <div class="form-floating">
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
      </div>

      <div class="col-lg-3 col-sm-12">
        <div class="form-floating">
          <Field
            as="select"
            name="type"
            v-model="optionType"
            class="form-select box"
            required="required"
            :value="type"
            :rules="validateField"
          >
            <option
              v-for="(option, index) in options"
              :key="index"
              :value="option.value"
            >
              {{ option.name }}
            </option>
            <ErrorMessage name="type" class="text-danger" />
          </Field>
          <label>Loại tin tức <span class="text-danger">*</span></label>
        </div>
      </div>

      <div class="col-lg-3 col-sm-12">
        <div class="form-floating">
          <Field
            as="select"
            name="topic"
            v-model="topic"
            class="form-select box"
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
          <label>Chủ đề <span class="text-danger">*</span></label>
        </div>
      </div>

      <div class="col-lg-3 col-sm-12">
        <div class="form-floating">
          <datepicker-lite
            class="form-control picker-date box"
            :class-attr="'border-none'"
            :name-attr="'createdDate'"
            :show-bottom-button="true"
            :value-attr="createdDate"
            :locale="locale"
          />
          <label>Ngày viết <span class="text-danger">*</span></label>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-9 col-sm-12">
        <!-- brief -->
        <div class="form-floating mb-3">
          <Field
            as="textarea"
            name="brief"
            v-model="brief"
            class="form-control box auto-scroll-y"
            id="floatingTextarea2"
            style="min-height: 100px"
            :rules="validateField"
          />
          <ErrorMessage name="brief" class="text-danger" />
          <label for="">Mô tả ngắn <span class="text-danger">*</span></label>
        </div>
      </div>

      <div class="col-lg-3 col-sm-12">
        <div class="form-floating mb-3 input-suggest__event">
          <input
            type="text"
            class="form-control box"
            autocomplete="false"
            v-model="tag"
            @keyup.space="addTags()"
          />
          <div v-if="tagsOption" class="tags-unorder-list">
            <div class="tag-option" v-for="(tagItem, index) in listTagsForSelect" :key="index" @click="selectTagSuggestion">
              {{tagItem.name}}
            </div>
          </div>
          <span class="title-suggest__event">Space</span>
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

    <div class="row mx-0 mb-3">
      <div class="col-12 form-group box px-0">
        <TabsWrapper>
          <TabItem title="Ảnh đại diện">
            <div class="card radius-unset box">
              <div class="card-body">
                <UseDropZone
                  @changeImage="avatar = $event"
                  :avatarUrl="avatarUrl"
                />
              </div>
            </div>
          </TabItem>
          <TabItem title="Nội dung">
            <!-- content -->
            <div class="form-group bg-white">
              <div class="card m-3">
                <div class="card-body p-0">
                  <ckeditor
                    :editor="editor"
                    :config="editorConfig"
                    v-model="content"
                  ></ckeditor>
                </div>
                <ErrorMessage name="content" class="text-danger" />
              </div>
            </div>
          </TabItem>
        </TabsWrapper>
      </div>
    </div>
    <hr />
    <div class="row">
      <div class="col-lg-12 col-sm-12">
        <div class="form-floating">
          <!-- <Field
            as="select"
            name="type"
            v-model="units"
            class="form-select box"
            required="required"
            :value="type"
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
          </Field> -->
          <div>
            <label
              >Phân phối phòng ban <span class="text-danger">*</span></label
            >
          </div>

          <div>
            <DualListBox
              class="m-auto"
              :source="source"
              :destination="destination"
              label="name"
              v-on:onChangeList="onChangeList"
            />
          </div>
        </div>
      </div>
    </div>
  </Form>
</template>
<script>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";

import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import DatepickerLite from "vue3-datepicker-lite";

import DualListBox from "~~/components/DualListBox.vue";
//import "dual-listbox-vue/dist/dual-listbox.css";

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
import NewsTabletPreviewVue from "~~/components/NewsTabletPreview.vue";

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
    NewsTabletPreviewVue,
    DualListBox,
  },
  data() {
    return {
      options: [
        { name: "Loại tin tập đoàn", value: "company" },
        { name: "Loại tin phòng", value: "department" },
        { name: "Loại tin hành chính", value: "administrative" },
        { name: "Tin Hot", value: "hot_news" },
      ],
    };
  },
  methods: {
    onChangeList: function ({ source, destination }) {
      this.source = source;
      this.destination = destination;
      console.log(source);
      console.log(destination);
    },
  },
  setup() {
    const route = useRoute();
    const newsId = ref(route.params.id);
    const newsExist = ref({});
    const titleForm = ref(
      newsId.value
        ? "Giao diện chỉnh sửa tin tức"
        : "Giao diện thêm mới tin tức"
    );

    const createdDate = ref(getNowDate());
    const avatar = ref(undefined);
    const avatarUrl = ref("");
    const title = ref("");
    const brief = ref("");
    const status = ref(0);
    const content = ref(
      "<br/><br/><p>Nội dung bài viết ở đây..</p><br/><br/><br/>"
    );
    const tag = ref("");
    const tagNames = ref("");
    const tags = ref([]);
    const topics = ref([]);
    const topic = ref(null);
    let option = ref("");
    const optionType = ref("");
    const type = ref("");
    const commentTotal = ref(0);
    const likeTotal = ref(0);
    const viewTotal = ref(0);
    const createdBy = ref("");
    let createdDateString = ref("");


    //source and destination of departments dual-listbox
    const source = ref([]);
    const destination = ref([]);

    //tag suggesstion field
    const listTags = ref([]);
    const tagsOption = ref(false);
    let listTagsForSelect = ref([]);

    // call api getById
    function callApiGetById() {
      if (newsId.value) {
        console.log("entering callApiGetById()...", newsId.value);
        axios
          .get(`${CONFIG.BASE_URL}/api/news/${newsId.value}`)
          .then((response) => {
            if (response) {
              newsExist.value = response.data;
            }
          })
          .catch((error) => console.log(error));
      }
    }

    function callApiGetAllTags() {
      console.log("entering callApiGetAllTags...");
        axios
          .get(`${CONFIG.BASE_URL}/api/tags`)
          .then((response) => {
            if (response) {
              listTags.value = response.data;
              console.log(listTags.value);
            }
          })
          .catch((error) => console.log(error));
    }

    watch(newsExist, () => {
      if (newsExist.value) {
        title.value = newsExist.value.title;
        type.value = newsExist.value.type;
        optionType.value = newsExist.value.type;
        topic.value = newsExist.value.topic.id;
        createdDate.value = newsExist.value.createdDate;
        brief.value = newsExist.value.brief;
        content.value = newsExist.value.content;
        avatarUrl.value = newsExist.value.avatarUrl;
        commentTotal.value = newsExist.value.commentTotal;
        likeTotal.value = newsExist.value.likeTotal;
        viewTotal.value = newsExist.value.viewTotal;
        createdDateString.value = newsExist.value.displayCreatedDate;
        createdBy.value = newsExist.value.createdBy;
        if(avatarUrl != null){
          getObjectFileFromUrl(avatarUrl);
        }
        if(newsExist.value.tags.length > 0){
          newsExist.value.tags.forEach(e => {
            // tagNames.value += "," + e.name;
            tags.value.push(e.name);
          });
        }
        if(newsExist.value.departments.length > 0){
          destination.value = newsExist.value.departments;
          resetDepartmentSource();
        }

      }
    });

    watch(tag, () => {
      if(tag.value.trim().length > 0){
        tagsOption.value = true;
        listTagsForSelect.value = listTags.value.filter(function(item){
          return item.name.includes(tag.value);
        })
      } else {
        tagsOption.value = false;
      }
    });

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

    // TODO: thêm tag
    function addTags() {
      if (tag.value.trim().length > 0 && tag.value.trim() != "") {
        tagNames.value += "," + tag.value;
        tags.value.push(tag.value);
      }
      tag.value = "";
    }

    // TODO: Remove tag
    const removeTag = (index) => {
      let tagName = tags.value[index];
      console.log(tagName);
      tags.value.splice(index, 1);
    };

    // TODO: call API get lisTopics
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

    // TODO: call API get listDepartments
    function getListDepartments() {
      axios
        .get(`${CONFIG.BASE_URL}/api/departments`)
        .then((response) => {
          const data = response.data;
          source.value = data;
          console.log(data);
          resetDepartmentSource();
        })
        .catch((e) => {
          console.log(e.toString());
        });
    }

    // TODO: Define rules for validate
    function validateField(value) {
      // if the field is empty
      if (!value) return "Trường này là bắt buộc";
      // if the field is not a valid email
      if (value.length < 3) return "Trường này phải có hơn 3 ký tự";
      return true;
    }

    function onSubmit() {
      console.log("entering onSubmit()...");
      let departmentCodes = '';
      destination.value.forEach(item => {
        departmentCodes += "," + item.code;
      })
      tags.value.forEach((item) => {
        tagNames.value += "," + item;
      })
      const news = {
        id : newsId.value ? newsId.value : null,
        avatar: avatar.value ? avatar.value : null,
        avatarUrl: avatarUrl.value,
        type: optionType.value,
        title: title.value,
        brief: brief.value,
        content: content.value,
        status: 2,
        topicId: topic.value,
        tagNames: tagNames.value,
        commentTotal: commentTotal.value,
        likeTotal: likeTotal.value,
        viewTotal: viewTotal.value,
        createdBy: createdBy.value,
        createdDateString: newsId.value ? createdDateString.value : null,
        departmentCodes: departmentCodes,
      };
      console.log(news);

      const headers = { "Content-Type": "multipart/form-data" };
      axios
        .post(`${CONFIG.BASE_URL}/api/news`, news, { headers })
        .then((res) => {
          let responseData = res.data;
          console.log(res.data);
          alert(responseData.code + " " + responseData.message);
          navigateTo("/news");
        })
        .catch((error) => {
          console.log(error);
        });
    }

    function selectTagSuggestion(event){
      let tagSelected = event.target.innerHTML;
      if (tagSelected.trim().length > 0 && tagSelected != "") {
        // tagNames.value += "," + tagSelected;
        tags.value.push(tagSelected);
      }
      tag.value = "";
    }

    function getObjectFileFromUrl(url){
      const config = { responseType: 'blob' };
      axios
        .get(`${CONFIG.BASE_URL}/api/topics`, config)
        .then((response) => {
          const file = new File([response.data],"");
          avatar.value = file;
        })
        .catch((e) => {
          console.log(e.toString());
        });
    }

    function resetDepartmentSource(){
      if(source.value.length > 0){
        source.value.forEach((s,index) => {
          let check = destination.value.find((d) =>{
            if(d.code === s.code) return d;
          });
          if(check != undefined){
            source.value.splice(index, 1);
          }
        })
      }
    }

    return {
      titleForm,
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
      optionType,
      brief,
      content,
      title,
      avatar,
      avatarUrl,
      status,
      source,
      destination,
      listTags,
      tagsOption,
      listTagsForSelect,
      // function
      addTags,
      removeTag,
      onSubmit,
      getListTopic,
      getListDepartments,
      validateField,
      callApiGetById,
      callApiGetAllTags,
      selectTagSuggestion,
    };
  },
  created() {
    this.getListTopic();
    this.getListDepartments();
    this.callApiGetById();
    this.callApiGetAllTags();
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
.title-suggest__event {
  position: absolute;
  top: 1rem;
  right: 10px;
  border: 3px solid rgb(141, 141, 141);
  padding: 2px 4px;
  border-radius: 4px;
  background-color: rgb(168, 167, 167);
  color: #ffffff;
  font-weight: bold;
}

.tags-unorder-list{
  position: absolute;
  z-index: 100;
  width: 100%;
  border: 1px solid #d4d4d4;
  border-top: none;
  background-color: rgb(255 255 255/var(--tw-bg-opacity));
  box-shadow: 0 10px 20px rgb(0 0 0 / 8%);
  --tw-bg-opacity: 1;

  .tag-option{
    display: block;
    padding-left: 5%;
    padding-top: 1%;
    padding-bottom: 1%;
  }

  .tag-option:hover{
    background-color: #1982f1;
    color: rgb(250, 247, 247);
  }
}
</style>
