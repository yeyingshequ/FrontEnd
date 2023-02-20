<template>
    <div
        class="topComponent"
        :class="{
            /* tabTouchedTop: indexStore.tabTop == 110 */
        }"
        ref="topScroll"
    >
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
            <div v-show="parent == 'user' && showBottoms" class="buttons animate__faster">
                <SearchBtn size="small" />
                <FollowBtn
                    :userInfo="info"
                    size="small"
                    parent="U"
                    v-if="userStore.myInfo.userId != Number(route.params.uid)"
                />
            </div>
        </transition>
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
let topScroll = ref()

const router = useRouter()
let showBottoms = ref()
onMounted(() => {
    window.addEventListener('scroll', function () {
        //console.log('top:', topScroll.value.getBoundingClientRect().bottom)
        //indexStore.topBottom = topScroll.value.getBoundingClientRect().bottom
        //indexStore.topBottom == indexStore.tabTop ? console.log('true') : console.log('false')
        //console.log('文档:', document.documentElement.scrollTop)
        if (document.documentElement.scrollTop >= 420) {
            showBottoms.value = true
        } else {
            showBottoms.value = false
        }
    })
})
</script>
<style lang="scss" scoped>
.topComponent {
    position: sticky;
    top: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    width: 100%;
    height: 50px;
    //border-bottom: 1px solid #f1f1f1;
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
        display: flex;
        justify-content: center;
        align-items: center;
        height: 40px;
        border-radius: 50px;
        cursor: pointer;

        /* background-color: blueviolet; */
        &:hover {
            background-color: mix(#ff44aa, white, 10%);
        }

        .icon {
            display: flex;
            justify-content: center;
            align-items: center;
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
            span {
                //font-weight: bold;
                line-height: 35px;
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
