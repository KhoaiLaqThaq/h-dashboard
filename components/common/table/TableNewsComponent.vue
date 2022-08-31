<template>
  <div class="table-container">
    <div class="tr">
      <div class="th">#</div>
      <div class="th" v-for="(item, index) in headers" :key="index">
        {{ item.text }}
      </div>
      <div class="th" v-if="actionEdit || actionDelete">Action</div>
    </div>

    <div class="tr" v-for="(item, index) in items" :key="index">
      <div class="td px-3"><input type="checkbox" /></div>
      <div class="td text-center">{{ index + 1 + page * size }}</div>
      <div class="td">{{ item.title }}</div>
      <div class="td">{{ displayBrief(item.brief) }}</div>
      <div class="td">{{ displayDate(item.createdDate) }}</div>
      <div class="td">
        <template v-if="item.status == '2'"
          ><span class="badge bg-pending">Chưa phê duyệt</span></template
        >
        <template v-if="item.status == '1'"
          ><span class="badge bg-success">Đã phê duyệt</span></template
        >
      </div>
      <td class="td" v-if="actionEdit || actionDelete">
        <div class="action-group d-flex">
          <NuxtLink
            class="cursor-pointer"
            :to="'/news/form/' + item.id"
            v-if="actionEdit"
          >
            <edit-icon /><span class="ms-1">Sửa</span>
          </NuxtLink>
          <div class="ms-3 cursor-pointer text-danger">
            <delete-icon @click="disabledNews(item.id)" />
            <span class="ms-1">Xóa</span>
          </div>
        </div>
      </td>
    </div>
  </div>

  <!-- <table class="table table-custom table-unhover">
    <thead>
      <tr>
        <th class="th-primary px-3">#</th>
        <th class="th-primary" v-for="(item, index) in headers" :key="index">
          {{ item.text }}
        </th>
        <th class="text-center px-3 th-primary" v-if="actionEdit || actionDelete">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in items" :key="index">
        <td class="px-3"><input type="checkbox"></td>
        <td class="text-center">{{ index + 1 + page * size }}</td>
        <td>{{ item.title }}</td>
        <td>{{ displayBrief(item.brief) }}</td>
        <td>{{ displayDate(item.createdDate) }}</td>
        <td>
          <template v-if="item.status == 'new'"
            ><span class="badge bg-primary">Thêm mới</span></template
          >
          <template v-if="item.status == 'approved'"
            ><span class="text-success">Đã phê duyệt</span></template
          >
        </td>
        <td class="px-3" v-if="actionEdit || actionDelete">
          <div class="d-flex">
            <div class="ms-auto cursor-pointer" v-if="actionEdit">
              <NuxtLink :to="'/news/form/' + item.id" class="d-flex"
                ><edit-icon /><span class="ms-1">Edit</span></NuxtLink
              >
            </div>
            <div
              class="d-flex me-auto cursor-pointer ms-3 text-danger"
              v-if="actionDelete"
            >
              <delete-icon @click="disabledNews(item.id)" />
              <span class="ms-1">Hide</span>
            </div>
          </div>
        </td>
      </tr>
    </tbody>
  </table> -->
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
  setup() {
    function displayBrief(brief) {
      let maxLength = 125;
      if (brief.length > maxLength) {
        return brief.slice(0, maxLength).concat("...");
      }
      return brief;
    }

    function displayDate(date) {
      return moment(date)
        .month(date[1] - 1)
        .format("YYYY-MM-DD HH:mm:ss");
    }

    return {
      displayBrief,
      displayDate,
    };
  },
};
</script>
<style lang="scss"></style>
