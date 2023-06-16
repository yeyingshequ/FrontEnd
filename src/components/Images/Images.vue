<template>
    <div v-if="imageList && imageList[0]" class="imgContainer">
        <div v-if="imageList.length == 1" class="imgFor1">
            <div v-if="parent == 'editor'" class="deleteBtn" @click="deleteImg(imageList[0])">
                <i class="iconfont icon-guanbi1"></i>
            </div>
            <img :src="imageList[0]" alt="" @click.stop="mainStore.reqDisplayImg(imageList[0])" />
        </div>
        <div v-if="imageList.length == 2" class="imgFor2">
            <div v-for="img in imageList" class="box">
                <div v-if="parent == 'editor'" class="deleteBtn" @click="deleteImg(img)">
                    <i class="iconfont icon-guanbi1"></i>
                </div>
                <img :src="img" alt="" @click.stop="mainStore.reqDisplayImg(img)" />
            </div>
        </div>
        <div v-if="imageList.length == 3" class="imgFor3">
            <div class="leftBox">
                <div v-if="parent == 'editor'" class="deleteBtn" @click="deleteImg(imageList[0])">
                    <i class="iconfont icon-guanbi1"></i>
                </div>
                <img
                    :src="imageList[0]"
                    alt=""
                    @click.stop="mainStore.reqDisplayImg(imageList[0])"
                />
            </div>
            <div class="rightBox">
                <div class="topBox">
                    <div
                        v-if="parent == 'editor'"
                        class="deleteBtn"
                        @click="deleteImg(imageList[1])"
                    >
                        <i class="iconfont icon-guanbi1"></i>
                    </div>
                    <img
                        :src="imageList[1]"
                        alt=""
                        @click.stop="mainStore.reqDisplayImg(imageList[1])"
                    />
                </div>
                <div class="bottomBox">
                    <div
                        v-if="parent == 'editor'"
                        class="deleteBtn"
                        @click="deleteImg(imageList[2])"
                    >
                        <i class="iconfont icon-guanbi1"></i>
                    </div>
                    <img
                        :src="imageList[2]"
                        alt=""
                        @click.stop="mainStore.reqDisplayImg(imageList[2])"
                    />
                </div>
            </div>
        </div>
        <div v-if="imageList.length >= 4" class="imgFor4">
            <div class="leftBox">
                <div class="topBox">
                    <div
                        v-if="parent == 'editor'"
                        class="deleteBtn"
                        @click="deleteImg(imageList[0])"
                    >
                        <i class="iconfont icon-guanbi1"></i>
                    </div>
                    <img
                        :src="imageList[0]"
                        alt=""
                        @click.stop="mainStore.reqDisplayImg(imageList[0])"
                    />
                </div>
                <div class="bottomBox">
                    <div
                        v-if="parent == 'editor'"
                        class="deleteBtn"
                        @click="deleteImg(imageList[2])"
                    >
                        <i class="iconfont icon-guanbi1"></i>
                    </div>
                    <img
                        :src="imageList[2]"
                        alt=""
                        @click.stop="mainStore.reqDisplayImg(imageList[2])"
                    />
                </div>
            </div>
            <div class="rightBox">
                <div class="topBox">
                    <div
                        v-if="parent == 'editor'"
                        class="deleteBtn"
                        @click="deleteImg(imageList[1])"
                    >
                        <i class="iconfont icon-guanbi1"></i>
                    </div>
                    <img
                        :src="imageList[1]"
                        alt=""
                        @click.stop="mainStore.reqDisplayImg(imageList[1])"
                    />
                </div>
                <div class="bottomBox">
                    <div
                        v-if="parent == 'editor'"
                        class="deleteBtn"
                        @click="deleteImg(imageList[3])"
                    >
                        <i class="iconfont icon-guanbi1"></i>
                    </div>
                    <img
                        :src="imageList[3]"
                        alt=""
                        @click.stop="mainStore.reqDisplayImg(imageList[3])"
                    />
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import {toRefs} from 'vue'
import useMainStore from '@/store/index'
import storage from '@/tools/storage'
import {storeToRefs} from 'pinia'
const mainStore = useMainStore()
const emit = defineEmits(['getDeleteImgIndex'])
const props = defineProps({
    imageList: {
        type: Array as () => string[],
        default: () => []
    },
    parent: {
        type: String,
        default: ''
    }
})
let {imageList} = toRefs(props)

function deleteImg(url: string) {
    const index = imageList?.value.indexOf(url)
    if (index >= 0) {
        emit('getDeleteImgIndex', index)
    }
}
</script>
<style lang="scss" scoped>
.imgContainer {
    display: flex;
    margin-top: 10px;
    border: 1px solid lightgray;
    margin-right: 20px;
    border-radius: 20px;
    overflow: hidden;

    .imgFor1 {
        position: relative;
        display: flex;
        flex: 1;
        img {
            width: 100.03%;
            height: 100%;
            object-fit: cover;
        }
    }
    .imgFor2 {
        max-height: 300px;
        aspect-ratio: 1.775757575757576/ 1;
        width: 100%;
        display: flex;
        justify-content: space-between;
        .box {
            flex: 1;
            display: flex;

            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
        .box:first-child {
            position: relative;
            margin-right: 1px;
        }

        .box:last-child {
            position: relative;
            margin-left: 1px;
        }
    }
    .imgFor3 {
        position: relative;
        flex-grow: 1;
        max-height: 330px;
        aspect-ratio: 1.775757575757576/ 1;
        display: flex;
        justify-content: space-between;

        .leftBox,
        .rightBox {
            position: relative;
            display: flex;
            flex-basis: 50%;
            img {
                width: 100%;
                object-fit: cover;
            }
        }
        .leftBox {
            margin-right: 1px;
        }
        .rightBox {
            flex-direction: column;
            height: 100%;
            margin-left: 1px;

            .topBox,
            .bottomBox {
                position: relative;
                height: 50%;
                flex-grow: 1;
                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }
            .topBox {
                margin-bottom: 1px;
            }
            .bottomBox {
                margin-top: 1px;
            }
        }
    }
    .imgFor4 {
        position: relative;
        flex-grow: 1;
        max-height: 330px;
        aspect-ratio: 1.775757575757576/ 1;
        display: flex;
        justify-content: space-between;
        flex-basis: 50%;

        .leftBox,
        .rightBox {
            position: relative;
            display: flex;
            flex: 1;
            flex-direction: column;
            height: 100%;

            .topBox,
            .bottomBox {
                //position: relative;
                height: calc(50% - 1px);
                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }
            .topBox {
                margin-bottom: 1px;
            }
            .bottomBox {
                margin-top: 1px;
            }
        }
        .leftBox {
            margin-right: 1px;
        }
        .rightBox {
            margin-left: 1px;
        }
    }
}
.deleteBtn {
    position: absolute;
    @extend .flexCentreGSC;
    top: 10px;
    right: 10px;
    @extend .whiteGlassGSC;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    transition: 0.1s;
    cursor: pointer;
    i {
        font-size: 22px;
    }
    &:hover {
        background-color: mix($brandColor, white, 15%);
    }
}
</style>
