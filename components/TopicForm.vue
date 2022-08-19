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
          <label for="">Tên chủ đề <span class="text-danger">*</span></label>
        </div>
        <BaseButton
          class="btn-primary ms-auto"
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
import TitleHeader from "./common/TitleHeader.vue";
import BaseButton from "./common/BaseButton.vue";
import { Form, Field, ErrorMessage } from "vee-validate";
export default {
  components: { TitleHeader, BaseButton, Form, Field, ErrorMessage },
  data() {
    return {
      titleAdd: "Thêm mới chủ đề",
      titleEdit: "Chỉnh sửa chủ đề",
    };
  },
  setup(props) {
    const name = ref("");
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

    function onSubmit(values) {
      console.log(values);
    }
    return {
      name,
      onSubmit,
      validateName,
    };
  },
};
</script>
<style lang="scss"></style>
