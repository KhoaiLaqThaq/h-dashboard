<template>
    <form @submit="onSubmit" class="mt-3">
        <div class="d-flex">
            <TitleHeader :title="titleForm" />
            <PreviewButton class="btn-light box ms-auto d-flex items-center" :btnType="'button'" :name="'Preview'" :textSize="'text-small'" />
            <BaseButton class="btn-primary ms-2" :btnType="'button'" :name="'Save'" :textSize="'text-small'" @click="onSubmit" />
        </div>

        <div class="row mt-3">
            <div class="col-8">
                <!-- title -->
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" required="required" autocomplete="false" v-model="title" >
                    <label for="">Tiêu đề <span class="text-danger">*</span></label>
                </div>
                <!-- brief -->
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" required="required" autocomplete="false" v-model="brief" >
                    <label for="">Mô tả ngắn <span class="text-danger">*</span></label>
                </div>

                <div class="form-group">
                    <TabsWrapper>
                         <TabItem title="Ảnh đại diện">
                            <div class="card">
                                <div class="card-body">
                                    <UseDropZone />
                                </div>
                            </div>
                         </TabItem>
                        <TabItem title="Nội dung">
                            <!-- content -->
                            <div class="form-group box pb-3">
                                <div class="card m-3">
                                    <div class="card-body">
                                        <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
                                    </div>
                                </div>
                            </div>
                        </TabItem>
                    </TabsWrapper>
                    
                </div>
                
                
            </div>
            <div class="col-4">
                <div class="box p-3">
                    <!-- type -->
                    <div class="mb-3">
                        <label for="" class="form-label">Loại tin nhắn <span class="text-danger">*</span></label>
                        <select v-model="type" id="" class="form-select" required="required" :value="type">
                            <option value="">Chọn loại tin</option>
                            <option v-for="(option, index) in options"
                                :key="index"
                                :value="option">{{ option }}</option>
                        </select>
                    </div>

                    <!-- ngay viet -->
                    <div class="mb-3">
                        <label for="" class="form-label">Ngày viết <span class="text-danger">*</span></label>
                        <datepicker-lite
                            :class-attr="'form-control'" 
                            :name-attr="'createdDate'"
                            :show-bottom-button="true"
                            :value-attr="createdDate"
                            :locale="locale"
                        />
                    </div>

                    <!-- topic -->
                    <div class="mb-3">
                        <label for="" class="form-label">Chủ đề <span class="text-danger">*</span></label>
                        <select v-model="type" id="" class="form-select" required="required" :value="type">
                            <option value="">Chọn chủ đề</option>
                            <option v-for="(option, index) in topics"
                                :key="index"
                                :value="option">{{ option }}</option>
                        </select>
                    </div>
                    
                    <!-- tag -->
                    <div class="form-floating mb-3">
                        <input type="text" class="form-control" required="required" autocomplete="false" v-model="tag" >
                        <label for="">Thêm tag <span class="text-danger">*</span></label>
                    </div>

                    <!-- <FormCheck
                        :textSize="'text-small form-label'"
                        :formSwitch="true"
                        :name="'published'"
                        :placeholder="'Published'" />
                    <FormCheck
                        :textSize="'text-small form-label'"
                        :formSwitch="true"
                        :name="'published'"
                        :placeholder="'Show Author Name'" /> -->
                </div>
            </div>
        </div>
    </form>
</template>
<script>
import { ref } from 'vue';

import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import DatepickerLite from 'vue3-datepicker-lite';
import PreviewButton from '~~/components/common/PreviewButton.vue';
import BaseButton from '~~/components/common/BaseButton.vue';
import BaseSelect from '~~/components/common/BaseSelect.vue';
import BaseInput from '~~/components/common/BaseInput.vue';
import FormCheck from '~~/components/common/FormCheck.vue';

import TitleHeader from '~~/components/common/TitleHeader.vue';
import UploadAdapter from '~~/composables/UploadAdapter.js';
import FloatSelect from '~~/components/common/FloatSelect.vue';
import FloatInput from '~~/components/common/FloatInput.vue';
import UseDropZone from '~~/components/common/UseDropZone.vue';

import { getNowDate } from '~~/constants/format-date.js';
import TabsWrapper from '~~/components/common/tab/TabsWrapper.vue';
import TabItem from '../../../components/common/tab/TabItem.vue';

export default {
    components: {
    TitleHeader,
    FloatSelect,
    FloatInput,
    PreviewButton,
    BaseButton,
    BaseSelect,
    BaseInput,
    FormCheck,
    DatepickerLite,
    UseDropZone,
    TabsWrapper,
    TabItem
},
    data() {
        return {
            titleForm: 'Giao diện thêm mới tin tức',
            // base select
            options: ['op1', 'op2', 'op3'],
            topics: ['topic1', 'topic2', 'topic3'],
        }
    },
    setup() {
        // define variables
        const createdDate = ref(getNowDate());

        const locale = {
            format: "YYYY/MM/DD",
            weekday: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            months: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
            startsWeeks: 0,
            todayBtn: "Today",
            clearBtn: "Clear",
            closeBtn: "Close",
        };

        function uploader(editor) {
            editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
                return new UploadAdapter(loader);
            }
        }

        function onSubmit(data) {
            console.log('Submit data: ', data);
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
            },
            // form data
            title: '',
            brief: '',
            content: '',
            type: '',
            createdDate: createdDate.value,
            topic: '',
            tag: '',

            locale
        }
    },
    mounted() {

    }
}
</script>
<style lang="scss">
    
</style>