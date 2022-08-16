<template>
    <table class="table table-striped table-hover">
        <thead>
            <tr>
                <th v-for="(item, index) in headers" :key="index">
                    {{ item.text }}
                </th>
                <th class="text-center" v-if="actionEdit || actionDelete">Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, index) in items" :key="index">
                <td class="text-center">{{ (index + 1) + page*size }}</td>
                <td>{{ item.title }}</td>
                <td>{{ displayBrief(item.brief) }}</td>
                <td>{{ displayDate(item.createdDate) }}</td>
                <td>
                    <template v-if="item.status == 'new'"><span class="badge bg-primary">Thêm mới</span></template>
                    <template v-if="item.status == 'approved'"><span class="text-success">Đã phê duyệt</span></template>
                </td>
                <td class="" v-if="actionEdit || actionDelete">
                    <div class="d-flex">
                        <div class="ms-auto cursor-pointer" v-if="actionEdit">
                            <NuxtLink :to="'/news/form/' + item.id" class="d-flex"><edit-icon /><span class="ms-1">Edit</span></NuxtLink>
                        </div>
                        <div class="d-flex me-auto cursor-pointer ms-3 text-danger" v-if="actionDelete">
                            <delete-icon @click="disabledNews(item.id)" /> <span class="ms-1">Hide</span>
                        </div>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</template>
<script>
import moment from "moment";

import EditIcon from '~~/assets/images/icons/actions/EditIcon.vue';
import DeleteIcon from '~~/assets/images/icons/actions/DeleteIcon.vue';

export default {
    components: {
        EditIcon,
        DeleteIcon
    },
    props: [
        'headers',
        'items',
        'actionEdit',
        'actionDelete',
        'page', 'size'
    ],
    setup() {

        function displayBrief(brief) {
            let maxLength = 125;
            if (brief.length > maxLength) {
                return brief.slice(0, maxLength).concat("...");
            }
        }

        function displayDate(date) {
            return moment(date).format('YYYY-MM-DD HH:mm:ss');
        }

        return {
            displayBrief,
            displayDate,
        }
    }
}
</script>
<style lang="scss">
    .table {
        tr {
            th {
                // text-transform: uppercase;

                &:hover {
                    background-color: rgb(241 245 249);
                }
            }
        }
    }
</style>