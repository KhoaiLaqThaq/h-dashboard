<template>
  <div id="main">
    <NuxtLayout :name="layout">
      <!-- <NuxtPage /> -->
    </NuxtLayout>
  </div>
</template>

<script setup>
import "bootstrap";
const layout = "auth";
</script>
