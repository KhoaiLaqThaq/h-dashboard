<template>
    <div class="form-floating">
        <input class="form-control"
            :type="type"
            :value="value"
            :required="required"
            autocomplete="false"
            @change="typeInputPress != '' ? inputPressReplace($event) : inputPress($event)"
        >
        <label>{{ placeholder }} <span :class="{'text-danger': required}">*</span></label>
    </div>
</template>
<script>
export default {
    props: [
        'type',
        'value',
        'required',
        'typeInputPress',
        'placeholder'
    ],
    emits: ['update:value'],
    setup(props) {
        function inputPressReplace(e) {
            emit('update:value', e.target.value.replace(props.typeInputPress, ''));
        }

        function inputPress(e) {
            emit('update:value', e.target.value);
        }

        return {
            inputPress,
            inputPressReplace
        }
    }
}
</script>
<style lang="">
    
</style>