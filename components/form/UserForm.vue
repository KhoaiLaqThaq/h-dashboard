<template>
  <form>
    <TabsWrapper>
      <TabItem title="Thông tin người dùng">
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
                  <!-- Tên đăng nhập -->
                  <div class="form-floating mb-3 col-6">
                    <input type="text" class="form-control box" required="required" autocomplete="false" v-model="user.username"/>
                    <label for="">Tên đăng nhập <span class="text-danger">*</span></label>
                  </div>
                  <!-- Email  -->
                  <div class="form-floating mb-3 col-6">
                    <input type="email" class="form-control box" required="required" autocomplete="false" v-model="user.email" />
                    <label for="">Email <span class="text-danger">*</span></label>
                  </div>

                  <div class="col-6">
                    <label for="">Kích hoạt tài khoản</label>
                    <div class="form-check form-switch">
                      <input type="checkbox" class="form-check-input" :checked="user.enabled" role="switch"/>
                    </div>
                  </div>
                </div>

                <hr>

                <div class="row pb-0">
                  <div class="col-12 text-right">
                    <BaseButton class="btn-primary ms-auto" :btnType="'button'" :name="'Lưu'" :textSize="'text-small'" @click="onSubmit()"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </TabItem>
      <TabItem title="Phân quyền">
        <div class="form-group bg-white">
          <div class="card radius-unset mb-0 box">
            <div class="card-body">
              <div class="row mt-3 pb-0">
                <div class="col-12">
                  <div class="row gx-2">
                    <div class="col-6">
                      <div class="form-floating mb-3">
                        <select class="form-select" required="required">
                          <option></option>
                        </select>
                        <label>Chọn nhóm quyền <span class="text-danger">*</span></label>
                      </div>
                    </div>

                    <div class="col-6">
                      <div class="form-floating mb-3">
                        <select class="form-select" required="required">
                          <option></option>
                        </select>
                        <label>Chọn phòng ban <span class="text-danger">*</span></label>
                      </div>
                    </div>
                  </div>
                  <hr>
                  <div class="row pb-0">
                    <div class="col-12 text-right">
                      <BaseButton class="btn-primary ms-auto" :btnType="'button'" :name="'Phân quyền'" :textSize="'text-small'" @click="onAuthority()"/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </TabItem>
    </TabsWrapper>

    
  </form>
</template>
<script>
import { ref, reactive } from "vue";
import { useRoute } from "vue-router";
// components
import BaseButton from "~~/components/common/BaseButton.vue";
import BaseSelect from "~~/components/common/BaseSelect.vue";
import TitleHeader from "~~/components/common/TitleHeader.vue";
import FloatSelect from "~~/components/common/FloatSelect.vue";
import MultiCheckboxVue from "~~/components/common/MultiCheckbox.vue";
import TabsWrapper from "~~/components/common/tab/TabsWrapper.vue";
import TabItem from "~~/components/common/tab/TabItem.vue";

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
