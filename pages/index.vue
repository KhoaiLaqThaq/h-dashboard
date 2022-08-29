<template>
  <div class="row">
    <div class="col-lg-9 col-md-12 pt-4">
      <h2 class="font-medium text-lg lucide">General Reports</h2>
      <PreviewReport />

      <!-- other reports -->
    </div>

    <!-- top 5 hot news -->
    <div class="col-lg-3 col-md-12 container-statistic pt-4 pe-0">
      <h2 class="font-medium text-lg lucide">Hot news</h2>
      <HotNewsStatistic :hotNews="hotNews" />
    </div>
  </div>
</template>
<script>
import PreviewReport from "~~/components/dashboard/PreviewReport.vue";
import HotNewsStatistic from "~~/components/dashboard/HotNewsStatistic.vue";
import axios from "axios";
import CONFIG from "~~/config";

export default {
  components: {
    PreviewReport,
    HotNewsStatistic,
  },
  setup() {
    const hotNews = ref([]);

    function addData(data) {
      var item = {
        title: data.title,
        author: data.createdBy,
        brief: data.brief,
        likes: data.likeTotal,
        comments: data.commentTotal,
        views: data.viewTotal,
      };
      hotNews.value.push(item);
    }

    // call api
    function searchCallApi() {
      axios
        .get(`${CONFIG.BASE_URL}/api/news/hot`)
        .then((response) => {
          const data = response.data;
          data.forEach((e) => {
            addData(e);
          });
        })
        .catch((e) => {
          console.log(e);
        });
    }

    return {
      hotNews: hotNews,
      searchCallApi,
    };
  },
  created() {
    this.searchCallApi();
  },
};
</script>
<style lang=""></style>
