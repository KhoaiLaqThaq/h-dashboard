<template>
  <Form @submit="onSubmit()">
    <div class="row mb-3">
      <div class="col-lg-4 col-md-6 col-sm-12">
        <!-- code -->
        <div class="form-floating mb-3">
          <Field type="text" class="form-control box" v-model="code" name="code"
            :rules="validateName"
          />

          <div class="mt-1 p-1">
            <ErrorMessage name="code" class="text-danger" />
          </div>

          <label for="">Mã đơn vị <span class="text-danger">*</span></label>
        </div>
      </div>
      <div class="col-lg-8 col-md-6 col-sm-12">
        <!-- title -->
        <div class="form-floating mb-3">
          <Field type="text" class="form-control box" v-model="name" name="name"
            :rules="validateName"
          />

          <div class="mt-1 p-1">
            <ErrorMessage name="name" class="text-danger" />
          </div>

          <label for="">Tên đơn vị <span class="text-danger">*</span></label>
        </div>
      </div>
    </div>
    <div class="row d-flex">
      <div class="col-12 text-right">
        <BaseButton
          class="btn-primary"
          :btnType="'submit'"
          :name="'Save'"
          :textSize="'text-small'"
        />
      </div>
    </div>
  </Form>
</template>
<script>
import { ref } from "vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import { useRoute } from "vue-router";

import TitleHeader from "./common/TitleHeader.vue";
import BaseButton from "./common/BaseButton.vue";

import axios from "axios";
import CONFIG from "~~/config";
export default {
  components: { TitleHeader, BaseButton, Form, Field, ErrorMessage },
  props: ['department'],
  setup(props) {
    const route = useRoute();
    const code = ref("");
    const name = ref("");

    function validateName(value) {
      if (!value)
        return "Trường này là bắt buộc";
      
      if (value.trim().length < 3)
        return "Trường này phải có hơn 3 ký tự";

      return true;
    }

    // call api save
    function onSubmit() {
      let department = {
        code: code.value,
        name: name.value
      };

      axios.post(`${CONFIG.BASE_URL}/api/department`, department)
      .then(response => {
        console.log('responseData: ', response.data);
        let responseData = response.data;
        if (responseData) {
          navigateTo("/department");
        }
      }).catch(error => {
        console.log('error: ', error);
      });
    }
    return {
      code, name,
      onSubmit,
      validateName,
    };
  }
};
</script>
<style lang="scss"></style>
