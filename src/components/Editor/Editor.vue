<template>
    <div class="postEditorContainer">
        <div class="container">
            <div class="editorWrapper">
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
                        <div
                            class="richEditorContent"
                            ref="editor"
                            contenteditable="true"
                            @input="updateContent($event)"
                            @paste="pasteContent($event)"
                            :style="{minHeight: imgDisplayArr.length ? '100px' : '280px'}"
                        ></div>
                        <div v-show="showPlaceholder" @click="editor.focus()" class="placeholder">
                            请输入正文
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
import {computed, nextTick, onBeforeUnmount, onMounted, reactive, ref, toRefs, watch} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import useMainStore from '@/store'
import useCmtyStore from '@/store/community'
import useUserStore from '@/store/user'
import {checkCharLimit} from '@/tools/postTools'
import {generateUniqueFileName, showMessage, uploadImg, uploadImgList} from '@/tools'
import usePostStore from '@/store/post'
import storage from '@/tools/storage'
import CmtySelector from '@/components/Editor/CmtySelector.vue'
import COS from 'cos-js-sdk-v5'
import Images from '@/components/Images/Images.vue'
const postStore = usePostStore()
const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const cmtyStore = useCmtyStore()
const mainStore = useMainStore()
/******************************* */

const props = defineProps({
    parent: {
        type: String
    }
})

const {parent} = toRefs(props)

let editor = ref()
const fileInput = ref()
const showPlaceholder = ref(true)
let imgDisplayArr: string[] = reactive([])
let imgList: File[] = reactive([])
function deleteImg(i: number) {
    imgDisplayArr.splice(i, 1)
    imgList.splice(i, 1)
}

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

const uploadFile = (imgList: any) => {
    const promises = imgList.map((img: any) => {
        return new Promise((resolve, reject) => {
            var cos = new COS({
                SecretId: 'AKIDJRRWLuGPJwKSLzOZtypPjpgKmzxf9tQi',
                SecretKey: '82h6GAoDNI97zgyCLHzUknfMo36uSltq'
            })
            cos.putObject(
                {
                    Bucket: 'yeying-1317878245',
                    Region: 'ap-nanjing',
                    Key: generateUniqueFileName(),
                    StorageClass: 'STANDARD',
                    Body: img,
                    onProgress: (progressData) => {
                        //console.log(progressData)
                    }
                },
                (err: any, data: any) => {
                    if (err) {
                        //console.log('err:', err)
                        reject(err)
                    } else {
                        //console.log('data:', data)
                        resolve(data.Location)
                    }
                }
            )
        })
    })

    return Promise.all(promises)
}

/******************************* */
function updateContent(e: any) {
    params.plainText = e.target.innerText
    params.content = e.target.innerText
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
            if (file?.type.match(/^image\//)) {
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
    content: '',
    cmtyId: 0,
    cmtyName: '',
    images: [] as string[]
})

function close() {
    mainStore.close(parent?.value as string)
    params = {
        postTitle: '',
        plainText: '',
        content: '',
        cmtyId: 0,
        cmtyName: '',
        images: []
    }
}
async function reqSendPost(params: {
    cmtyId: number
    postTitle: string
    content: string
    cmtyName: string
    plainText: string
    images: string[]
}) {
    if (!params.cmtyName) {
        return showMessage('您尚未选择社区', 1)
    }
    params.postTitle = params.postTitle.trim()
    params.content = params.content.trim()
    //console.log('修改前的:', params.content)
    let lines = params.content.split('\n')
    params.content = lines.map((line) => `<p>${line}</p>`).join('')
    params.content = params.content.replace(/\s{1,}/g, ' ')
    //console.log('修改后的:', params.content)

    if (checkCharLimit(params.postTitle, 'postTitle') && checkCharLimit(params.plainText, 'post')) {
        if (!params.cmtyId) {
            let cmtyId = await getCmtyIdByName({cmtyName: params.cmtyName})
            if (!cmtyId.status) {
                params.cmtyId = cmtyId
            } else {
                return showMessage(cmtyId.message, cmtyId.status)
            }
        }
        const images = await uploadImgList(imgList)
        params.images = images.map((imageUrl) => `https://${imageUrl}`)
        //console.log('params:', params)

        let result = storage.get('token') ? await sendPost(params) : await sendPostForV(params)
        showMessage(result.message, result.status)
        if (!result.status) {
            router.push(`/p/${result.data}`)
            close()
        }
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
.postEditorContainer {
    @extend .darkMaskGSC;
    align-items: flex-start;
    .container {
        position: relative;
        overflow: hidden;
        border-radius: 20px;
        margin: 50px 20px 0 20px;
        width: 700px;
        max-height: 580px;

        .editorWrapper {
            background-color: white;
            overflow-y: scroll;
            height: 450px;
            max-height: 580px;
            width: 100%;
            //z-index: 555;
            .top {
                position: sticky;
                top: 0;
                display: flex;
                align-items: center;
                @extend .whiteGlassGSC;
                width: 100%;
                height: 50px;
                z-index: 2;
                .close {
                    position: absolute;
                    @extend .flexCentreGSC;
                    left: 20px;

                    @extend .whiteGlassGSC;
                    width: 35px;
                    height: 35px;
                    border-radius: 50%;
                    transition: 0.1s;
                    cursor: pointer;
                    i {
                        font-size: 22px;
                    }
                    &:hover {
                        background-color: mix($brandColor, white, 15%);
                    }
                }
            }

            .text {
                padding: 0 20px;
                display: flex;

                .left {
                    width: 70px;
                    margin-right: 10px;
                    flex-shrink: 0;
                    .iconWrapper {
                        position: absolute;
                        top: 50px;
                        @extend .flexCentreGSC;
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
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    flex-grow: 1;

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
                    .placeholder {
                        position: absolute;
                        top: 50px;
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
                        //overflow-y: scroll;
                        white-space: pre-wrap;
                        color: #797979;
                        -webkit-user-select: none;
                        cursor: text;
                    }
                    .images {
                        margin-bottom: 10px;
                        margin-right: 0;
                        /* :deep(.imgFor1) {
                            max-height: 330px;
                        } */
                    }
                    .tools {
                        display: flex;
                        align-items: center;
                        position: relative;
                        width: 100%;
                        height: 60px;
                        margin-bottom: -20px;
                        .otherTools {
                            display: flex;
                            align-items: center;
                            .insertImg {
                                margin-right: 10px;
                                input {
                                    display: none;
                                }
                                label {
                                    @extend .whiteBtnGSC;

                                    outline: none;
                                }
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
}
@media (max-width: 717px) {
    .postEditorContainer {
        .container {
            border-radius: 20px;
            margin-left: 20px;
            margin-right: 20px;
            .editorWrapper {
            }
            .text {
                .left {
                    display: none;
                }
            }
        }
    }
}
</style>
