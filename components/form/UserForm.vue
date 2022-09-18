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
    BaseButton,
    BaseSelect,
    MultiCheckboxVue,
    TabsWrapper,
    TabItem
  },
  setup() {
    const route = useRoute();
    const userId = ref(route.params && route.params.id);
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

    function onSubmit() {
      console.log("Form Submmitted");
    }

    function onAuthority() {

    }

    return {
      titleForm,
      ROLES,
      user,

      // function
      onSubmit,
      onAuthority,
      useCurrentsRole
    };
  },
};
</script>
<style lang="scss"></style>
