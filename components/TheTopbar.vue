<template>
    <div class="top-bar">
        <nav class="me-auto hidden">
            <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <NuxtLink to="/">Application</NuxtLink>
                </li>
                <li class="breadcrumb-item active">
                    <NuxtLink :to="routeNameState">{{ routeNameState == 'index' ? 'Dashboard' : routeNameState }}</NuxtLink>
                </li>
            </ol>
        </nav>

        <div class="dropdown me-4">
            <div class="dropdown-toggle notification notification--bullet cursor-pointer">
                <RingIcon class="notification-icon lucide" />
            </div>
            <!-- notification-content -->
        </div>
        <div class="dropdown me-3">
            <div class="dropdown-toggle rounded-full w-8 h-8 img-fit cursor-pointer"
                id="dropdownMenuAccountInfo" data-bs-toggle="dropdown" aria-expanded="false"
            >
                <img src="@/assets/images/avatar/avatar1.jpg" alt="...">
            </div>
            <ul class="dropdown-menu dropdown-acc__customize" aria-labelledby="dropdownMenuAccountInfo">
                <li class="dropdown-item px-3 dropdown-acc-item">
                    <div class="name">Andrew</div>
                    <div class="description text-secondary">Accountor</div>
                </li>
                <li class="dropdown-item px-3 dropdown-acc-item">
                    <UserIcon class="p-1" />
                    <span class="ps-1">Profile</span>
                </li>
                <li class="dropdown-item px-3 dropdown-acc-item">
                    <IconLock class="p-1" />
                    <span class="ps-1">Reset Password</span>
                </li>
                <li class="dropdown-item px-3 dropdown-acc-item">
                    <IconSwitch class="p-1" />
                    <span class="ps-1">Logout</span>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import { ref, watch } from 'vue';
import RingIcon from '~~/assets/images/icons/RingIcon.vue'
import UserIcon from '~~/assets/images/icons/UserIcon.vue';
import IconLock from '~~/assets/images/icons/IconLock.vue';
import IconSwitch from '~~/assets/images/icons/IconSwitch.vue';
export default {
    components: {
    RingIcon,
    UserIcon,
    UserIcon,
    IconLock,
    IconSwitch
},
    setup() {
        const routeNameState = useRouteActive();

        return {
            routeNameState
        }
    }
    
}
</script>
<style lang="scss">
    
</style>