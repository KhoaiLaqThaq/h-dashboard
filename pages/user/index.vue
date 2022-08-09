<template>
    <div class="mt-3">
        <div class="d-flex">
            <TitleHeader :title="title" />
        </div>
        
        <div class="d-flex mt-3">
            <AddButton :textSize="'text-small'" :title="'Thêm mới'" :routerPush="routerPush" />
            <div class="ms-auto"><input type="text" class="form-control" placeholder="Tìm kiếm..." /></div>
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
        <div>
            {{ counter }}
            <button @click="counter--">-</button>
            <button @click="counter++">+</button>
        </div>
    </div>
</template>

<script>
// import Vue3EasyDataTable from 'vue3-easy-data-table';

import TitleHeader from '~~/components/common/TitleHeader.vue';
import AddButton from '~~/components/common/AddButton.vue'
import BaseInput from '~~/components/common/BaseInput.vue';
import TableComponent from '~~/components/common/table/TableComponent.vue';
import Pagination from '~~/components/common/table/Pagination.vue';

export default {
    components: {
        TitleHeader,
        AddButton,
        BaseInput,
        TableComponent,
        Pagination
    },
    setup() {
        const title = ref('Danh sách người dùng');
        const itemsSelected = ref([]);
        const themeColor = ref("#1e40af");
        const routerPush = ref('/user/form');
        const counter = useCounter();

        const headers = [
            { text: "No", value: "no" },
            { text: "Fullname", value: "name" },
            { text: "Email", value: "email" },
            { text: "Firstname", value: "first_name"},
            { text: "Lastname", value: "last_name"},
            { text: "Age", value: "age" },
            { text: "Role", value: "role" },
        ];

        const items = [
            { "no": 1, "name": "Curry", "email": "acc-test@gmail.com", "first_name": "First name", "last_name": "Last name", "age": 20, "role": "Administrator"},
            { "no": 2, "name": "James", "email": "acc-test@gmail.com", "first_name": "First name", "last_name": "Last name", "age": 20, "role": "Administrator"},
            { "no": 3, "name": "Jordan", "email": "acc-test@gmail.com", "first_name": "First name", "last_name": "Last name", "age": 20, "role": "Administrator"}
        ];
        
        return {
            title,
            routerPush: routerPush,
            counter,

            headers,
            items,
            itemsSelected,
            themeColor
        }
    },
}
</script>

<style lang="">
    
</style>