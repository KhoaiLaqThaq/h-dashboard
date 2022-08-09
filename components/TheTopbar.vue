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
            <div class="dropdown-toggle rounded-full w-8 h-8 img-fit cursor-pointer">
                <img src="@/assets/images/avatar/avatar1.jpg" alt="...">
            </div>
        </div>
    </div>
</template>
<script>
import { ref, watch } from 'vue';
import RingIcon from '~~/assets/images/icons/RingIcon.vue'
export default {
    components: {
        RingIcon
    },
    setup() {
        const routeNameState = useRouteActive();

        return {
            routeNameState
        }
    }
    
}
</script>
<style lang="">
    
</style>