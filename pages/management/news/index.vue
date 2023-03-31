<template>
  <div class="col-12">
    <f-header-page :headerPage="headerPage"></f-header-page>
    <news-component :news="newsList" :page="pagination.page" :size="pagination.size"></news-component>

    <pagination :page="pagination.page" :size="pagination.size" :number="pagination.number" :numberOfPages="pagination.numberOfPages" :numberOfElements="pagination.numberOfElements" :totalPages="pagination.totalPages" :totalElements="pagination.totalElements" :first="pagination.first" :last="pagination.last" ></pagination>
  </div>
</template>
<script setup>
import { ref, provide, reactive, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';

import FHeaderPage from '~~/components/common/FHeaderPage';
import NewsComponent from '~~/components/admin/news';
import Pagination from '~~/components/common/table/Pagination.vue';

import NewsService from '~~/services/model/news.service';

// define state variables
const newsList = ref(null);
const pagination = reactive({
  page: 0,
  size: 10,
  number: 1,
  numberOfElements: 5,
  totalPages: 1,
  totalElements: 5,
  first: false,
  last: false
});
const { t } = useI18n();

// define mocks data
const mockNews = [
  { id: 1, code: "NEWS001", title: "Mavin Foods ra mắt sản phẩm mới", createdDate: new Date(), publishDate: new Date().setDate(15), content: "Ngày 15/02/2023, Mavin foods công bố ra mắt các sản phẩm mới trong năm 2023 ...", status: 0},
  { id: 2, code: "NEWS002", title: "Mavin Foods ra mắt sản phẩm mới", createdDate: new Date(), publishDate: new Date().setDate(15), content: "Ngày 15/02/2023, Mavin foods công bố ra mắt các sản phẩm mới trong năm 2023 ...", status: 0},
  { id: 3, code: "NEWS003", title: "Mavin Foods ra mắt sản phẩm mới", createdDate: new Date(), publishDate: new Date().setDate(15), content: "Ngày 15/02/2023, Mavin foods công bố ra mắt các sản phẩm mới trong năm 2023 ...", status: 0},
  { id: 4, code: "NEWS004", title: "Mavin Foods ra mắt sản phẩm mới", createdDate: new Date(), publishDate: new Date().setDate(15), content: "Ngày 15/02/2023, Mavin foods công bố ra mắt các sản phẩm mới trong năm 2023 ...", status: 0},
  { id: 5, code: "NEWS005", title: "Mavin Foods ra mắt sản phẩm mới", createdDate: new Date(), publishDate: new Date().setDate(15), content: "Ngày 15/02/2023, Mavin foods công bố ra mắt các sản phẩm mới trong năm 2023 ...", status: 0},
];

const headerPage = reactive({
  titlePage: t('label.news.title.list'),
  routerLink: '/management/news/form',
  routerName: t('label.button.create')
});

const tableHeaders = [
  { text: "no", value: "no", style: "col-1" },
  { text: "newsTitle", value: "title", style: "col-3" },
  { text: "publishDate", value: "publishDate", style: "col-2" },
  { text: "content", value: "content", style: "col-2" },
  { text: "status", value: "status", style: "col-1 text-center" },
  { text: "action", style: "col-3 text-center" },
];

provide("tableHeaders", tableHeaders);

function getAllOrSearch() {
  let criteria = {};
  NewsService.getAllOrSearch(criteria)
    .then((res) => {
      if (res.data) newsList.value = Object.assign({}, res.data);
    })
    .catch((err) => console.log(err))
    .finally(() => newsList.value = Object.assign([], mockNews))
}

onMounted(() => {
  getAllOrSearch();
})
</script>
