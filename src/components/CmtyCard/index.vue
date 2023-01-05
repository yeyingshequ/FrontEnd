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
                        reqFavoriteCmty({
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
                <button
                    class="goJoin"
                    :class="{unJoin: community.isJoined}"
                    @click.stop="
                        reqJoinCmty({cmtyId: community.cmtyId, isJoined: community.isJoined})
                    "
                >
                    {{ community.isJoined ? '已加入' : '加入' }}
                </button>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import {favoriteCmty, getCmtyInfo, joinCmty, unFavoriteCmty, unJoinCmty} from '@/api'
import {computed, onMounted, ref, toRefs, watch} from 'vue'
import {useRoute} from 'vue-router'

const route = useRoute()
const emit = defineEmits([
    'regetJoinedCmty',
    'regetFavoriteCmty',
    'regetSquareCmty',
    'regetRecentCmty'
])
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
    switch (route.name) {
        case 'Joined':
            emit('regetJoinedCmty')
            break
        case 'Favorite':
            emit('regetFavoriteCmty')
            break
        case 'Square':
            emit('regetSquareCmty')
            break
        case 'Recent':
            emit('regetRecentCmty')
    }
}
async function reqJoinCmty(params: {userId: any; isJoined: any}) {
    if (!params.isJoined) {
        let result = await joinCmty(params)
        joinCmtyMsg.value = result.data.message
    } else {
        let result = await unJoinCmty(params)
        joinCmtyMsg.value = result.data.message
    }
    regetRouteInfo()
}
async function reqFavoriteCmty(params: {userId: any; isFavorite: any}) {
    if (!params.isFavorite) {
        let result = await favoriteCmty(params)
        favoriteCmtyMsg.value = result.data.message
    } else {
        let result = await unFavoriteCmty(params)
        favoriteCmtyMsg.value = result.data.message
    }
    regetRouteInfo()
}
onMounted(() => {
    //console.log("onMounted的props:", props.cmtyCardList)
    //console.log("cmtyCardList:", cmtyCardList);
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
            height: 90px;
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
            position: absolute;
            right: 40px;
            top: 21px;

            /* background-color: steelblue; */
            .goFavorite,
            .goJoin {
                height: 35px;
                outline: none;
                border: 0;
                border-radius: 50px;
                cursor: pointer;

                &:hover {
                    background-color: mix($brandColor, black, 10%);
                }
            }

            .goJoin {
                width: 80px;
                font-size: 15px;
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

            .unJoin {
                background-color: white;
                color: $mainFont;
                border: 1px solid $placeholderFont;

                &:hover {
                    background-color: mix($brandColor, white, 20%);
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
                    background-color: mix($brandColor, white, 20%);
                }

                .el-icon-chat-round {
                    font-size: 20px;
                }
            }
        }
    }
}
</style>
