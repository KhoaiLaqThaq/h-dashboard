<template>
    <div class="w100">
        <TableNewsStatisticComponent :headers="headers" :items="items" :page="page" :size="size" />
    </div>
</template>
<script>
import {ref} from 'vue';


import DashboardService from '~~/services/model/dashboard.service';
import TableNewsStatisticComponent from '~~/components/common/table/TableNewsStatisticComponent.vue';

export default {
    components: { TableNewsStatisticComponent },
    setup() {
        const { $showToast } = useNuxtApp();
        const headers = ref([]);
        const items = ref([]);
        const page = ref(0);
        const size = ref(10);

        function onLoadNewsStatisticByTopic() {
            DashboardService.getNewsStatisticByTopic().then((response) => {
                let responseData = response.data;
                if (responseData) {
                    headers.value = responseData;
                    items.value = responseData;
                }
            }).catch((error) => {
                $showToast("Error: Lấy dữ liệu thống kê tin tức theo chuyên mục không thành công", "error", 2000);
                console.log("Failed to get news statistic by topic: ", error);
            })
        }

        return {
            headers, items, page, size,
            onLoadNewsStatisticByTopic
        }
    },
    mounted() {
        this.onLoadNewsStatisticByTopic();
    }
}
</script>
<style lang="">
    
</style>