<template>
    <div>
        <div class="cover"></div>
        <div class="profile" v-if="message !== '获取信息成功'">
            <div class="iconWrapper">
                <div class="icon">
                    <img :src="defaultAvatar" alt="" />
                </div>
            </div>
            <div class="uncreatedCmty">
                <h1>{{ message }}</h1>
            </div>
            <div class="addCmty">
                <button @click="showCmtyCreator = true">创建社区</button>
            </div>
        </div>
        <div class="profile" v-if="message == '获取信息成功'">
            <div class="iconWrapper">
                <div class="icon">
                    <img :src="cmtyInfo.avatar || defaultAvatar" alt="" />
                </div>
            </div>
            <div class="aboutBar">
                <div class="name">
                    <span>{{ cmtyInfo.cmtyName }}吧</span>
                </div>
                <div class="membersAndComments">
                    <div class="members">
                        <span class="number">{{ cmtyInfo.cmtyJoinedCount }}</span>
                        <span class="unit"> 成员</span>
                    </div>
                    <div class="comments">
                        <span class="number">{{ cmtyInfo.cmtyPostsCount || 0 }}</span>
                        <span class="unit"> 发言量</span>
                    </div>
                </div>
            </div>
            <div class="introduction">
                <span>{{ cmtyInfo.cmtyBio }}</span>
            </div>
            <div class="joinAndFavorite">
                <button
                    class="join"
                    :class="{unJoin: cmtyInfo.isJoined}"
                    @click="reqJoinCmty(cmtyInfo)"
                >
                    {{ cmtyInfo.isJoined ? '已加入' : '加入' }}
                </button>
            </div>
        </div>
        <Tab :tabs="tabs" v-if="message == '获取信息成功'" />
        <!-- <div class="board">
        <ul>
            <li>
                <span>派送专区</span>
            </li>
            <li>
                <span>交换专区</span>
            </li><li>
                <span>咨询专区</span>
            </li><li>
                <span>公告专区</span>
            </li><li>
                <span>交流专区</span>
            </li><li>
                <span>吧主推荐</span>
            </li>
        </ul>
    </div> -->
        <router-view></router-view>
        <CmtyCreator v-if="showCmtyCreator" />
    </div>
</template>
<script setup lang="ts">
import PostCard from '../../components/PostCard/index.vue'
import CmtyCreator from '@/pages/C/CmtyCreator/index.vue'
import {favoriteCmty, getCmtyInfo, joinCmty, unFavoriteCmty, unJoinCmty} from '@/api'
import storage from '@/tools/storage'
import CmtyHome from '@/pages/C/CmtyHome/index.vue'
import rename from '@/tools/rename'
import moment from 'moment'
import {onMounted, reactive, ref} from 'vue'
import {useRoute, RouterView} from 'vue-router'
import {storeToRefs} from 'pinia'
import useMainStore from '@/store/index'
import useRouterStore from '@/store/community'
import router from '@/router'
const routerStore = useRouterStore()
const mainStore = useMainStore()

const route = useRoute()
const tabs = reactive([
    {routeName: 'CmtyHome', Name: '首页', id: 1, router: '/communities/joined'},
    {routeName: '', Name: '精品贴', id: 2, router: '/communities/favorite'},
    {routeName: '', Name: '本吧详情', id: 3, router: '/communities/square'}
])

let params = reactive({cmtyId: route.params.cmtyId})

let {cmtyInfo} = storeToRefs(routerStore)
let defaultAvatar = ref('https://i.pinimg.com/564x/ba/5e/67/ba5e6704f5805a32f036b382265d71a4.jpg')
let defaultCover = ref('https://i.pinimg.com/564x/ba/5e/67/ba5e6704f5805a32f036b382265d71a4.jpg')
let message = ref('')
let {showCmtyCreator} = storeToRefs(mainStore)
let joinCmtyMsg = ref('')
let favoriteCmtyMsg = ref('')
/**特别关注的图标类型以及颜色**/
let favoriteClass = ref('icon-favorite')
let unfavoriteClass = ref('icon-unfavorite')
let favoriteIcon = ref('favoriteIcon')

//获取社区信息
async function reqGetCmtyInfo(params: {cmtyId: string | string[]}) {
    routerStore.getCmtyInfo(params).then((res) => {
        message.value = res
    })
}
//加入社区
async function reqJoinCmty(params: any) {
    if (!params.isJoined) {
        let result: any = await joinCmty(params)
        joinCmtyMsg.value = result.data.message
    } else {
        let result = await unJoinCmty(params)
        joinCmtyMsg.value = result.data.message
    }
    await reqGetCmtyInfo(params)
}

onMounted(() => {
    reqGetCmtyInfo(params)
    router.push(`/c/${route.params.cmtyId}/home`)
})
</script>
<style scoped lang="scss">
div {
    .cover {
        width: 100%;
        height: 233px;
        background-image: url(@/images/communityBackground.jpg);
    }

    .profile {
        position: relative;
        width: 100%;
        height: 110px;

        .uncreatedCmty {
            padding: 100px 189px;
        }

        .addCmty {
            padding: 0 289px;

            button {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 50px;
                padding: 20px;
                font-size: 20px;
                outline: none;
                border: 0;
                color: white;
                background-color: $brandColor;
                border-radius: 50px;
                font-weight: bold;
                cursor: pointer;
                transition: 0.1s;

                &:hover {
                    background-color: $onHoverDark;
                }
            }
        }

        /* background-color: blue; */
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

            img {
                width: 135px;
                height: 135px;
                margin-top: 4px;
                border-radius: 50%;
            }
        }

        .aboutBar {
            position: absolute;
            top: 0;
            left: 200px;
            width: 560px;
            height: 75px;

            /* background-color: crimson; */
            .name {
                display: flex;
                align-items: center;
                height: 45px;

                span {
                    font-size: 24px;
                }
            }

            .membersAndComments {
                display: flex;
                align-items: baseline;
                height: 37px;
                line-height: 30px;

                /* background-color: crimson; */
                .members {
                    margin-right: 15px;
                }

                .number {
                    font-weight: 550;
                }

                .members,
                .comments {
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
        }

        .introduction {
            position: absolute;
            top: 80px;
            left: 20px;

            span {
                color: $regularFont;
            }
        }

        .joinAndFavorite {
            position: absolute;
            top: 17.5px;
            right: 30px;

            .favorite,
            .join {
                height: 40px;
                outline: none;
                border: 0;
                border-radius: 50px;
                cursor: pointer;
            }

            i {
                font-size: 16px;
            }

            .favorite {
                width: 40px;
                color: $regularFont;
                background-color: white;
                border: 1px #c0c4cc solid;
                margin-right: 20px;
                transition: 0.1s;

                &:hover {
                    background-color: mix($brandColor, white, 20%);
                }

                .favoriteIcon {
                    color: $brandColor;
                }
            }

            .join {
                width: 80px;
                background-color: $brandColor;
                color: white;
                font-size: 15px;
                font-weight: bold;
                transition: 0.1s;

                &:hover {
                    background-color: $onHoverDark;
                }
            }

            .unJoin {
                background-color: white;
                color: $mainFont;
                border: 1px solid $placeholderFont;

                &:hover {
                    background-color: mix($brandColor, white, 20%);
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
