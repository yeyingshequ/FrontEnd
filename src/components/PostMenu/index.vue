<template>
    <div class="menuContainer">
        <div class="buttonWrapper" @click="showMenu = true" @mouseenter.stop>
            <i class="iconfont icon-qita"></i>
        </div>
        <div class="menu" v-if="showMenu == true">
            <div class="mask" @click="showMenu = false"></div>
            <div class="menuBox">
                <div class="items copy-btn2" @click="touchCopy()">
                    <i class="iconfont icon-copy"></i>
                    <span>复制</span>
                </div>
                <div class="items" @click="reqSavePost({postId: postId, request: 'save'})">
                    <i class="iconfont icon-saved"></i>
                    <span>收藏帖子</span>
                </div>
                <div class="items" @click="reqHidePost({postId: postId})">
                    <i class="iconfont icon-blockPost"></i>
                    <span>屏蔽</span>
                </div>
                <div class="items" @click="touchCopy()">
                    <i class="iconfont icon-shanchu"></i>
                    <span>删帖</span>
                </div>
                <div class="items" @click="touchCopy()">
                    <i class="iconfont icon-fengjin"></i>
                    <span>封禁该用户</span>
                </div>
                <div class="items" @click="touchCopy()">
                    <i class="iconfont icon-report"></i>
                    <span>举报</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import {hidePost, savePost} from '@/api'
import {ref, toRefs} from 'vue'
import useClipboard from 'vue-clipboard3'
const props = defineProps(['content', 'father', 'postId'])
let {content, father, postId} = toRefs(props)
let showMenu = ref(false)
const {toClipboard} = useClipboard()
/******************复制文本功能*******************/
function touchCopy() {
    showMenu.value = false
    // 调用
    //console.log(content?.value);
    copy(content?.value)
}
const copy = async (msg: string) => {
    try {
        // 复制
        await toClipboard(msg)
        // 复制成功
    } catch (e) {
        // 复制失败
    }
}
/******************复制文本功能*******************/

/******************收藏帖子功能*******************/
async function reqSavePost(params: {postId: number; request: string}) {
    showMenu.value = false
    console.log('postId:', postId?.value)
    let result = await savePost(params)
}
/****************** */
async function reqHidePost(params: {postId: number}) {
    showMenu.value = false
    console.log('postId:', postId?.value)
    let result = await hidePost(params)
}

let menuList = [
    {id: '1', name: '复制', icon: 'iconfont icon-copy', function: touchCopy},
    {id: '2', name: '收藏帖子', icon: 'iconfont icon-saved', function: reqSavePost},
    {id: '3', name: '屏蔽', icon: 'iconfont icon-blockPost', function: ''},
    {id: '4', name: '删帖', icon: 'iconfont icon-shanchu', function: ''},
    {id: '5', name: '封禁该用户', icon: 'iconfont icon-fengjin', function: ''},
    {id: '6', name: '举报', icon: 'iconfont icon-report', function: ''}
]
</script>
<style lang="scss" scoped>
.menuContainer {
    position: relative;

    .buttonWrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 40px;
        height: 40px;
        border-radius: 50px;

        i {
            color: $brandColor;
        }

        &:hover {
            background-color: mix(#ff44aa, white, 20%);
        }
    }

    .menu {
        .mask {
            position: fixed;
            //background-color: #ff44aa;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            z-index: 3;
            cursor: auto;
        }

        .menuBox {
            position: absolute;
            width: 200px;
            left: -160px;
            top: 0px;
            background-color: white;
            border-radius: 10px;
            box-shadow: 0 0 10px 1px rgb(255, 199, 230);
            overflow: hidden;
            z-index: 4;

            .items {
                display: flex;
                align-items: center;
                width: 100%;
                height: 50px;

                &:hover {
                    background-color: $onHover;
                }

                i {
                    font-size: 22px;
                    font-weight: bold;
                    margin-left: 20px;
                    margin-right: 15px;
                }

                span {
                    font-size: 17px;
                    font-weight: bold;
                }
            }
        }
    }
}
</style>
