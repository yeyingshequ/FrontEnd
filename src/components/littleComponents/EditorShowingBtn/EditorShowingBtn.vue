<template>
    <div class="showEditorContainer">
        <button class="showEditor" @click="showEditor">
            {{ parent == 'post' ? '评论' : '回复' }}
        </button>
    </div>
</template>
<script setup lang="ts">
import {updateUserUser} from '@/api'
import emitter from '@/tools/mitt'
import {computed, onMounted} from 'vue'
import {useRoute} from 'vue-router'
import useUserStore from '@/store/user'
import useMainStore from '@/store/index'
const mainStore = useMainStore()
const userStore = useUserStore()
const route = useRoute()
let props = defineProps(['parent'])

//console.log('用户信息:', userInfo.value)

let parent = computed(() => {
    return props.parent
})
function showEditor() {
    emitter.emit('showEditor', parent.value)
}

onMounted(() => {})
</script>
<style lang="scss" scoped>
@import '@/components/littleComponents/Buttons/buttons.scss';
.showEditorContainer {
    .showEditor {
        @extend .brandColorBtnSC;
        padding: 0 15px;
        height: 30px;
        font-size: 16px;
    }
}
</style>
