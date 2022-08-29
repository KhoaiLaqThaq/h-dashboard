<template>
  <Form @submit="onSubmit()">
    <div class="row mb-3">
      <div class="col-lg-4 col-md-6 col-sm-12">
        <!-- name -->
        <div class="form-floating mb-3">
          <Field
            type="text"
            class="form-control box"
            v-model="systemParam.paramName"
            name="paramName"
            :rules="validateName"
            :disabled="systemParamId"
          />

          <div class="mt-1 p-1">
            <ErrorMessage name="paramName" class="text-danger" />
          </div>

          <label for="">Tên tham số <span class="text-danger">*</span></label>
        </div>
      </div>
      <div class="col-lg-4 col-md-6 col-sm-12">
        <!-- value -->
        <div class="form-floating mb-3">
          <Field
            type="text"
            class="form-control box"
            v-model="systemParam.paramValue"
            name="paramValue"
            :rules="validateName"
          />

          <div class="mt-1 p-1">
            <ErrorMessage name="paramValue" class="text-danger" />
          </div>

          <label for=""
            >Giá trị tham số <span class="text-danger">*</span></label
          >
        </div>
      </div>
      <div class="col-lg-4 col-md-6 col-sm-12">
        <!-- value -->
        <div class="form-floating mb-3">
          <Field
            type="text"
            class="form-control box"
            v-model="systemParam.description"
            name="description"
          />

          <label for="">Mô tả</label>
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
import { ref, reactive } from "vue";
import { useRoute } from "vue-router";
import { Form, Field, ErrorMessage } from "vee-validate";

import TitleHeader from "./common/TitleHeader.vue";
import BaseButton from "./common/BaseButton.vue";

import axios from "axios";
import CONFIG from "~~/config";
export default {
  components: { TitleHeader, BaseButton, Form, Field, ErrorMessage },
  setup() {
    const route = useRoute();
    const systemParamId = ref(route.params.id);
    const systemParam = reactive({
      paramName: "",
      paramValue: "",
      description: "",
    });
    //const doInputParamName = ref(1);

    function validateName(value) {
      if (!value) return "Trường này là bắt buộc";

      if (value.trim().length < 3) return "Trường này phải có hơn 3 ký tự";

      return true;
    }

    // TODO: Call api to get a systemParamId have id
    const getSystemParamById = () => {
      if (systemParamId.value) {
        axios
          .get(`${CONFIG.BASE_URL}/api/systemParameter/${systemParamId.value}`)
          .then((response) => {
            let responseData = response.data;
            systemParam.paramName = responseData.paramName;
            systemParam.paramValue = responseData.paramValue;
            systemParam.description = responseData.description;
          })
          .catch((error) => {
            console.log("error: " + error);
          });
      }
    };

    // call api save
    function onSubmit() {
      let data = {
        id: systemParamId.value,
        paramName: systemParam.paramName,
        paramValue: systemParam.paramValue,
        description: systemParam.description,
      };

      axios
        .post(`${CONFIG.BASE_URL}/api/systemParameter`, data)
        .then((response) => {
          console.log("responseData: ", response.data);
          let responseData = response.data;
          if (responseData) {
            navigateTo("/system/systemParams");
          }
        })
        .catch((error) => {
          console.log("error: ", error);
        });
    }
    return {
      systemParam,
      systemParamId,
      //doInputParamName,
      getSystemParamById,
      onSubmit,
      validateName,
    };
  },
  mounted() {
    this.getSystemParamById();
  },
};
</script>
<style lang="scss"></style>
