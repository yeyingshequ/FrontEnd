<template>
    <div ref="component">
        <div @click.stop="clickToGetMoreCard()" class="bottomLoading">
            <span v-show="isLoading">正在加载...</span>
            <span v-show="!hasMoreInfo">暂无更多...</span>
        </div>
    </div>
</template>
<script setup lang="ts">
import {Ref, nextTick, onBeforeUnmount, onMounted, ref, toRefs, watch} from 'vue'
import usePostStore from '@/store/post'
import {storeToRefs} from 'pinia'
import {useRoute} from 'vue-router'
import useMainStore from '@/store/index'
import useCmtyStore from '@/store/community'
import useUserStore from '@/store/user'
const userStore = useUserStore()
const cmtyStore = useCmtyStore()
const mainStore = useMainStore()
const route = useRoute()
const postStore = usePostStore()
let {homePostCardList, discoverPostCardList, cmtyPostCardList, userPostCardList} =
    storeToRefs(postStore)
let component = ref()
const props = defineProps(['parent', 'list'])
let {parent, list} = toRefs(props)
let isLoading = ref(false)
let hasMoreInfo = ref(true)
function handleResponse(res: any) {
    if (!res.length) {
        hasMoreInfo.value = false
    }
}
function getMorePostCard(postType: string, extraCondition: string, params?: any) {
    //console.log('发送请求中')
    postStore
        .getPostCard({
            type: `more${postType}`,
            extraCondition: extraCondition,
            ...params
        })
        .then(handleResponse)
}
function getMoreCommentCard(postType: string, extraCondition: string, params?: any) {
    //console.log('发送请求中')
    postStore
        .getCommentCard({
            type: `more${postType}`,
            extraCondition: extraCondition,
            ...params
        })
        .then(handleResponse)
}
function getMoreNotiCard(NotiType: string, extraCondition: string, params?: any) {
    postStore
        .getNotiCard({
            type: `more${NotiType}`,
            extraCondition: extraCondition,
            ...params
        })
        .then(handleResponse)
}

function getMoreCmtyCard(CmtyType: string, extraCondition: string, params?: any) {
    cmtyStore
        .getCmtyCard({
            type: `more${CmtyType}`,
            extraCondition: extraCondition,
            ...params
        })
        .then(handleResponse)
}

function getMoreUserCard(UserType: string, extraCondition: string, params?: any) {
    userStore
        .getUserCard({
            type: `more${UserType}`,
            extraCondition: extraCondition,
            ...params
        })
        .then(handleResponse)
}

function getMoreCard() {
    //console.log('isLoading :', isLoading.value)
    //console.log('hasMoreInfo:', hasMoreInfo.value)
    //console.log('组件的高度:', component.value?.getBoundingClientRect()?.bottom)
    //console.log('window的高度:', window.innerHeight)

    if (
        hasMoreInfo.value &&
        Math.floor(component.value?.getBoundingClientRect()?.bottom) <= window.innerHeight
    ) {
        //console.log('到底部惹')
        //console.log('父组件:', parent?.value)

        isLoading.value = true
        const item = list?.value?.slice(-1)[0] || {}
        const {updateTime = null, pubTime = null, notiTime = null, totalPostingCount = null} = item
        const {
            savedTime = null,
            joinedTime = null,
            followedTime = null,
            lastVisitTime = null,
            favoriteTime = null
        } = item.userPost || item.userComment || item.userReply || item.userCmty || {}

        switch (parent?.value) {
            case 'homePost':
                getMorePostCard('Home', updateTime)
                break
            case 'discoverPost':
                getMorePostCard('Discover', updateTime)
                break
            /* 帖子卡片部分 */
            case 'cmtyPost':
                getMorePostCard('Community', updateTime, {
                    cmtyId: parseInt(route.params.cmtyId as string)
                })
                break
            case 'userPost':
                getMorePostCard('User', updateTime, {
                    userId: parseInt(route.params.userId as string)
                })
                break
            case 'searchPost':
                getMorePostCard('Search', updateTime, {
                    keyWords: mainStore.searchKeyWord
                })
                break
            case 'historyPost':
                getMorePostCard('History', lastVisitTime)
                break
            case 'savedPost':
                getMorePostCard('Saved', savedTime)
                break
            /* 评论卡片部分 */
            case 'userComment':
                getMoreCommentCard('User', pubTime, {userId: route.params.userId})
                break
            case 'searchComment':
                getMoreCommentCard('Search', pubTime)
                break
            case 'savedComment':
                getMoreCommentCard('Saved', savedTime)
                break
            /* 通知卡片部分 */
            case 'replyNoti':
                getMoreNotiCard('Reply', notiTime)
                break
            case 'likeNoti':
                getMoreNotiCard('Like', notiTime)
                break
            case 'search':
                getMoreCmtyCard('Search', totalPostingCount, {keyWords: mainStore.searchKeyWord})
                break
            /* 社区卡片部分 */
            case 'cmtySquare':
                getMoreCmtyCard('CmtySquare', totalPostingCount, {
                    keyWords: route.params.category as string
                })
                break
            case 'joinedCmty':
                getMoreCmtyCard('Joined', joinedTime)
                break
            case 'favoriteCmty':
                getMoreCmtyCard('Favorite', favoriteTime)
                break
            case 'recentCmty':
                getMoreCmtyCard('Recent', lastVisitTime)
                break
            case 'userCmty':
                getMoreCmtyCard('User', joinedTime, {
                    userId: parseInt(route.params.userId as string)
                })
                break
            /* 用户卡片部分 */
            case 'followers':
                getMoreUserCard('Followers', followedTime, {
                    userId: parseInt(route.params.userId as string)
                })
                break
            case 'following':
                getMoreUserCard('Following', followedTime, {
                    userId: parseInt(route.params.userId as string)
                })
                break
            case 'searchUser':
                getMoreUserCard('Search', followedTime, {
                    userId: parseInt(route.params.userId as string)
                })
                break
            default:
                break
        }
        isLoading.value = false
    }
}
function clickToGetMoreCard() {
    hasMoreInfo.value = true
    getMoreCard()
}
onMounted(() => {
    window.addEventListener('scroll', getMoreCard)
})
onBeforeUnmount(() => {
    window.removeEventListener('scroll', getMoreCard)
})
</script>
<style lang="scss" scoped>
.bottomLoading {
    height: 30px;
    @extend .flexCentreGSC;
    cursor: pointer;
    span {
        color: $regularFont;
    }
}
</style>
