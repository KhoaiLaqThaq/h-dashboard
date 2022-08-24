<template>
  <table class="table table-custom table-unhover">
    <thead>
      <tr>
        <th class="th-primary" v-for="(item, index) in headers" :key="index">
          {{ item.text }}
        </th>
        <th class="ms-0 me-0 th-primary" v-if="actionEdit || actionDelete"></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in items" :key="index">
        <td>{{ index + 1 + page * size }}</td>
        <td>{{ item.name }}</td>
        <td class="px-0" v-if="actionEdit || actionDelete">
          <div class="d-flex me-0">
            <div class="ms-auto cursor-pointer" v-if="actionEdit">
              <NuxtLink :to="'/topic/form/' + item.id" class="d-flex"
                ><edit-icon /><span class="ms-1">Sửa</span></NuxtLink
              >
            </div>
            <div
              class="d-flex me-3 cursor-pointer ms-3 text-danger"
              v-if="actionDelete"
            >
              <delete-icon @click="disabledTopics(item.id)" />
              <span class="ms-1">Xóa</span>
            </div>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
import EditIcon from "~~/assets/images/icons/actions/EditIcon.vue";
import DeleteIcon from "~~/assets/images/icons/actions/DeleteIcon.vue";

export default {
  components: {
    EditIcon,
    DeleteIcon,
  },
  props: ["headers", "items", "actionEdit", "actionDelete", "page", "size"],
  setup() {},
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
