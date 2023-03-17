<template>
    <div class="userInfoContainer" v-if="(showUpdateInfo = true)">
        <div class="wrapper">
            <div class="scroll">
                <div class="top">
                    <div class="close" @click="close">
                        <i class="iconfont icon-guanbi1"></i>
                    </div>
                    <h2>编辑个人信息</h2>
                    <button class="save" @click.stop="reqUpdateUserInfo()">
                        <span> 保 存 </span>
                    </button>
                </div>
                <div class="userInfo">
                    <div class="cover">
                        <img :src="userStore.myInfo.cover" alt="" />
                    </div>
                    <div class="icon">
                        <div class="iconWrapper">
                            <div class="mask"></div>
                            <img :src="userStore.myInfo.avatar" alt="" />
                        </div>
                    </div>
                    <div class="form" ref="form">
                        <div class="param" prop="oldPassword">
                            <input v-model="updateparams.username" placeholder="用户名" />
                        </div>
                        <div class="param" prop="bio">
                            <input v-model="updateparams.bio" placeholder="简介" />
                        </div>
                        <div class="param" prop="bio">
                            <input v-model="updateparams.avatar" placeholder="头像" />
                        </div>
                        <div class="param" prop="bio">
                            <input v-model="updateparams.cover" placeholder="封面" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import scroll from '@/tools/scroll'
import {onMounted, reactive} from 'vue'
import useUserStore from '@/store/user'
import {storeToRefs} from 'pinia'
import {updateUserInfo} from '@/api'
import {showMessage} from '@/tools'
import router from '@/router'
const userStore = useUserStore()
const emit = defineEmits(['closeUpdate'])
let {showUpdateInfo} = storeToRefs(userStore)
function close() {
    emit('closeUpdate')
}
let updateparams = reactive({
    username: userStore.myInfo.username,
    bio: userStore.myInfo.boi,
    avatar: userStore.myInfo.avatar,
    cover: userStore.myInfo.cover
})
async function reqUpdateUserInfo() {
    let result = await updateUserInfo(updateparams)
    showMessage(result.message, result.status)
    if (!result.status) router.go(0)
}
onMounted(() => {})
</script>

<style scoped lang="scss">
$wrapperWidth: 621px;

.userInfoContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(mix($brandColor, black, 10%), 0.7);
    z-index: 997;

    .wrapper {
        position: relative;
        width: $wrapperWidth;
        height: 510px;
        background-color: white;
        border-radius: 20px;
        overflow: hidden;

        .scroll {
            position: absolute;
            height: inherit;
            width: inherit;
            overflow-y: scroll;

            .top {
                position: fixed;
                background-color: white;
                width: 604px;
                height: 60px;
                border-top-left-radius: 20px;
                z-index: 3;

                .close {
                    position: absolute;
                    display: flex;
                    top: 10px;
                    left: 10px;
                    justify-content: center;
                    align-items: center;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    transition: 0.3s;
                    cursor: pointer;

                    i {
                        font-size: 20px;
                        font-weight: bold;
                    }

                    &:hover {
                        background-color: mix($brandColor, white, 10%);
                    }
                }

                h2 {
                    position: absolute;
                    top: 10px;
                    left: 80px;
                    line-height: 40px;
                    font-size: 20px;
                    font-weight: bold;
                }

                .save {
                    position: absolute;
                    display: flex;
                    align-items: center;
                    right: 20px;
                    top: 10px;
                    border: none;
                    outline: none;
                    height: 40px;
                    padding: 20px;
                    background-color: $brandColor;
                    border-radius: 50px;
                    cursor: pointer;

                    span {
                        font-size: 17px;
                        color: white;
                        font-weight: bold;
                    }
                }
            }

            .userInfo {
                padding: 0 2px;

                .cover {
                    margin-top: 60px;
                    height: 200px;
                    width: 600px;
                    background-color: #99a9bf;
                    overflow: hidden;

                    img {
                        width: 600px;
                    }
                }

                .icon {
                    position: relative;
                    width: 100%;
                    height: 70px;
                    //background-color: blue;

                    .iconWrapper {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        position: absolute;
                        left: 20px;
                        top: -53px;
                        width: 106px;
                        height: 106px;
                        background-color: white;
                        border-radius: 50%;

                        .mask {
                            position: absolute;
                            width: 100px;
                            height: 100px;
                            /* z-index: 2; */
                            border-radius: 50%;
                            cursor: pointer;
                            transition: 0.1s;
                        }

                        img {
                            position: absolute;
                            width: 100px;
                            height: 100px;
                            background-color: red;
                            z-index: 1;
                            border-radius: 50%;
                            cursor: pointer;
                        }

                        &:hover .mask {
                            background-color: rgba($onHoverDark, 0.1);
                        }
                    }
                }

                .form {
                    padding: 20px;

                    .param {
                        //width: 100%;
                        height: 65px;
                        border: 1px solid $placeholderFont;
                        border-radius: 50px;
                        margin-bottom: 15px;
                        margin-left: 20px;
                        margin-right: 20px;
                        input {
                            width: 100%;
                            line-height: 65px;
                            font-size: 20px;
                            padding: 0 20px;
                            background-color: transparent;
                            border: none;
                            outline: none;
                        }
                    }
                }
            }
        }
    }
}
</style>
