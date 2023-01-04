<template>
    <div class="userInfoContainer" v-if="(showUpdateInfo = true)">
        <div class="wrapper">
            <div class="scroll">
                <div class="top">
                    <div class="close" @click="close">
                        <i class="iconfont icon-guanbi1"></i>
                    </div>
                    <h2>编辑个人信息</h2>
                    <div class="save">
                        <span> 保 存 </span>
                    </div>
                </div>
                <div class="userInfo">
                    <div class="cover">
                        <img src="@/images/二次元壁纸樱花.jpg" alt="" />
                    </div>
                    <div class="icon">
                        <div class="iconWrapper">
                            <div class="mask"></div>
                            <img src="@/images/1_BigPic.png" alt="" />
                        </div>
                    </div>
                    <div class="form" ref="form">
                        <div prop="oldPassword">
                            <input v-model="updateparams.username" placeholder="用户名" />
                        </div>
                        <div prop="bio">
                            <input v-model="updateparams.boi" placeholder="简介" />
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
const userStore = useUserStore()
const emit = defineEmits(['closeUpdate'])
let {showUpdateInfo} = storeToRefs(userStore)
function close() {
    emit('closeUpdate')
    scroll.move()
}
let updateparams: {username: string; boi: string} = reactive({
    username: userStore.userInfo.username,
    boi: userStore.userInfo.boi
})
onMounted(() => {
    scroll.stop()
})
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
                    height: 40px;
                    padding: 20px;
                    background-color: $brandColor;
                    border-radius: 50px;
                    cursor: pointer;

                    span {
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
                            z-index: 2;
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

                    input {
                        height: 65px;
                        width: 100%;
                        font-size: 20px;
                        outline: none;
                        padding: 0 20px;
                        margin-bottom: 30px;
                        border-radius: 5px;
                        border: 1px solid $placeholderFont;
                    }
                }
            }
        }
    }
}
</style>
