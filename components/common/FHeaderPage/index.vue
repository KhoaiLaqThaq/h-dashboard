<template>
  <div class="item-content mb-3 d-flex">
    <h2 class="text-lg font-medium text-theme">{{ headerPage.titlePage }}</h2>
    <nuxt-link v-if="headerPage.routerLink && headerPage.routerName" class="px-4 ms-5 bgc-warning text-white text-uppercase rounded-10 border-unset flex-center-vertical" :to="headerPage.routerLink">{{ headerPage.routerName }}</nuxt-link>
  </div>
</template>
<script setup>
const props = defineProps({
  headerPage: {
    titlePage: String,
    routerLink: String,
    routerName: String
  }
});
</script>