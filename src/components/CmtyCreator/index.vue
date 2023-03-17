<template>
    <div class="cmtyCreatorContainer">
        <div class="wrapper">
            <div class="close" @click="close">
                <i class="iconfont icon-guanbi1"></i>
            </div>
            <div>
                <h1>创建社区</h1>
            </div>
            <div class="inputArea">
                <div class="cmtyName inputData">
                    <input v-model="params.cmtyName" type="text" placeholder="社区名字" />
                </div>
                <div class="inputData">
                    <input v-model="params.cmtyDescription" type="text" placeholder="社区简介" />
                </div>
                <div class="inputData">
                    <input v-model="params.cmtyAvatar" type="text" placeholder="社区头像url链接" />
                </div>
                <div class="inputData">
                    <input v-model="params.cmtyCover" type="text" placeholder="社区封面url链接" />
                </div>
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
                                <el-scrollbar max-height="500px" color="" class="scrollBar">
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
import {onMounted, reactive, ref} from 'vue'
import '../../../node_modules/animate.css/animate.css'
import useMainStore from '@/store/index'

import {showMessage} from '@/tools'
import {storeToRefs} from 'pinia'
const mainStore = useMainStore()

const categoryList = [
    {value: 1, name: '运动'},
    {value: 2, name: '游戏'},
    {value: 3, name: '数码'},
    {value: 4, name: '科学'},
    {value: 5, name: '动漫'},
    {value: 6, name: '音乐'},
    {value: 7, name: '休闲时尚'},
    {value: 8, name: '文学'},
    {value: 9, name: '校园'},
    {value: 10, name: '明星'},
    {value: 11, name: '网友俱乐部'},
    {value: 12, name: '个人社区'},
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
let message = ref('')
let {showCmtyCreator} = storeToRefs(mainStore)
function close() {
    console.log(111)
    showCmtyCreator.value = false
}
let showCategory = ref(false)
function setCategory(category: string) {
    params.cmtyCategory = category
    showCategory.value = false
}
async function reqCreateCmty(params: {cmtyName: string; cmtyCategory: string}) {
    let result = await createCmty(params)
    showMessage(result.message, result.status)
    //关闭社区创建框
    if (result.status === 0) {
        setTimeout(() => {
            close()
            message.value = ''
        }, 1000)
    }
}
</script>

<style scoped lang="scss">
.cmtyCreatorContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(mix($brandColor, black, 10%), 0.5);
    z-index: 997;

    .wrapper {
        position: relative;
        -webkit-user-select: none;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 700px;
        height: 500px;
        background-color: white;
        border-radius: 20px;

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
            margin-top: 35px;
        }

        .inputArea {
            margin-top: 35px;
            width: 50%;
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
                        width: 350px;
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
                width: 190px;
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
    }
}
</style>
