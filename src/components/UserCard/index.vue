<template>
    <div class="userCardContainer">
        <div
            class="user"
            v-for="user in userCardList"
            :key="user.userId"
            @click="$router.push(`/u/${user.userId}`)"
        >
            <div class="leftPanel">
                <div class="leftPanel">
                    <div class="iconWrapper">
                        <Avatar
                            type="user"
                            :id="user.userId"
                            :avatar="user.avatar || mainStore.defaultAvatar"
                        />
                    </div>
                </div>
            </div>

            <div class="rightPanel">
                <div class="nameAndInfo">
                    <div>
                        <div class="userName">
                            <div class="name">
                                <span>{{ user.username }}</span>
                            </div>
                        </div>
                        <div class="userId">
                            <span>UID: {{ user.userId }}</span>
                        </div>
                    </div>
                    <div class="aboutFollow">
                        <FollowBtn :userInfo="user" size="default" parent="userCard" />
                    </div>
                </div>

                <div class="bio">
                    <span>{{ user.bio }}</span>
                </div>
            </div>
        </div>
        <BottomLoading :parent="parent" :list="userCardList" />
    </div>
</template>
<script setup lang="ts">
import {updateUserCmty, updateUserUser} from '@/api'
import {computed, onMounted, ref, toRefs, watch} from 'vue'
import {useRoute} from 'vue-router'
import useUserStore from '@/store/user'
import FollowBtn from '../littleComponents/FollowBtn/FollowBtn.vue'
import useMainStore from '@/store/index'
import BottomLoading from '../littleComponents/Loading/bottomLoading.vue'
const mainStore = useMainStore()
const userStore = useUserStore()

const route = useRoute()
const props = defineProps(['userCardList', 'parent'])

let {parent, userCardList} = toRefs(props)
let message = ref('')
async function reqFollowUser(params: {objUserId: number; isFollowing: boolean; userId: number}) {
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
}
function checkIsFollowing(user: {objUser: {isFollowing: any}}) {
    if (user.objUser) {
        return user.objUser.isFollowing ? true : false
    } else {
        return false
    }
}
onMounted(() => {
    //console.log('onMounted的props:', props.cmtyCardList)
    //console.log('cmtyCardList:', cmtyCardList)
})
</script>
<style scoped lang="scss">
.userCardContainer {
    position: relative;
    .user {
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
            margin-top: 20px;
            margin-left: 10px;
            padding-right: 20px;
            height: 100%;
            position: relative;
            /* width: 698px-90px; */
            /* background-color: darkblue; */
            flex-grow: 1;

            .nameAndInfo {
                display: flex;
                height: 50px;
                width: 100%;
                > div:first-child {
                    width: 100%;
                    .userName {
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
                    }

                    .userId {
                        display: flex;
                        align-items: baseline;
                        height: 24px;
                        span {
                            color: $regularFont;
                        }
                    }
                }
            }
            .aboutFollow {
                display: flex;

                /* position: absolute; */
                right: 20px;
                top: 21px;
            }
        }

        .bio {
            margin-bottom: 15px;
            /* background-color: blueviolet; */
        }
    }
}
</style>
