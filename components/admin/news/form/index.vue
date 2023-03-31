<template>
  <div class="row mx-0 mb-3">
    <label for="title" class="col-2">{{ $t('label.news.form.title') }}</label>
    <div class="col-10">
      <input type="text" class="form-control rounded-10" id="title" />
    </div>
  </div>
  <div class="row mx-0 mb-3">
    <label for="avatar" class="col-2">{{ $t('label.news.form.avatar') }}</label>
    <div class="col-10">
      <div class="container-upload border-theme p-5 rounded-10 bg-white w200px text-center cursor-pointer" @click="uploadAvatar()">
        <input type="file" class="d-none" id="fileAvatar" accept="image/*"/>
        <font-awesome-icon icon="fa-solid fa-plus" size="3x" color="gainsboro" />
      </div>
    </div>
  </div>
      
  <div class="row mb-3">
    <div class="col-12">
      <ckeditor
        :editor="editor"
        :config="editorConfig"
        v-model="content"
        
      ></ckeditor>
    </div>
  </div>
</template>
<script>
import { ref } from 'vue'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import UploadAdapter from '~~/composables/UploadAdapter'

export default {
 setup() {
  const content = ref("");

  function uploader(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return new UploadAdapter(loader)
    }
  }

  function uploadAvatar() {
    document.getElementById('fileAvatar').click();
  }

  return {
    content,
    editor: ClassicEditor,
    editorConfig: {
      extraPlugins: [uploader],
      language: "en"
    },
    uploadAvatar
  }
 } 
}
</script>
<style lang="scss" scoped>
  .ck-editor__editable {
        min-height: 5000px;
    }
    :host ::ng-deep .ck-editor__editable {
    min-height: 500px !important;
}
</style>