<template>
    <div>
        <Top :info="cmtyInfo" parent="community" v-if="message == '获取信息成功'" />
        <div class="cover">
            <img :src="cmtyInfo.cmtyCover || mainStore.defaultCover" alt="" />
        </div>
        <div class="profile" v-if="message == '这是一个不存在的社区'">
            <div class="unFind">
                <div class="iconWrapper">
                    <div class="icon">
                        <img :src="defaultAvatar" alt="" />
                    </div>
                </div>
                <div class="uncreatedCmty">
                    <h1>这个是个未创建的社区</h1>
                </div>
                <div class="addCmty">
                    <button @click="mainStore.showCmtyCreator = true">创建社区</button>
                </div>
            </div>
        </div>
        <div class="profile" v-if="message == '获取信息成功'">
            <div
                class="iconWrapper"
                @click="mainStore.reqDisplayImg(cmtyInfo.cmtyAvatar || defaultAvatar, 'avatar')"
            >
                <div class="icon">
                    <div class="mask"></div>
                    <img :src="cmtyInfo.cmtyAvatar || defaultAvatar" alt="" />
                </div>
            </div>
            <div class="aboutBar">
                <div class="name">
                    <span>{{ cmtyInfo.cmtyName }}吧</span>
                </div>
                <div class="membersAndComments">
                    <div class="members">
                        <span class="number">{{ formatNumber(cmtyInfo.cmtyJoinedCount) }}</span>
                        <span class="unit"> 成员</span>
                    </div>
                    <div class="comments">
                        <span class="number">{{
                            formatNumber(cmtyInfo.totalPostingCount) || 0
                        }}</span>
                        <span class="unit"> 发言</span>
                    </div>
                </div>
            </div>
            <div class="introduction">
                <span>{{ cmtyInfo.cmtyDescription }}</span>
            </div>
            <div class="joinAndFavorite">
                <JoinBtn :cmtyInfo="cmtyInfo" size="large" parent="C" />
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
    </div>
</template>
<script setup lang="ts">
import JoinBtn from '@/components/littleComponents/JoinBtn/JoinBtn.vue'
import {onMounted, onUnmounted, reactive, ref} from 'vue'
import {useRoute, RouterView, useRouter} from 'vue-router'
import {storeToRefs} from 'pinia'
import useMainStore from '@/store/index'
import useRouterStore from '@/store/community'
import emitter from '@/tools/mitt'
import Top from '@/components/Top/Top.vue'
import Tab from '@/components/Tab/index.vue'
import useCmtyStore from '@/store/community'
import {formatNumber} from '@/tools'
const router = useRouter()
const routerStore = useRouterStore()
const mainStore = useMainStore()
const cmtyStore = useCmtyStore()

const route = useRoute()
const tabs = reactive([
    {routeName: 'CmtyHome', Name: '首页', id: 1, router: '/communities/joined'},
    {routeName: '', Name: '精品贴', id: 2, router: '/communities/favorite'},
    {routeName: '', Name: '本吧详情', id: 3, router: '/communities/square'}
])
let gotResponse = ref(false)
let params = reactive({cmtyId: Number(route.params.cmtyId)})

let {cmtyInfo} = storeToRefs(routerStore)
let defaultAvatar = ref('https://i.pinimg.com/564x/ba/5e/67/ba5e6704f5805a32f036b382265d71a4.jpg')
let defaultCover = ref('https://i.328888.xyz/2023/02/20/XSyxy.jpeg')
let message = ref('')

//获取社区信息
async function reqGetCmtyInfo(params: {cmtyId: number}) {
    routerStore.getCmtyInfo(params).then((res) => {
        message.value = res
        if (res.status) gotResponse.value = true
    })
}

onMounted(() => {
    reqGetCmtyInfo(params)
    //router.push(`/c/${route.params.cmtyId}/home`)
    emitter.on('reqGetCmtyInfo', () => {
        reqGetCmtyInfo(params)
    })
})
onUnmounted(() => {
    emitter.off('reqGetCmtyInfo')
    cmtyStore.cmtyInfo = {
        cmtyAvatar: '' || null,
        cmtyDescription: '',
        cmtyCategory: '',
        cmtyCover: '',
        cmtyHots: '',
        cmtyId: 0,
        cmtyJoinedCount: 0,
        totalPostingCount: 0,
        cmtyName: '',
        postCount: 0,
        commentCount: 0,
        cmtyReplyCount: 0,
        userCmty: {
            isJoined: false,
            isFavorite: false,
            lastVisitTime: false,
            joinedTime: false,
            rankTime: false,
            favoriteTime: false
        }
    }
})
</script>
<style scoped lang="scss">
div {
    .cover {
        position: relative;
        width: 100%;
        height: 0;
        padding-bottom: 33.33%; /* 16:9的比例 */
        overflow: hidden;
        img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    .profile {
        position: relative;
        width: 100%;
        /* height: 110px; */

        .unFind {
            position: relative;
            display: flex;
            height: 400px;

            .uncreatedCmty {
                position: absolute;
                top: 0;
                left: 0;
                transform: translate(50%, 400%);
                @extend .flexCentreGSC;
            }

            .addCmty {
                position: absolute;
                bottom: 10px;
                left: 50%;
                transform: translateX(-50%);

                button {
                    @extend .flexCentreGSC;
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
        }

        /* background-color: blue; */
        .iconWrapper {
            @extend .flexCentreGSC;
            position: absolute;

            left: 20px;
            top: 0%;
            width: 20.5%;
            height: 20.5%;
            padding-bottom: 20.5%; /* 1:1的比例 */
            background-color: white;
            border-radius: 50%;
            -webkit-user-select: none;
            overflow: hidden;
            cursor: pointer;
            transform: translate(0, -50%);
            &:hover {
                .mask {
                    background-color: rgba(black, 0.1);
                }
            }
            .icon {
                position: absolute;
                left: 0;
                top: 0;
                margin: 3px;
                .mask {
                    position: absolute;
                    left: 0;
                    top: 0;
                    height: 97%;
                    width: 100%;
                    border-radius: 50%;
                    z-index: 2;
                    transition: 0.1s;
                    /* &:hover {
                        background-color: rgba(black, 0.1);
                    } */
                }

                img {
                    height: 100%;
                    width: 100%;
                    object-fit: cover;
                    border-radius: 50%;
                }
            }
        }

        .aboutBar {
            position: absolute;
            top: 0;
            left: 200px;
            width: 560px;
            height: 75px;
            @media (max-width: 717px) {
                display: none;
            }
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
                white-space: nowrap;

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
                    white-space: nowrap;
                }
            }
        }

        .introduction {
            padding-top: 12%;
            padding-bottom: 1%;
            padding-left: 20px;
            min-height: 65px;
            .aboutBarInIntro {
                display: none;
                width: 560px;
                height: 75px;

                /* background-color: crimson; */
                .name {
                    display: flex;
                    align-items: center;
                    height: 45px;

                    span {
                        font-size: 24px;
                        color: $mainFont;
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
                        color: $mainFont;
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
                    background-color: mix($brandColor, white, 10%);
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
                -webkit-user-select: none;
                &:hover {
                    background-color: $onHoverDark;
                }
            }

            .unJoin {
                background-color: white;
                color: $mainFont;
                border: 1px solid $placeholderFont;

                &:hover {
                    background-color: mix($brandColor, white, 10%);
                }
            }
        }
    }
}
</style>
