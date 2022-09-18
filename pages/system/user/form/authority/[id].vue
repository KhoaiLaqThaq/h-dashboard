<template>
    <form>
        <div class="tabs-container">
            <ul>
                <li class="tabs__item" @click="navigateToUserForm()">Thông tin người dùng</li>
                <li class="tabs__item selected ">Phân quyền</li>
            </ul>
            <div class="tabs__content">
                <div class="form-group bg-white">
                    <div class="card radius-unset mb-0 box">
                        <div class="card-body">
                        <div class="row mt-3 pb-0">
                            <div class="col-12">
                            <div class="row gx-2">
                                <div class="col-6">
                                <div class="form-floating mb-3">
                                    <select v-model="k6kGroupId" class="form-select" required="required">
                                        <option v-for="(groupUser, index) in groupUsers" :key="index" :value="groupUser.id">
                                            {{ groupUser.name }}
                                        </option>
                                    </select>
                                    <label>Chọn nhóm quyền <span class="text-danger">*</span></label>
                                </div>
                                </div>

                                <div class="col-6">
                                <div class="form-floating mb-3">
                                    <select v-model="departmentId" class="form-select" required="required">
                                        <option v-for="(department, index) in departments" :key="index" :value="department.id">
                                            {{ department.name }}
                                        </option>
                                    </select>
                                    <label>Chọn phòng ban <span class="text-danger">*</span></label>
                                </div>
                                </div>
                            </div>
                            <hr>
                            <div class="row pb-0">
                                <div class="col-12 text-right">
                                    <button class="btn btn-primary ms-auto text-small" type='button' @click="onAuthority()">Phân quyền</button>
                                </div>
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
    components: [
        TitleHeader,
        FloatSelect,
        BaseSelect,
        MultiCheckboxVue
    ],
    setup() {
        const header = useHeader();
        const route = useRoute();
        const userId = ref(route.params && route.params.id);
        const { $showToast } = useNuxtApp();

        const k6kGroupId = ref("");
        const departmentId = ref("");
        const groupUsers = ref([]);
        const departments = ref([]);

        const headers = {
            'Authorization': header.value,
            'Content-Type': 'application/json'
        };

        // TODO: init loading
        function initLoad() {
            if (userId) {
                onLoadUserDepartmentByK6kUserId();
                onLoadGroupUsers();
                onLoadDepartments();
            }
        }

        function onLoadUserDepartmentByK6kUserId() {
            axios.get(`${CONFIG.BASE_URL}/${CONFIG.NEWS_GATEWAY}/api/userDepartment/${userId.value}`, { headers})
            .then((response) => {
                let responseData = response.data;
                if (responseData) {
                    k6kGroupId.value = responseData.k6kGroupId;
                    departmentId.value = responseData.departmentId;
                } else onLoadUserError("Tải thông tin người dùng không thành công -1.");
            })
            .catch((error) => {
                onLoadUserError("Tải thông tin người dùng không thành công -1");
                console.log("LOAD USER ERROR: ", error);
            });
        }

        function onLoadGroupUsers() {
            axios.get(`${CONFIG.BASE_URL}/${CONFIG.USER_GATEWAY}/api/groups`, { headers})
            .then((response) => {
                let responseData = response.data;
                if (responseData) {
                    groupUsers.value = responseData;
                }
            })
            .catch((error) => {
                onLoadUserError("Tải thông tin nhóm người dùng thất bại");
                console.log("LOAD USER K6k ERROR: ", error);
            });
        }

        function onLoadDepartments() {
            axios.get(`${CONFIG.BASE_URL}/${CONFIG.NEWS_GATEWAY}/api/departments`, { headers})
            .then((response) => {
                let responseData = response.data;
                if (responseData) {
                    departments.value = responseData;
                }
            })
            .catch((error) => {
                onLoadUserError("Tải thông tin danh sách phòng ban thất bại");
                console.log("LOAD departments ERROR: ", error);
            });
        }

        function onAuthority() {
            if (k6kGroupId.value && departmentId.value) {

            } else $showToast("Yêu cầu điền đầy đủ thông tin trong mẫu", "warning", 3000);
        }

        function navigateToUserForm() {
            navigateTo("/system/user/form/" + userId.value)
        }

        function onLoadUserError(message) {
            $showToast(message, "error", 3000);
            navigateTo("/system/user");
        }

        return {
            k6kGroupId,
            departmentId,
            groupUsers,
            departments,

            onAuthority,
            navigateToUserForm,
            initLoad
        }
    },
    created() {
        this.initLoad();
    }
}
</script>
<style lang="">
    
</style>