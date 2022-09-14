<template>
  <Form @submit="onSubmit()">
    <div class="row mt-3">
      
      <div class="col-4">
        <!-- title -->
        <div class="form-floating mb-3">
          <Field
            type="text"
            class="form-control box"
            v-model="newsType.code"
            name="code"
            :rules="validateName"
          />

          <div class="mt-1 p-1">
            <ErrorMessage name="code" class="text-danger" />
          </div>

          <label for="">Mã loại tin tức <span class="text-danger">*</span></label>
        </div>
      </div>
      <div class="col-8">
        <!-- title -->
        <div class="form-floating mb-3">
          <Field
            type="text"
            class="form-control box"
            v-model="newsType.name"
            name="name"
            :rules="validateName"
          />

          <div class="mt-1 p-1">
            <ErrorMessage name="name" class="text-danger" />
          </div>

          <label for="">Tên loại tin tức <span class="text-danger">*</span></label>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12 ms-auto">
        <BaseButton
          class="btn-primary ms-auto"
          :btnType="'submit'"
          :name="'Lưu'"
          :textSize="'text-small'"
        />
      </div>
    </div>
  </Form>
</template>
<script>
import { ref, reactive } from "vue";
import TitleHeader from "~~/components/common/TitleHeader.vue";
import BaseButton from "~~/components/common/BaseButton.vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import { useRoute } from "vue-router";

import axios from "axios";
import CONFIG from "~~/config";
export default {
  components: { TitleHeader, BaseButton, Form, Field, ErrorMessage },
  data() {
    return {
      titleAdd: "Thêm mới loại tin tức",
      titleEdit: "Chỉnh sửa loại tin tức",
    };
  },
  setup(props) {
    const route = useRoute();
    const newsType = reactive({
      code: "",
      name: ""
    });
    
    const typeId = ref(route.params.id);
    const typeExist = ref({});
    let success = false;
    const header = useHeader();

    let tokenHeader = {
          'Authorization': header.value,
          'Content-Type': 'application/json'
        };

    // call api getById
    function callApiGetById() {
      if (typeId.value) {
        console.log("entering callApiGetById()...", typeId.value);
        
        axios
          .get(`${CONFIG.BASE_URL}/${CONFIG.NEWS_GATEWAY}/api/newsType/${typeId.value}`, {headers: tokenHeader})
          .then((response) => {
            if (response) {
              typeExist.value = response.data;
            }
          })
          .catch((error) => console.log(error));
      }
    }

    watch(typeExist, () => {
      if (typeExist.value) {
        newsType.code = typeExist.value.code;
        newsType.name = typeExist.value.name;
      }
    });

    function validateName(value) {
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

    //Call post API topic
    function onSubmit() {
      const type = {
        id: typeId.value,
        code: newsType.code,
        name: newsType.name,
      };
      axios
        .post(`${CONFIG.BASE_URL}/${CONFIG.NEWS_GATEWAY}/api/newsType`, type, { headers: tokenHeader })
        .then((res) => {
          console.log(res.data);
          let responseData = res.data;
          if (responseData) {
            navigateTo("/common/newsType");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
    return {
      newsType,
      onSubmit,
      validateName,
      success,
      callApiGetById,
    };
  },
  created() {
    this.callApiGetById();
  },
};
</script>
<style lang="scss"></style>
