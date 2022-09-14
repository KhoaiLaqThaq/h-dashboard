<template>
  <Form @submit="onSubmit()">
    <div class="row mt-3">
      <div class="col-8">
        <!-- title -->
        <div class="form-floating mb-3">
          <Field
            type="text"
            class="form-control box"
            v-model="name"
            name="name"
            :rules="validateName"
          />

          <div class="mt-1 p-1">
            <ErrorMessage name="name" class="text-danger" />
          </div>

          <label for="">Tên loại tin tức <span class="text-danger">*</span></label>
        </div>
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
import { ref } from "vue";
import TitleHeader from "./common/TitleHeader.vue";
import BaseButton from "./common/BaseButton.vue";
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
    const name = ref("");
    const typeId = ref(route.params.id);
    const typeExist = ref({});
    let success = false;
  const header = useHeader();
    // call api getById
    function callApiGetById() {
      if (typeId.value) {
        console.log("entering callApiGetById()...", typeId.value);
        let tokenHeader = {
          'Authorization': header.value,
          'Content-Type': 'application/json'
        };
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
        name.value = typeExist.value.name;
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
        name: name.value,
      };
      const headers = { 
        'Authorization': header.value, 
        "Content-Type": "application/json" 
      };
      axios
        .post(`${CONFIG.BASE_URL}/${CONFIG.NEWS_GATEWAY}/api/newsType`, type, { headers })
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
      name,
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
