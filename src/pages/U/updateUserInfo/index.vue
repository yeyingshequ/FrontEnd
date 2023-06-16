<template>
    <div class="userInfoContainer" v-if="showUpdateInfo == true">
        <div class="wrapper">
            <div class="scroll">
                <LoadingSpinner :isLoading="isLoading" :isOpaque="false" />
                <div class="top">
                    <div class="close" @click="close()">
                        <i v-if="selection == 'userInfo'" class="iconfont icon-guanbi1"></i>
                        <i v-if="selection != 'userInfo'" class="iconfont icon-fanhui"></i>
                    </div>
                    <h2>编辑个人信息</h2>
                    <button class="save" @click.stop="reqUpdateUserInfo(selection)">
                        <span> 保 存 </span>
                    </button>
                </div>
                <div v-if="selection == 'userInfo'" class="userInfo">
                    <div class="cover">
                        <input
                            type="file"
                            id="coverInput"
                            ref="fileInput"
                            @change="cropperFn.selectImg('cover', $event)"
                        />
                        <div class="mask">
                            <label for="coverInput" class="insertImg">
                                <i class="iconfont icon-camera"></i>
                            </label>
                        </div>
                        <img :src="userStore.myInfo.cover || mainStore.defaultCover" alt="" />
                    </div>
                    <div class="icon">
                        <div class="iconWrapper">
                            <input
                                type="file"
                                id="avatarInput"
                                ref="fileInput"
                                @change="cropperFn.selectImg('avatar', $event)"
                            />
                            <div class="mask">
                                <label for="avatarInput" class="insertImg">
                                    <i class="iconfont icon-camera"></i>
                                </label>
                            </div>
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
                        <!-- <div class="param" prop="bio">
                            <input v-model="updateparams.avatar" placeholder="头像" />
                        </div>
                        <div class="param" prop="bio">
                            <input v-model="updateparams.cover" placeholder="封面" />
                        </div> -->
                    </div>
                </div>
                <!-- <img :src="cropperData.croppingImg" alt="" /> -->
                <div v-if="selection == 'cropper'" class="cropper">
                    <Cropper
                        :type="cropperData.cropperType"
                        ref="cropperRef"
                        :croppingImg="cropperData.croppingImg"
                        @sendImg="cropperFn.setCroppedImg"
                    />
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import {nextTick, onMounted, onBeforeUnmount, reactive, ref} from 'vue'
import useUserStore from '@/store/user'
import {storeToRefs} from 'pinia'
import {updateUserAvatar, updateUserCover, updateUserInfo} from '@/api'
import {base64ToFile, showMessage, uploadImg} from '@/tools'
import useMainStore from '@/store/index'
import 'cropperjs/dist/cropper.css'
import Cropper from '@/pages/U/updateUserInfo/cropper.vue'
import emitter from '@/tools/mitt'
import LoadingSpinner from '@/components/littleComponents/Loading/loadingSpinner.vue'
const mainStore = useMainStore()
const userStore = useUserStore()
const emit = defineEmits(['closeUpdate'])
let {showUpdateInfo} = storeToRefs(mainStore)
let selection = ref('userInfo')
let cropperRef = ref()
let cropperData = reactive({
    croppingImg: '',
    croppedImg: '',
    cropperType: ''
})
let isLoading = ref(false)
let cropperFn = {
    selectImg(type: string, event: any) {
        let file = event.target.files[0]
        if (file.type.match(/^image\//)) {
            convertImageToBase64(file, function (base64: any) {
                //onsole.log(base64)
                cropperData.croppingImg = base64
                cropperData.cropperType = type
                selection.value = 'cropper'
            })
        }
        function convertImageToBase64(file: Blob, callback: any) {
            const reader = new FileReader()
            reader.onload = function (event) {
                const base64 = event.target!.result
                callback(base64)
            }
            reader.readAsDataURL(file)
        }
    },

    setCroppedImg(img: string) {
        //console.log(img)
        cropperData.croppedImg = img
    }
}

function close() {
    selection.value == 'userInfo'
        ? mainStore.close('updateUserInfo')
        : (selection.value = 'userInfo')
}
let updateparams = reactive({
    username: userStore.myInfo.username,
    bio: userStore.myInfo.bio
    /* avatar: userStore.myInfo.avatar,
    cover: userStore.myInfo.cover */
})
async function reqUpdateUserInfo(selection: string) {
    let result
    isLoading.value = true
    if (selection == 'userInfo') {
        console.log(updateparams)

        result = await updateUserInfo(updateparams)
    } else if (selection == 'cropper') {
        emitter.emit('requireCrop')
        //console.log(cropperData.croppedImg)
        if (cropperData.cropperType == 'avatar') {
            let image = base64ToFile(cropperData.croppedImg, 'avatar.png')
            const imageUrl = await uploadImg(image)
            result = await updateUserAvatar({avatar: `https://${imageUrl}`})
        }
        if (cropperData.cropperType == 'cover') {
            let image = base64ToFile(cropperData.croppedImg, 'cover.png')
            const imageUrl = await uploadImg(image)
            result = await updateUserCover({cover: `https://${imageUrl}`})
        }
    }
    isLoading.value = false
    showMessage(result.message, result.status)
    if (!result.status) {
        mainStore.close('updateUserInfo')
        nextTick(() => {
            mainStore.mainPageKey++
        })
    }
}
onMounted(() => {
    mainStore.isScrollingStopped = true
})

onBeforeUnmount(() => {
    mainStore.isScrollingStopped = false
})
</script>

<style scoped lang="scss">
.userInfoContainer {
    @extend .darkMaskGSC;

    .wrapper {
        display: flex;
        margin: 0 20px;
        position: relative;
        width: 100%;
        max-width: 621px;
        height: 610px;
        background-color: white;
        border-radius: 20px;
        overflow: hidden;

        .scroll {
            position: absolute;
            height: inherit;
            width: inherit;
            overflow-y: scroll;
            .top {
                position: sticky;
                @extend .whiteGlassGSC;
                background: rgba(255, 255, 255, 0.5);
                width: 100%;
                height: 60px;
                max-width: 604px;
                top: 0;
                border-top-left-radius: 20px;
                z-index: 5;

                .close {
                    position: absolute;
                    @extend .flexCentreGSC;
                    top: 10px;
                    left: 10px;
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
                position: relative;
                padding: 0 2px;
                z-index: 0;

                .cover {
                    input {
                        display: none;
                    }
                    position: relative;
                    width: 100%;
                    height: 0;
                    padding-bottom: 33.33%; /* 16:9的比例 */
                    overflow: hidden;
                    .mask {
                        position: absolute;
                        @extend .flexCentreGSC;
                        width: 100%;
                        height: 100%;
                        z-index: 1;
                        cursor: pointer;
                        transition: 0.2s;

                        .insertImg {
                            width: 100%;
                            height: 100%;
                            cursor: pointer;
                            @extend .flexCentreGSC;
                            background-color: rgba(black, 0.3);
                            i {
                                color: rgba(white, 1);
                                transition: 0.2s;
                                font-size: 50px;
                                font-weight: bold;
                            }
                        }
                    }
                    img {
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    }
                }

                .icon {
                    position: relative;
                    width: 100%;
                    height: 70px;
                    //background-color: blue;

                    .iconWrapper {
                        @extend .flexCentreGSC;
                        position: absolute;
                        left: 20px;
                        top: -53px;
                        width: 106px;
                        height: 106px;
                        background-color: white;
                        border-radius: 50%;
                        cursor: pointer;
                        padding: 3px;
                        z-index: 5;
                        .mask {
                            position: absolute;
                            width: 100px;
                            height: 100px;
                            z-index: 1;
                            border-radius: 50%;
                            cursor: pointer;
                            transition: 0.2s;
                            background-color: rgba(black, 0.3);
                            .insertImg {
                                width: 100%;
                                height: 100%;
                                cursor: pointer;
                                @extend .flexCentreGSC;
                                i {
                                    color: rgba(white, 1);
                                    transition: 0.2s;
                                    font-size: 30px;
                                    font-weight: bold;
                                }
                            }
                        }
                        img {
                            position: absolute;
                            width: 100px;
                            height: 100px;
                            background-color: red;
                            //z-index: 1;
                            border-radius: 50%;
                            cursor: pointer;
                        }
                    }
                }

                .form {
                    display: flex;
                    flex-direction: column;
                    padding: 20px;
                    align-items: center;

                    .param {
                        width: 100%;
                        display: flex;
                        height: 60px;
                        border: 1px solid $placeholderFont;
                        border-radius: 50px;
                        margin-bottom: 15px;
                        margin-left: 20px;
                        margin-right: 20px;
                        input {
                            width: 100%;
                            font-size: 20px;
                            padding: 0 30px;
                            background-color: transparent;
                            border: none;
                            outline: none;
                        }
                    }
                }
            }
        }
        .cropper {
            width: 100%;
            height: 100%;
        }
    }
}
</style>
