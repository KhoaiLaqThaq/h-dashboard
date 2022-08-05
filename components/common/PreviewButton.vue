<template>
    <button class="btn"
        :type="btnType"
    >
        <PreviewIcon class="lucide w-4 h-4" />
        <span class="ms-2" :class="textSize">{{ name }}</span>
    </button>
</template>
<script>
import PreviewIcon from '~~/assets/images/icons/PreviewIcon.vue';

export default {
    components: {
        PreviewIcon
    },
    props: [
        'btnType',
        'name',
        'textSize'
    ]
}
</script>
<style lang="scss">
    .btn {
        display: inline-flex;
        cursor: pointer;
        align-items: center;
        justify-content: center;
        border-radius: 0.375rem;
        border-width: 1px;
        padding: 0.5rem 0.75rem;
        font-weight: 500;
    }
</style>