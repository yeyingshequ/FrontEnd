<template>
    <div class="topComponent">
        <div class="return">
            <returnBtn />
        </div>
        <!-- 这里用于显示帖子归属的社区 -->
        <div
            v-if="parent == 'post'"
            class="barOrPostRouter"
            @click="router.push(`/c/${info.cmtyId}`)"
        >
            <div class="icon">
                <img :src="info.community.cmtyAvatar || indexStore.defaultAvatar" />
            </div>
            <div class="barName">
                <span>{{ info.community.cmtyName }}吧</span>
            </div>
        </div>
        <!-- 这里用于显示评论归属的帖子 -->
        <div
            v-if="parent == 'comment'"
            class="barOrPostRouter"
            style="padding: 0 20px"
            @click="router.push(`/p/${info.postId}`)"
        >
            <div class="showAllComments">
                <span>查看所有评论</span>
            </div>
        </div>
        <!-- 这里用于显示用户信息 -->
        <div v-if="parent == 'user'" class="userOrCmtyRouter">
            <div class="name">
                <span>{{ info.username }}</span>
            </div>
        </div>

        <transition
            name="animate__animated animate__bounce"
            enter-active-class="animate__fadeIn"
            leave-active-class="animate__fadeOut"
        >
            <div v-show="showBottons" ref="buttons" class="buttons animate__faster">
                <!-- <SearchBtn size="small" /> -->
                <FollowBtn
                    :userInfo="info"
                    size="small"
                    parent="U"
                    v-if="
                        route.matched[0].name == 'U' &&
                        userStore.myInfo.userId != Number(route.params.userId)
                    "
                />
                <EditorShowingBtn
                    :parent="parent"
                    v-if="route.matched[0].name == 'P' || route.matched[0].name == 'Comment'"
                />
            </div>
        </transition>
        <div v-if="parent == 'community'" class="userOrCmtyRouter">
            <div class="name">
                <span>{{ info.cmtyName }}吧</span>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import 'animate.css'
import {computed, onMounted, ref} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import returnBtn from '@/components/littleComponents/yy-button/yy-return.vue'
import useIndexStore from '@/store/index'
import FollowBtn from '../littleComponents/FollowBtn/FollowBtn.vue'
import SearchBtn from '../littleComponents/searchBtn/SearchBtn.vue'
import useUserStore from '@/store/user'
import useMainStore from '@/store/index'
import emitter from '@/tools/mitt'
import EditorShowingBtn from '../littleComponents/EditorShowingBtn/EditorShowingBtn.vue'
const mainStore = useMainStore()
const userStore = useUserStore()
const indexStore = useIndexStore()
const route = useRoute()
let props = defineProps(['parent', 'info'])
let parent = computed(() => {
    return props.parent
})
let info = computed(() => {
    return props.info
})

const router = useRouter()
let showBottons = ref()
let buttons = ref()
function showEditor() {
    console.log(111)
    emitter.emit('showEditor', 'postMain')
}
onMounted(() => {
    //console.log('topInfo:', info)
    window.addEventListener('scroll', function () {
        //indexStore.topBottom == indexStore.tabTop ? //console.log('true') : //console.log('false')
        //console.log('文档:', document.documentElement.scrollTop)
        if (document.documentElement.scrollTop >= 420) {
            showBottons.value = true
        } else {
            showBottons.value = false
        }
    })
})
</script>
<style lang="scss" scoped>
.topComponent {
    position: sticky;
    top: 60px;
    @extend .flexCentreGSC;
    background-color: white;
    width: 100%;
    height: 50px;
    //border-bottom: 1px solid #f1f1f1;
    cursor: pointer;
    z-index: 1;

    .return {
        position: absolute;
        height: 40px;
        left: 20px;
        border: 0;
    }

    .barOrPostRouter {
        padding-left: 5px;
        padding-right: 10px;
        @extend .flexCentreGSC;
        height: 40px;
        border-radius: 50px;
        cursor: pointer;

        /* background-color: blueviolet; */
        &:hover {
            background-color: mix(#ff44aa, white, 10%);
        }

        .icon {
            @extend .flexCentreGSC;
            margin-right: 5px;
            width: 30px;
            height: 30px;
            /* background-color: red; */

            img {
                border-radius: 50%;
                width: 100%;
                height: 100%;
            }
        }

        .barName {
            max-width: 150px;
            span {
                //font-weight: bold;
                /*单行省略 */
                line-height: 35px;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
            }
        }
    }
    .userOrCmtyRouter {
        position: absolute;
        left: 75px;
        line-height: 40px;
        //background-color: red;
        span {
            //line-height: 40px;
            font-size: 20px;
            font-weight: bold;
            line-height: 35px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
        }
    }
    .buttons {
        display: flex;
        position: absolute;
        top: 10px;
        right: 30px;
        -webkit-user-select: none;
    }
}

.tabTouchedTop {
    position: sticky;
    top: 10px;
    bottom: 110px;
}
</style>
