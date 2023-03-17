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
                    type="password"
                    name=""
                    id=""
                />
            </div>
            <div newPassword="confirmPassword">
                <input
                    v-model="updateparams.confirmPassword"
                    placeholder="确认密码"
                    type="password"
                    name=""
                    id=""
                />
            </div>
        </div>
        <p>{{ updateMessage }}</p>
        <button type="submit">提 交</button>
        <!-- @click="getUpdate(updateparams)" -->
    </div>
</template>
<script setup lang="ts"></script>
<script>
import {updatePasswordApi} from '@/api'
import {reactive, ref} from 'vue'
let updateMessage = ref('')
let updateparams = reactive({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
})

export default {
    name: 'password',
    data() {
        return {
            updateMessage: '',
            updateparams: {
                oldPassword: '',
                newPassword: '',
                confirmPassword: ''
            },
            rule: {
                oldPassword: [
                    {require: true, message: '请填写所有的信息(前端)', trigger: 'blur'},
                    {min: 2, max: 10, message: '用户名长度必须在2-9个字符(前端)'}
                ],
                newPassword: [{}, {}]
            }
        }
    },
    methods: {}
}
</script>

<style scoped lang="scss">
.passwordContainer {
    position: relative;
    width: 500px;
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
    }
}
</style>
