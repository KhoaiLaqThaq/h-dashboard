<template>
  <div class="table-container">
    <div class="tr">
      <div class="th" v-for="(item, index) in headers" :key="index">
        {{ item.text }}
      </div>
      <div class="th text-center" v-if="actionEdit || actionDelete">
        Hành động
      </div>
    </div>
    <div class="tr" v-for="(item, index) in items" :key="index">
      <div class="td">{{ index + 1 + page * size }}</div>
      <div class="td">{{ item.name }}</div>
      <div class="td" v-if="actionEdit || actionDelete">
        <div class="d-flex">
          <div class="m-auto cursor-pointer" v-if="actionEdit">
            <NuxtLink :to="'/common/topic/form/' + item.id" class="d-flex">
              <edit-icon /><span class="ms-1">Sửa</span>
            </NuxtLink>
          </div>
          <div
            class="d-flex me-3 cursor-pointer ms-3 text-danger"
            v-if="actionDelete"
          >
            <delete-icon @click="disabledTopics(item.id)" />
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
