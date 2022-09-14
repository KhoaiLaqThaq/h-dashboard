<template>
  <nav class="side-nav pt-2">
    <NuxtLink to="/" class="router-link-active router-link-exact-active d-flex intro-x">
      <img src="~/assets/images/logo/logomavin.png" alt="" class="logo-img logo-mavin" />
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
        <a class="nav-link side-menu cursor-pointer" title="Quản lý chung" @click="toggleSubmenu('system')" id="system"
          ref="system" :v-if="checkSidebarAuthority(['ROLE_ADMIN', 'ROLE_MNG_SYSTEM'])">
          <div class="side-menu__icon">
            <IconTooling />
          </div>
          <span class="side-menu__title pl-1"> Quản lý hệ thống</span>
        </a>
        <ul class="submenu collapse">
          <li>
            <NuxtLink to="/system/group" class="side-menu" aria-label="group"
              :class="{ active: routeNameActive == 'group' }"
              v-if="checkSidebarAuthority(['ROLE_ADMIN', 'ROLE_GROUP_USER_VIEW'])">
              <div class="side-menu__icon">
                <IconGroup />
              </div>
              <span class="side-menu__title pl-1"> Nhóm người dùng</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/system/user" class="side-menu" aria-label="user"
              :class="{ active: routeNameActive == 'user' }" title="Quản lý người dùng"
              v-if="checkSidebarAuthority(['ROLE_ADMIN', 'ROLE_USER_VIEW'])">
              <div class="side-menu__icon">
                <UserIcon />
              </div>
              <span class="side-menu__title pl-1"> Người dùng</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/system/systemParams" class="side-menu" aria-label="systemParams"
              :class="{ active: routeNameActive == 'systemParams' }" title="Quản lý tham số hệ thống"
              v-if="checkSidebarAuthority(['ROLE_ADMIN', 'ROLE_SYS_PARAM_VIEW'])">
              <div class="side-menu__icon">
                <ComputerIcon />
              </div>
              <span class="side-menu__title pl-1"> Tham số hệ thống</span>
            </NuxtLink>
          </li>
        </ul>
      </li>
      <!-- submenu -->
      <li class="nav-item has-submenu" aria-label="has-submenu">
        <a class="nav-link side-menu cursor-pointer" title="Quản lý chung" @click="toggleSubmenu('common')" id="common"
          ref="common" v-if="checkSidebarAuthority(['ROLE_ADMIN', 'ROLE_MNG_COMMON'])">
          <div class="side-menu__icon">
            <IconCommunity />
          </div>
          <span class="side-menu__title pl-1"> Quản lý chung</span>
        </a>
        <ul class="submenu collapse">
          <li>
            <NuxtLink to="/common/department" class="side-menu" aria-label="department"
              :class="{ active: routeNameActive == 'department' }" title="Quản lý đơn vị thành viên"
              v-if="checkSidebarAuthority(['ROLE_ADMIN', 'ROLE_DEPARTMENT_VIEW'])">
              <div class="side-menu__icon">
                <IconUnit />
              </div>
              <span class="side-menu__title pl-1"> Đơn vị thành viên</span>
            </NuxtLink>
            <ul class="side-menu__sub-open"></ul>
          </li>
          <li>
            <NuxtLink to="/common/topic" class="side-menu" aria-label="topic"
              :class="{ active: routeNameActive == 'topic' }" title="Quản lý chủ đề"
              v-if="checkSidebarAuthority(['ROLE_ADMIN', 'ROLE_TOPIC_VIEW'])">
              <div class="side-menu__icon">
                <IconTopic />
              </div>
              <span class="side-menu__title pl-1"> Chuyên mục</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/common/newsType"
              class="side-menu"
              aria-label="newsType"
              :class="{ active: routeNameActive == 'newsType' }"
              title="Quản lý loại tin tức"
              v-if="checkSidebarAuthority(['ROLE_ADMIN', 'ROLE_NEWTYPE_VIEW'])"
            >
              <div class="side-menu__icon"><IconDocumentation /></div>
              <span class="side-menu__title pl-1"> Loại tin tức</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/common/comment"
              class="side-menu"
              aria-label="comment"
              :class="{ active: routeNameActive == 'comment' }"
              title="Quản lý bình luận"
              v-if="checkSidebarAuthority(['ROLE_ADMIN', 'ROLE_COMMENT_VIEW'])"
            >
              <div class="side-menu__icon"><IconComment /></div>
              <span class="side-menu__title">Quản lý bình luận</span>
            </NuxtLink>
          </li>
        </ul>
      </li>
      <li>
        <NuxtLink to="/news" class="side-menu" :class="{ active: routeNameActive == 'news' }" title="Quản lý tin tức"
          v-if="checkSidebarAuthority(['ROLE_ADMIN', 'ROLE_NEWS_VIEW'])">
          <div class="side-menu__icon">
            <PostIcon />
          </div>
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
import IconDocumentation from "~~/assets/images/icons/IconDocumentation.vue";

