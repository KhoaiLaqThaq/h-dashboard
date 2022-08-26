<template>
  <div class="table-container">
    <div class="tr">
      <div class="th w50">No</div>
      <div class="th">Name</div>
      <div class="th">Age</div>
      <div class="th">Status</div>
      <div class="th">Action</div>
    </div>
    <div class="tr">
      <div class="td w50">1</div>
      <div class="td">hangnguyen</div>
      <div class="td">27</div>
      <div class="td">Active</div>
      <div class="td">Action</div>
    </div>
  </div>








  <!-- <table class="table table-custom table-unhover">
    <thead>
      <tr>
        <th class="th-primary px-3" v-for="(item, index) in headers" :key="index">
          {{ item.text }}
        </th>
        <th
          class="m-auto th-primary text-center"
          v-if="actionEdit || actionDelete"
        >
          Action
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in items" :key="index">
        <td class="px-3">{{ index + 1 + page * size }}</td>
        <td>{{ item.name }}</td>
        <td class="px-0" v-if="actionEdit || actionDelete">
          <div class="d-flex">
            <div class="m-auto cursor-pointer" v-if="actionEdit">
              <NuxtLink :to="'/common/group/form/' + item.no" class="d-flex">
                <edit-icon /><span class="ms-1">Sửa</span>
              </NuxtLink>
            </div>
            <div
              class="d-flex me-3 cursor-pointer ms-3 text-danger"
              v-if="actionDelete"
            >
              <delete-icon @click="disabledGroups(item.id)" />
              <span class="ms-1">Xóa</span>
            </div>
          </div>
        </td>
      </tr>
    </tbody>
  </table> -->
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
