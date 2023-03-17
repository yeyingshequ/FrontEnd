<template>
    <div class="joinedContainer" v-if="cmtyCardList">
        <div
            class="community"
            v-for="community in cmtyCardList"
            :key="community.cmtyId"
            @click="$router.push(`/c/${community.cmtyId}`)"
        >
            <div v-if="community.cmtyId" class="cmtyCard">
                <div class="userIcon">
                    <div>
                        <img
                            :src="
                                community.cmtyAvatar ||
                                'https://i.pinimg.com/564x/05/1f/05/051f05110bbcf91b5127f997068f8264.jpg'
                            "
                            alt=""
                        />
                    </div>
                </div>
                <div class="aboutCommunity">
                    <div class="nameAndInfo">
                        <div class="communityName">
                            <div class="name">
                                <span>{{ community.cmtyName }}吧</span>
                            </div>
                            <div class="hot">
                                <i class="iconfont icon-redu"></i>
                                <span>{{ community.cmtyHots }}</span>
                            </div>
                        </div>
                        <div class="membersAndComments">
                            <div class="members">
                                <span class="number">{{ community.cmtyJoinedCount }}</span>
                                <span class="unit">关注者</span>
                            </div>
                            <div class="comments">
                                <span class="number">{{ community.totalPostingCount || 0 }}</span>
                                <span class="unit">发言量</span>
                            </div>
                        </div>
                    </div>
                    <div class="introduction">{{ community.cmtyDescription }}</div>
                </div>
                <div class="joinAndFavorite">
                    <!-- <button
                        class="goFavorite"
                        v-if="route.name == 'Joined' || route.name == 'Favorite'"
                        @click.stop="
                            reqAddToFavoriteCmty(community, {
                                cmtyId: community.cmtyId,
                                isFavorite: isFavorite(community)
                            })
                        "
                    >
                        <i
                            class="iconfont"
                            :class="
                                isFavorite(community)
                                    ? [favoriteClass, favoriteIcon]
                                    : unfavoriteClass
                            "
                        ></i>
                    </button> -->
                    <FavoriteBtn :cmtyInfo="community" size="default" parent="CmtyCard" />
                    <JoinBtn :cmtyInfo="community" size="default" parent="CmtyCard" />
                </div>
            </div>
            <div v-if="!community.cmtyId" class="cmtyCard">
                <div class="userIcon">
                    <div>
                        <img
                            :src="
                                community.cmtyAvatar ||
                                'https://i.pinimg.com/564x/05/1f/05/051f05110bbcf91b5127f997068f8264.jpg'
                            "
                            alt=""
                        />
                    </div>
                </div>
                <div class="unSearched">
                    <span>没有找到"{{ mainStore.searchKeyWord }}"吧</span>
                </div>
                <div class="createCmty">
                    <button @click.stop="mainStore.showCmtyCreator = true">创建社区</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import {updateUserCmty} from '@/api'
import emitter from '@/tools/mitt'
import {onMounted, onUnmounted, ref, toRefs} from 'vue'
import {useRoute} from 'vue-router'
import JoinBtn from '../littleComponents/JoinBtn/JoinBtn.vue'
import useMainStore from '@/store/index'
import FavoriteBtn from '../littleComponents/FavoriteBtn/FavoriteBtn.vue'
const mainStore = useMainStore()
const route = useRoute()
const emit = defineEmits(['regetCmtyCard'])
const props = defineProps(['cmtyCardList'])
let {cmtyCardList} = toRefs(props)
/**特别关注的图标类型以及颜色**/
let favoriteClass = ref('icon-favorite')
let unfavoriteClass = ref('icon-unfavorite')
let favoriteIcon = ref('favoriteIcon')
/**后端响应的信息**/
let joinCmtyMsg = ref('')
let favoriteCmtyMsg = ref('')
function checkUserCmty(cmty: {userCmty: object}) {
    return cmty.userCmty ? cmty.userCmty : null
}
function regetRouteInfo() {
    emit('regetCmtyCard')
}
let isFavorite = (cmty: {userCmty: {isFavorite: any}}) => {
    return cmty.userCmty ? cmty.userCmty.isFavorite : null
}

