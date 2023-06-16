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
                        <div class="richEditorContentWrapper">
                            <p
                                class="richEditorContent"
                                :contenteditable="true"
                                @input="updateContent($event)"
                                @paste="pasteContent($event)"
                                :style="{minHeight: imgDisplayArr.length ? '100px' : '280px'}"
                            ></p>
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
                            </div>
                            <div class="submit">
                                <button type="submit" @click="reqSendComment(params)">发 送</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import scroll from '@/tools/scroll'
import {sendComment, sendCommentForV} from '@/api'
import {onBeforeUnmount, onMounted, reactive, ref, shallowRef, toRefs} from 'vue'
import useMainStore from '@/store'
import {storeToRefs} from 'pinia'
import emitter from '@/tools/mitt'
import usePostStore from '@/store/post'
import {useRoute} from 'vue-router'
import {checkCharLimit, processPlainText} from '@/tools/postTools'
import useUserStore from '@/store/user'
import storage from '@/tools/storage'
import {showMessage, uploadImg, uploadImgList} from '@/tools'
const userStore = useUserStore()
const route = useRoute()
const postStore = usePostStore()
const mainStore = useMainStore()
const emit = defineEmits(['setEditor'])
let {postInfo} = toRefs(postStore)
let editor = ref()
let showPlaceholder = ref(true)
const fileInput = ref()

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
            convertImageToBase64(file, function (base64: string) {
                //console.log(base64)

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
function updateContent(e: any) {
    params.plainText = e.target.innerText.trim()
    e.target.innerText ? (showPlaceholder.value = false) : (showPlaceholder.value = true)
    console.log(params.plainText)
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
let params = {
    postId: postInfo.value.postId,
    plainText: '',
    images: [] as string[]
}
function close() {
    emit('setEditor', 'comment')
    mainStore.isScrollingStopped = false
}

async function reqSendComment(params: {
    /* content: string;  */ plainText: string
    images: string[]
}) {
    console.log('发表评论的参数', params)
    params.plainText = processPlainText(params.plainText)
    //判断字数是否超出限制
    if (!checkCharLimit(params.plainText, 'comment')) return
    isLoading.value = true
    //上传图片到图床
    const images = await uploadImgList(imgList)
    params.images = images.map((imageUrl: any) => `https://${imageUrl}`)
    let result = storage.get('token') ? await sendComment(params) : await sendCommentForV(params)
    isLoading.value = false
    showMessage(result.message, result.status)
    //关闭编辑器
    if (!result.status) {
        close()
        switch (route.name) {
            case 'P':
                postStore.postInfo.comment.push(result.data)
                break
        }
    }
}
onMounted(() => {
    //console.log('props的postInfo', postInfo.value)
    mainStore.isScrollingStopped = true
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
            background-color: white;
            overflow-y: scroll;
            height: 400px;
            max-height: 580px;
            width: 100%;
            .top {
                @extend .topFromEditorSC;
            }

            .text {
                padding: 0 20px;
                display: flex;
                margin-left: 20px;

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
    .editorContainer {
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
