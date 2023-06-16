<template>
    <div class="yy-returnContainer" @click="back">
        <button class="return">
            <i class="iconfont icon-fanhui"></i>
        </button>
    </div>
</template>
<script setup lang="ts">
import {useRouter} from 'vue-router'
const router = useRouter()

function back() {
    router.back()
}
</script>
<style lang="scss" scoped>
.yy-returnContainer {
    position: absolute;
    @extend .flexCentreGSC;
    border-radius: 50%;
    border: 0;
    .return {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        transition: 0.1s;
        background-color: white;
        border: 0;
        outline: none;
        cursor: pointer;
        i {
            margin-left: 5px;
            font-size: 20px;
        }
        &:hover {
            background-color: $onHover;
        }
    }
}
</style>
