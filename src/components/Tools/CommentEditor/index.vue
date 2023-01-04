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
                        <textarea
                            v-model="params.content"
                            placeholder="正文"
                            name=""
                            id=""
                            cols="52"
                            rows="9"
                        ></textarea>
                    </div>
                </div>
                <div class="submit">
                    <button type="submit" @click="reqSendComment(params)">发 送</button>
                    {{ message }}
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import scroll from '@/tools/scroll'
import {sendComment} from '@/api/index'
import {onMounted, ref, toRefs} from 'vue'
import useMainStore from '@/store/index'
import {storeToRefs} from 'pinia'
import emitter from '@/tools/mitt'
import usePostStore from '@/store/post'
const postStore = usePostStore()
const mainStore = useMainStore()
let {postInfo} = toRefs(postStore)
let params = {
    postId: postInfo.value.post.postId,
    postAuthorId: postInfo?.value.post.postAuthorId,
    content: '',
    cmtyId: postInfo.value.post.cmtyId
}
let message = ref('')
let emit = defineEmits(['closeEditor'])
function close() {
    mainStore.showCommentEditor = false
    scroll.move()
    message.value = ''
}
async function reqSendComment(params: {
    postId: number
    postAuthorId: number
    content: string
    cmtyId: number
}) {
    console.log(params)
    let result = await sendComment(params)
    message.value = result.message
    //关闭编辑器
    if (result.message == '发送成功') {
        setTimeout(() => {
            close()
            message.value = ''
        }, 1000)
        emitter.emit('regetPostInfo')
    }
}
onMounted(() => {
    scroll.stop()
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
        height: 410px;
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

                    textarea {
                        color: $regularFont;
                        padding-left: 10px;
                        font-family: inherit;
                        font-size: 19px;
                        resize: none;
                        outline: none;
                        border: 0;
                    }
                }
            }

            .submit {
                position: relative;
                padding-top: 10px;

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
