<template>
  <div id="main">
    <NuxtLayout :name="layout">
      <!-- <NuxtPage /> -->
    </NuxtLayout>
  </div>
</template>

<script>
import { ref, watch } from 'vue';
import "bootstrap";

export default {
  setup() {
    const layout = useLayoutActive();
    const token = useToken();

    const setLayoutDefault = () => {
      if (token.value) {
        layout.value = 'admin';
      } else {
        layout.value = 'auth';
      }
    }

    watch([token], () => {
      console.log("listener event change state");
      setLayoutDefault();
    });

    return {
      layout,

      setLayoutDefault
    }
  },
  mounted() {
    this.setLayoutDefault();
  }
}
</script>