async function reqAddToFavoriteCmty(
    cmty: {userCmty: {isFavorite: boolean}},
    params: {cmtyId: number; isFavorite: number}
) {
    if (!params.isFavorite) {
        let result = await updateUserCmty({request: 'addToFavorite', ...params})
        favoriteCmtyMsg.value = result.data.message
        cmty.userCmty.isFavorite = true
    } else {
        let result = await updateUserCmty({request: 'removeFromFavorite', ...params})
        favoriteCmtyMsg.value = result.data.message
        cmty.userCmty.isFavorite = true
    }

    /* regetRouteInfo() */
}
onMounted(() => {
    emitter.on('regetCmtyCard', () => {
        //console.log('已经触发 regetCmtyCard')
        regetRouteInfo()
    })
})
onUnmounted(() => {
    emitter.off('regetCmtyCardMitt')
})
</script>
<style scoped lang="scss">
.joinedContainer {
    position: relative;

    .community {
        .cmtyCard {
            position: relative;
            display: flex;
            width: 100%;
            height: 100%;
            border-bottom: 1px #f6f6f6 solid;
            cursor: pointer;

            /* background-color: aqua; */
            &:hover {
                background-color: mix(#ff44aa, white, 10%);
            }
            .userIcon {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100px;
                width: 100px;
                /*           background-color: blueviolet; */

                div {
                    width: 60px;
                    height: 60px;
                    /* background-color: red; */

                    img {
                        width: inherit;
                        height: inherit;
                        border-radius: 50%;
                    }
                }
            }

            .aboutCommunity {
                position: relative;
                margin-top: 15px;
                margin-left: 10px;

                height: 100%;
                /* background-color: darkblue; */

                .nameAndInfo {
                    /* background-color: pink; */
                    height: 50px;

                    .communityName {
                        display: flex;
                        height: 25px;

                        .name {
                            margin-right: 20px;

                            span {
                                font-size: large;
                                font-weight: bold;
                            }
                        }

                        .hot {
                            color: #e50404;

                            i {
                                margin-right: 5px;
                            }

                            span {
                                font-size: 16px;
                                color: #606266;
                                font-weight: normal;
                            }
                        }
                    }

                    .membersAndComments {
                        display: flex;
                        align-items: baseline;
                        height: 24px;

                        /* background-color: crimson; */
                        .members {
                            margin-right: 15px;
                        }

                        .number {
                            margin-right: 5px;
                            font-size: 14px;
                            font-weight: 550;
                        }

                        .unit {
                            font-size: 14px;
                            color: $regularFont;
                        }
                    }
                }

                .introduction {
                    margin-bottom: 15px;
                    /* background-color: blueviolet; */
                }
            }

            .joinAndFavorite {
                display: flex;
                position: absolute;
                right: 20px;
                top: 21px;

                /* background-color: steelblue; */
                /* .goFavorite {
                    height: 35px;
                    outline: none;
                    border: 0;
                    border-radius: 50px;
                    cursor: pointer;

                    &:hover {
                        background-color: mix($brandColor, black, 10%);
                    }
                }
                .goFavorite {
                    width: 35px;
                    color: $regularFont;
                    background-color: white;
                    border: 1px $placeholderFont solid;
                    margin-right: 20px;
                    transition: 0.1s;

                    i {
                        font-size: 16px;
                    }

                    .favoriteIcon {
                        color: $brandColor;
                    }

                    &:hover {
                        background-color: $button;
                    }

                    .el-icon-chat-round {
                        font-size: 20px;
                    }
                } */
            }
            .createCmty {
                display: flex;
                position: absolute;
                right: 20px;
                top: 50%;
                transform: translateY(-18px);
                button {
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
            }
            .unSearched {
                height: inherit;
                position: absolute;
                top: 50%;
                left: 110px;
                transform: translateY(-12px);
                span {
                    font-size: large;
                    font-weight: bold;
                }
            }
        }
    }
}
</style>
