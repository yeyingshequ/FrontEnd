<template>
    <div class="leftPanel">
        <div class="iconWrapper">
            <Avatar :type="type" :id="id" :avatar="avatar" />
        </div>
    </div>
</template>
<script setup lang="ts">
import {toRefs} from 'vue'
import Avatar from '@/components/littleComponents/Avatar/Avatar.vue'

const props = defineProps({
    id: {
        type: Number,
        required: true
    },
    avatar: {
        type: String,
        required: true
    },
    type: {
        type: String,
        default: 'user'
    }
})
let {id, avatar} = toRefs(props)
</script>
<style lang="scss" scoped>
.leftPanel {
    flex-shrink: 0;
    .iconWrapper {
        @extend .flexCentreGSC;
        width: 90px;
        height: 90px;

        /* background-color: pink; */
        /* .icon {
                width: 50px;
                height: 50px;

                img {
                    border-radius: 50%;
                    width: 100%;
                    height: 100%;
                }
            } */
    }
}
</style>
