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

import VueJwtDecode from 'vue-jwt-decode';
import camelcaseKeys from 'camelcase-keys';

export default {
  setup() {
    const layout = useLayoutActive();
    const token = useToken();
    const header = useHeader();
    const client = useKeycloakClient();
    const currentRole = useCurrentRole();
    const currentUser = useCurrentUser();

    const setLayoutDefault = () => {
      if (token.value) {
        layout.value = 'admin';
      } else {
        layout.value = 'auth';
      }
    }

    watch([token], () => {
      setLayoutDefault();
    });

    function resetStateBeforeLogout() {
      token.value = '';
      localStorage.clear();
      navigateTo("/");
    }

    function checkAuthentication() {
      let jwtTokenStorage = localStorage.getItem("token");
      let expired = localStorage.getItem("exp");
      let time = localStorage.getItem("time");

      // TODO: Tính toán thời gian request hết hạn chưa.
      if (time && expired) {
        let diffTime = Math.abs(new Date().getTime() - time);
        if (diffTime < (expired * 1000)) {
          if (jwtTokenStorage && !token.value) {
            token.value = jwtTokenStorage;
            // check header global state
            if (!header.value) header.value = `Bearer ${jwtTokenStorage}`;

            // set role current
            let decode = VueJwtDecode.decode(jwtTokenStorage);
            let tokenKeys = camelCaseTokenKeys(decode);
            setStateAfterDecodeToken(tokenKeys);
          }
        }
      } else {
        resetStateBeforeLogout();
      }
    }

    const camelCaseTokenKeys = (decode) => camelcaseKeys(decode);

    function setStateAfterDecodeToken(jwtTokenKeys) {
      // set current Role
      if (jwtTokenKeys) {
        // set lại client
        if (localStorage.getItem('kclient') && !client.value) {
          client.value = jwtTokenKeys.azp;
        }
        if (!currentUser.value) {
          currentUser.value = jwtTokenKeys.email;
        }

        if (!currentRole.value) {
          currentRole.value = jwtTokenKeys.resourceAccess[client.value].roles;
        }
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
