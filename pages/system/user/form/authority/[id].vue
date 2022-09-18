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
        const route = useRoute();
        const userId = ref(route.params && route.params.id);

        function navigateToUserForm() {
            navigateTo("/system/user/form/" + userId.value)
        }

        function onAuthority() {}

        return {
            onAuthority,
            navigateToUserForm
        }
    }
}
</script>
<style lang="">
    
</style>