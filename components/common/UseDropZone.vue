<template>
    <div class="drag-container">
        <div class="drag-box cursor-pointer" v-bind="getRootProps()">
            <input v-bind="getInputProps()" >
            <p v-if="isDragActive">Drop the files here ...</p>
            <p v-else>Drag some files here, or click to select files</p>
        </div>
        <button @click="open" class="d-none">open</button>

        <div class="previews" :class="avatarUrl ? 'd-block' : 'd-none'">
            <div class="remove" @click="removePreview()">
                <IconPlus class="rounded-full" />
            </div>
            <img id="preview" src="#" alt="" />
        </div>
    </div>
</template>
<script>
import {ref, watch} from 'vue';
import { useDropzone } from 'vue3-dropzone';
import IconPlus from '~~/assets/images/icons/IconPlus.vue';

export default {
    components: { IconPlus },
    props: ['avatar'],
    setup(props, {emit}) {
        const avatarUrl = ref(props.avatar);

        function removePreview() {
            console.log('remove preview');
        }

        function onDrop(acceptFiles, rejectReasons) {
            console.log(acceptFiles)
            console.log(rejectReasons)
            if (acceptFiles) {
                let previewImage = URL.createObjectURL(acceptFiles[0]);
                console.log('preview image: ' + previewImage);
                document.getElementById('preview').src = previewImage;

                emit('changeImage', acceptFiles[0]);
                document.getElementsByClassName('drag-box')[0].classList.add('d-none');
                document.getElementsByClassName('previews')[0].classList.add('d-block');
                document.getElementsByClassName('previews')[0].classList.remove('d-none');
            }
        }

        watch(props.avatar, () => {
            console.log('entering watch avatarUrl');
            document.getElementById('preview').src = avatarUrl.value;
        });

        const { getRootProps, getInputProps, ...rest } = useDropzone({ onDrop })

        return {
            getRootProps,
            getInputProps,
            ...rest,
            removePreview,
            avatarUrl
        }
    }
}
</script>
<style lang="scss">
    .drag-container {
        position: relative;
        display: block;
        border: 1px dashed rgba(0, 0, 0, 0.08);
        text-align: center;
        margin: 0 auto;
        .drag-box {
            min-height: 300px;
            display: flex;
            justify-content: center;
            align-items: center;
            p {
                font-weight: 600;
                color: rgba(0, 0, 0, 0.3)
            }
        }
    }
    .previews {
        position: relative;
        .remove {
            svg {
                width: 2rem;
                height: 2rem;
                transform: rotate(45deg);
                border: 2px solid rgb(0 0 0 / 80%);
            }
            position: absolute;
            top: 10px;
            right: 10px;
            cursor: pointer;
        }
    }
    #preview {
        max-width: 100%;
        height: auto;
    }
</style>