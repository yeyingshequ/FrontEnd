<template>
    <div class="editorContainer">
        <div class="editorWrapper">
            <div class="close" @click="close">
                <i class="iconfont icon-guanbi1"></i>
            </div>
            <div class="text">
                <div class="body">
                    <div class="icon">
                        <div class="iconWrapper">
                            <img src="@/images/1_BigPic.png" alt="" />
                        </div>
                    </div>
                    <div class="content">
                        <p @input="setContent($event)" :contenteditable="true"></p>
                    </div>
                </div>
                <div class="submit">
                    <button type="submit" @click="reqSendReply(params)">发 送</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import scroll from '@/tools/scroll'
import {getPostInfo, sendReply} from '@/api'
import {computed, onBeforeMount, onMounted, reactive, ref, toRefs} from 'vue'
import useMainStore from '@/store/index'
import emitter from '@/tools/mitt'
import {storeToRefs} from 'pinia'
import usePostStore from '@/store/post'
import {useRoute} from 'vue-router'
import {flattedChildren} from 'element-plus/es/utils'
import {placements} from '@popperjs/core'
import {ElMessage} from 'element-plus'
const route = useRoute()
const postStore = usePostStore()
const mainStore = useMainStore()
const props = defineProps(['postInfo', 'commentInfo', 'replyInfo', 'father'])
const emit = defineEmits(['closeEditor'])
interface Iparams {
    postId: number
    postAuthorId: number
    repliedId: number | null
    repliedAuthorId: number | null
    commentId: number
    commentAuthorId: number
    content: string
    repliedContent: string
}
//console.log("props on setup:", props.commentInfo);

let father = computed(() => {
    return props.father
})

let commentInfo = computed(() => {
    return props.commentInfo
})

let replyInfo = computed(() => {
    return props.replyInfo
})

let replyTo = ref('回复 :')

let message = ref('')
let params: Iparams = reactive({
    postId: 0,
    postAuthorId: 0,
    repliedId: 0,
    repliedAuthorId: 0,
    commentId: 0,
    commentAuthorId: 0,
    content: '',
    repliedContent: '',
    cmtyId: ''
})
function setContent(content: any /* content: {target: {innerHTML: string}} */) {
    console.log('content:', content.target.innerHTML)
    params.content = content.target.innerHTML
}
function close() {
    //mainStore.showReplyEditor = false
    console.log('关闭回复编辑器')
    emit('closeEditor', 'replyEditor')

    message.value = ''
}
function showMessage(message: string, type: undefined) {
    ElMessage({
        grouping: true,
        message: message,
        type: type == 0 ? 'success' : 'error'
    })
}

async function reqSendReply(params: any) {
    switch (father.value) {
        case 'comment':
        case 'commentMain':
            console.log('开始赋值')

            params.postId = commentInfo.value.postId
            params.postAuthorId = commentInfo.value.postAuthorId
            params.commentId = commentInfo.value.commentId
            params.commentAuthorId = commentInfo.value.commentAuthorId
            params.repliedContent = commentInfo.value.content
            params.cmtyId = Number(commentInfo.value.cmtyId)
            break
        case 'reply':
            params.postId = replyInfo.value.postId
            params.postAuthorId = replyInfo.value.postAuthorId
            params.repliedId = replyInfo.value.replyId
            params.repliedAuthorId = replyInfo.value.replyAuthorId
            params.commentId = replyInfo.value.commentId
            params.commentAuthorId = replyInfo.value.commentAuthorId
            params.repliedContent = replyInfo.value.content
            params.cmtyId = Number(replyInfo.value.cmtyId)
            console.log('replyInfo:', replyInfo.value)
            break
    }
    console.log('params:', params)
    console.log('time:', new Date())

    let result = await sendReply(params)
    message.value = result.message
    showMessage(message.value, result.status)
    //关闭编辑器
    if (result.message == '发送成功') {
        close()
        message.value = ''
    }
    switch (route.name) {
        case 'P':
            emitter.emit('regetPostInfo')
            break

        case 'Comment':
            emitter.emit('regetCommentInfo')
            break
    }
}

onMounted(() => {
    if (father.value == 'reply') {
        replyTo.value = `回复${replyInfo.value.username || ''} :`
    }

    console.log('props的comment', commentInfo.value)
})
</script>

<style scoped lang="scss">
.editorContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(mix($brandColor, black, 10%), 0.1);
    z-index: 998;

    .editorWrapper {
        position: relative;
        width: 700px;
        //height: 410px;
        padding: 20px;
        border-radius: 20px;
        background-color: white;

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

        .text {
            margin-left: 20px;
            margin-top: 20px;

            .body {
                display: flex;

                .icon {
                    display: flex;

                    .iconWrapper {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        width: 70px;
                        height: 70px;

                        img {
                            height: 50px;
                            width: 50px;
                            border-radius: 50%;
                        }
                    }
                }

                .content {
                    margin-top: 30px;
                    //background-color: red;
                    border-bottom: 1px solid #f1f1f1;

                    p {
                        padding-left: 10px;
                        font-size: 20px;
                        width: 550px;
                        min-height: 230px;
                        max-height: 650px;
                        background-color: white;
                        color: $regularFont;
                        outline: none;
                        overflow-y: scroll;
                        cursor: auto;
                    }
                }
            }

            .submit {
                position: relative;
                padding-top: 10px;
                height: 40px;

                button {
                    position: absolute;
                    right: 10px;
                    height: 40px;
                    padding: 0 20px;
                    font-size: 20px;
                    font-weight: bold;
                    color: white;
                    border-radius: 50px;
                    outline: none;
                    border: 0;
                    background-color: $brandColor;
                    cursor: pointer;
                }
            }
        }
    }
}
</style>
