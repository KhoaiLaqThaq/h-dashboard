<template>
  <div class="col-12">
    <f-header-page :headerPage="headerPage"></f-header-page>
  </div>
</template>
<script setup>
import {ref, reactive} from 'vue'
import { useI18n } from 'vue-i18n';

import FHeaderPage from '~~/components/common/FHeaderPage'

const { t } = useI18n();
const headerPage = reactive({
  titlePage: t('label.user.title.list'),
  routerLink: '/management/system/user/form',
  routerName: t('label.button.create')
});



</script>
<style lang="">
  
</style>