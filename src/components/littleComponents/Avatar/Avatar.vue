<template>
    <div class="avatarComponent">
        <img :src="Avatar" alt="" @click.stop="pushRouter" />
    </div>
</template>
<script setup lang="ts">
import {computed} from 'vue'
import {useRouter} from 'vue-router'
const router = useRouter()

const props = defineProps(['Type', 'Info', 'Id', 'Avatar'])
let Type = computed(() => {
    return props.Type
})
let Info = computed(() => {
    return props.Info
})

let Id = computed(() => {
    return props.Id
})

let Avatar = computed(() => {
    return props.Avatar
})

function pushRouter() {
    switch (type.value) {
        case 'community':
            router.push(`/c/${id}`)
            break

        case 'user':
            router.push(`/u/${id}`)
    }
}
</script>
<style lang="scss" scoped>
.avatarComponent {
    img {
    }
}
</style>
