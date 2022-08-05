<template>
    <form @submit="onSubmit">
        <div class="d-flex">
            <TitleHeader :title="title" />
            <PreviewButton class="btn-light box ms-auto d-flex items-center" :btnType="'button'" :name="'Preview'" :textSize="'text-small'" />
            <BaseButton class="btn-primary ms-2" :btnType="'button'" :name="'Save'" :textSize="'text-small'" />
        </div>

        <div class="row mt-3">
            <div class="col-8">
                <!-- title -->
                <float-input class="box" :type="'text'" :required="true" :placeholder="'Tiêu đề'" />
                <!-- brief -->
                <float-input class="box mt-3" :type="'text'" :required="true" :placeholder="'Mô tả ngắn'" />
                <!-- content -->
                <div class="form-group box mt-3 pb-3">
                    <label class="ms-2 mb-1 py-3 text-medium" for="">Nội dung bài viết</label>
                    <div class="card mx-3 mb-3">
                        <div class="card-body">
                            <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
                        </div>
                    </div>
                    
                    <div class="card mx-3 mb-3">
                        <div class="card-body">
                            <h4 class="text-base">Ảnh preview</h4>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-4">
                <div class="box p-3">
                    <!-- type -->
                    <base-select class="input-field mb-3" :selectOfferTitle="'Chọn loại tin tức'" :required="true" :options="options" :placeholder="'Loại tin tức'" />

                    <!-- ngay viet -->
                    <base-input :type="'text'" 
                        :placeholder="'Chọn ngày viết'" 
                        :name="'Ngày viết'" 
                        :required="true"
                        :textSize="'text-small'"
                        :value="'4 Aug, 2022'" />

                    <!-- topic -->
                    <base-input :type="'text'" 
                        :placeholder="'Chọn chủ đề'" 
                        :name="'Chủ đề'" 
                        :required="true"
                        :textSize="'text-small'"
                        :value="'Summer'" />
                    
                    <!-- tag -->
                    <base-input :type="'text'" 
                        :placeholder="'Chọn thẻ'" 
                        :name="'Chọn thẻ'" 
                        :required="true"
                        :textSize="'text-small'"
                        :value="'#tag'" />

                    <FormCheck
                        :textSize="'text-small form-label'"
                        :formSwitch="true"
                        :name="'published'"
                        :placeholder="'Published'" />
                    <FormCheck
                        :textSize="'text-small form-label'"
                        :formSwitch="true"
                        :name="'published'"
                        :placeholder="'Show Author Name'" />
                </div>
            </div>
        </div>
    </form>
</template>
<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import TitleHeader from '~~/components/common/TitleHeader.vue';
import UploadAdapter from '~~/composables/UploadAdapter.js';
import FloatSelect from '~~/components/common/FloatSelect.vue';
import FloatInput from '~~/components/common/FloatInput.vue';
import PreviewButton from '~~/components/common/PreviewButton.vue';
import BaseButton from '~~/components/common/BaseButton.vue';
import BaseSelect from '~~/components/common/BaseSelect.vue';
import BaseInput from '~~/components/common/BaseInput.vue';
import FormCheck from '~~/components/common/FormCheck.vue';

export default {
    components: {
    TitleHeader,
    FloatSelect,
    FloatInput,
    PreviewButton,
    BaseButton,
    BaseSelect,
    BaseInput,
    FormCheck
},
    data() {
        return {
            title: 'Giao diện thêm mới tin tức',
            // base select
            options: ['op1', 'op2', 'op3']
        }
    },
    setup() {

        function uploader(editor) {
            editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
                return new UploadAdapter(loader);
            }
        }

        function onSubmit(data) {
            console.log('Submit')
        }

        return {
            onSubmit: onSubmit,
            // config editor
            editor: ClassicEditor,
            editorData: '<br/><br/><p>Nội dung bài viết ở đây..</p><br/><br/><br/>',
            editorConfig: {
                // The configuration of the editor.
                extraPlugins: [uploader],
                language: 'en'
            }
        }
    },
    mounted() {

    }
}
</script>
<style lang="scss">
    
</style>