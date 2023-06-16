<template>
    <div class="insertImg">
        <input type="file" id="imgInput" ref="fileInput" @change="handleFileChange" multiple />
        <label for="imgInput" class="insertImg">
            <span>插入图片</span>
        </label>
    </div>
</template>
<script setup lang="ts">
import {showMessage} from '@/tools'
import {toRefs} from 'vue'

const props = defineProps({
    imgList: {
        type: [] as File[],
        required: true
    }
})
const emit = defineEmits(['setImg'])
let {imgList} = toRefs(props)
function handleFileChange(event: any) {
    const files = event.target.files
    for (let i = 0; i < files.length; i++) {
        const file = files[i]
        if (file.type.match(/^image\//)) {
            convertImageToBase64(file, function (base64: any) {
                //console.log(imgList)
                if (imgList.value.length < 4) {
                    emit('setImg', file, base64)
                    /* imgList.push(file)
                    imgDisplayArr.push(base64) */
                } else {
                    showMessage('只能添加4张图片', 1)
                }
            })
        } else {
            console.error('Invalid file type, please select an image file.')
        }
    }
}
function convertImageToBase64(file: Blob, callback: any) {
    const reader = new FileReader()
    reader.onload = function (event) {
        const base64 = event.target!.result
        callback(base64)
    }
    reader.readAsDataURL(file)
}
</script>
<style lang="scss" scoped>
.insertImg {
    margin-right: 10px;
    input {
        display: none;
    }
    label {
        @extend .whiteBtnGSC;

        outline: none;
    }
}
</style>
