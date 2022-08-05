<template>
    <div class="mb-3">
        <label class="form-label" for="">{{ placeholder }} <span :class="{'text-danger': required}">*</span></label>
        <select class="form-select"
            :value="value"
            :required="required">
            <option value="" v-if="selectOfferTitle">{{ selectOfferTitle }}</option>
            <option v-for="(option, index) in options"
                :key="index"
                :value="optionId ? option[name]:option">
                {{ option instanceof Object ? option[name] : option }}
            </option>
        </select>
    </div>
</template>
<script>
export default {
    props: [
        'selectOfferTitle',
        'options',
        'optionId',
        'name',
        'required',
        'placeholder'
    ]
}
</script>
<style lang="">
    
</style>