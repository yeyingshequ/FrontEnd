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
            :class="{unJoin: checkUserCmty(cmtyInfo.userCmty)}"
            @click.stop="
                reqJoinCmty({
                    cmtyId: cmtyInfo.cmtyId,
                    isJoined: checkUserCmty(cmtyInfo.userCmty) as boolean
                })
            "
        >
            {{ cmtyInfo.isJoined ? '已加入' : '加入' }}
        </button>
    </div>
</template>
<script setup lang="ts">
import {updateUserCmty} from '@/api'
import emitter from '@/tools/mitt'
import {computed} from 'vue'

let props = defineProps(['cmtyInfo', 'size', 'parent'])
let cmtyInfo = computed(() => {
    return props.cmtyInfo
})
let size = computed(() => {
    return props.size
})
let parent = computed(() => {
    return props.parent
})
function checkUserCmty(userCmty: {isJoined: boolean}) {
    return userCmty ? userCmty.isJoined : null
}
async function reqJoinCmty(params: {cmtyId: number; isJoined: boolean}) {
    console.log(params)

    if (!params.isJoined) {
        await updateUserCmty({request: 'join', ...params})
        //joinCmtyMsg.value = result.data.message
    } else {
        await updateUserCmty({request: 'unjoin', ...params})
        //joinCmtyMsg.value = result.data.message
    }
    console.log(parent.value)

    switch (parent.value) {
        case 'C':
            emitter.emit('reqGetCmtyInfo')
        case 'CmtyCard':
            emitter.emit('regetCmtyCard')
    }
}
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
