<template>
  <UserForm />
</template>
<script>
import axios from "axios";
import { ref } from "vue";
import UserForm from "~~/components/UserForm.vue";
import config from "~~/config";

export default {
  components: {
    UserForm,
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
