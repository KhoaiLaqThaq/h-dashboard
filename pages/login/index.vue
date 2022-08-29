<template>
  <NuxtLayout :name="auth">
    <div class="row justify-content-center">
      <div class="col-md-8 col-lg-6 col-xl-5">
        <div class="card">
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

            <form @submit.prevent="login()">
              <div class="form-group mb-3">
                <label for="emailaddress">Địa chỉ Email</label>
                <input
                  class="form-control"
                  type="email"
                  id="emailaddress"
                  placeholder="Enter your email"
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
                    placeholder="Enter your password"
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
    <!-- end row -->
  </NuxtLayout>
</template>
<script>
const layout = "auth";
export default {
  data() {
    return {
      mockAccount: {
        email: "admin@gmail.com",
        password: "123456",
      },
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      if (this.email != "" && this.password != "") {
        if (
          this.email == this.mockAccount.email &&
          this.password == this.mockAccount.password
        ) {
          this.$router.push({ path: "/" });
          const layout = "admin";
        }
      }
    },
  },
};
</script>
