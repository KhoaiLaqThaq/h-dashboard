<template>
    <div class="w100">
        <TableUsersStatisticComponent :headers="headers" :items="items" :page="page" :size="size" />
    </div>
</template>
<script>
import {ref} from 'vue';
import TableUsersStatisticComponent from '~~/components/common/table/TableUsersStatisticComponent.vue';
import DashboardService from '~~/services/model/dashboard.service';
export default {
    components: { TableUsersStatisticComponent },
    setup() {
        const { $showToast } = useNuxtApp();
        const headers = ref([]);
        const items = ref([]);
        const page = ref(0);
        const size = ref(10);

        function onLoadUserStatisticByDepartment() {
            DashboardService.getUsersStatisticByDepartment()
            .then((response) => {
                let responseData = response.data;
                if (responseData) {
                    headers.value = responseData;
                    items.value = responseData;
                }
            }).catch((error) => {
                $showToast("Error: Lấy dữ liệu thống kê người dùng theo đơn vị thành viên không thành công", "error", 2000);
                console.log("Failed to get news statistic by topic: ", error);
            })
        }

        return {
            headers, items, page, size,
            onLoadUserStatisticByDepartment
        }
    },
    mounted() {
        this.onLoadUserStatisticByDepartment();
    }
}
</script>
<style lang="">
    
</style>