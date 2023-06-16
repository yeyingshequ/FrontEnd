<template>
    <div v-if="showImgDisplyer" class="display" @click="close">
        <div class="close" @click="close">
            <i class="iconfont icon-guanbi1"></i>
        </div>
        <div @click.stop="">
            <img :src="displayImgUrl" alt="" :class="{active: displayImgType == 'avatar'}" />
        </div>
    </div>
</template>
<script setup lang="ts">
import {computed, onBeforeUnmount, onMounted, ref, toRefs} from 'vue'
import DarkMask from '@/components/littleComponents/Mask/darkMask.vue'
import useMainStore from '@/store/index'
import {storeToRefs} from 'pinia'
const mainStore = useMainStore()
let props = defineProps(['imagesUrl', 'parent'])
let {imagesUrl, parent} = toRefs(props)
let {showImgDisplyer, displayImgUrl, displayImgType} = storeToRefs(mainStore)
function close() {
    mainStore.close('imgDisplayer')
    showImgDisplyer.value = false
    displayImgUrl.value = ''
}
let getborderRadius = computed(() => {
    if (mainStore.displayImgType == 'avatar') {
        return '50%'
    }
})
onMounted(() => {
    mainStore.isScrollingStopped = true
})
onBeforeUnmount(() => {
    mainStore.isScrollingStopped = false
})
</script>
<style lang="scss" scoped>
.display {
    @extend .darkMaskGSC;
    background-color: rgba(black, 0.95);
    div {
        position: absolute;
        z-index: 901;
        img {
            width: 100%;
            height: 100%;
            max-height: 100vh;
        }

        .active {
            border-radius: 50%;
            width: 400px;
            height: 400px;
            @media (max-width: 420px) {
                width: 360px;
                height: 360px;
            }
            @media (max-width: 370px) {
                width: 310px;
                height: 310px;
            }
            @media (max-width: 320px) {
                width: 270px;
                height: 270px;
            }
        }
    }
    .close {
        position: absolute;
        @extend .flexCentreGSC;
        top: 10px;
        right: 10px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        transition: 0.1s;
        cursor: pointer;
        z-index: 902;
        background-color: rgba(black, 1);
        i {
            font-size: 25px;
            color: white;
        }
        &:hover {
            background-color: rgba(white, 0.1);
        }
    }
}
</style>
