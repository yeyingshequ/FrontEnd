<template>
    <div class="postEditorContainer">
        <div class="editorWrapper">
            <div class="close" @click="close">
                <i class="iconfont icon-guanbi1"></i>
            </div>
            <div class="text">
                <div class="left">
                    <div class="iconWrapper">
                        <img src="@/images/1_BigPic.png" alt="" />
                    </div>
                </div>
                <div class="right">
                    <input
                        v-model="params.postTitle"
                        class="title"
                        placeholder="可以在这里输入标题"
                        type="text"
                        name=""
                        id=""
                    />

                    <Editor
                        class="richEditorContent"
                        style="min-height: 230px,max-height:650px"
                        v-model="valueHtml"
                        :defaultConfig="editorConfig"
                        mode="default"
                        @onCreated="handleCreated"
                    />

                    <div class="tools">
                        <div
                            class="chooseCommunity"
                            ref="chooseCommunity"
                            @click="showCmtyList = !showCmtyList"
                        >
                            <span>{{ filtCmtyName(cmtyName) || '选择社区' }}</span>
                            <span v-if="cmtyName">吧</span>
                        </div>
                        <div class="cmtyList" v-show="showCmtyList == true">
                            <div class="mask" @click="showCmtyList = !showCmtyList"></div>

                            <div class="cmtyBox" ref="box">
                                <el-scrollbar max-height="400px" color="" class="scrollBar">
                                    <div
                                        class="item"
                                        v-for="cmty in joinedCmtyCardList"
                                        :key="cmty.cmtyId"
                                        @click="setCmty(cmty.cmtyId, cmty.cmtyName)"
                                    >
                                        <span>{{ filtCmtyName(cmty.cmtyName) }}吧</span>
                                    </div>
                                </el-scrollbar>
                            </div>
                        </div>
                        <div class="submit">
                            <button type="submit" @click="reqSendPost(params)">发 帖</button>
                        </div>
                    </div>
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
.right {
    display: block;
    width: 550px;
    .title {
        display: block;
        color: $mainFont;
        height: 70px;
        width: 550px;
        margin-left: 10px;
        padding-left: 10px;
        font-size: 20px;
        font-weight: bold;
        outline: none;
        border: 0;
        border-bottom: 1px solid #f1f1f1;
    }
    .richEditorContent {
        display: block;
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

        border-bottom: 1px solid #f1f1f1;
        p {
            margin: 0 0;
            font-size: 20px;
        }
        .w-e-text-placeholder {
            top: 3px;
            font-size: 20px;
            color: gray;
            font-style: normal;
        }
    }

    .tools {
        display: block;
        position: relative;
        width: 100%;
        height: 60px;
        margin-bottom: -20px;
        .chooseCommunity {
            position: absolute;
            display: flex;
            justify-content: center;
            align-items: center;
            bottom: 17px;
            left: 20px;
            //width: 80px;
            height: 26px;
            padding: 0 7px;
            border: $brandColor solid 1px;
            border-radius: 50px;
            cursor: pointer;
            transition: 0.1s;
            &:hover {
                background-color: $onHover;
            }
            span {
                font-size: 15px;
                line-height: 20px;
                font-weight: bold;
                color: $brandColor;
            }
        }
        .massage {
            position: absolute;
            bottom: 20px;
            left: 300px;
        }
        .cmtyList {
            position: relative;
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

            .cmtyBox {
                //min-width: 200px;
                width: 238px;
                max-height: 400px;
                background-color: white;
                border-radius: 20px;
                box-shadow: 0 0 10px 1px rgb(255, 199, 230);
                overflow-y: scroll;
                overflow-x: hidden;
                position: absolute;
                //margin-left: 50%;
                bottom: 0px;
                left: 19px;
                z-index: 4;
                .el-scrollbar__thumb {
                    //可设置滚动条颜色
                    background: $brandColor; //这里我设置成了透明色,可以根据需求添加自己想要的颜色
                }
                .item {
                    display: flex;
                    align-items: center;
                    height: 40px;
                    width: 100%;
                    cursor: pointer;
                    transition: 0.1s;
                    &:hover {
                        background-color: $onHover;
                    }
                    span {
                        font-weight: bold;
                        padding: 0 40px;
                    }
                }
            }
            //隐藏滚动条,但是可以滚动
            .cmtyBox::-webkit-scrollbar {
                display: none;
            }
        }

        .submit {
            position: absolute;
            right: 0px;
            bottom: 50px;
            //padding-top: px;

            button {
                position: absolute;
                right: 10px;
                height: 40px;
                width: 90px;
                //padding: 0 20px;
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
            display: flex;
            margin-left: 20px;
            margin-top: 20px;

            .left {
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
            .right {
                display: block;
                width: 550px;
                .title {
                    display: block;
                    color: $mainFont;
                    height: 70px;
                    width: 550px;
                    margin-left: 10px;
                    padding-left: 10px;
                    font-size: 20px;
                    font-weight: bold;
                    outline: none;
                    border: 0;
                    border-bottom: 1px solid #f1f1f1;
                }
                .richEditorContent {
                    display: block;
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

                    border-bottom: 1px solid #f1f1f1;
                    p {
                        margin: 0 0;
                        font-size: 20px;
                    }
                    .w-e-text-placeholder {
                        top: 3px;
                        font-size: 20px;
                        color: gray;
                        font-style: normal;
                    }
                }

                .tools {
                    display: block;
                    position: relative;
                    width: 100%;
                    height: 60px;
                    margin-bottom: -20px;
                    .chooseCommunity {
                        position: absolute;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        bottom: 17px;
                        left: 20px;
                        //width: 80px;
                        height: 26px;
                        padding: 0 7px;
                        border: $brandColor solid 1px;
                        border-radius: 50px;
                        cursor: pointer;
                        transition: 0.1s;
                        &:hover {
                            background-color: $onHover;
                        }
                        span {
                            font-size: 15px;
                            line-height: 20px;
                            font-weight: bold;
                            color: $brandColor;
                        }
                    }
                    .massage {
                        position: absolute;
                        bottom: 20px;
                        left: 300px;
                    }
                    .cmtyList {
                        position: relative;
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

                        .cmtyBox {
                            //min-width: 200px;
                            width: 238px;
                            max-height: 400px;
                            background-color: white;
                            border-radius: 20px;
                            box-shadow: 0 0 10px 1px rgb(255, 199, 230);
                            overflow-y: scroll;
                            overflow-x: hidden;
                            position: absolute;
                            //margin-left: 50%;
                            bottom: 0px;
                            left: 19px;
                            z-index: 4;
                            .el-scrollbar__thumb {
                                //可设置滚动条颜色
                                background: $brandColor; //这里我设置成了透明色,可以根据需求添加自己想要的颜色
                            }
                            .item {
                                display: flex;
                                align-items: center;
                                height: 40px;
                                width: 100%;
                                cursor: pointer;
                                transition: 0.1s;
                                &:hover {
                                    background-color: $onHover;
                                }
                                span {
                                    font-weight: bold;
                                    padding: 0 40px;
                                }
                            }
                        }
                        //隐藏滚动条,但是可以滚动
                        .cmtyBox::-webkit-scrollbar {
                            display: none;
                        }
                    }

                    .submit {
                        position: absolute;
                        right: 0px;
                        bottom: 50px;
                        //padding-top: px;

                        button {
                            position: absolute;
                            right: 10px;
                            height: 40px;
                            width: 90px;
                            //padding: 0 20px;
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
</style>
