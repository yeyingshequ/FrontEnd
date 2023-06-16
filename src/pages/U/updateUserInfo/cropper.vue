<template>
    <div class="cropImg">
        <div class="cropperContainer">
            <img ref="imageRef" :src="croppingImg" />
        </div>
    </div>
</template>
<script setup lang="ts">
import {nextTick, onMounted, reactive, ref, toRefs, watch, onBeforeUnmount} from 'vue'
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
import emitter from '@/tools/mitt'
let cropper = ref()
const imageRef: any = ref()
const props = defineProps(['croppingImg', 'type'])
const emit = defineEmits(['sendImg'])
let {croppingImg, type} = toRefs(props)
let cuttedImg = ref('')
let cropperFn = {
    init() {
        cropper.value = new Cropper(imageRef.value, {
            aspectRatio: this.getAspectRatio(type?.value), // 默认比例
            autoCropArea: 1, // 0-1之间的数值，定义自动剪裁区域的大小，默认0.8
            viewMode: 1,
            center: true,
            background: false,
            cropBoxMovable: false,
            dragMode: 'move',
            preview: '.previewImg', // 预览视图
            guides: false, // 裁剪框的虚线(九宫格)
            cropBoxResizable: false,
            crop(event) {
                /* //console.log('x:', event.detail.x)
                //console.log('y:', event.detail.y)
                //console.log('width:', event.detail.width)
                //console.log('height:', event.detail.height) */
                //cropperFn.cut()
            }
        })
    },
    getSize(lenghtType: string) {
        if (imageRef.value) {
            switch (type?.value) {
                case 'avatar':
                    if (imageRef.value.naturalWidth > imageRef.value.naturalHeight) {
                        return lenghtType == 'height' ? 500 : 0
                    } else {
                        return lenghtType == 'height' ? 0 : 500
                    }
                    break

                case 'cover':
                    if (imageRef.value.naturalWidth > imageRef.value.naturalHeight) {
                        return lenghtType == 'height' ? 0 : 600
                    } else {
                        return lenghtType == 'height' ? 600 : 0
                    }
                    break
            }
        }
    },
    getAspectRatio(type: string) {
        if (type == 'avatar') {
            return 1 / 1
        } else if (type == 'cover') {
            return 3 / 1
        }
    },
    cut() {
        const data = cropper.value.getCroppedCanvas()
        cuttedImg.value = data.toDataURL()
        //console.log(cuttedImg.value)
        emit('sendImg', cuttedImg.value, type?.value)
    },
    convertImageToBase64(file: Blob, callback: any) {
        const reader = new FileReader()
        reader.onload = function (event) {
            const base64 = event.target!.result
            callback(base64)
        }
        reader.readAsDataURL(file)
    }
}
emitter.on('requireCrop', () => {
    //console.log('1111')
    cropperFn.cut()
})
//console.log(type?.value)

nextTick(() => {
    cropperFn.init()
})
onBeforeUnmount(() => {
    emitter.off('requireCrop')
})
</script>

<style lang="scss" scoped>
.cropImg {
    position: relative;
    height: 550px;
    width: 100%;
    //overflow: hidden;
    //@extend .flexCentreGSC;
    .cropperContainer {
        height: 550px;
        width: 100%;
        @extend .flexCentreGSC;

        img {
        }

        :deep(.cropper-view-box) {
            //outline: 1px solid $brandColor;
            outline-offset: 10px solid $brandColor;
        }
    }
}
</style>
