<template>
  <div class="col-12">
    <div class="item-content mb-5 d-flex">
      <h2 class="text-lg font-medium text-theme me-3">{{ $t('label.news.title.create') }}</h2>
      <button type="button" class="btn bgc-warning me-3 rounded-10 text-uppercase text-white">{{ $t('label.button.news.published') }}</button>
      <button type="button" class="btn bgc-primary rounded-10 text-uppercase text-white">{{ $t('label.button.news.preview') }}</button>
    </div>

    <news-form></news-form>
  </div>
</template>
<script setup>
import { ref, reactive } from 'vue';
import NewsForm from '~~/components/admin/news/form'
</script>
<style lang="scss">
  
</style>