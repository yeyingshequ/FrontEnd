<template>
    <div ref="wrapper">
        <Top :info="userInfo" parent="user" />
        <div class="cover">
            <img :src="userInfo.cover || ''" alt="" />
        </div>
        <!-- 当搜索的用户不存在时,展示这个 -->
        <div class="uncreated" v-if="message == '这是一个不存在的用户'">
            <div class="iconWrapper">
                <div class="icon">
                    <img :src="defaultAvatar" alt="" />
                </div>
            </div>
            <h1>{{ message }}</h1>
        </div>
        <div class="profile" v-if="status == 0">
            <div class="iconWrapper">
                <div class="icon">
                    <img :src="userInfo.avatar || defaultAvatar" alt="" />
                </div>
            </div>
            <div class="aboutUser">
                <div class="name">
                    <span>{{ userInfo.username }}</span>
                </div>
                <div class="uid">UID: {{ userInfo.userId }}</div>
                <div class="followshipCard">
                    <div class="followers" @click="router.push(`/u/${route.params.uid}/followers`)">
                        <span class="number">{{ userInfo.followerCount }}</span>
                        <span class="unit"> 关注者</span>
                    </div>
                    <div class="following" @click="router.push(`/u/${route.params.uid}/following`)">
                        <span class="number">{{ userInfo.followingCount }}</span>
                        <span class="unit"> 正在关注 </span>
                    </div>
                </div>
                <div class="introduction">
                    <span>{{ userInfo.bio }}</span>
                </div>
            </div>
            <div
                class="updateInfo"
                v-if="userStore.myInfo.userId == Number(route.params.uid)"
                @click="showUpdateInfo = true"
            >
                <span> 编辑个人信息 </span>
            </div>
            <div class="aboutFollow" v-if="userStore.myInfo.userId != Number(route.params.uid)">
                <SearchBtn size="default" />
                <FollowBtn :userInfo="userInfo" size="large" parent="user" />
            </div>
        </div>
        <updateUserInfo v-if="showUpdateInfo" @closeUpdate="closeUpdateInfo" />
        <Tab
            v-if="
                (status == 0 && route.path == `/u/${route.params.uid}/home`) ||
                route.path == `/u/${route.params.uid}/community`
            "
            :tabs="tabs"
        />
        <Tab
            ref="tab"
            v-if="
                (status == 0 && route.path == `/u/${route.params.uid}/following`) ||
                route.path == `/u/${route.params.uid}/followers`
            "
            :tabs="followTab"
        />
        <router-view></router-view>
    </div>
</template>
<script setup lang="ts" name="xxx">
import Post from '../../components/PostCard/index.vue'
import updateUserInfo from '@/pages/U/updateUserInfo/index.vue'
import {getUserInfo, updateUserUser} from '@/api'
import cookie from '@/tools/cookie'
import Tab from '@/components/Tab/index.vue'
import {computed, onMounted, onUnmounted, reactive, ref, watch} from 'vue'
import {RouterView, useRoute, useRouter} from 'vue-router'
import {storeToRefs} from 'pinia'
import useUserStore from '@/store/user'
import {Params} from 'express-serve-static-core'
import Top from '@/components/Top/Top.vue'
import emitter from '@/tools/mitt'
import yyReturn from '@/components/littleComponents/yy-button/yy-return.vue'
import FollowBtn from '@/components/littleComponents/FollowBtn/FollowBtn.vue'
import SearchBtn from '@/components/littleComponents/searchBtn/SearchBtn.vue'
import useMainStore from '@/store/index'
const mainStore = useMainStore()
const router = useRouter()
const userStore = useUserStore()
const route = useRoute()
const wrapper = ref()
const tab = ref()
const topStyle = computed(() => {
    return mainStore.topScroll
})

const tabs = [
    {
        Name: '帖子',
        id: 1,
        routeName: 'UserPost',
        router: `/u/${route.params.uid}/home`,
        default: true
    },
    {Name: '评论和回复', id: 2, router: '/communities/favorite', default: false},
    {
        Name: '关注的吧',
        id: 3,
        routeName: 'UserCmty',
        router: `/u/${route.params.uid}/community`,
        default: false
    }
]

const followTab = [
    {
        Name: '关注者',
        id: 4,
        routeName: 'Followers',
        router: `/u/${route.params.uid}/followers`,
        default: true
    },
    {
        Name: '正在关注',
        id: 5,
        routeName: 'Following',
        router: `/u/${route.params.uid}/following`,
        default: false
    }
]
let {userInfo} = storeToRefs(userStore)

