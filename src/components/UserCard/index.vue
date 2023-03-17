<template>
    <div class="userCardContainer">
        <div
            class="user"
            v-for="user in userCardList"
            :key="user.userId"
            @click="$router.push(`/u/${user.userId}`)"
        >
            <div class="userIcon">
                <div>
                    <img
                        :src="
                            user.avatar ||
                            'https://i.pinimg.com/564x/05/1f/05/051f05110bbcf91b5127f997068f8264.jpg'
                        "
                        alt=""
                    />
                </div>
            </div>
            <div class="aboutUser">
                <div class="nameAndInfo">
                    <div class="userName">
                        <div class="name">
                            <span>{{ user.username }}</span>
                        </div>
                    </div>
                    <div class="userId">
                        <span>@{{ user.userId }}</span>
                    </div>
                </div>
                <div class="bio">
                    <span>{{ user.bio }}</span>
                </div>
            </div>
            <div class="aboutFollow">
                <FollowBtn :userInfo="user" size="default" parent="userCard" />
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import {updateUserCmty, updateUserUser} from '@/api'
import {computed, onMounted, ref, toRefs, watch} from 'vue'
import {useRoute} from 'vue-router'
import useUserStore from '@/store/user'
import FollowBtn from '../littleComponents/FollowBtn/FollowBtn.vue'
const userStore = useUserStore()

const route = useRoute()
const props = defineProps(['userCardList'])
let userCardList = computed(() => {
    return props.userCardList
})
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
    //console.log("onMounted的props:", props.cmtyCardList)
    //console.log("cmtyCardList:", cmtyCardList);
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

        .aboutUser {
            position: relative;
            margin-top: 20px;
            margin-left: 10px;
            padding-right: 20px;
            height: 100%;
            width: 698px-90px;
            /* background-color: darkblue; */

            .nameAndInfo {
                /* background-color: pink; */
                height: 50px;

                .userName {
                    display: flex;
                    height: 25px;

                    .name {
                        margin-right: 20px;

                        span {
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

            .bio {
                margin-bottom: 15px;
                /* background-color: blueviolet; */
            }
        }

        .aboutFollow {
            position: absolute;
            right: 20px;
            top: 21px;

            /* background-color: steelblue; */
            .follow {
                height: 35px;
                outline: none;
                border: 0;
                border-radius: 50px;
                cursor: pointer;

                &:hover {
                    background-color: mix($brandColor, black, 10%);
                }
            }

            .follow {
                font-size: 15px;
                background-color: $brandColor;
                color: white;
                font-weight: bold;
                vertical-align: middle;
                text-align: center;
                transition: 0.1s;
                padding: 0 15px;

                &:hover {
                    background-color: mix($brandColor, black, 90%);
                }
            }

            .unFollow {
                background-color: white;
                color: $mainFont;
                border: 1px solid $placeholderFont;
                padding: 0 15px;
                &:hover {
                    background-color: $button;
                }
            }
        }
    }
}
</style>
