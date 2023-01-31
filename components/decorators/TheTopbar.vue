<template>
  <div class="top-bar row py-3">
    <div class="col-9">
      <div class="form-group col-8 position-relative m-auto">
        <input type="text" class="form-control rounded-20 input-search p-3" :placeholder="$t('label.search.common')"/>
        <button type="button" class="btn-theme border-unset rounded-20 search-common text-white">{{ $t('label.button.search') }}</button>
      </div>
    </div>
    <div class="col-3 d-flex justify-content-end">
      <div class="me-auto d-none show-xs">
        <span @click="toggleSidebar()"><AlignJustifyIcon /></span>
      </div>
      <div class="dropdown notification rounded-10 flex-center-vertical me-4">
        <div class="dropdown-toggle notification--bullet cursor-pointer">
          <font-awesome-icon icon="fa-solid fa-bell" size="lg"/>
        </div>
      </div>
      <div class="user-actions h-auto flex-center-vertical me-4">
        <div class="name">{{currentUser}}</div>
      </div>

      <div class="dropdown me-3">
        <div class="dropdown-toggle rounded-full size56x56 img-fit cursor-pointer" id="dropdownMenuAccountInfo"
          data-bs-toggle="dropdown" aria-expanded="false">
          <img src="@/assets/images/avatar/avatar1.jpg" alt="..." />
        </div>
        <ul class="dropdown-menu dropdown-acc__customize" aria-labelledby="dropdownMenuAccountInfo">
          <li class="dropdown-item px-3 dropdown-acc-item">
            <div class="name">{{currentUser}}</div>
            <div class="description text-secondary">Accountor</div>
          </li>
          <!-- <li class="dropdown-item px-3 dropdown-acc-item">
            <UserIcon class="p-1" />
            <span class="ps-1">Profile</span>
          </li>
          <li class="dropdown-item px-3 dropdown-acc-item">
            <span class="ps-1">Reset Password</span>
          </li> -->
          <li class="dropdown-item px-3 dropdown-acc-item" @click="logout()">
            <span class="ps-1">Logout</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  setup(props, {emit}) {
    const routeNameState = useRouteActive();
    const token = useToken();
    const currentUser = useCurrentUser();

    function logout() {
      console.log('entering logout()...')
      token.value = '';
      localStorage.clear();
    }

    const toggleSidebar = () => emit('toggle-sidebar');

    return {
      routeNameState,
      currentUser,

      logout,
      toggleSidebar
    };
  },
};
</script>
<style lang="scss">

</style>