import VueJwtDecode from 'vue-jwt-decode';
import camelcaseKeys from 'camelcase-keys';

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
    IconDocumentation,
  },

  setup() {
    const routeNameActive = ref();
    const route = useRoute();
    const routeNameState = useRouteActive();
    const common = ref(null);
    const system = ref(null);
    const roles = ref(null);
    // TODO: define submenu
    const routeSubMenu = ref("common, system"); // common, system

    // TODO: to call state global
    const token = useToken();
    const header = useHeader();
    const client = useKeycloakClient();
    const currentRole = useCurrentRole();
    const resetRouteNameState = () => routeNameState.value = null;
    const toggleSubmenu = (e) => document.getElementById(e).nextElementSibling.classList.toggle("show");
    
    const onLoadRouteNameCurrent = () => {
      setRouteNameActive(route.name);
      checkAuthentication();
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
    function checkAuthentication(toRoute) {
      let jwtTokenStorage = localStorage.getItem("token");
      let expired = localStorage.getItem("exp");
      let time = localStorage.getItem("time");

      // TODO: Tính toán thời gian request hết hạn chưa.
      if (time && expired) {
        let diffTime = Math.abs(new Date().getTime() - time);
        if (diffTime < (expired * 1000)) {
          if (jwtTokenStorage && !token.value) {
            token.value = jwtTokenStorage;
          }
          // check header global state
          if (!header.value) header.value = `Bearer ${jwtTokenStorage}`;
          // set role current to check sidebar;
          let decode = VueJwtDecode.decode(jwtTokenStorage);
          let tokenKeys = camelCaseTokenKeys(decode);
          setStateAfterDecodeToken(tokenKeys)
        }
      } else {
        console.log("----------reset state with logout");
        resetStateBeforeLogout();
      }
    }

    function setStateAfterDecodeToken(jwtTokenKeys) {
      // set current Role
      if (jwtTokenKeys) {
        // set lại client
        if (localStorage.getItem('kclient') && !client.value) {
          client.value = jwtTokenKeys.azp;
        }

        let rolesDecode = jwtTokenKeys.resourceAccess[client.value].roles;
        if (!currentRole.value) {
          currentRole.value = rolesDecode;
        }
        roles.value = rolesDecode;
      }
    }

    function resetStateBeforeLogout() {
      token.value = '';
      localStorage.clear();
      navigateTo("/");
    }

    // TODO: Kiem tra quyen chuc nang show/hide sidebar
    function checkSidebarAuthority(roleItems) {
      let roleCurrents = roles.value && currentRole.value;
      if (!roleCurrents) roleCurrents = getRolesAfterDecode();

      if (roleCurrents && roleItems) {
        for (let i = 0; i < roleItems.length; i++) {
          if (roleCurrents.includes(roleItems[i]))
            return true;
        }
        return false;
      }
    }

    const getRolesAfterDecode = () => {
      let decodeToken = VueJwtDecode.decode(localStorage.getItem("token"));
      return decodeToken.resource_access[client.value].roles;
    }
    const camelCaseTokenKeys = (decode) => camelcaseKeys(decode);

    return {
      routeNameActive,
      common,
      system,
      roles,

      toggleSubmenu,
      resetRouteNameState,
      setRouteNameActive,
      onLoadRouteNameCurrent,
      checkAuthentication,
      checkSidebarAuthority
    };
  },
  watch: {
    $route: {
      deep: true,
      handler(to, from) {
        this.resetRouteNameState();
        this.setRouteNameActive(to.name);
        this.checkAuthentication(to);
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
