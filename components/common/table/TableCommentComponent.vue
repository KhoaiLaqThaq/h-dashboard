<template>
  <div class="table-container">
    <div class="tr">
      <div class="th"><input type="checkbox" @click="selectAllBox()"></div>
      <div class="th" v-for="(item, index) in headers" :key="index">{{ item.text }}</div>
      <div class="th" v-if="actionEdit || actionDelete">Action</div>
    </div>

    <div class="tr" v-for="(item, index) in items" :key="index">
      <div class="td px-3"><input type="checkbox" :id="'check' + item.id" @click="countSelectedCheckBox()" class="boxCheck"></div>
      <div class="td">{{ index + 1 + page * size }}</div>
      <div class="td">{{ item.newsTitle }}</div>
      <div class="td">{{ displayBrief(item.content) }}</div>
      <div class="td">{{ item.createdBy }}</div>
      <div class="td">{{ displayDate(item.createdDate) }}</div>
      <div class="td">
        <div class="form-check form-switch">
          <input type="checkbox" class="form-check-input" :checked="item.enabled" role="switch" @click="changeCommentStatus(item.id)"/>
        </div>
      </div>
      <td class="td">
          <div class="action-group d-flex">
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
        <th class="th-primary text-center" v-for="(item, index) in headers" :key="index">
          {{ item.text }}
        </th>
        <th class="text-center px-3 th-primary" v-if="actionEdit || actionDelete">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in items" :key="index">
        <td class="px-3"><input type="checkbox"></td>
        <td class="text-center">{{ index + 1 + page * size }}</td>
        <td class="text-center">{{ item.newsTitle }}</td>
        <td class="text-center">{{ displayBrief(item.content) }}</td>
        <td class="text-center">{{ item.createdBy }}</td>
        <td class="text-center">{{ displayDate(item.createdDate) }}</td>
        <td>
          <div class="form-check form-switch">
            <input style="margin:0 auto;" type="checkbox" class="form-check-input" :checked="item.enabled" role="switch" @click="changeCommentStatus(item.id)"/>
          </div>
        </td>
        <td class="px-3" v-if="actionEdit || actionDelete">
          <div class="d-flex">
            <div class="div-center cursor-pointer" v-if="actionEdit">
              <NuxtLink :to="'/news/form/' + item.id" class="d-flex">
                <edit-icon /><span class="ms-1">Edit</span>
              </NuxtLink
              >
            </div>
            <div class="d-flex me-auto cursor-pointer ms-3 text-danger" v-if="actionDelete">
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

import CONFIG from "~~/config";
import axios from "axios";

export default {
  components: {
    EditIcon,
    DeleteIcon,
  },
  props: ["headers", "items", "actionEdit", "actionDelete", "page", "size", "reCallApi"],
  setup() {
    const checkedAll = ref(false);
    const listSelected = ref([]);

    function displayBrief(brief) {
      let maxLength = 125;
      if (brief.length > maxLength) {
        return brief.slice(0, maxLength).concat("...");
      }
      return brief;
    }

    function changeCommentStatus(id){
      axios
        .get(`${CONFIG.BASE_URL}/api/comment/enable/${id}`)
        .then((response) => {
          console.log(response.data);
        })
        .catch((e) => {
          this.errors.push(e);
        });
    }

    function selectAllBox(){
      checkedAll.value = !checkedAll.value;
      let list = document.getElementsByClassName("boxCheck");
      for(let e of list){
        if(checkedAll.value){
          document.getElementById(e.id).checked = true;
        } else {
          document.getElementById(e.id).checked = false;
        }
      }
      countSelectedCheckBox();
    };

    function countSelectedCheckBox(){
      listSelected.value = [];
      let list = document.getElementsByClassName("boxCheck");
      for(let e of list){
        if(e.checked == true){
          let rowId = parseInt(e.id.substring(5));
          listSelected.value.push(rowId);
        }
      }
      console.log(listSelected.value);
    }

    function displayDate(date) {
      return moment(date).month(date[1] - 1).format('YYYY-MM-DD HH:mm:ss');
    }

    function changeMultiStatus(){
      let listIds = '';
      listSelected.value.forEach(item => {
        listIds += "," + item;
      })
      const commentDto = {
        listCommentIds: listIds
      };

      axios
        .post(`${CONFIG.BASE_URL}/api/comments/enableAll`, commentDto)
        .then((res) => {
          console.log(res.data);
          this.reCallApi();
          let list = document.getElementsByClassName("boxCheck");
          for(let e of list){
            document.getElementById(e.id).checked = false;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }

    return {
      checkedAll,
      displayBrief,
      displayDate,
      changeCommentStatus,
      selectAllBox,
      countSelectedCheckBox,
      changeMultiStatus,
    };
  }
};
</script>
<style lang="scss">
  .div-center{
    margin: auto;
  }

</style>
