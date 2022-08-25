<template>
    <div class="mt-3">
        <div class="d-flex mb-3">
            <TitleHeader :title="title" />
        </div>

        <div class="d-flex mb-3">
            <AddButton 
                :textSize="'text-small'"
                :title="'Thêm mới'"
                :routerPush="routerPush"
            />
        </div>
    </div>
</template>
<script>
import { ref } from 'vue';

import TitleHeader from '~~/components/common/TitleHeader.vue'
import AddButton from '~~/components/common/AddButton.vue';

export default {
    components: {
    TitleHeader,
    AddButton
},
    data() {
        return {
            title: "Danh sách các bình luận",
            routerPush: "/common/comment/form"
        }
    },
    setup() {
        return {

        }
    },
    created() {

    }
}
</script>
<style lang="scss">
    
</style>