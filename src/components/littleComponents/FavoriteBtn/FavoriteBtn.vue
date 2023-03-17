<template>
    <div
        class="favoriteBtnContainer"
        :class="{
            small: size == 'small',
            default: size == 'default',
            large: size == 'large',
            XLarge: size == 'XLarge'
        }"
    >
        <button
            class="goFavorite"
            v-if="route.name == 'Joined' || route.name == 'Favorite'"
            @click.stop="
                reqAddToFavoriteCmty(cmtyInfo, {
                    cmtyId: cmtyInfo.cmtyId,
                    isFavorite: cmtyInfo.userCmty.isFavorite
                })
            "
        >
            <i
                class="iconfont"
                :class="
                    cmtyInfo.userCmty.isFavorite ? [favoriteClass, favoriteIcon] : unfavoriteClass
                "
            ></i>
        </button>
    </div>
</template>
<script setup lang="ts">
import {updateUserCmty} from '@/api'
import {computed, ref, toRefs} from 'vue'
import {useRoute} from 'vue-router'
const route = useRoute()
/**特别关注的图标类型以及颜色**/
let favoriteClass = ref('icon-favorite')
let unfavoriteClass = ref('icon-unfavorite')
let favoriteIcon = ref('favoriteIcon')
/**************************** */
let props = defineProps(['cmtyInfo', 'size', 'parent'])
/* let {cmtyInfo, size, parent} = toRefs(props) */
let cmtyInfo = computed(() => {
    return props.cmtyInfo
})
let size = computed(() => {
    return props.size
})
let parent = computed(() => {
    return props.parent
})

async function reqAddToFavoriteCmty(
    cmty: {userCmty: {isFavorite: boolean}},
    params: {cmtyId: number; isFavorite: number}
) {
    if (!params.isFavorite) {
        let result = await updateUserCmty({request: 'addToFavorite', ...params})
        cmtyInfo.value.userCmty.isFavorite = true
    } else {
        let result = await updateUserCmty({request: 'removeFromFavorite', ...params})
        cmtyInfo.value.userCmty.isFavorite = false
    }

    /* regetRouteInfo() */
}
</script>
<style lang="scss" scoped>
.favoriteBtnContainer {
    .goFavorite {
        height: 35px;
        outline: none;
        border: 0;
        border-radius: 50px;
        cursor: pointer;
        width: 35px;
        color: $regularFont;
        background-color: white;
        border: 1px $placeholderFont solid;
        margin-right: 20px;
        transition: 0.1s;
        &:hover {
            background-color: mix($brandColor, black, 10%);
        }
        i {
            font-size: 16px;
        }

        .favoriteIcon {
            color: $brandColor;
        }

        &:hover {
            background-color: $button;
        }

        .el-icon-chat-round {
            font-size: 20px;
        }
    }
}
</style>
