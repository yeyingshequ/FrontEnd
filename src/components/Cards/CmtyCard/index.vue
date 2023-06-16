<template>
    <div class="joinedContainer">
        <div
            v-if="cmtyCardList"
            class="community"
            v-for="community in cmtyCardList"
            :key="community.cmtyId"
            @click="$router.push(`/c/${community.cmtyId}`)"
        >
            <div v-if="community.cmtyId" class="cmtyCard">
                <LeftAvatarPanel
                    type="community"
                    :id="community.cmtyId"
                    :avatar="community.cmtyAvatar || mainStore.defaultAvatar"
                />
                <div class="rightPanel">
                    <div class="nameAndInfo">
                        <div>
                            <div class="communityName">
                                <div class="name">
                                    <span>{{ community.cmtyName }}吧</span>
                                </div>
                                <!-- <div class="hot">
                                    <i class="iconfont icon-redu"></i>
                                    <span>{{ community.cmtyHots }}</span>
                                </div> -->
                            </div>
                            <span class="membersAndComments">
                                <span class="members">
                                    <span class="number">{{
                                        formatNumber(community.cmtyJoinedCount)
                                    }}</span>
                                    <span class="unit">成员</span>
                                </span>
                                <span class="comments">
                                    <span class="number">{{
                                        formatNumber(community.totalPostingCount) || 0
                                    }}</span>
                                    <span class="unit">发言</span>
                                </span>
                            </span>
                        </div>
                        <div class="joinAndFavorite">
                            <FavoriteBtn :cmtyInfo="community" size="default" parent="CmtyCard" />
                            <JoinBtn :cmtyInfo="community" size="default" parent="CmtyCard" />
                        </div>
                    </div>
                    <div class="introduction">{{ community.cmtyDescription }}</div>
                </div>
            </div>
            <div v-if="!community.cmtyId" class="cmtyCard">
                <div class="leftPanel">
                    <div>
                        <img :src="community.cmtyAvatar || mainStore.defaultAvatar" alt="" />
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
        <BottomLoading :parent="parent" :list="cmtyCardList" />
    </div>
</template>
<script setup lang="ts">
import {updateUserCmty} from '@/api'
import emitter from '@/tools/mitt'
import {nextTick, onMounted, onUnmounted, ref, toRefs, watch} from 'vue'
import {useRoute} from 'vue-router'
import JoinBtn from '../../littleComponents/JoinBtn/JoinBtn.vue'
import useMainStore from '@/store'
import FavoriteBtn from '../../littleComponents/FavoriteBtn/FavoriteBtn.vue'
import BottomLoading from '../../littleComponents/Loading/bottomLoading.vue'
import {formatNumber} from '@/tools'
import LeftAvatarPanel from '@/components/littleComponents/Avatar/LeftAvatarPanel.vue'

const mainStore = useMainStore()
const route = useRoute()
const props = defineProps({
    cmtyCardList: {
        type: Array as () => any[],
        default: () => []
    },
    parent: {
        type: String,
        default: ''
    }
})

let {cmtyCardList, parent} = toRefs(props)
watch(
    cmtyCardList?.value,
    (ov, nv) => {
        nextTick(() => {
            //console.log('更新')
            //console.log('cmtyCardList:', cmtyCardList?.value)
        })
    },
    {immediate: true, deep: true}
)

onMounted(() => {
    //console.log('cmtyCardList:', cmtyCardList)
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
            .leftPanel {
                flex-shrink: 0;
                /*           background-color: blueviolet; */

                .iconWrapper {
                    @extend .flexCentreGSC;
                    width: 90px;
                    height: 90px;
                    /* background-color: red; */
                }
            }

            .rightPanel {
                position: relative;
                margin-top: 15px;
                margin-left: 10px;
                padding-right: 20px;
                height: 100%;
                width: 100%;
                /* background-color: darkblue; */

                .nameAndInfo {
                    /* background-color: pink; */
                    display: flex;
                    height: 50px;
                    width: 100%;
                    > div:first-child {
                        width: 100%;
                        .communityName {
                            display: flex;
                            height: 25px;

                            .name {
                                margin-right: 20px;
                                word-break: break-all;
                                span {
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                    display: -webkit-box;
                                    -webkit-line-clamp: 1;
                                    -webkit-box-orient: vertical;
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
                            overflow: hidden;
                            text-overflow: ellipsis;
                            display: -webkit-box;
                            -webkit-line-clamp: 1;
                            -webkit-box-orient: vertical;

                            .members,
                            .comments {
                                margin-right: 15px;

                                @media (max-width: 537px) {
                                    margin-right: 10px;
                                }
                                .number {
                                    margin-right: 3px;
                                    font-size: 14px;
                                    font-weight: 550;
                                }

                                .unit {
                                    font-size: 12px;
                                    color: $regularFont;
                                }
                            }
                        }
                    }

                    .joinAndFavorite {
                        display: flex;
                        justify-content: center;
                        /* align-items: center; */
                        /* position: absolute; */
                        right: 20px;
                        top: 21px;
                    }
                }

                .introduction {
                    margin-bottom: 15px;
                    /* background-color: blueviolet; */
                }
            }

            .joinAndFavorite {
                display: flex;

                /* position: absolute; */

                top: 21px;
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
