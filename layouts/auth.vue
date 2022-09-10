<template>
  <div class="row justify-content-center">
    <div class="col-sm-8 col-md-6 col-lg-6 col-xl-5">
      <div class="card box">
        <div class="card-body p-4">
          <div class="text-center m-auto">
            <div class="auth-logo">
              <nuxt-link to="/" class="text-center">
                <span class="logo-lg">
                  <img
                    src="~/assets/images/logo-mavin2.jpeg"
                    alt=""
                    height="200"
                  />
                </span>
              </nuxt-link>
            </div>
          </div>

          <div class="text-secondary">
            <p>
              Email: <strong>{{ mockAccount.email }}</strong>
            </p>
            <p>
              Password: <strong>{{ mockAccount.password }}</strong>
            </p>
          </div>

          <form @submit.prevent="login()">
            <div class="form-group mb-3">
              <label for="emailaddress">Địa chỉ Email</label>
              <input
                class="form-control"
                type="email"
                id="emailaddress"
                placeholder="Nhập địa chỉ email"
                v-model="email"
              />
              <div class="invalid-feedback"></div>
            </div>

            <div class="form-group mb-3">
              <label for="password">Mật khẩu</label>
              <div class="input-group input-group-merge">
                <input
                  type="password"
                  id="password"
                  class="form-control"
                  placeholder="Nhập mật khẩu"
                  v-model="password"
                />

                <div class="input-group-append" data-password="false">
                  <div class="input-group-text" style="height: 100%">
                    <font-awesome-icon :icon="['fas', 'eye']" />
                  </div>
                </div>
                <div class="invalid-feedback">Password is required.</div>
              </div>
            </div>

            <div class="form-group mb-3">
              <div class="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  class="custom-control-input"
                  id="checkbox-signin"
                  checked
                />
                <label class="custom-control-label" for="checkbox-signin"
                  >Ghi nhớ tài khoản</label
                >
              </div>
            </div>

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
import { ref, reactive } from "vue";

export default {
  setup() {
    const { $showToast } = useNuxtApp();
    const email = ref("");
    const password = ref("");
    const mockAccount = reactive({
      email: "admin@gmail.com",
      password: "123456",
    });
    const token = useToken();

    function login(e) {
      if (email.value != "" && password.value != "") {
        if (
          email.value == mockAccount.email &&
          password.value == mockAccount.password
        ) {
          // this.$router.push({ path: "/" });
          $showToast("Đăng nhập thành công", "success", 2000);
          token.value = "Bearer " + email.value + "_" + password.value;
          localStorage.setItem("token", token.value);
          localStorage.setItem("expired", new Date().getTime());
        }
      }
    }

    return {
      email,
      password,
      mockAccount,

      login,
    };
  },
  mounted() {
    this.tokenState = "";
  },
};
</script>
