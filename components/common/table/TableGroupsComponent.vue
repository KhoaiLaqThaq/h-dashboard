<template>
  <div class="table-container">
    <div class="tr">
      <div class="th" v-for="(item, index) in headers" :key="index">{{ item.text }}</div>
      <div class="th" v-if="actionEdit || actionDelete">Hành động</div>
    </div>
    <div class="tr" v-for="(item, index) in items" :key="index">
      <div class="td">{{ index + 1 + page*size }}</div>
      <div class="td">{{ item.name }}</div>
      <div class="td" v-if="actionEdit || actionDelete">
        <div class="action-group d-flex">
          <NuxtLink v-if="actionEdit" class="cursor-pointer" :to="routerPush + '/' + item.no">
            <edit-icon /><span class="ms-1">Sửa</span>
          </NuxtLink>
          <div class="ms-3 cursor-pointer text-danger">
            <delete-icon @click="disabledGroups(item.id)" />
            <span class="ms-1">Xóa</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import EditIcon from "~~/assets/images/icons/actions/EditIcon.vue";
import DeleteIcon from "~~/assets/images/icons/actions/DeleteIcon.vue";

export default {
  components: {
    EditIcon,
    DeleteIcon,
  },
  props: ["headers", "items", "actionEdit", "actionDelete", "page", "size", "routerPush"],
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
