<template>
    <div class="editorContainer">
        <div class="container">
            <div class="editorWrapper">
                <LoadingSpinner :isLoading="isLoading" :isOpaque="false" />
                <div class="top">
                    <div class="close" @click="close">
                        <i class="iconfont icon-guanbi1"></i>
                    </div>
                </div>
                <div class="text">
                    <div class="left">
                        <div class="iconWrapper">
                            <img :src="userStore.myInfo.avatar || mainStore.defaultAvatar" alt="" />
                        </div>
                    </div>
                    <div class="right">
                        <p
                            class="content"
                            ref="editor"
                            :contenteditable="true"
                            @input="setContent($event)"
                            @paste="pasteContent($event)"
                        ></p>
                        <div v-show="showPlaceholder" @click="editor.focus()" class="placeholder">
                            请输入正文
                        </div>
                        <div class="tools">
                            <button type="submit" @click="reqSendReply(params)">发 送</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import scroll from '@/tools/scroll'
import {getPostInfo, sendReply, sendReplyForV} from '@/api'
import {computed, onBeforeMount, onBeforeUnmount, onMounted, reactive, ref, toRefs} from 'vue'
import useMainStore from '@/store'
import emitter from '@/tools/mitt'
import {storeToRefs} from 'pinia'
import usePostStore from '@/store/post'
import {useRoute} from 'vue-router'
import {ElMessage} from 'element-plus'
import {checkCharLimit, processPlainText, setRelationShip} from '@/tools/postTools'
import useUserStore from '@/store/user'
import storage from '@/tools/storage'
const userStore = useUserStore()
const route = useRoute()
const postStore = usePostStore()
const mainStore = useMainStore()
const props = defineProps(['postInfo', 'commentInfo', 'replyInfo', 'father'])
const emit = defineEmits(['setEditor'])
let isLoading = ref(false)
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
//console.log('props on setup:', props.commentInfo)
let editor = ref()
let showPlaceholder = ref(true)
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
let params = reactive({
    repliedId: 0,
    commentId: 0,
    plainText: ''
})

function pasteContent(e: any) {
    e.preventDefault()
    const text = e.clipboardData.getData('text/plain')
    const plainText = text.replace(/(<([^>]+)>)/gi, '')
    // 将清除样式后的文本重新插入到contenteditable元素中
    document.execCommand('insertHTML', false, plainText)
}

function setContent(e: any /* content: {target: {innerHTML: string}} */) {
    params.plainText = e.target.innerText.trim()
    e.target.innerText ? (showPlaceholder.value = false) : (showPlaceholder.value = true)
    console.log(params.plainText)
}
function close() {
    emit('setEditor', 'reply')
    mainStore.isScrollingStopped = false
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
            //console.log('开始赋值')
            params.commentId = commentInfo.value.commentId
            break
        case 'reply':
            params.repliedId = replyInfo.value.replyId
            params.commentId = replyInfo.value.commentId
            break
    }
    //console.log('params:', params)
    //console.log('time:', new Date())
    //console.log('发表评论的参数', params)
    params.plainText = processPlainText(params.plainText, 'span')

    //判断字数是否超出限制
    if (!checkCharLimit(params.plainText, 'reply')) return

    isLoading.value = true
    let result = storage.get('token') ? await sendReply(params) : await sendReplyForV(params)
    isLoading.value = false
    message.value = result.message
    showMessage(message.value, result.status)
    //关闭编辑器
    if (result.message == '发送成功') {
        close()
        message.value = ''
        switch (route.name) {
            case 'P':
                //console.log('commentInfo:', commentInfo.value?.commentId)
                //console.log('replyInfo:', replyInfo.value?.commentId)

                const i = postStore.postInfo.comment.findIndex((obj: {commentId: number}) =>
                    commentInfo.value
                        ? obj.commentId == commentInfo.value?.commentId
                        : obj.commentId == replyInfo.value?.commentId
                )
                //console.log('索引:', i)

                result.data.userReply = setRelationShip(result.data, 'userReply')
                //console.log('result.data:', result.data)
                postStore.postInfo.comment[i].reply.push(result.data)
                postStore.postInfo.comment[i].replyCount++
                //console.log('reply列表:', postStore.postInfo.comment[i].reply)

                //console.log()

                break

            case 'Comment':
                postStore.commentInfo.reply.push(result.data)
                break
        }
    }
}

onMounted(() => {
    mainStore.isScrollingStopped = true
    if (father.value == 'reply') {
        replyTo.value = `回复${replyInfo.value.username || ''} :`
    }

    //console.log('props的comment', commentInfo.value)
})
onBeforeUnmount(() => {
    mainStore.isScrollingStopped = false
})
</script>

<style scoped lang="scss">
@import '@/components/Editor/style.scss';
.editorContainer {
    @extend .darkMaskGSC;
    align-items: flex-start;
    .container {
        @extend .EditorContainerSC;
        .editorWrapper {
            @extend .editorWrapperSC;

            .top {
                @extend .topFromEditorSC;
            }

            .text {
                display: flex;
                //margin-left: 20px;
                padding: 0 20px;

                .left {
                    @extend .editorAvatarPartSC;
                }

                .right {
                    position: relative;
                    flex-grow: 1;
                    display: block;

                    .content {
                        //display: block;
                        padding-left: 10px;
                        margin-top: 10px;
                        font-size: 20px;
                        min-height: 280px;
                        background-color: white;
                        word-wrap: break-word;
                        word-break: break-all;
                        color: $mainFont;
                        outline: none;
                        cursor: auto;
                        //overflow-y: scroll;
                        white-space: pre-wrap;
                        margin-bottom: 0;
                        p {
                            margin: 0 0;
                            font-size: 20px;
                            margin-bottom: 0;
                        }
                    }
                    .placeholder {
                        position: absolute;
                        top: 0;
                        //display: block;
                        padding-left: 4.5px;
                        margin-top: 10px;
                        font-size: 20px;
                        background-color: transparent;
                        word-wrap: break-word;
                        word-break: break-all;
                        color: $mainFont;
                        outline: none;
                        cursor: auto;
                        white-space: pre-wrap;
                        color: #797979;
                        -webkit-user-select: none;
                        cursor: text;
                    }
                    .tools {
                        display: block;
                        position: relative;
                        width: 100%;
                        height: 60px;
                        //margin-bottom: -20px;
                        display: flex;
                        align-items: center;

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
    }
}
@media (max-width: 717px) {
    .editorContainer {
        .text {
            .left {
                display: none;
            }
        }
    }
}
</style>
