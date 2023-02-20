<template>
    <div
        class="searchBtnContainer"
        :class="{
            small: size == 'small',
            default: size == 'default',
            large: size == 'large',
            XLarge: size == 'XLarge'
        }"
    >
        <button class="search">
            <el-icon><Search style="font-size: 22px" /></el-icon>
        </button>
    </div>
</template>
<script setup lang="ts">
import {computed} from 'vue'

let props = defineProps(['size'])
let size = computed(() => {
    return props.size
})
</script>
<style lang="scss" scoped>
.searchBtnContainer {
    .search {
        height: 40px;
        width: 40px;
        color: $regularFont;
        background-color: white;
        border: 1px $placeholderFont solid;
        transition: 0.1s;
        outline: none;
        border-radius: 50px;
        cursor: pointer;

        i {
            font-size: 25px;
            vertical-align: -5px;
        }

        &:hover {
            background-color: $onHover;
        }
    }
}
.small {
    .search {
        height: 30px;
        width: 30px;
        i {
            font-size: 15px;
            vertical-align: -5px;
        }
    }
}
.default {
    .search {
        height: 35px;
        width: 35px;
    }
}
.default {
    .search {
        height: 40px;
        width: 40px;
    }
}
</style>
