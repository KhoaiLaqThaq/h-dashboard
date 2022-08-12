<template>
    <form @submit="onSubmit" class="mt-3">
        <NewsForm />
    </form>
</template>
<script>
import { ref } from 'vue';
import NewsForm from '~~/components/NewsForm.vue';

export default {
    components: {
    NewsForm
},
    setup() {
        // define variables
        const news = ref({});

        function onSubmit(data) {
            console.log('Submit data: ', data);
        }

        return {
            news,

            onSubmit
        }
    },
    mounted() {

    }
}
</script>
<style lang="scss">
</style>