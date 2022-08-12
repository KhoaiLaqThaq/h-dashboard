<template>
    <div class="mt-3">
        <div class="d-flex">
            <TitleHeader :title="topic ? titleEdit : titleAdd" />
            <BaseButton class="btn-primary ms-auto" :btnType="'submit'" 
                :name="'Save'" :textSize="'text-small'" />
        </div>

        <div class="row mt-3">
            
        </div>
        
    </div>
</template>
<script>
import { ref } from 'vue';
import TitleHeader from './common/TitleHeader.vue';
import BaseButton from './common/BaseButton.vue';
export default {
    components: { TitleHeader, BaseButton },
    props: ['topic'],
    data() {
        return {
            titleAdd: 'Giao diện thêm mới chủ đề',
            titleEdit: 'Giao diện chỉnh sửa chủ đề'
        }
    },
    setup(props) {
        const topic = ref(props.news && null);

        return {
            topic
        }
    }
}
</script>
<style lang="scss">
    
</style>