let params = reactive({
    userId: Number(route.params.uid)
})
let message = ref('')
let status = ref(-1)
let {showUpdateInfo} = storeToRefs(userStore)
let defaultAvatar = 'https://i.pinimg.com/564x/05/1f/05/051f05110bbcf91b5127f997068f8264.jpg'
function closeUpdateInfo() {
    showUpdateInfo.value = false
}

async function reqGetUserInfo(params: object) {
    userStore.getUserInfo(params).then((res) => {
        message.value = res.message
        status.value = res.status
    })
    console.log('用户信息:', userInfo.value)
}
async function reqFollowUser(params: {objUserId: number; isFollowing: number; userId: number}) {
    if (!params.isFollowing) {
        let result = await updateUserUser({request: 'follow', objUserId: params.objUserId})
        message.value = result.data.message
    } else {
        let result = await updateUserUser({request: 'unFollow', objUserId: params.objUserId})
        message.value = result.data.message
    }
    /* if (userStore.userInfo.isFollowing) {
        userStore.userInfo.isFollowing = 0
    } else {
        userStore.userInfo.isFollowing = 1
    } */
    reqGetUserInfo({userId: params.userId})
}

let UID = computed(() => {
    return userStore.myInfo.userId
})
/* watch(route, (nv, ov) => {
    //console.log('nv:', nv.params.uid)
    //console.log(params.userId)
    if (Number(nv.params.uid) != params.userId) {
        params.userId = Number(nv.params.uid)
        reqGetUserInfo(params)
    }
}) */
let parentTop = ref('')
onMounted(() => {
    window.addEventListener('scroll', function () {
        //console.log('wrapper:', wrapper.value.getBoundingClientRect().top)
        mainStore.parentTop = wrapper.value.getBoundingClientRect().top
    })
    //console.log('userInfo:', userInfo)
    reqGetUserInfo(params)
    //前端个人主页
    emitter.on('regetUserInfo', () => {
        reqGetUserInfo(params)
    })
})
onUnmounted(() => {
    emitter.off('regetUserInfo')
})
</script>

<style scoped lang="scss">
.wrapper {
    position: relative;
    .cover {
        width: 100%;
        height: 233px;
        background-color: mix($brandColor, white, 30%);
    }

    .profile,
    .uncreated {
        position: relative;
        width: 100%;

        h1 {
            padding: 100px 189px;
        }

        .iconWrapper {
            display: flex;
            justify-content: center;
            position: absolute;
            align-items: center;
            left: 20px;
            top: -71.5px;
            width: 143px;
            height: 143px;
            background-color: white;
            border-radius: 50%;
            -webkit-user-select: none;

            img {
                width: 135px;
                height: 135px;
                margin-top: 4px;
                border-radius: 50%;
            }
        }

        .aboutUser {
            padding: 0 20px;
            padding-top: 85px;

            /* background-color: crimson; */
            .name {
                display: flex;
                align-items: center;
                height: 35px;

                span {
                    font-size: 20px;
                    font-weight: bold;
                }
            }

            .uid {
                margin-top: -3px;
                color: $regularFont;
            }

            .followshipCard {
                display: flex;
                align-items: baseline;
                margin-top: 10px;
                height: 37px;
                line-height: 30px;

                /* background-color: crimson; */
                .followers {
                    margin-right: 15px;
                }

                .number {
                    font-weight: 550;
                }

                .followers,
                .following {
                    cursor: pointer;

                    &:hover {
                        text-decoration: underline;
                    }
                }

                .unit {
                    font-size: 16px;
                    color: $regularFont;
                }
            }

            .introduction {
                margin: 10px 0;

                span {
                    color: $regularFont;
                }
            }
        }

        .updateInfo {
            position: absolute;
            top: 17.5px;
            right: 30px;
            height: 40px;
            padding: 0 20px;
            background-color: white;
            border: 1px $placeholderFont solid;
            border-radius: 50px;
            cursor: pointer;
            transition: 0.1s;
            -webkit-user-select: none;

            &:hover {
                background-color: mix($placeholderFont, white, 30%);
            }

            span {
                line-height: 40px;
                font-weight: bold;
            }
        }

        .aboutFollow {
            display: flex;
            position: absolute;
            top: 17.5px;
            right: 30px;
            -webkit-user-select: none;

            .follow {
                height: 40px;
                outline: none;
                border: 0;
                border-radius: 50px;
                cursor: pointer;
            }

            .follow {
                padding: 0 20px;
                font-size: 16px;
                background-color: $brandColor;
                color: white;
                font-weight: bold;
                vertical-align: middle;
                text-align: center;
                transition: 0.1s;

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
    }

    .board {
        width: 100%;
        height: 25px;

        /* background-color: yellowgreen; */
        ul {
            margin-left: 10px;

            li {
                display: inline;
                margin-right: 10px;
                color: $regularFont;
            }
        }
    }
}
</style>
