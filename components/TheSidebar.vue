<template>
  <nav class="side-nav pt-2">
    <NuxtLink
      to="/"
      class="ps-3 router-link-active router-link-exact-active d-flex intro-x"
    >
      <img src="~/assets/images/logo/logo.svg" alt="" class="w-6 logo-img" />
      <span class="text-white text-lg ps-3 logo-title">My Mavin</span>
    </NuxtLink>
    <div class="side-nav__devider my-6 me-3"></div>
    <ul>
      <li>
        <NuxtLink to="/" class="side-menu" title="Trang chủ">
          <div class="side-menu__icon"><DashboardIconVue /></div>
          <span class="side-menu__title pl-1"> Trang chủ</span>
        </NuxtLink>
      </li>
      <!-- submenu -->
      <li class="nav-item has-submenu" aria-label="has-submenu">
        <a class="nav-link side-menu cursor-pointer" title="Quản lý chung"
          @click="toggleSubmenu(system)" id="system" ref="system">
          <div class="side-menu__icon"><IconTooling /></div>
          <span class="side-menu__title pl-1"> Quản lý hệ thống</span>
        </a>
        <ul class="submenu collapse">
          <li>
            <NuxtLink
              to="/system/group"
              class="side-menu"
              aria-label="group"
              :class="{ active: routeNameActive == 'group' }"
            >
              <div class="side-menu__icon"><IconGroup /></div>
              <span class="side-menu__title pl-1"> Nhóm người dùng</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/system/user"
              class="side-menu"
              aria-label="user"
              :class="{ active: routeNameActive == 'user' }"
              title="Quản lý người dùng"
            >
              <div class="side-menu__icon"><UserIcon /></div>
              <span class="side-menu__title pl-1"> Quản lý người dùng</span>
            </NuxtLink>
          </li>
        </ul>
      </li>
      <!-- submenu -->
      <li class="nav-item has-submenu" aria-label="has-submenu">
        <a class="nav-link side-menu cursor-pointer" title="Quản lý chung"
          @click="toggleSubmenu(common)" id="common" ref="common">
          <div class="side-menu__icon"><IconCommunity /></div>
          <span class="side-menu__title pl-1"> Quản lý chung</span>
        </a>
        <ul class="submenu collapse">
          <li>
            <NuxtLink
              to="/common/department"
              class="side-menu"
              aria-label="department"
              :class="{ active: routeNameActive == 'department' }"
              title="Quản lý đơn vị thành viên"
            >
              <div class="side-menu__icon"><IconUnit /></div>
              <span class="side-menu__title pl-1"> Quản lý đơn vị thành viên</span>
            </NuxtLink>
            <ul class="side-menu__sub-open"></ul>
          </li>
          <li>
            <NuxtLink
              to="/common/topic"
              class="side-menu"
              aria-label="topic"
              :class="{ active: routeNameActive == 'topic' }"
              title="Quản lý chủ đề"
            >
              <div class="side-menu__icon"><IconTopic /></div>
              <span class="side-menu__title pl-1"> Quản lý chủ đề</span>
            </NuxtLink>
          </li>
        </ul>
      </li>
      
       <!-- submenu -->
      <li class="nav-item has-submenu" aria-label="has-submenu">
        <a class="nav-link side-menu cursor-pointer" title="Quản lý tin tức"
          @click="toggleSubmenu(news)" id="news" ref="news">
          <div class="side-menu__icon"><PostIcon /></div>
          <span class="side-menu__title pl-1"> Quản lý tin tức</span>
        </a>
        <ul class="submenu collapse">
          <li><NuxtLink to="/news" title="Title" :class="{active: routeNameActive == 'news'}" class="news nav-link side-menu"><PostIcon /><span class="side-menu__title">Quản lý tin tức</span> </NuxtLink></li>
        </ul>
      </li>

      <li class="mt-5"></li>
      <li class="logo-sidebar__bottom">
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
import IconUnit from "~~/assets/images/icons/IconUnit.vue";
import IconTopic from "../assets/images/icons/IconTopic.vue";
import IconCommunity from "~~/assets/images/icons/IconCommunity.vue";
import IconGroup from "../assets/images/icons/IconGroup.vue";
import IconTooling from "~~/assets/images/icons/IconTooling.vue";

export default {
  components: {
    DashboardIconVue,
    UserIcon,
    PostIcon,
    ImgSidebar,
    IconUnit,
    IconTopic,
    IconCommunity,
    IconGroup,
    IconTooling
},

  setup() {
    const routeNameActive = ref();
    const route = useRoute();
    const routeNameState = useRouteActive();
    const common = ref(null);
    const news = ref(null);
    const system = ref(null);
    // TODO: define submenu
    const routeSubMenu = ref("common, news, system");   // common, system

    function setRouteNameState() {
      routeNameState.value = null;
    }

    function setRouteNameActive(to) {
      routeNameActive.value = to;
      routeNameState.value = to;
      setLocalStorageRoute(to);
      if (localStorage.getItem("rType") == null) {
        const submenu = document.getElementsByClassName("submenu");
        if (submenu) {
          for (let i = 0; i < submenu.length; i++) {
            const element = submenu[i];
            element.classList.remove("show");
          }
        }
      }
    }

    function setLocalStorageRoute(pageGroup) {
      if (routeSubMenu.value.includes(pageGroup)) {
        localStorage.setItem("activeRname", pageGroup);
        localStorage.setItem("rType", "submenu");
      } else {
        localStorage.removeItem("activeRname");
        localStorage.removeItem("rType");
      }
    }

    function onLoadRouteNameCurrent() {
      let pageGroup = route.name.split("-")[0];
      setRouteNameActive(pageGroup);
      setLocalStorageRoute(pageGroup);
      let rType = localStorage.getItem("rType");
      if (rType) {
        let activeRname = localStorage.getItem("activeRname");
        document
          .getElementById(activeRname)
          .nextElementSibling.classList.add("show");
      }
    }

    function toggleSubmenu(e) {
      document.getElementById(e.id).nextElementSibling.classList.toggle('show');
    }

    return {
      routeNameActive, common, news, system,

      toggleSubmenu,
      setRouteNameState,
      setRouteNameActive,
      onLoadRouteNameCurrent,
      setLocalStorageRoute,
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
        this.setLocalStorageRoute(pageGroup);
      },
    },
  },
  mounted() {
    this.setRouteNameState();
    this.onLoadRouteNameCurrent();
  },
  unmounted() {
    // localStorage.clear();
  },
};
</script>
