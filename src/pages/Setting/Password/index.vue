<template>
    <div class="passwordContainer">
        <div CLASS="topTitle">
            <span> 更改你的密码 </span>
        </div>
        <div class="form" :model="updateparams">
            <div prop="oldPassword">
                <input
                    v-model="updateparams.oldPassword"
                    placeholder="旧密码"
                    autocomplete="off"
                    type="password"
                    name=""
                    id=""
                    prop="oldPassword"
                />
            </div>
            <div prop="newPassword">
                <input
                    v-model="updateparams.newPassword"
                    placeholder="新密码"
                    autocomplete="off"
                    type="password"
                    name=""
                    id=""
                />
            </div>
            <div newPassword="confirmPassword">
                <input
                    v-model="updateparams.confirmPassword"
                    placeholder="确认密码"
                    autocomplete="off"
                    type="password"
                    name=""
                    id=""
                />
            </div>
        </div>
        <p>{{ updateMessage }}</p>
        <button type="submit" @click="reqUpdatePassword(updateparams)">提 交</button>
    </div>
</template>
<script setup lang="ts">
import {updatePassword} from '@/api'
import {showMessage} from '@/tools'
import {nextTick, onMounted, reactive, ref} from 'vue'
import useMainStore from '@/store/index'
const mainStore = useMainStore()
let updateMessage = ref('')
let updateparams = reactive({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
})
async function reqUpdatePassword(params: object) {
    let result = await updatePassword(params)
    showMessage(result.message, result.status)
    nextTick(() => {
        mainStore.topLevelRouteKey++
    })
}

onMounted(() => {
    updateparams.oldPassword = ''
})
</script>

<style scoped lang="scss">
.passwordContainer {
    position: relative;
    //width: 100%;
    padding: 0 20px;

    .topTitle {
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 60px;
        width: 100%;
        padding-left: 20px;
        margin-bottom: 10px;

        span {
            font-size: 20px;
            font-weight: bold;
        }
    }

    .form {
        input {
            height: 65px;
            width: 100%;
            font-size: 20px;
            outline: none;
            margin-bottom: 30px;
            padding: 0 10px;
            border-radius: 5px;
            border: 1px solid $placeholderFont;
        }
    }

    button {
        position: absolute;
        right: 20px;
        margin: 0 auto;
        height: 40px;
        padding: 0 20px;
        font-size: 20px;
        font-weight: bold;
        color: white;
        background-color: $brandColor;
        border-radius: 50px;
        outline: none;
        border: 0;
        cursor: pointer;
        &:hover {
            background-color: $onHoverDark;
        }
    }
}
@media (max-width: 717px) {
}
</style>
