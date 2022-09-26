<template>
    <div class="table-container">
        <div class="tr">
            <div class="th">STT</div>
            <div class="th">Phòng ban</div>
            <div class="th">Số lượng người dùng</div>
        </div>
        <div class="tr" v-for="(item, index) in items" :key="index">
            <div class="td">{{ index + 1 + page*size }}</div>
            <div class="td">{{ item.departmentName }}</div>
            <div class="td">{{item.amountUserByDepartment}}</div>
        </div>
    </div>
</template>
<script>
export default {
    props: ["headers", "items", "page", "size"],
}
</script>
<style lang="">
    
</style>