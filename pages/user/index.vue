<template>
    <div>
        <div class="d-flex">
            <TitleHeader :title="title" />
            <AddButton 
                class="ms-auto"
                :title="btnTitle"
                :routerPush="routerPush"
            />
        </div>
        <div class="table-content box p-3 mt-3">
            <!-- <h2 class="font-medium text-base me-auto">
                Quản lý danh sách người dùng hệ thống
            </h2> -->
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
        const title = ref('Danh sách người dùng');
        const itemsSelected = ref([]);
        const themeColor = ref("#1e40af");
        const btnTitle = ref('Thêm mới');
        const routerPush = ref('/user/form');

        const headers = [
            { text: "Name", value: "name" },
            { text: "Height (cm)", value: "height", sortable: true },
            { text: "Weight (kg)", value: "weight", sortable: true },
            { text: "Age", value: "age", sortable: true }
        ];

        const items = [
            { "name": "Curry", "height": 178, "weight": 77, "age": 20 },
            { "name": "James", "height": 180, "weight": 75, "age": 21 },
            { "name": "Jordan", "height": 181, "weight": 73, "age": 22 }
        ];
        
        return {
            title,
            btnTitle: btnTitle,
            routerPush: routerPush,

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