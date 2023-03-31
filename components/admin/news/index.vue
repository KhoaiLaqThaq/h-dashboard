<template>
  <list-header></list-header>
  <template v-if="news">
    <list-item :item="newsItem" :stt="index + 1 + page*size" v-for="(newsItem, index) in news" :key="index"></list-item>
  </template>
</template>
<script setup>
import ListHeader from '~~/components/admin/news/ListHeader.vue';
import ListItem from '~~/components/admin/news/ListItem.vue';

const props = defineProps({
  news: Array,
  page: Number,
  size: Number
})
</script>
<style lang="scss">
  
</style>