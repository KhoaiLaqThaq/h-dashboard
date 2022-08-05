<template>
    <div class="content-news">
        <div class="d-flex">
            <TitleHeader :title="title" />
            <AddButton 
                class="ms-auto"
                :title="btnTitle"
                :routerPush="routerPush"
            />
        </div>
        <div class="table-content box p-3 mt-3">
            <Vue3EasyDataTable 
                :headers="headers" 
                :items="items"
                v-model:items-selected="itemsSelected"
                :theme-color="themeColor"
            />
        </div>
    </div>
</template>
<script>
import Vue3EasyDataTable from 'vue3-easy-data-table';
import TitleHeader from '~~/components/common/TitleHeader.vue';
import AddButton from '~~/components/common/AddButton.vue'

export default {
    components: {
        Vue3EasyDataTable,
        TitleHeader,
        AddButton
    },
    setup() {
        const title = ref('Danh sách tin tức');
        const btnTitle = ref('Thêm mới');
        const routerPush = ref('/new/form');

        const headers = [
            { text: "Tiêu đề", value: "title" },
            { text: "Mô tả ngắn", value: "sub_desc", sortable: true },
            { text: "Tác giả", value: "author", sortable: true },
            { text: "Ngày tạo", value: "created_date", sortable: true }
        ];

        const items = [
            { "title": "Curry", "sub_desc": "Là diễn viên hạng A?", "author": "VIP_MEMBER", "created_date": "2022-08-01" },
            { "title": "James", "sub_desc": "Có phải đã kết hôn?", "author": "VIP_MEMBER", "created_date": "2022-08-01" },
            { "title": "Jordan", "sub_desc": "Là vđv bóng rổ..", "author": "VIP_MEMBER", "created_date": "2022-08-01" }
        ];
        
        const itemsSelected = ref([]);
        const themeColor = ref("#1e40af");

        return {
            title,
            btnTitle,
            routerPush,

            headers,
            items,
            itemsSelected,
            themeColor,
            
        }
    },
}
</script>
<style lang="">
    
</style>