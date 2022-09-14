<template>
  <div class="row justify-content-center mt-5" id="authLayout">
    <div class="col-sm-8 col-md-4 col-lg-4 col-xl-3 mt-5">
      <div class="card box">
        <div class="card-body p-4">
          <div class="text-center m-auto">
            <div class="auth-logo">
              <nuxt-link to="/" class="text-center">
                <span class="logo-lg">
                  <img src="~/assets/images/logo-mavin2.jpeg" alt="" height="200" />
                </span>
              </nuxt-link>
            </div>
          </div>

          <form @submit.prevent="login()">
            <!-- email -->
            <div class="form-floating mb-3">
              <input class="form-control" type="email" id="emailaddress" v-model="currentUser.username" />
              <label for="emailaddress">Địa chỉ Email thành viên <span class="text-danger">*</span></label>
            </div>
            <!-- /email -->
            <!-- password -->
            <div class="form-floating mb-3">
              <input type="password" id="password" class="form-control" v-model="currentUser.password" />
              <label for="password">Mật khẩu <span class="text-danger">*</span></label>
            </div>
            <!-- /password -->

            <div class="form-group">
              <strong><span class="text-danger">{{errorMessage}}</span></strong>
            </div>
            <hr />
            <div class="form-group mb-0 text-center">
              <button class="btn btn-login btn-block" type="submit">
                Đăng nhập
              </button>
            </div>
          </form>
        </div>
        <!-- end card-body -->
      </div>
      <!-- end card -->

      <!-- end row -->
    </div>
    <!-- end col -->
  </div>
</template>
<script>
import { ref, reactive } from 'vue';
import axios from 'axios';
import CONFIG from '~~/config';

import VueJwtDecode from 'vue-jwt-decode';

export default {
  setup() {
    const currentUser = reactive({
      username: '',
      password: ''
    });
    const errorMessage = ref('');
    // state global
    const token = useToken();
    const header = useHeader();
    const client = useKeycloakClient();
    const currentRole = useCurrentRole();

    function login(e) {
      console.log("====>Entering login");
      if (currentUser.username != "" && currentUser.password != "") {
        let data = {
          username: currentUser.username,
          password: currentUser.password
        };

        axios
          .post(`${CONFIG.BASE_URL}/user/auth/login`, data)
          .then((response) => {
            let responseData = response.data;
            if (responseData && responseData.code === 200) {
              saveInforLogin(responseData);
            } else if (responseData.code === 404) {
              errorMessage.value = responseData.message;
            } else {
              errorMessage.value = "Ops! Lỗi không xác định.";
              console.log('ERROR else');
            }
          }).catch(error => {
            errorMessage.value = "Vui lòng kiểm tra lại thông tin tài khoản!";
            console.log("LOGIN ERROR: " + error);
          });
      }
    }

    function saveInforLogin(responseData) {
      let accessToken = responseData.data;
      let decode = VueJwtDecode.decode(accessToken);

      if (decode) {
        let k6kClient = decode.azp;
        let roles = decode.resource_access[k6kClient].roles;
        let expiresIn = decode.exp - decode.iat;

        // set global state
        client.value = k6kClient;
        token.value = accessToken;
        header.value = `Bearer ${accessToken}`;
        currentRole.value = roles;
        // set localStorage
        localStorage.setItem("kclient", k6kClient);
        localStorage.setItem("token", accessToken);
        localStorage.setItem("exp", expiresIn);
        localStorage.setItem("time", new Date().getTime());
      }
    }

    return {
      currentUser,
      errorMessage,

      login,
    };
  },
  mounted() {
    this.tokenState = "";
  },
};
</script>
