<template>
  <div id="main" class="auto-scroll-y">
    <NuxtLayout :name="layout">
      <!-- <NuxtPage /> -->
    </NuxtLayout>
  </div>
</template>

<script>
import { ref, watch } from 'vue';
import "bootstrap";

export default {
  setup() {
    const layout = useLayoutActive();
    const token = useToken();

    const setLayoutDefault = () => {
      if (token.value) {
        layout.value = 'admin';
      } else {
        layout.value = 'auth';
      }
    }

    watch([token], () => {
      console.log("listener event change state");
      setLayoutDefault();
    });

    function resetStateBeforeLogout() {
      token.value = '';
      localStorage.clear();
      navigateTo("/");
    }

    function checkAuthentication() {
      console.log("check authentication");
      let jwtTokenStorage = localStorage.getItem("token");
      let expired = localStorage.getItem("expired");
      let diffTime = Math.abs(new Date() - expired);
      // Mock expired 30'
      let expiredDiff = 30*60*1000;

      if (expired && diffTime < expiredDiff && jwtTokenStorage) {
        if (!token.value) {
          token.value = jwtTokenStorage;
        }
      }
      else {
        resetStateBeforeLogout();
      }
    }

    return {
      layout,

      setLayoutDefault,
      checkAuthentication
    }
  },
  mounted() {
    this.setLayoutDefault();
    this.checkAuthentication();
  }
}
</script>
