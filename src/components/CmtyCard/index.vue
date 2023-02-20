<template>
    <div class="joinedContainer">
        <div
            class="community"
            v-for="community in cmtyCardList"
            :key="community.cmtyId"
            @click="$router.push(`/c/${community.cmtyId}`)"
        >
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
                            <span class="number">{{ community.cmtyPostsCount }}</span>
                            <span class="unit">发言量</span>
                        </div>
                    </div>
                </div>
                <div class="introduction">{{ community.cmtyBio }}</div>
            </div>
            <div class="joinAndFavorite">
                <button
                    class="goFavorite"
                    v-if="route.name == 'Joined' || route.name == 'Favorite'"
                    @click.stop="
                        reqAddToFavoriteCmty({
                            cmtyId: community.cmtyId,
                            isFavorite: community.isFavorite
                        })
                    "
                >
                    <i
                        class="iconfont"
                        :class="
                            community.isFavorite ? [favoriteClass, favoriteIcon] : unfavoriteClass
                        "
                    ></i>
                </button>
                <JoinBtn :cmtyInfo="community" size="default" parent="CmtyCard" />
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
function regetRouteInfo() {
    emit('regetCmtyCard')
}
async function reqJoinCmty(params: {cmtyId: number; isJoined: number}) {
    if (!params.isJoined) {
        let result = await updateUserCmty({request: 'join', ...params})
        joinCmtyMsg.value = result.data.message
    } else {
        let result = await updateUserCmty({request: 'unjoin', ...params})
        joinCmtyMsg.value = result.data.message
    }
    regetRouteInfo()
}
async function reqAddToFavoriteCmty(params: {cmtyId: number; isFavorite: number}) {
    if (!params.isFavorite) {
        let result = await updateUserCmty({request: 'addToFavorite', ...params})
        favoriteCmtyMsg.value = result.data.message
    } else {
        let result = await updateUserCmty({request: 'removeFromFavorite', ...params})
        favoriteCmtyMsg.value = result.data.message
    }
    regetRouteInfo()
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
            .goFavorite {
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
            }
        }
    }
}
</style>
