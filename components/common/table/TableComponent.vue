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
                <td v-for="(subItem, index1) in item" :key="index1">{{ subItem }}</td>
                <td class="" v-if="actionEdit || actionDelete">
                    <div class="d-flex">
                        <div class="d-flex ms-auto cursor-pointer" v-if="actionEdit">
                            <edit-icon /><span class="ms-1">Edit</span>
                        </div>
                        <div class="d-flex me-auto cursor-pointer ms-3 text-danger" v-if="actionDelete">
                            <delete-icon /> <span class="ms-1">Delete</span>
                        </div>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</template>
<script>
import EditIcon from '~~/assets/images/icons/actions/EditIcon.vue';
import DeleteIcon from '~~/assets/images/icons/actions/DeleteIcon.vue'

export default {
    components: {
        EditIcon,
        DeleteIcon
    },
    props: [
        'headers',
        'items',
        'actionEdit',
        'actionDelete'
    ]
}
</script>
<style lang="scss">
    .table {
        tr {
            th {
                text-transform: uppercase;

                &:hover {
                    background-color: rgb(241 245 249);
                }
            }
        }
    }
</style>