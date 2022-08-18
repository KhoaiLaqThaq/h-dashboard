<template>
  <NewsForm />
</template>
<script>
import axios from "axios";
import { ref } from "vue";
import NewsForm from "~~/components/NewsForm.vue";
import config from "~~/config";

export default {
  components: {
    NewsForm,
  },
  setup() {
    // define variables

    return {
      //   addNews,
    };
  },
  mounted() {},
};
</script>
<style lang="scss"></style>
