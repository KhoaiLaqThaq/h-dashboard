<template>
  <form>
    <div class="tabs-container">
      <ul>
        <li class="tabs__item selected">Thông tin người dùng</li>
        <li class="tabs__item" @click="navigateToAuthority()">Phân quyền</li>
      </ul>
      <div class="tabs__content">
        <div class="card radius-unset mb-0 box">
          <div class="card-body">
            <div class="row mt-3 pb-0">
              <div class="col-12">
                <div class="row gx-2">
                  <div class="form-floating mb-3 col-6">
                    <input type="text" class="form-control box" required="required" autocomplete="false" v-model="user.firstName"/>
                    <label for="">Họ</label>
                  </div>
                  <div class="form-floating mb-3 col-6">
                    <input type="text" class="form-control box" required="required" autocomplete="false" v-model="user.lastName" />
                    <label for="">Tên</label>
                  </div>
                  <div class="form-floating mb-3 col-6">
                    <input type="text" class="form-control box" required="required" autocomplete="false" v-model="user.username"/>
                    <label for="">Tên đăng nhập <span class="text-danger">*</span></label>
                  </div>
                  <div class="form-floating mb-3 col-6">
                    <input type="email" class="form-control box" required="required" autocomplete="false" v-model="user.email" />
                    <label for="">Email <span class="text-danger">*</span></label>
                  </div>

                  <div class="col-6">
                    <label for="">Kích hoạt tài khoản</label>
                    <div class="form-check form-switch">
                      <input type="checkbox" class="form-check-input cursor-pointer" :checked="user.enabled" role="switch"/>
                    </div>
                  </div>
                </div>
                <hr>
                <div class="row pb-0">
                  <div class="col-12 text-right">
                    <button class="btn btn-primary ms-auto text-small" type="button" @click="onSubmit()">Lưu</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>
<script>
import { ref, reactive } from "vue";
import { useRoute } from "vue-router";
// components
import BaseSelect from "~~/components/common/BaseSelect.vue";
import TitleHeader from "~~/components/common/TitleHeader.vue";
import FloatSelect from "~~/components/common/FloatSelect.vue";
import MultiCheckboxVue from "~~/components/common/MultiCheckbox.vue";

import axios from "axios";
import CONFIG from "~~/config";
import {ROLES} from "~~/constants/roles.js";
import { useCurrentsRole } from '~~/services/common.js'

export default {
  components: {
    TitleHeader,
    FloatSelect,
    BaseSelect,
    MultiCheckboxVue
  },
  setup() {
    const route = useRoute();
    const userId = ref(route.params && route.params.id);
    const userDepartmentId = ref("");
    const header = useHeader();
    const currentUser = useCurrentUser();
    const currentRole = useCurrentRole();
    const { $showToast } = useNuxtApp();

    const titleForm = ref(userId.value ? "Giao diện chỉnh sửa người dùng":"Giao diện thêm mới người dùng");
    const user = reactive({
      username: "",
      password: "",
      firstName: "",
      lastName: "",
      email: "",
      accountEnabled: true
    });
    let headers = {
      'Authorization': header.value,
      'Content-Type': 'application/json'
    };

    function onLoadUserK6K() {
      if (userId.value) {
        axios.get(`${CONFIG.BASE_URL}/${CONFIG.USER_GATEWAY}/api/user/${userId.value}`, { headers})
        .then((response) => {
          let responseData = response.data;
          if (responseData) {
            console.log('responseData: ', responseData);
            setUser(responseData);
            onLoadUserDepartment(responseData.k6kUserId);
          } else onLoadUserError("Tải thông tin người dùng không thành công -1.");
        })
        .catch((error) => {
          onLoadUserError("Tải thông tin người dùng không thành công -1");
          console.log("LOAD USER ERROR: ", error);
        });
      }
    }

    function onLoadUserDepartment(k6kUserId) {
      if (k6kUserId) {
        axios.get(`${CONFIG.BASE_URL}/${CONFIG.NEWS_GATEWAY}/api/userDepartment/${k6kUserId}`, { headers})
        .then((response) => {
          let responseData = response.data;
          if (responseData) {
            userDepartmentId.value = responseData.id
          }
        })
        .catch((error) => {
          onLoadUserError("Tải thông tin người dùng không thành công -2");
        })
      }
    }

    function onSubmit() {
      console.log("Form Submmitted");
      let userData = {
        id: userId.value,
        username: user.username,
        password: user.password,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        enabled: user.accountEnabled
      };
      axios.post(`${CONFIG.BASE_URL}/${CONFIG.USER_GATEWAY}/api/user`, userData, {headers})
      .then((response) => {
        let responseData = response.data;
        if (responseData) {
          console.log("SAVE RESPONSE USER K6k: ", responseData);
          // save user-department
          saveUserDepartment(responseData);
        }
      })
      .catch((error) => {
        $showToast("Lưu người dùng thất bại -1", "error", 2000);
        console.log("SAVE USER ERROR -1: ", error);
      });
    }

    function saveUserDepartment(responseUserDepartment) {
      if (responseUserDepartment) {
        console.log('responseUserDepartment: ', responseUserDepartment);
        let newsDepartmentData = {
          id: userDepartmentId.value,
          username: responseUserDepartment.username,
          email: responseUserDepartment.email,
          firstName: responseUserDepartment.firstName,
          lastName: responseUserDepartment.lastName,
          enabled: responseUserDepartment.enabled,
          k6kUserId: userId.value ? userId.value : responseUserDepartment.id,
        };
        axios.post(`${CONFIG.BASE_URL}/${CONFIG.NEWS_GATEWAY}/api/userDepartment`, newsDepartmentData, { headers})
        .then((response) => {
          let responseData = response.data;
          if (responseData) {
            console.log("SAVE RESPONSE USER DEPARTMENT: ", responseData);
            $showToast("Lưu người dùng thành công", "success", 2000);
            navigateTo("/system/user/form/" + responseUserDepartment.id);
          }
        })
        .catch((error) => {
          $showToast("Lưu người dùng thất bại -2", "error", 2000);
          console.log("SAVE USER ERROR -2: ", error);
        })
      }
    }

    function setUser(newUser) {
      if (newUser) {
        user.username = newUser.username;
        user.password = newUser.password;
        user.firstName = newUser.firstName;
        user.lastName = newUser.lastName;
        user.email = newUser.email;
        user.accountEnabled = newUser.accountEnabled;
      }
    }

    function onLoadUserError(message) {
      $showToast(message, "warning", 3000);
      navigateTo("/system/user");
    }

    function navigateToAuthority() {
      if (!userId.value){
        console.log('userid: ', userId.value);
        $showToast("Yêu cầu tạo người dùng trước", "warning", 3000);
      } else
        navigateTo("/system/user/form/authority/" + userId.value);
    }

    return {
      titleForm,
      ROLES,
      user,

      // function
      onSubmit,
      useCurrentsRole,
      navigateToAuthority,
      onLoadUserK6K
    };
  },
  created() {
    this.onLoadUserK6K();
  }
};
</script>
<style lang="scss"></style>
