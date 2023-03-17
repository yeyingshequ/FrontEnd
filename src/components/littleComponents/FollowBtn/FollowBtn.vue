<template>
    <div
        v-if="userInfo.userId != userStore.myInfo.userId"
        class="followContainer"
        :class="{
            small: size == 'small',
            default: size == 'default',
            large: size == 'large',
            XLarge: size == 'XLarge'
        }"
    >
        <button
            class="follow"
            :class="{unFollow: userInfo.objUser?.isFollowing}"
            @click.stop="
                reqFollowUser({
                    objUserId: Number(userInfo.userId),
                    isFollowing: userInfo.objUser?.isFollowing,
                    userId: Number(route.params.uid)
                })
            "
        >
            {{ userInfo.objUser?.isFollowing ? '正在关注' : '关 注' }}
        </button>
    </div>
</template>
<script setup lang="ts">
import {updateUserUser} from '@/api'
import emitter from '@/tools/mitt'
import {computed, onMounted} from 'vue'
import {useRoute} from 'vue-router'
import useUserStore from '@/store/user'
const userStore = useUserStore()
const route = useRoute()
let props = defineProps(['userInfo', 'size', 'parent'])
let userInfo = computed(() => {
    return props.userInfo
})
//console.log('用户信息:', userInfo.value)
let size = computed(() => {
    return props.size
})
let parent = computed(() => {
    return props.parent
})
async function reqFollowUser(params: {objUserId: number; isFollowing: number; userId: number}) {
    //console.log('params:', params)
    userInfo.value.objUser?.isFollowing
    if (!params.isFollowing) {
        await updateUserUser({request: 'follow', objUserId: params.objUserId})
        userInfo.value.objUser.isFollowing = true
    } else {
        await updateUserUser({request: 'unFollow', objUserId: params.objUserId})
        userInfo.value.objUser.isFollowing = false
    }
    switch (parent.value) {
        case 'user':
            emitter.emit('reqGetUserInfo')
        case 'userCard':
            emitter.emit('regetUserCard')
    }
    /* emitter.emit('regetUserInfo') */
}
onMounted(() => {
    console.log('userInfo:', userInfo.value)
})
</script>
<style lang="scss" scoped>
.followContainer {
    .follow {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 40px;
        outline: none;
        padding: 0 20px;
        margin-left: 20px;
        font-size: 16px;
        background-color: $brandColor;
        color: white;
        font-weight: bold;
        vertical-align: middle;
        text-align: center;
        transition: 0.1s;
        border: 0;
        border-radius: 50px;
        cursor: pointer;
        white-space: nowrap;
        &:hover {
            background-color: mix($brandColor, black, 90%);
        }
    }
    .unFollow {
        background-color: white;
        color: $mainFont;
        border: 1px solid $placeholderFont;

        &:hover {
            background-color: $button;
        }
    }
}
.large {
    .follow {
        padding: 0 20px;
        height: 40px;
    }
}
.default {
    .follow {
        padding: 0 15px;
        height: 35px;
    }
}
.small {
    .follow {
        padding: 0 15px;
        height: 30px;
        font-size: 16px;
        font-weight: normal;
    }
}
</style>
