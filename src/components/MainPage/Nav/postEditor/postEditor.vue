<template>
    <div class="postEditorContainer">
        <div class="editorWrapper">
            <div class="close" @click="close">
                <i class="iconfont icon-guanbi1"></i>
            </div>

            <div class="text">
                <div class="left">
                    <div class="iconWrapper">
                        <img :src="userStore.myInfo.avatar" alt="" />
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
                    <div
                        class="richEditorContent"
                        contenteditable="true"
                        @input="updateContent($event)"
                        @paste="pasteContent($event)"
                    ></div>
                    <div class="tools">
                        <div
                            class="chooseCommunity"
                            ref="chooseCommunity"
                            @click="reqShowCmtyList()"
                        >
                            <span>{{ filtCmtyName(cmtyName) || '选择社区' }}</span>
                            <span v-if="cmtyName">吧</span>
                        </div>
                        <div class="cmtyList" v-show="showCmtyList == true">
                            <div class="mask" @click="showCmtyList = !showCmtyList"></div>
                            <div
                                class="cmtyBox"
                                ref="cmtyBox"
                                :style="{
                                    left: cmtyBoxLeft
                                }"
                            >
                                <el-scrollbar height="400px">
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
import {computed, onBeforeUnmount, onMounted, reactive, ref, shallowRef, watch} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import useMainStore from '@/store/index'
import usePostStore from '@/store/post'
import useCmtyStore from '@/store/community'
import useUserStore from '@/store/user'
import {ElMessage} from 'element-plus'
import {storeToRefs} from 'pinia'
import {Editor} from '@wangeditor/editor-for-vue'
import '@wangeditor/editor/dist/css/style.css'
import {QuillEditor} from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
const router = useRouter()
const userStore = useUserStore()
const cmtyStore = useCmtyStore()
const postStore = usePostStore()
const mainStore = useMainStore()
const route = useRoute()

onMounted(() => {
    reqGetJoinedCmty()
})

let {joinedCmtyCardList} = storeToRefs(cmtyStore)
let {cmtyInfo} = storeToRefs(cmtyStore)
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
    const plainText = text.replace(/(<([^>]+)>)/gi, '').replace(/\n/g, '<br>')
    // 将清除样式后的文本重新插入到contenteditable元素中
    document.execCommand('insertHTML', false, plainText)
}

let chooseCommunity = ref()
let cmtyBox = ref()
let cmtyBoxLeft = ref('')

function reqShowCmtyList() {
    /* console.log(chooseCommunity.value.offsetLeft) */
    //console.log(chooseCommunity.value.getBoundingClientRect().width)
    let position =
        chooseCommunity.value.offsetLeft + chooseCommunity.value.getBoundingClientRect().width / 2
    //console.log('position:', position)
    cmtyBoxLeft.value = position + 'px'
    showCmtyList.value = true
}

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

    message.value = ''
}
async function reqSendPost(params: {postTitle: string; content: string}) {
    params.postTitle = params.postTitle.trim()
    params.content = params.content.trim()
    console.log('发表帖子的参数', params)
    let result = await sendPost(params)
    console.log('结果:', result)

    message.value = result.message
    showMessage(message.value, result.status)
    //关闭编辑器
    if (result.message == '发送成功') {
        setTimeout(() => {
            close()
            message.value = ''
            router.push(`/p/${result.data}`)
        }, 1000)
    }
}
async function reqGetJoinedCmty() {
    cmtyStore.getCmtyCard({type: 'joined'})
}
</script>

<style lang="scss" scoped>
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
        margin-top: 150px;
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
                /* width: 70px; */
                flex: 70;
                .iconWrapper {
                    position: absolute;
                    top: 40px;
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
                width: 570px;
                margin-left: 10px;
                .title {
                    display: block;
                    color: $mainFont;
                    height: 50px;
                    width: 100%;

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
                    margin-top: 10px;
                    font-size: 20px;
                    min-height: 230px;
                    max-height: 550px;
                    background-color: white;
                    word-wrap: break-word;
                    color: $mainFont;
                    outline: none;
                    cursor: auto;
                    border-bottom: 1px solid #f1f1f1;
                    overflow-y: scroll;
                    /* div {
                        margin: 3px 0;
                    } */
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
                            //width: 238px;
                            max-height: 400px;
                            background-color: white;
                            border-radius: 20px;
                            box-shadow: 0 0 10px 1px rgb(255, 199, 230);
                            overflow-y: scroll;
                            overflow-x: hidden;
                            position: absolute;
                            transform: translateX(-50%);
                            //margin-left: 50%;
                            bottom: 0px;

                            z-index: 4;
                            :deep(.el-scrollbar__thumb) {
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
                        .triangle {
                            position: absolute;
                            left: 0;
                            height: 0;
                            width: 0;
                            border: 6px solid transparent;
                            transform: translateX(-50%);
                            border-top: 6px solid white;
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
                            &:hover {
                                background-color: mix($brandColor, black, 90%);
                            }
                        }
                    }
                }
            }
        }
    }
}
@media (max-width: 700px) {
    .postEditorContainer {
        .editorWrapper {
            width: 100%;
        }
        .text {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            width: 100%;
        }
    }
}
</style>
