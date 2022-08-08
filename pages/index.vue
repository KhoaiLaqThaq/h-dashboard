<template>
    <div class="row">
        <div class="col-9 pt-4">
            <h2 class="font-medium text-lg lucide">General Reports</h2>
            <PreviewReport />

            <!-- other reports -->
        </div>

        <!-- top 5 hot news -->
        <div class="col-3 container-statistic pt-4 pe-0">
            <h2 class="font-medium text-lg lucide">Hot news</h2>
            <HotNewsStatistic :hotNews="hotNews" />
        </div>
    </div>
</template>
<script>
import PreviewReport from '~~/components/dashboard/PreviewReport.vue';
import HotNewsStatistic from '~~/components/dashboard/HotNewsStatistic.vue';

export default {
    components: {
        PreviewReport,
        HotNewsStatistic
    },
    setup() {
        const hotNews = [
            { title: "Tin hot chính trị", author: "acc-test-1", brief: "Đồng minh của Nga bất ngờ giao toàn bộ phi đội cường kích Su-25 cho Ukraine", comments: 10, likes: 59, views: 1200 },
            { title: "Tin hot thời sự", author: "BTC-test-1", brief: "Cần có chính sách cải cách tiền lương, đảm bảo tương đồng giữa khu vực công và tư để thu hút, trọng dụng nhân tài, theo đại diện Bộ Nội vụ.", comments: 30, likes: 101, views: 1578 }
        ]

        return {
            hotNews: hotNews
        }
    }
}
</script>
<style lang="">
    
</style>