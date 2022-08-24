<template>
  <nav class="side-nav pt-2">
    <NuxtLink
      to="/"
      class="router-link-active router-link-exact-active d-flex intro-x"
    >
      <img src="~/assets/images/logo/logo.svg" alt="" class="w-6" />
      <span class="text-white text-lg ps-3">My Mavin</span>
    </NuxtLink>
    <div class="side-nav__devider my-6 me-3"></div>
    <ul>
      <li>
        <NuxtLink to="/" class="side-menu">
          <div class="side-menu__icon"><DashboardIconVue /></div>
          <span class="side-menu__title pl-1"> Dashboard</span>
        </NuxtLink>
      </li>
      <li>
        <NuxtLink
          to="/user"
          class="side-menu"
          aria-label="user"
          :class="{ active: routeNameActive == 'user' }"
        >
          <div class="side-menu__icon"><UserIcon /></div>
          <span class="side-menu__title pl-1">
            User
            <div class="side-menu__sub-icon transform rotate-180">
              <font-awesome-icon icon="fa-solid fa-chevron-down" />
            </div>
          </span>
        </NuxtLink>
        <ul class="side-menu__sub-open">
          <li>
            <NuxtLink
              to="/department"
              class="side-menu"
              aria-label="unit"
              :class="{ active: routeNameActive == 'department' }"
            >
              <span class="side-menu__title pl-1"> Department</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/group"
              class="side-menu"
              aria-label="group"
              :class="{ active: routeNameActive == 'group' }"
            >
              <span class="side-menu__title pl-1"> Group</span>
            </NuxtLink>
          </li>
        </ul>
      </li>
      <li>
        <NuxtLink
          to="/news"
          class="side-menu"
          aria-label="news"
          :class="{ active: routeNameActive == 'news' }"
        >
          <div class="side-menu__icon"><PostIcon /></div>
          <span class="side-menu__title pl-1"> News</span>
        </NuxtLink>
      </li>
      <li>
        <NuxtLink
          to="/topic"
          class="side-menu"
          aria-label="topic"
          :class="{ active: routeNameActive == 'topic' }"
        >
          <div class="side-menu__icon"><PostIcon /></div>
          <span class="side-menu__title pl-1"> Topic</span>
        </NuxtLink>
      </li>
      <li class="logo-sidebar__bottom">
        <ImgSidebar />
      </li>
    </ul>
  </nav>
</template>
<script>
import { ref } from "vue";
import { useRoute } from "vue-router";

import DashboardIconVue from "~~/assets/images/icons/DashboardIcon.vue";
import UserIcon from "~~/assets/images/icons/UserIcon.vue";
import PostIcon from "~~/assets/images/icons/PostIcon.vue";
import ImgSidebar from "~~/assets/images/logo/ImgSidebar.vue";

export default {
  components: {
    DashboardIconVue,
    UserIcon,
    PostIcon,
    ImgSidebar,
  },
  setup() {
    const routeNameActive = ref();
    const route = useRoute();
    const routeNameState = useRouteActive();

    function setRouteNameState() {
      routeNameState.value = null;
    }

    function setRouteNameActive(to) {
      routeNameActive.value = to;
      routeNameState.value = to;
    }

    function onLoadRouteNameCurrent() {
      let pageGroup = route.name.split("-")[0];
      setRouteNameActive(pageGroup);
    }

    return {
      routeNameActive,

      setRouteNameState,
      setRouteNameActive,
      onLoadRouteNameCurrent,
    };
  },
  watch: {
    $route: {
      deep: true,
      handler(to, from) {
        let pageGroup = to.name.split("-")[0];
        this.setRouteNameState();
        this.setRouteNameActive(pageGroup);
        this.show = false;
      },
    },
  },
  mounted() {
    this.setRouteNameState();
    this.onLoadRouteNameCurrent();
  },
};
</script>
