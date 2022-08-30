<template>
  <nav class="side-nav pt-2">
    <NuxtLink
      to="/"
      class="router-link-active router-link-exact-active d-flex intro-x"
    >
      <img
        src="~/assets/images/logo/logomavin.png"
        alt=""
        class="logo-img logo-mavin"
      />
    </NuxtLink>
    <div class="side-nav__devider my-6 me-3"></div>
    <ul>
      <li>
        <NuxtLink to="/" class="side-menu" title="Trang chủ">
          <div class="side-menu__icon"></div>
          <span class="side-menu__title pl-1"> Trang chủ</span>
        </NuxtLink>
      </li>
      <!-- submenu -->
      <li class="nav-item has-submenu" aria-label="has-submenu">
        <a
          class="nav-link side-menu cursor-pointer"
          title="Quản lý chung"
          @click="toggleSubmenu(system)"
          id="system"
          ref="system"
        >
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
              <span class="side-menu__title pl-1"> Người dùng</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/system/systemParams"
              class="side-menu"
              aria-label="systemParams"
              :class="{ active: routeNameActive == 'systemParams' }"
              title="Quản lý tham số hệ thống"
            >
              <div class="side-menu__icon"><ComputerIcon /></div>
              <span class="side-menu__title pl-1"> Tham số hệ thống</span>
            </NuxtLink>
          </li>
        </ul>
      </li>
      <!-- submenu -->
      <li class="nav-item has-submenu" aria-label="has-submenu">
        <a
          class="nav-link side-menu cursor-pointer"
          title="Quản lý chung"
          @click="toggleSubmenu(common)"
          id="common"
          ref="common"
        >
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
              <span class="side-menu__title pl-1"> Đơn vị thành viên</span>
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
              <span class="side-menu__title pl-1"> Chuyên mục</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/common/comment"
              class="side-menu"
              aria-label="comment"
              :class="{ active: routeNameActive == 'comment' }"
              title="Quản lý bình luận"
            >
              <div class="side-menu__icon"><IconComment /></div>
              <span class="side-menu__title">Quản lý bình luận</span>
            </NuxtLink>
          </li>
        </ul>
      </li>
      <li>
        <NuxtLink
          to="/news"
          class="side-menu"
          :class="{ active: routeNameActive == 'news' }"
          title="Quản lý tin tức"
        >
          <div class="side-menu__icon"><PostIcon /></div>
          <span class="side-menu__title pl-1"> Quản lý tin tức</span>
        </NuxtLink>
      </li>

      <li class="mt-5"></li>
      <li class="logo-sidebar__bottom"></li>
    </ul>
  </nav>
</template>
<script>
import { ref } from "vue";
import { useRoute } from "vue-router";

import UserIcon from "~~/assets/images/icons/UserIcon.vue";
import PostIcon from "~~/assets/images/icons/PostIcon.vue";
import ImgSidebar from "~~/assets/images/logo/ImgSidebar.vue";
import IconUnit from "~~/assets/images/icons/IconUnit.vue";
import IconTopic from "../assets/images/icons/IconTopic.vue";
import IconCommunity from "~~/assets/images/icons/IconCommunity.vue";
import IconGroup from "../assets/images/icons/IconGroup.vue";
import IconTooling from "~~/assets/images/icons/IconTooling.vue";
import IconComment from "~~/assets/images/icons/IconComment.vue";
import ComputerIcon from "~~/assets/images/icons/ComputerIcon.vue";

export default {
  components: {
    UserIcon,
    PostIcon,
    ImgSidebar,
    IconUnit,
    IconTopic,
    IconCommunity,
    IconGroup,
    IconTooling,
    IconComment,
    ComputerIcon,
  },

  setup() {
    const routeNameActive = ref();
    const route = useRoute();
    const routeNameState = useRouteActive();
    const common = ref(null);
    const system = ref(null);
    // TODO: define submenu
    const routeSubMenu = ref("common, system"); // common, system
    const token = useToken();

    const resetRouteNameState = () => {
      routeNameState.value = null;
    };
    const onLoadRouteNameCurrent = () => {
      setRouteNameActive(route.name);
      checkAuthentication();
    };
    const toggleSubmenu = (e) => {
      document.getElementById(e.id).nextElementSibling.classList.toggle("show");
    };

    function setRouteNameActive(to) {
      let pageGroup = to.split("-"); // ['common', 'department', ...]
      let toGroup = pageGroup[0]; // to show submenu
      routeNameActive.value = toGroup;
      routeNameState.value = toGroup;
      setLocalStorageRoute(toGroup);

      let rType = localStorage.getItem("rType");
      if (rType == null) {
        const submenu = document.getElementsByClassName("submenu");
        if (submenu) {
          for (let i = 0; i < submenu.length; i++) {
            const element = submenu[i];
            // to hide submenu
            element.classList.remove("show");
          }
        }
      } else {
        let toSubGroup = pageGroup[1];
        routeNameActive.value = toSubGroup;
        routeNameState.value = toSubGroup;
        // to show submenu
        document
          .getElementById(toGroup)
          .nextElementSibling.classList.add("show");
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

    // check token
    function checkAuthentication() {
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

    function resetStateBeforeLogout() {
      token.value = '';
      localStorage.clear();
    }

    return {
      routeNameActive,
      common,
      system,

      toggleSubmenu,
      resetRouteNameState,
      setRouteNameActive,
      onLoadRouteNameCurrent,
      checkAuthentication
    };
  },
  watch: {
    $route: {
      deep: true,
      handler(to, from) {
        this.resetRouteNameState();
        this.setRouteNameActive(to.name);
        this.checkAuthentication();
      },
    },
  },
  mounted() {
    this.resetRouteNameState();
    this.onLoadRouteNameCurrent();
  },
  unmounted() {
    localStorage.clear();
  },
};
</script>
