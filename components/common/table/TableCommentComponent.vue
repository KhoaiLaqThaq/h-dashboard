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
        <input
          type="checkbox"
          :id="'check' + item.id"
          @click="countSelectedCheckBox()"
          class="boxCheck"
        />
      </div>
      <div class="td">{{ index + 1 + page * size }}</div>
      <div class="td">{{ item.newsTitle }}</div>
      <div class="td">{{ displayBrief(item.content) }}</div>
      <div class="td">{{ item.createdBy }}</div>
      <div class="td">{{ displayDate(item.createdDate) }}</div>
      <div class="td">
        <div class="form-check form-switch">
          <input
            type="checkbox"
            class="form-check-input"
            :checked="item.enabled"
            role="switch"
            @click="changeCommentStatus(item.id)"
          />
        </div>
      </div>
      <td class="td">
        <div class="action-group d-flex">
          <div
            class="ms-3 cursor-pointer text-danger"
            @click="disableComment(item.id)"
          >
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

import CONFIG from "~~/config";
import axios from "axios";
import { displayBrief } from "~~/constants/format-string.js";

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

    // function displayBrief(brief) {
    //   let maxLength = 125;
    //   if (brief.length > maxLength) {
    //     return brief.slice(0, maxLength).concat("...");
    //   }
    //   return brief;
    // }

    function disableComment(id) {
      if (confirm("Bạn có muốn xóa bình luận này?")) {
        axios
          .delete(`${CONFIG.BASE_URL}/api/comment/${id}`)
          .then((response) => {
            console.log(response.data);
            location.reload();
          })
          .catch((e) => {
            this.errors.push(e);
          });
      }
    }

    function changeCommentStatus(id) {
      axios
        .get(`${CONFIG.BASE_URL}/api/comment/enable/${id}`)
        .then((response) => {
          console.log(response.data);
        })
        .catch((e) => {
          this.errors.push(e);
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

    function displayDate(date) {
      if (date)
        return moment(date)
          .month(date[1] - 1)
          .format("YYYY-MM-DD HH:mm:ss");
      return "";
    }

    function changeMultiStatus() {
      if (listSelected.value.length > 0) {
        let listIds = "";
        listSelected.value.forEach((item) => (listIds += "," + item));
        const commentDto = {
          listCommentIds: listIds,
        };

        axios
          .post(`${CONFIG.BASE_URL}/api/comments/enableAll`, commentDto)
          .then((res) => {
            this.reCallApi();
            let list = document.getElementsByClassName("boxCheck");
            for (let e of list) {
              document.getElementById(e.id).checked = false;
            }
            listSelected.value = [];
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }

    return {
      checkedAll,
      displayBrief,
      displayDate,
      changeCommentStatus,
      selectAllBox,
      countSelectedCheckBox,
      changeMultiStatus,
      disableComment,
    };
  },
};
</script>
<style lang="scss">
.div-center {
  margin: auto;
}
</style>
