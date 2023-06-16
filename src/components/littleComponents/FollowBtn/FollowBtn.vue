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
                    userId: Number(route.params.userId)
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
import useMainStore from '@/store/index'
const mainStore = useMainStore()
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
    let result
    if (!params.isFollowing) {
        result = await updateUserUser({request: 'follow', objUserId: params.objUserId})
        if (!result.status) {
            userInfo.value.objUser.isFollowing = true
        }
    } else {
        result = await updateUserUser({request: 'unFollow', objUserId: params.objUserId})
        if (!result.status) {
            userInfo.value.objUser.isFollowing = false
        }
    }
    mainStore.setShowLoginScreen(result)
    /* switch (parent.value) {
        case 'user':
            emitter.emit('reqGetUserInfo')
        case 'userCard':
            emitter.emit('regetUserCard')
    } */
    /* emitter.emit('regetUserInfo') */
}
onMounted(() => {
    //console.log('userInfo:', userInfo.value)
})
</script>
<style lang="scss" scoped>
@import '@/components/littleComponents/Buttons/buttons.scss';
.followContainer {
    .follow {
        @extend .brandColorBtnSC;
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
    }
}
</style>
