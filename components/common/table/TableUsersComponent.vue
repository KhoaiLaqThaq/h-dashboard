<template>
  <table class="table table-striped table-hover">
    <thead>
      <tr>
        <th v-for="(item, index) in headers" :key="index">
          {{ item.text }}
        </th>
        <th class="text-center" v-if="actionEdit || actionDelete">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in items" :key="index">
        <td class="text-center">{{ item.no }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.email }}</td>
        <td>{{ item.first_name }}</td>
        <td>{{ item.last_name }}</td>
        <td>{{ item.age }}</td>
        <td>{{ item.role }}</td>
        <td class="" v-if="actionEdit || actionDelete">
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
        </td>
      </tr>
    </tbody>
  </table>
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
