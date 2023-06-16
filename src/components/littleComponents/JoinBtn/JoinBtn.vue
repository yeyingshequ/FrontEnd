<template>
    <div
        class="joinBtnContainer"
        :class="{
            small: size == 'small',
            default: size == 'default',
            large: size == 'large',
            XLarge: size == 'XLarge'
        }"
    >
        <button
            class="goJoin"
            :class="{unJoin: cmtyInfo.userCmty?.isJoined as boolean|| false}"
            @click.stop="
                reqJoinCmty({
                    cmtyId: cmtyInfo.cmtyId,
                    isJoined: (cmtyInfo.userCmty?.isJoined as boolean) || false
                })
            "
        >
            {{ cmtyInfo.userCmty?.isJoined ? '已加入' : '加入' }}
        </button>
    </div>
</template>
<script setup lang="ts">
import {updateUserCmty} from '@/api'
import emitter from '@/tools/mitt'
import useMainStore from '@/store/index'
import {computed} from 'vue'
import useCmtyStore from '@/store/community'
const mainStore = useMainStore()
const cmtyStore = useCmtyStore()

let props = defineProps(['cmtyInfo', 'size', 'parent'])
let cmtyInfo = computed(() => {
    return props.cmtyInfo
})
let size = computed(() => {
    return props.size
})

async function reqJoinCmty(params: {cmtyId: number; isJoined: boolean}) {
    //console.log('参数:', params)
    let result
    if (!params.isJoined) {
        result = await updateUserCmty({request: 'join', ...params})
        if (!result.status) {
            cmtyInfo.value.userCmty.isJoined = true
        }
    } else {
        result = await updateUserCmty({request: 'unjoin', ...params})
        if (!result.status) {
            cmtyInfo.value.userCmty.isJoined = false
        }
    }
    mainStore.setShowLoginScreen(result)
}
//console.log('joinBtn:', cmtyInfo.value.userCmty.isJoined as boolean)
</script>
<style lang="scss" scoped>
.joinBtnContainer {
    .goJoin {
        height: 35px;
        outline: none;
        border: 0;
        border-radius: 50px;
        padding: 0 15px;
        font-size: 15px;
        background-color: $brandColor;
        color: white;
        font-weight: bold;
        vertical-align: middle;
        -webkit-user-select: none;
        text-align: center;
        transition: 0.1s;
        cursor: pointer;

        &:hover {
            background-color: mix($brandColor, black, 90%);
        }
    }
    .unJoin {
        background-color: white;
        color: $mainFont;
        border: 1px solid $placeholderFont;

        &:hover {
            background-color: $button;
        }
    }
}

.default {
    .goJoin {
        height: 35px;
        width: 80px;
    }
}
.large {
    .goJoin {
        height: 40px;
        width: 80px;
    }
}
</style>
