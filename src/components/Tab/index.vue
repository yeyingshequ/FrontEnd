<template>
    <div class="tabs">
        <div v-for="tab in tabs" :key="tab.id" class="router" @click="router.push(tab.router)">
            <span :class="{actived: tab.routeName == route.name || tab.default}"
                >{{ tab.Name }}
                <div v-show="tab.routeName == route.name || tab.default"></div>
            </span>
        </div>
    </div>
</template>
<script setup lang="ts">
import {computed, onMounted, ref, toRefs} from 'vue'
import {useRoute, RouterLink, useRouter} from 'vue-router'
const router = useRouter()
const props = defineProps(['tabs'])
//console.log('tabs', props.tabs)

let {tabs} = toRefs(props)

let currentId = ref(0)

function getId(tab: {id: number}) {
    currentId.value = tab.id
}

const route = useRoute()
onMounted(() => {
    //console.log("route.name", route.name);
    //console.log("tabs", tabs);
})
</script>
<style scoped lang="scss">
.tabs {
    position: sticky;
    top: 60px;
    display: flex;
    justify-content: center;
    width: 100%;
    height: 55px;
    background-color: white;
    border-bottom: 1px #f1f1f1 solid;
    z-index: 1;

    .router {
        display: flex;
        position: relative;
        justify-content: center;
        flex: 1;
        height: 100%;
        width: 698px;
        transition: 0.1s;
        cursor: pointer;

        &:hover {
            background-color: mix(#ff44aa, white, 10%);
        }

        span {
            position: absolute;
            line-height: 55px;

            div {
                bottom: 0;
                position: absolute;
                width: 100%;
                height: 4px;
                border-radius: 50px;
                background-color: $brandColor;
            }
        }

        .actived {
            font-weight: bold;
        }
    }
}
</style>
