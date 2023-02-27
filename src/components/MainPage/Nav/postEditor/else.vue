<template>
    <div class="postEditorContainer">
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
                        <!-- <p @input="setContent($event)" :contenteditable="true"></p> -->
                        <Editor
                            class="richEditorContent"
                            style="min-height: 230px,max-height:650px"
                            v-model="valueHtml"
                            :defaultConfig="editorConfig"
                            mode="default"
                            @onCreated="handleCreated"
                        />
                    </div>
                </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import scroll from '@/tools/scroll'
import {sendPost} from '@/api/index'
import {computed, onBeforeUnmount, onMounted, reactive, ref, shallowRef} from 'vue'
import {useRoute} from 'vue-router'
import useMainStore from '@/store/index'
import usePostStore from '@/store/post'
import useCmtyStore from '@/store/community'
import {ElMessage} from 'element-plus'
import {storeToRefs} from 'pinia'
import {Editor} from '@wangeditor/editor-for-vue'
import '@wangeditor/editor/dist/css/style.css'

const cmtyStore = useCmtyStore()
const postStore = usePostStore()
const mainStore = useMainStore()
const route = useRoute()
/**************************** 关于编辑器 ****************************/

const editorRef = shallowRef() // 编辑器实例，必须用 shallowRef
const valueHtml = ref('') // 内容 HTML
const toolbarConfig = {}
const editorConfig = {placeholder: '正文'}
const handleCreated = (editor: any) => {
    editorRef.value = editor // 记录 editor 实例，重要！
}

/**************************** 关于编辑器 ****************************/
// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
    const editor = editorRef.value
    if (editor == null) return
    editor.destroy()
})
let joinedCmtyCardList = computed(() => {
    return cmtyStore.joinedCmtyCardList
})

let {cmtyInfo} = storeToRefs(cmtyStore)
let chooseCommunity = ref()
/* function clearStyle(e: any) {
    e.preventDefault()
    var text
    var clp = (e.originalEvent || e).clipboardData
    if (clp === undefined || clp === null) {
        text = window.clipboardData.getData('text') || ''
        if (text !== '') {
            if (window.getSelection) {
                var newNode = document.createElement('span')
                newNode.innerHTML = text
                window.getSelection().getRangeAt(0).insertNode(newNode)
            } else {
                document.selection.createRange().pasteHTML(text)
            }
        }
    } else {
        text = clp.getData('text/plain') || ''
        if (text !== '') {
            document.execCommand('insertText', false, text)
        }
    }
} */

function filtCmtyName(name: string): string {
    if (name.length > 8) {
        name = name.substring(0, 8)
        name = name + '...'
    }
    return name
}
let showCmtyList = ref(false)
let cmtyName = ref('')
function setCmty(id: number, name: string) {
    showCmtyList.value = false
    cmtyName.value = name
    params.cmtyId = id
}

let params = reactive({
    postTitle: '',
    content: '',
    cmtyId: 0
})

let message = ref('')
function showMessage(message: string, type: undefined) {
    ElMessage({
        grouping: true,
        message: message,
        type: type == 0 ? 'success' : 'error'
    })
}

function close() {
    mainStore.showPostEditor = false
    scroll.move()
    message.value = ''
}
async function reqSendPost(params: {postTitle: string; content: string}) {
    params.postTitle = params.postTitle.trim()
    params.content = params.content.trim()
    console.log('发表帖子的参数', params)
    let result = await sendPost(params)
    message.value = result.message
    showMessage(message.value, result.status)
    //关闭编辑器
    if (result.message == '发送成功') {
        postStore.formatPostCard(result)
        setTimeout(() => {
            close()
            message.value = ''
        }, 1000)
        switch (route.matched[0].path) {
            case '/home':
                postStore.getHomePostCard()
                break
            case '/discover':
                postStore.getDiscoverPostCard()
                break
            case '/communities':
                postStore.getCmtyPosts({cmtyId: Number(route.params.cmtyId)})
                break
        }
    }
}
</script>

<style lang="scss">
.postEditorContainer {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(mix($brandColor, black, 10%), 0.3);
    z-index: 998;

    .editorWrapper {
        position: relative;
        width: 700px;
        margin-top: 70px;
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

                    /* p {
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
                    } */
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

        }
    }
}
</style>
