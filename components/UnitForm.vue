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

          <label for="">Tên đơn vị <span class="text-danger">*</span></label>
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
import { useRoute } from "vue-router";

import axios from "axios";
import CONFIG from "~~/config";
export default {
  components: { TitleHeader, BaseButton, Form, Field, ErrorMessage },
  data() {
    return {
      titleAdd: "Thêm mới đơn vị",
      titleEdit: "Chỉnh sửa đơn vị",
    };
  },
  setup(props) {
    const route = useRoute();
    const name = ref("");
    const unitId = ref(route.params.id);
    const unitExist = ref({});
    let success = false;
    const units = ref([
      {
        id: 1,
        name: "Mavinex",
      },
      {
        id: 2,
        name: "Mavin Foods",
      },
      {
        id: 3,
        name: "Mavin Aqua",
      },
      {
        id: 4,
        name: "Mavin Fish",
      },
      {
        id: 5,
        name: "Mekovet",
      },
      {
        id: 6,
        name: "Mavin Pigfarm",
      },
      {
        id: 7,
        name: "Mavin Duckfarm",
      },
    ]);
    // call api getById
    function callApiGetById() {
      if (unitId.value) {
        console.log("entering callApiGetById()...", unitId.value);
        axios
          .get(`${CONFIG.BASE_URL}/api/unit/${unitId.value}`)
          .then((response) => {
            if (response) {
              unitExist.value = response.data;
            }
          })
          .catch((error) => console.log(error));
      }
    }

    watch(unitExist, () => {
      if (unitExist.value) {
        name.value = unitExist.value.name;
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

    //Call post API unit
    function addUnit() {
      const unit = {
        name: name.value,
      };
      console.log(unit);
      const headers = { "Content-Type": "application/json" };
      axios
        .post(`${CONFIG.BASE_URL}/api/unit`, unit, { headers })
        .then((res) => {
          console.log(res.data);
          success = true;
        })
        .catch((error) => {
          console.log(error);
        });
    }

    //Call put API unit
    function editUnit() {
      const unit = {
        id: unitId.value,
        name: name.value,
      };
      console.log(unit);
      const headers = { "Content-Type": "application/json" };
      axios
        .put(`${CONFIG.BASE_URL}/api/unit/` + unitId.value, unit, {
          headers,
        })
        .then((res) => {
          console.log(res.data);
          success = true;
        })
        .catch((error) => {
          console.log(error);
        });
    }

    function onSubmit() {
      // if (unitId.value) {
      //   editUnit();
      // } else {
      //   addUnit();
      // }
      //redirect("/unit");
    }
    return {
      name,
      onSubmit,
      validateName,
      addUnit,
      success,
      editUnit,
      callApiGetById,
    };
  },
  created() {
    //this.callApiGetById();
  },
};
</script>
<style lang="scss"></style>
