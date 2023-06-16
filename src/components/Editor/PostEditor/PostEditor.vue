<template>
    <div class="postEditorContainer">
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
                        <input
                            v-model="params.postTitle"
                            class="title"
                            placeholder="可以在这里输入标题"
                            type="text"
                            name=""
                            id=""
                        />
                        <div class="richEditorContentWrapper">
                            <div
                                class="richEditorContent"
                                ref="editor"
                                contenteditable="true"
                                @input="updateContent($event)"
                                @paste="pasteContent($event)"
                                :style="{minHeight: imgDisplayArr.length ? '100px' : '230px'}"
                            ></div>
                            <div
                                v-show="showPlaceholder"
                                @click="editor.focus()"
                                class="placeholder"
                            >
                                请输入正文
                            </div>
                        </div>
                        <Images
                            :imageList="imgDisplayArr"
                            class="images"
                            parent="editor"
                            @getDeleteImgIndex="deleteImg"
                        />
                        <div class="tools">
                            <div class="otherTools">
                                <div class="insertImg">
                                    <input
                                        type="file"
                                        placeholder="上传图片"
                                        id="imgInput"
                                        ref="fileInput"
                                        @change="handleFileChange"
                                        multiple
                                    />
                                    <label for="imgInput" class="insertImg">
                                        <span>插入图片</span>
                                    </label>
                                </div>
                                <CmtySelector @setCmty="setCmty" />
                            </div>
                            <div class="submit">
                                <button type="submit" @click="reqSendPost(params)">发 帖</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import {getCmtyIdByName, sendPost, sendPostForV} from '@/api'
import {computed, nextTick, onBeforeUnmount, onMounted, reactive, ref, watch} from 'vue'
import {useRoute, useRouter} from 'vue-router'

import useMainStore from '@/store'
import useCmtyStore from '@/store/community'
import useUserStore from '@/store/user'
import {checkCharLimit, processPlainText} from '@/tools/postTools'
import {generateUniqueFileName, showMessage, uploadImgList} from '@/tools'
import usePostStore from '@/store/post'
import storage from '@/tools/storage'
import CmtySelector from '@/components/Editor/CmtySelector.vue'
import DOMPurify from 'dompurify'
import Images from '@/components/Images/Images.vue'
import LoadingSpinner from '@/components/littleComponents/Loading/loadingSpinner.vue'
const postStore = usePostStore()
const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const cmtyStore = useCmtyStore()
const mainStore = useMainStore()
/******************************* */
let editor = ref()
const fileInput = ref()
const showPlaceholder = ref(true)
let imgDisplayArr: string[] = reactive([])
let imgList: File[] = reactive([])
function deleteImg(i: number) {
    imgDisplayArr.splice(i, 1)
    imgList.splice(i, 1)
}
let isLoading = ref(false)
function handleFileChange(event: any) {
    const files = event.target.files
    for (let i = 0; i < files.length; i++) {
        const file = files[i]
        if (file.type.match(/^image\//)) {
            convertImageToBase64(file, function (base64: any) {
                if (imgDisplayArr.length < 4) {
                    imgList.push(file)
                    imgDisplayArr.push(base64)
                } else {
                    showMessage('只能添加4张图片', 1)
                }
            })
        } else {
            console.error('Invalid file type, please select an image file.')
        }
    }
}
function convertImageToBase64(file: Blob, callback: any) {
    const reader = new FileReader()
    reader.onload = function (event) {
        const base64 = event.target!.result
        callback(base64)
    }
    reader.readAsDataURL(file)
}

/******************************* */
function updateContent(e: any) {
    params.plainText = e.target.innerText
    //params.content = e.target.innerText
    e.target.innerText ? (showPlaceholder.value = false) : (showPlaceholder.value = true)
}
function pasteContent(e: any) {
    const items = e.clipboardData?.items
    if (!items) return
    for (let i = 0; i < items.length; i++) {
        const item = items[i]
        if (item.type.indexOf('image') !== -1) {
            // 粘贴板中包含图像
            const file = item.getAsFile()
            //console.log('file:', file)
            if (file.type.match(/^image\//)) {
                convertImageToBase64(file, function (base64: any) {
                    if (imgDisplayArr.length < 4) {
                        imgList.push(file)
                        imgDisplayArr.push(base64)
                    } else {
                        showMessage('只能添加4张图片', 1)
                    }
                })
            } else {
                console.error('Invalid file type, please select an image file.')
            }
            break
        }
    }

    e.preventDefault()
    const text = e.clipboardData.getData('text/plain')
    const plainText = text.replace(/(<([^>]+)>)/gi, '').replace(/\n/g, '<br>')
    document.execCommand('insertHTML', false, plainText)
}
function setCmty(data: any) {
    //console.log(data)
    params.cmtyId = data.cmtyId
    params.cmtyName = data.cmtyName
}
let params = reactive({
    postTitle: '',
    plainText: '',
    //content: '',
    cmtyId: 0,
    cmtyName: '',
    images: [] as string[]
})

function close() {
    mainStore.close('postEditor')
}
async function reqSendPost(params: {
    cmtyId: number
    postTitle: string
    //content: string
    cmtyName: string
    plainText: string
    images: string[]
}) {
    if (!params.cmtyName) {
        return showMessage('您尚未选择社区', 1)
    }
    params.postTitle = params.postTitle.trim()
    params.plainText = processPlainText(params.plainText)
    /* 检查字数限制 */
    if (!checkCharLimit(params.postTitle, 'postTitle') || !checkCharLimit(params.plainText, 'post'))
        return
    if (!params.cmtyId) {
        let cmtyId = await getCmtyIdByName({cmtyName: params.cmtyName})
        if (!cmtyId.status) {
            params.cmtyId = cmtyId.data
        } else {
            return showMessage(cmtyId.message, cmtyId.status)
        }
    }
    isLoading.value = true
    const images = await uploadImgList(imgList)
    params.images = images.map((imageUrl: any) => `https://${imageUrl}`)
    //console.log('params:', params)

    let result = storage.get('token') ? await sendPost(params) : await sendPostForV(params)
    isLoading.value = false
    showMessage(result.message, result.status)
    if (!result.status) {
        router.push(`/p/${result.data}`)
        close()
    }
}
onMounted(() => {
    mainStore.isScrollingStopped = true
})
onBeforeUnmount(() => {
    mainStore.isScrollingStopped = false
})
</script>

<style lang="scss" scoped>
@import '@/components/Editor/style.scss';
.postEditorContainer {
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
                padding: 0 20px;
                display: flex;

                .left {
                    @extend .editorAvatarPartSC;
                }
                .right {
                    @extend .editorRightSC;
                }
            }
        }
    }
}
@media (max-width: 717px) {
    .postEditorContainer {
        .container {
            border-radius: 20px;
            margin-left: 20px;
            margin-right: 20px;
            .text {
                .left {
                    display: none;
                }
            }
        }
    }
}
</style>
