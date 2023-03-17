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
                        <p
                            :contenteditable="true"
                            @input="updateContent($event)"
                            @paste="pasteContent($event)"
                        ></p>
                    </div>
                </div>
                <div class="submit">
                    <button type="submit" @click="reqSendComment(params)">发 送</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import scroll from '@/tools/scroll'
import {sendComment} from '@/api/index'
import {onBeforeUnmount, onMounted, ref, shallowRef, toRefs} from 'vue'
import useMainStore from '@/store/index'
import {storeToRefs} from 'pinia'
import emitter from '@/tools/mitt'
import usePostStore from '@/store/post'
import {useRoute} from 'vue-router'
import {ElMessage} from 'element-plus'
import {Editor} from '@wangeditor/editor-for-vue'
import '@wangeditor/editor/dist/css/style.css'
const route = useRoute()
const postStore = usePostStore()
const mainStore = useMainStore()
let {postInfo} = toRefs(postStore)
function updateContent(e: any) {
    params.content = e.target.innerText.trim()
    let lines = params.content.split('\n')
    params.content = lines.map((line) => `<p class="postStyle">${line}</p>`).join('')
    params.content = params.content.replace(/\s{1,}/g, ' ')
    console.log(params.content)
}
function pasteContent(e: any) {
    e.preventDefault()
    const text = e.clipboardData.getData('text/plain')
    const plainText = text.replace(/(<([^>]+)>)/gi, '')
    // 将清除样式后的文本重新插入到contenteditable元素中
    document.execCommand('insertHTML', false, plainText)
}
let params = {
    postId: postInfo.value.postId,
    postAuthorId: postInfo?.value.postAuthorId,
    content: '',
    cmtyId: Number(postInfo.value.community.cmtyId),
    cmtyName: postInfo.value.community.cmtyName
}
let message = ref('')
let emit = defineEmits(['closeEditor'])
function showMessage(message: string, type: undefined) {
    ElMessage({
        grouping: true,
        message: message,
        type: type == 0 ? 'success' : 'error'
    })
}
function close() {
    //mainStore.showCommentEditor = false
    emit('closeEditor', 'commentEditor')

    message.value = ''
}
function setContent(content: any /* content: {target: {innerHTML: string}} */) {
    console.log(e.target.innerText)
    params.content = e.target.innerText
    let lines = params.content.split('\n')
    params.content = lines.map((line) => `<p class="postStyle">${line}</p>`).join('')
    console.log(params.content)
}
async function reqSendComment(params: object) {
    console.log(params)
    let result = await sendComment(params)
    message.value = result.message
    showMessage(message.value, result.status)
    //关闭编辑器
    if (result.message == '发送成功') {
        setTimeout(() => {
            close()
            message.value = ''
        }, 1000)
        switch (route.name) {
            case 'P':
                emitter.emit('regetPostInfo')
                break

            case 'Comment':
                emitter.emit('regetCommentInfo')
                break
        }
    }
}
onMounted(() => {
    console.log('props的postInfo', postInfo.value)
})
</script>

<style scoped lang="scss">
.editorContainer {
    display: flex;
    justify-content: center;
    align-items: flex-start;
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
        margin-top: 70px;
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
                    //border-bottom: 1px solid #f1f1f1;

                    p {
                        padding-left: 10px;
                        font-size: 20px;
                        width: 550px;
                        min-height: 230px;
                        max-height: 650px;
                        background-color: white;
                        color: $mainFont;
                        outline: none;
                        overflow-y: scroll;
                        cursor: auto;
                    }
                    .richEditorContent {
                        padding-left: 10px;
                        font-size: 20px;
                        width: 550px;
                        min-height: 230px;
                        max-height: 650px;
                        background-color: white;
                        color: $regularFont;
                        outline: none;
                        overflow-y: hidden;
                        cursor: auto;

                        //min-height: 300px !important;

                        //background-color: red;

                        :deep(p) {
                            margin: 0 0;
                            font-size: 20px;
                        }
                        :deep(.w-e-text-placeholder) {
                            top: 3px;
                            font-size: 20px;
                            color: gray;
                            font-style: normal;
                        }
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
