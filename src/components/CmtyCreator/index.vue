<template>
    <div class="cmtyCreatorContainer">
        <div class="wrapper">
            <LoadingSpinner :isLoading="isLoading" :isOpaque="false" />
            <div class="close" @click="close">
                <i class="iconfont icon-guanbi1"></i>
            </div>
            <div>
                <h1>创建社区</h1>
            </div>
            <div v-if="isCropperShown == true" class="cropperContainer">
                <div class="cropperWrapper">
                    <div class="top">
                        <div class="close" @click="isCropperShown = false">
                            <i class="iconfont icon-guanbi1"></i>
                        </div>
                        <h2>编辑个人信息</h2>
                        <button class="save" @click="emitter.emit('requireCrop')">
                            <span> 保 存 </span>
                        </button>
                    </div>
                    <Cropper
                        ref="cropperRef"
                        :type="cropperData.cropperType"
                        :croppingImg="cropperData.croppingImg"
                        @sendImg="cropperFn.setCroppedImg"
                    />
                </div>
            </div>
            <div class="avatarAndCover">
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
                    <img :src="cropperData.cover || mainStore.defaultCover" alt="" />
                </div>
                <div class="avatar">
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
                        <img :src="cropperData.avatar || mainStore.defaultAvatar" alt="" />
                    </div>
                </div>
            </div>
            <div class="inputArea">
                <div class="cmtyName inputData">
                    <input v-model="params.cmtyName" type="text" placeholder="社区名字" />
                </div>
                <div class="inputData">
                    <input v-model="params.cmtyDescription" type="text" placeholder="社区简介" />
                </div>
                <!-- <div class="inputData">
                    <input v-model="params.cmtyAvatar" type="text" placeholder="社区头像url链接" />
                </div>
                <div class="inputData">
                    <input v-model="params.cmtyCover" type="text" placeholder="社区封面url链接" />
                </div> -->
                <div class="category" @click="showCategory = true">
                    {{ params.cmtyCategory || '选择社区分类' }}
                    <div class="cateList" v-show="showCategory == true">
                        <div class="mask" @click.stop="showCategory = false"></div>
                        <transition
                            name="animate__animated animate__bounce"
                            enter-active-class="animate__fadeIn"
                            leave-active-class="animate__fadeOut"
                        >
                            <div class="cateBox animate__faster" v-show="showCategory" key="2">
                                <el-scrollbar max-height="300px" color="" class="scrollBar">
                                    <div
                                        class="select"
                                        v-for="categoty in categoryList"
                                        :key="categoty.value"
                                        @mouseover.prevent
                                        @click.stop="setCategory(categoty.name)"
                                    >
                                        <span>{{ categoty.name }}</span>
                                    </div>
                                </el-scrollbar>
                            </div>
                        </transition>
                    </div>
                </div>
            </div>
            <div class="submit">
                <button type="submit" @click="reqCreateCmty(params)">创 建</button>
            </div>
            {{ message }}
        </div>
    </div>
</template>
<script setup lang="ts">
import scroll from '@/tools/scroll'
import {createCmty} from '@/api'
import {onMounted, onBeforeUnmount, reactive, ref} from 'vue'
import '../../../node_modules/animate.css/animate.css'
import useMainStore from '@/store/index'
import {base64ToFile, showMessage, uploadImg} from '@/tools'
import {storeToRefs} from 'pinia'
import Cropper from '@/pages/U/updateUserInfo/cropper.vue'
import useUserStore from '@/store/user'
import {avatarEmits} from 'element-plus'
import {emit} from 'process'
import emitter from '@/tools/mitt'
const userStore = useUserStore()
const mainStore = useMainStore()

const categoryList = [
    {value: 1, name: '运动'},
    {value: 2, name: '游戏'},
    {value: 3, name: '数码'},
    {value: 4, name: '科学'},
    {value: 5, name: '动漫'},
    {value: 6, name: '音乐'},
    {value: 7, name: '时尚'},
    {value: 8, name: '文学'},
    {value: 9, name: '校园'},
    {value: 10, name: '明星'},
    {value: 11, name: '交友'},
    {value: 12, name: '个人'},
    {value: 13, name: '运动'},
    {value: 14, name: '游戏'},
    {value: 15, name: '数码'},
    {value: 16, name: '情感'},
    {value: 17, name: '战场'}
]
let params = reactive({
    cmtyName: '',
    cmtyCategory: '',
    cmtyDescription: '',
    cmtyAvatar: '',
    cmtyCover: ''
})
let isLoading = ref(false)
/***********裁剪相关的数据************** */
let isCropperShown = ref(false)
let cropperRef = ref()
let cropperData = reactive({
    croppingImg: '',
    croppedImg: '',
    cropperType: '',
    avatar: '',
    cover: ''
})

