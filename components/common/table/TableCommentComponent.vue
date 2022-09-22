<template>
  <div class="table-container">
    <div class="tr">
      <div class="th"><input type="checkbox" @click="selectAllBox()" /></div>
      <div class="th" v-for="(item, index) in headers" :key="index">
        {{ item.text }}
      </div>
      <div class="th" v-if="actionEdit || actionDelete">Hành động</div>
    </div>

    <div class="tr" v-for="(item, index) in items" :key="index">
      <div class="td px-3">
        <input type="checkbox" :id="'check' + item.id" @click="countSelectedCheckBox()" class="boxCheck" />
      </div>
      <div class="td">{{ index + 1 + page * size }}</div>
      <div class="td">{{ item.newsTitle }}</div>
      <div class="td">{{ displayBrief(item.content) }}</div>
      <div class="td">{{ item.createdBy }}</div>
      <div class="td">{{ displayDate(item.createdDate) }}</div>
      <div class="td">
        <div v-if="useCurrentsRole(currentRole,[ROLES.ROLE_ADMIN, ROLES.ROLE_COMMENT_APPROVE])"
          class="form-check form-switch">
          <input type="checkbox" class="form-check-input" :checked="item.enabled" role="switch"
            @click="changeCommentStatus(item.id)" />
        </div>
      </div>
      <td class="td">
        <div v-if="useCurrentsRole(currentRole,[ROLES.ROLE_ADMIN, ROLES.ROLE_COMMENT_DELETE])"
          class="action-group d-flex">
          <div class="ms-3 cursor-pointer text-danger" @click="disableComment(item.id)">
            <delete-icon />
            <span class="ms-1">Xóa</span>
          </div>
        </div>
      </td>
    </div>
  </div>
</template>
<script>
import moment from "moment";

import EditIcon from "~~/assets/images/icons/actions/EditIcon.vue";
import DeleteIcon from "~~/assets/images/icons/actions/DeleteIcon.vue";
import { useCurrentsRole } from "~~/services/common.js"

import { ROLES } from "~~/constants/roles.js";
import { displayBrief } from "~~/constants/format-string.js";
import CommentService from "~~/services/model/comment.service";

export default {
  components: {
    EditIcon,
    DeleteIcon,
  },
  props: [
    "headers",
    "items",
    "actionEdit",
    "actionDelete",
    "page",
    "size",
    "reCallApi",
  ],
  setup() {
    const checkedAll = ref(false);
    const listSelected = ref([]);
    const currentRole = useCurrentRole();
    const { $showToast } = useNuxtApp();

    const caseError = (message) => $showToast(message, "error", 3000);
    const displayDate = (date) => date ? moment(date).month(date[1] - 1).format("YYYY-MM-DD HH:mm:ss") : "";

    function disableComment(id) {
      if (confirm("Bạn có muốn xóa bình luận này?")) {
        CommentService.deleteById(id)
          .then((response) => {
            console.log(response.data);
            $showToast("Xóa bình luận thành công!", "success", 2000);
            location.reload();
          })
          .catch((e) => {
            caseError("Xóa bình luận thất bại");
            console.log("DELETE COMMENT ERROR: ", e);
          });
      }
    }

    function changeCommentStatus(id) {
      CommentService.changeCommentStatus(id)
        .then((response) => {
          let responseData = response.data;
          if (responseData) {
            $showToast("Đổi trạng thái bình luận thành công!", "success", 2000);
          }
        })
        .catch((e) => {
          caseError("Thay đổi trạng thái bình luận thất bại");
          console.log("CHANGE COMMENT STATUS ERROR: ", e);
        });
    }

    function selectAllBox() {
      checkedAll.value = !checkedAll.value;
      let list = document.getElementsByClassName("boxCheck");
      for (let e of list) {
        if (checkedAll.value) {
          document.getElementById(e.id).checked = true;
        } else {
          document.getElementById(e.id).checked = false;
        }
      }
      countSelectedCheckBox();
    }

    function countSelectedCheckBox() {
      listSelected.value = [];
      let list = document.getElementsByClassName("boxCheck");
      for (let e of list) {
        if (e.checked == true) {
          let rowId = parseInt(e.id.substring(5));
          listSelected.value.push(rowId);
        }
      }
    }

    function changeMultiStatus() {
      if (listSelected.value.length > 0) {
        let listIds = "";
        listSelected.value.forEach((item) => (listIds += "," + item));
        const commentDto = {
          listCommentIds: listIds,
        };

        CommentService.changeMultiCommentStatus(commentDto)
          .then((res) => {
            this.reCallApi();
            let list = document.getElementsByClassName("boxCheck");
            for (let e of list) {
              document.getElementById(e.id).checked = false;
            }
            listSelected.value = [];
          })
          .catch((e) => {
            caseError("Thay đổi trạng thái bình luận thất bại");
            console.log("CHANGE COMMENT STATUS ERROR: ", e);
          });
      }
    }

    return {
      checkedAll,
      currentRole,
      ROLES,

      displayBrief,
      displayDate,
      changeCommentStatus,
      selectAllBox,
      countSelectedCheckBox,
      changeMultiStatus,
      disableComment,
      useCurrentsRole,
    };
  },
};
</script>
<style lang="scss">
.div-center {
  margin: auto;
}
</style>
