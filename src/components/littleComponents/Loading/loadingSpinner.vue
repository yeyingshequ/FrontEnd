<template>
    <div v-show="isLoading" class="loadingSpinnerComponent" :class="{actived: isOpaque == true}">
        <div class="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>
</template>
<script setup lang="ts">
import {toRefs} from 'vue'

const props = defineProps({
    isOpaque: {
        type: Boolean,
        default: true
    },
    isLoading: {
        type: Boolean,
        required: true
    }
})
const {isOpaque, isLoading} = toRefs(props)
</script>
<style lang="scss" scoped>
.loadingSpinnerComponent {
    background-color: rgba($color: white, $alpha: 0.5);
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 10;
    @extend .flexCentreGSC;
    cursor: pointer;
    .lds-ring {
        display: inline-block;
        position: relative;
        width: 80px;
        height: 80px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .lds-ring div {
        box-sizing: border-box;
        display: block;
        position: absolute;
        width: 30px;
        height: 30px;
        margin: 5px;
        border: 5px solid $brandColor;
        border-radius: 50%;
        animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        border-color: $brandColor transparent transparent transparent;
    }
    .lds-ring div:nth-child(1) {
        animation-delay: -0.45s;
    }
    .lds-ring div:nth-child(2) {
        animation-delay: -0.3s;
    }
    .lds-ring div:nth-child(3) {
        animation-delay: -0.15s;
    }
    @keyframes lds-ring {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
}
.actived {
    background-color: white;
}
</style>
