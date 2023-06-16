<template>
    <div class="avatarComponent">
        <img :src="avatar" alt="" :style="{width: size, height: size}" @click.stop="pushRouter" />
    </div>
</template>
<script setup lang="ts">
import {computed, onMounted, ref, toRefs} from 'vue'
import {useRouter} from 'vue-router'
const router = useRouter()

const props = defineProps(['type', 'info', 'id', 'avatar', 'size'])
let type = computed(() => {
    return props.type
})
let info = computed(() => {
    return props.info
})

let id = computed(() => {
    return props.id
})

let avatar = computed(() => {
    return props.avatar
})
let size = computed(() => {
    return props.size ? props.size + 'px' : '50px'
})
let avatarSize = ref({
    width: '30px',
    height: '30px'
})

function pushRouter() {
    switch (type.value) {
        case 'community':
            router.push(`/c/${id.value}`)
            break

        case 'user':
            router.push(`/u/${id.value}`)
    }
}
onMounted(() => {})
</script>
<style lang="scss" scoped>
.avatarComponent {
    /* width: 50px;
    height: 50px; */
    img {
        border-radius: 50%;
        width: 100%;
        height: 100%;
    }
}
</style>