let cropperFn = {
    selectImg(type: string, event: any) {
        let file = event.target.files[0]
        if (file.type.match(/^image\//)) {
            convertImageToBase64(file, function (base64: any) {
                //onsole.log(base64)
                cropperData.croppingImg = base64
                cropperData.cropperType = type
                isCropperShown.value = true
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
    setCroppedImg(img: string, type: string) {
        console.log(img)
        console.log(type)
        if (type == 'avatar') {
            cropperData.avatar = img
            console.log(cropperData.avatar)
        } else if (type == 'cover') {
            cropperData.cover = img
            console.log(cropperData.cover)
        }
        isCropperShown.value = false
    }
}
/***********裁剪相关的数据************** */
let message = ref('')
let {showCmtyCreator} = storeToRefs(mainStore)
function close() {
    mainStore.close('cmtyCreator')
}
let showCategory = ref(false)
function setCategory(category: string) {
    params.cmtyCategory = category
    showCategory.value = false
}
async function reqCreateCmty(cmtyParams: object) {
    isLoading.value = true
    if (cropperData.avatar) {
        let avatarFile = base64ToFile(cropperData.avatar, 'avatar.png')
        const cmtyAvatar = (await uploadImg(avatarFile)) as string
        params.cmtyAvatar = `https://${cmtyAvatar}`
    }
    if (cropperData.cover) {
        let coverFile = base64ToFile(cropperData.cover, 'cover.png')
        const cmtyCover = (await uploadImg(coverFile)) as string
        params.cmtyCover = `https://${cmtyCover}`
    }
    console.log(params)

    let result = await createCmty(cmtyParams)
    isLoading.value = false
    showMessage(result.message, result.status)
    //关闭社区创建框
    if (result.status === 0) {
        close()
        params = {
            cmtyName: '',
            cmtyCategory: '',
            cmtyDescription: '',
            cmtyAvatar: '',
            cmtyCover: ''
        }
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
.cmtyCreatorContainer {
    @extend .darkMaskGSC;

    .wrapper {
        margin: 0 20px;
        position: relative;
        -webkit-user-select: none;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 400px;
        height: 500px;
        background-color: white;
        border-radius: 20px;
        overflow: hidden;
        .close {
            position: absolute;
            @extend .flexCentreGSC;
            top: 10px;
            left: 10px;

            width: 40px;
            height: 40px;
            border-radius: 50%;
            transition: 0.1s;
            cursor: pointer;

            i {
                font-size: 25px;
            }

            &:hover {
                background-color: mix($brandColor, white, 15%);
            }
        }

        h1 {
            margin-top: 20px;
            margin-bottom: 10px;
        }

        .inputArea {
            width: 60%;
            .inputData {
                height: 50px;
                margin-bottom: 10px;

                input {
                    padding-left: 30px;
                    padding-right: 30px;
                    height: 50px;
                    width: 100%;
                    font-size: 20px;
                    color: $mainFont;
                    outline: none;
                    border: 1px solid $placeholderFont;
                    border-radius: 50px;
                }
            }
            .category {
                position: relative;
                width: 100%;
                height: 50px;
                border: 1px solid $placeholderFont;
                border-radius: 50px;
                padding-left: 30px;
                line-height: 50px;
                font-size: 20px;
                color: #787878;
                cursor: pointer;
                &:hover:not(:has(.select:hover, .mask:hover)) {
                    background-color: $onHover;
                }
                .cateList {
                    .mask {
                        position: fixed;
                        //background-color: #ff44aa;
                        left: 0;
                        top: 0;
                        width: 100%;
                        height: 100%;
                        z-index: 3;
                        cursor: auto;
                        z-index: 3;
                    }
                    .cateBox {
                        position: absolute;
                        width: 100%;
                        left: 0;
                        bottom: 55px;
                        background-color: white;
                        line-height: 40px;
                        border-radius: 20px;
                        box-shadow: 0 0 10px 1px rgb(255, 199, 230);
                        z-index: 5;
                        overflow-y: hidden;
                        :deep(.el-scrollbar__thumb) {
                            //可设置滚动条颜色
                            background: $brandColor; //这里我设置成了透明色,可以根据需求添加自己想要的颜色
                        }
                        span {
                            margin-left: 30px;
                            font-weight: bold;
                            color: $mainFont;
                        }

                        .select {
                            height: 40px;
                            width: 100%;

                            &:hover {
                                background-color: $onHover;
                            }
                        }
                    }
                }
            }
        }

        .submit {
            margin-top: 20px;
            button {
                padding: 0;
                height: 50px;
                width: 240px;
                font-size: 20px;
                font-weight: bold;
                color: white;
                vertical-align: top;
                background-color: $brandColor;
                border-radius: 50px;
                cursor: pointer;
                border: 0;

                &:hover {
                    background-color: mix($brandColor, black, 90%);
                }
            }
        }
        .cropperContainer {
            @extend .darkMaskGSC;

            .cropperWrapper {
                display: flex;
                flex-direction: column;
                margin: 0 20px;
                position: relative;
                width: 100%;
                max-width: 621px;
                height: 610px;
                background-color: white;
                border-radius: 20px;
                overflow: hidden;
            }
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
            /* .cropper {
                @extend .darkMaskGSC;
                .cropperWrapper {
                    //background-color: red;
                    display: flex;
                    margin: 0 20px;
                    position: relative;
                    width: 100%;
                    max-width: 621px;
                    height: 610px;
                    //background-color: white;
                    border-radius: 20px;
                    overflow: hidden;
                }
            } */
        }
        .avatarAndCover {
            top: 240px;
            width: 340px;
            .cover {
                input {
                    display: none;
                }
                position: relative;
                width: 100%;
                //height: 0;
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
            .avatar {
                position: relative;
                width: 100%;
                height: 60px;
                //background-color: blue;

                .iconWrapper {
                    @extend .flexCentreGSC;
                    position: absolute;
                    left: 20px;
                    top: -43px;
                    width: 86px;
                    height: 86px;
                    background-color: white;
                    border-radius: 50%;
                    cursor: pointer;
                    padding: 3px;
                    z-index: 5;
                    .mask {
                        position: absolute;
                        width: 80px;
                        height: 80px;
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
                        width: 80px;
                        height: 80px;
                        background-color: red;
                        //z-index: 1;
                        border-radius: 50%;
                        cursor: pointer;
                    }
                    input {
                        display: none;
                    }
                }
            }
        }
    }
}
</style>
