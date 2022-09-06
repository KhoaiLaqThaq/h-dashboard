<template>
  <div class="table-container">
    <div class="tr">
      <div class="th" v-for="(item, index) in headers" :key="index">
        {{ item.text }}
      </div>
      <div class="text-center th" v-if="actionEdit || actionDelete">
        Hành động
      </div>
    </div>
    <div class="tr" v-for="(item, index) in items" :key="index">
      <div class="td text-center">{{ item.no }}</div>
      <div class="td">{{ item.name }}</div>
      <div class="td">{{ item.email }}</div>
      <div class="td">{{ item.first_name }}</div>
      <div class="td">{{ item.last_name }}</div>
      <div class="td">{{ item.age }}</div>
      <div class="td">{{ item.role }}</div>
      <div class="td" v-if="actionEdit || actionDelete">
        <div class="d-flex">
          <div class="ms-auto cursor-pointer" v-if="actionEdit">
            <NuxtLink :to="'/users/form/' + item.id" class="d-flex"
              ><edit-icon /><span class="ms-1">Sửa</span></NuxtLink
            >
          </div>
          <div
            class="d-flex me-auto cursor-pointer ms-3 text-danger"
            v-if="actionDelete"
          >
            <delete-icon @click="disabledUsers(item.id)" />
            <span class="ms-1">Xóa</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import moment from "moment";

import EditIcon from "~~/assets/images/icons/actions/EditIcon.vue";
import DeleteIcon from "~~/assets/images/icons/actions/DeleteIcon.vue";

export default {
  components: {
    EditIcon,
    DeleteIcon,
  },
  props: ["headers", "items", "actionEdit", "actionDelete", "page", "size"],
};
</script>
<style lang="scss">
.table {
  tr {
    th {
      // text-transform: uppercase;

      &:hover {
        background-color: rgb(241 245 249);
      }
    }
  }
}
</style>
