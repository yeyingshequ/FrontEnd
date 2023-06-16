<template>
    <div class="menuContainer">
        <div class="buttonWrapper" @click="showMenu = true" @mouseenter.stop>
            <i class="iconfont icon-qita"></i>
        </div>
        <div class="menu" v-if="showMenu == true">
            <div class="mask" @click="showMenu = false"></div>
            <div class="menuBox">
                <div class="items copy-btn2" @click="touchCopy(info.plainText)">
                    <i class="iconfont icon-copy"></i>
                    <span>复制</span>
                </div>
                <div class="items" v-if="userStore.myInfo.userId" @click="reqSave()">
                    <i class="iconfont icon-saved"></i>
                    <span>收藏帖子</span>
                </div>
                <!-- <div class="items" @click="reqHidePost({postId: postId})">
                    <i class="iconfont icon-blockPost"></i>
                    <span>屏蔽</span>
                </div> -->
                <div
                    class="items"
                    v-if="userStore.myInfo.userId == 1"
                    @click="reqDelete(parent, info)"
                >
                    <i class="iconfont icon-shanchu"></i>
                    <span>删帖</span>
                </div>
                <!-- <div class="items" @click="touchCopy()">
                    <i class="iconfont icon-fengjin"></i>
                    <span>封禁该用户</span>
                </div>
                <div class="items" @click="touchCopy()">
                    <i class="iconfont icon-report"></i>
                    <span>举报</span>
                </div> -->
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import {
    hidePost,
    updateComment,
    updatePost,
    updateReply,
    updateUserComment,
    updateUserPost,
    updateUserReply
} from '@/api'
import {showMessage} from '@/tools'
import {log} from 'console'
import {onMounted, ref, toRefs} from 'vue'
import useClipboard from 'vue-clipboard3'
import useUserStore from '@/store/user'
import {result} from 'lodash'
const userStore = useUserStore()
const props = defineProps({
    parent: {
        type: String,
        required: true
    },
    info: {
        type: Object,
        required: true
    }
})
let {info, parent} = toRefs(props)
let showMenu = ref(false)
const {toClipboard} = useClipboard()
/******************复制文本功能*******************/

async function touchCopy(content: string) {
    showMenu.value = false
    //console.log(content)
    try {
        await navigator.clipboard.writeText(content)
    } catch (err) {
        console.error('Failed to copy text: ', err)
    }
}
/******************删帖功能*******************/
async function reqDelete(parent: string, info: any) {
    showMenu.value = false
    console.log(info)
    let result
    switch (parent) {
        case 'post':
            result = await updatePost({
                postId: info.postId,
                request: 'delete'
            })
            break
        case 'comment':
            result = await updateComment({
                commentId: info.commentId,
                request: 'delete'
            })
            break
        case 'reply':
            result = await updateReply({
                replyId: info.replyId,
                request: 'delete'
            })
            break

        default:
            break
    }
    showMessage(result.message, result.status)
    if (!result.status) {
    }
}

/******************收藏帖子功能*******************/
async function reqSave() {
    showMenu.value = false
    //console.log('info:', info?.value)
    let result
    switch (parent?.value) {
        case 'post':
            result = await updateUserPost({
                postId: info?.value.postId,
                request: info?.value.userPost.isSaved ? 'unSave' : 'save'
            })
            if (!result.status) {
                info!.value.userPost.isSaved = !info?.value.userPost.isSaved
            }
            break
        case 'comment':
            result = await updateUserComment({
                commentId: info?.value.commentId,
                request: info?.value.userComment.isSaved ? 'unSave' : 'save'
            })
            if (!result.status) {
                info!.value.userComment.isSaved = !info?.value.userComment.isSaved
            }

            break
        case 'reply':
            result = await updateUserReply({
                replyId: info?.value.replyId,
                request: info?.value.userReply.isSaved ? 'unSave' : 'save'
            })
            if (!result.status) {
                info!.value.userReply.isSaved = !info?.value.userReply.isSaved
            }

            break
        default:
            break
    }
    showMessage(result.message, result.status)
}
/****************** */
async function reqHidePost(params: {postId: number}) {
    showMenu.value = false
    //console.log('postId:', info?.value.postId.value)
    let result = await hidePost(params)
}

let menuList = [
    {id: '1', name: '复制', icon: 'iconfont icon-copy', function: touchCopy},
    {id: '2', name: '收藏帖子', icon: 'iconfont icon-saved', function: reqSave},
    {id: '3', name: '屏蔽', icon: 'iconfont icon-blockPost', function: ''},
    {id: '4', name: '删帖', icon: 'iconfont icon-shanchu', function: ''},
    {id: '5', name: '封禁该用户', icon: 'iconfont icon-fengjin', function: ''},
    {id: '6', name: '举报', icon: 'iconfont icon-report', function: ''}
]
onMounted(() => {
    //console.log('parent:', parent?.value)
})
</script>
<style lang="scss" scoped>
.menuContainer {
    position: relative;

    .buttonWrapper {
        @extend .flexCentreGSC;
        width: 40px;
        height: 40px;
        border-radius: 50px;
        transition: 0.1s;

        i {
            color: $brandColor;
        }

        &:hover {
            background-color: $button;
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
