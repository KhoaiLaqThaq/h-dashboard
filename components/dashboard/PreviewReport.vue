<template>
    <div class="d-grid grid-cols-12 grap-6 mt-3">
        <div class="report-box zoom-in" v-for="(item, index) in reports" :key="index">
            <div class="box p-3">
                <div class="d-flex">
                    <template v-if="item.type === 1">
                        <ComputerIcon />
                    </template>
                    <template v-if="item.type === 2">
                        <PostIcon />
                    </template>
                    <template v-if="item.type === 3">
                        <UserIcon />
                    </template>
                    <template v-if="item.type === 4">
                        <IconCommunity />
                    </template>
                    <div class="ms-auto">
                        <div class="report-box__indicator cursor-pointer"
                            :class="item.percent > 0 ? 'bgc-success':'bgc-danger'">{{Math.abs(item.percent) + '%'}}
                        </div>
                    </div>
                </div>
                <div class="text-3xl font-medium leading-8 mt-6">{{item.amount}}</div>
                <div class="text-base text-slate-500 mt-1">{{item.name}}</div>
            </div>
        </div>
    </div>
</template>
<script>
import ComputerIcon from '~~/assets/images/icons/ComputerIcon.vue';
import PostIcon from '~~/assets/images/icons/PostIcon.vue';
import UserIcon from '~~/assets/images/icons/UserIcon.vue';
import IconCommunity from '~~/assets/images/icons/IconCommunity.vue';
import DashboardService from "~~/services/model/dashboard.service";

export default {
    components: {
        ComputerIcon, PostIcon, UserIcon, IconCommunity
    },
    setup() {
        const header = useHeader();
        const reports = ref([
            { percent: 133, amount: 1225, name: 'Views', type: 1 },
            { percent: 25, amount: 5, name: 'News ', type: 2 },
            { percent: -4, amount: 4, name: 'Users', type: 3 },
            { percent: '30', amount: 42, name: 'Events', type: 4 }
        ]);

        function setData(reportData) {
            reports.value.forEach(function (item) {
                if (item.type == 1) {
                    item.amount = reportData.viewTotal;
                    item.percent = reportData.viewPercent;
                } else if (item.type == 2) {
                    item.amount = reportData.newsTotal;
                    item.percent = reportData.newsPercent;
                }
            });
        };

        // call api
        function searchCallApi() {
            DashboardService.showReportPreview()
                .then((response) => {
                    const data = response.data;
                    setData(data);
                })
                .catch((e) => {
                    console.log(e);
                });
        }

        return {
            reports,
            searchCallApi
        }
    },
    created() {
        // console.log("enter created()...");
        this.searchCallApi();
    },
}
</script>
<style lang="">
    
</style>