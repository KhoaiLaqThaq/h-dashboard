<template>
    <div class="content-news mt-3">
        <div class="d-flex">
            <TitleHeader :title="title" />
            <AddButton 
                class="ms-auto"
                :title="btnTitle"
                :routerPush="routerPush"
            />
        </div>
        <div class="table-content box p-3 mt-3">
            <table-component 
                :headers="headers" :items="items" 
                :actionEdit="true" :actionDelete="true" />
                
            <pagination 
                :size="'10'" :currentPage="10"
                :totalElements="3" :pageNumber="1"
                :maxPages="1" />
        </div>
    </div>
</template>
<script>
import { ref } from 'vue';
import TitleHeader from '~~/components/common/TitleHeader.vue';
import AddButton from '~~/components/common/AddButton.vue'
import TableComponent from '~~/components/common/table/TableComponent.vue';
import Pagination from '~~/components/common/table/Pagination.vue';

import CONFIG from '~~/config';
import axios from 'axios';

export default {
    components: {
        TitleHeader,
        AddButton,
        TableComponent,
        Pagination
    },
    data() {
        return {
            news: [],
            errors: [],
            routerPush: '/news/form',
            title: 'Danh sách tin tức',
            btnTitle: 'Thêm mới'
        }
    },
    setup() {

        const headers = [
            { text: "STT", value: "no" },
            { text: "Tiêu đề", value: "title" },
            { text: "Mô tả ngắn", value: "sub_desc" },
            { text: "Tác giả", value: "author" },
            { text: "Ngày tạo", value: "created_date" }
        ];

        const items = [
            { "no": 1, "title": "Curry", "sub_desc": "Là diễn viên hạng A?", "author": "VIP_MEMBER", "created_date": "2022-08-01" },
            { "no": 2, "title": "James", "sub_desc": "Có phải đã kết hôn?", "author": "VIP_MEMBER", "created_date": "2022-08-01" },
            { "no": 3, "title": "Jordan", "sub_desc": "Là vđv bóng rổ..", "author": "VIP_MEMBER", "created_date": "2022-08-01" }
        ];
        
        const itemsSelected = ref([]);
        const themeColor = ref("#1e40af");

        return {
            headers,
            items,
            itemsSelected,
            themeColor,
            
        }
    },
    created() {
        console.log("enter created()...");

        // TODO: Call api
        axios.get(`${CONFIG.BASE_URL}/api/news/list`)
            .then(response => {
                console.log(response.data);
            }).catch(e => {
                this.errors.push(e);
            });

    }
}
</script>
<style lang="">
    
</style>