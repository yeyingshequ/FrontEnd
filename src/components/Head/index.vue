<template>
    <div class="head">
        <div class="headNav">
            <div class="iconAndSearch">
                <div class="webicon">
                    <div class="logoWrapper" @click="router.push('/home')">
                        <img src="https://i.328888.xyz/2023/03/17/LVYgp.png" alt="" />
                    </div>
                </div>
                <div class="searchPart">
                    <div class="search" :class="{searchOnFocus: searchOnFocus === true}">
                        <input
                            type="text"
                            placeholder="本站官方qq群:123280905"
                            v-model="content"
                            ref="searchInput"
                            @focus="searchOnFocus = true"
                            @blur="searchOnFocus = false"
                            @keyup.enter="goSearch()"
                        />
                        <button @click="searchInput.focus()">
                            <el-icon><Search @click="goSearch()" /></el-icon>
                        </button>
                    </div>
                </div>
                <div class="navMenu">
                    <i class="iconfont icon-navMenu"></i>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import useCmtyStore from '@/store/community'
import {storeToRefs} from 'pinia'
import {computed, ref, watch} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import useMainStore from '@/store/index'
let content = ref('')
const mainStore = useMainStore()
let keyWords = computed(() => {
    return mainStore.searchKeyWord
})
let searchInput = ref()
const router = useRouter()
const route = useRoute()
const cmtyStore = useCmtyStore()
watch(route, () => {
    /* if (route.meta.keepSearchKeyWords) {

        mainStore.searchKeyWord = route.params.keyWords.toString()
    } */
    content.value = route.params.keyWords ? route.params.keyWords.toString() : ''
    mainStore.searchKeyWord = route.params.keyWords ? route.params.keyWords.toString() : ''
})

function goSearch() {
    mainStore.searchKeyWord = content.value
    router.push(`/search/post/${keyWords.value}`)
}
let searchOnFocus = ref(false)
</script>

<style scoped lang="scss">
.head {
    display: flex;
    justify-content: center;
    position: fixed;
    top: 0;
    width: 100%;
    height: 60px;
    background-color: #ffffff;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
    z-index: 100;

    .headNav {
        width: 1000px;
        height: 100%;
        @media (max-width: 1000px) {
            width: 800px;
        }

        /* background-color:blueviolet; */
        .iconAndSearch {
            display: flex;
            align-items: center;
            width: 700px;
            height: 100%;
            @media (max-width: 817px) {
                width: 700px;
            }
            @media (max-width: 717px) {
                width: 98vw;
            }
            .webicon {
                display: flex;
                justify-content: center;
                position: relative;
                width: 75px;
                height: 50px;
                line-height: 52px;
                cursor: pointer;
                -webkit-user-select: none;
                transition: 0.5s;
                flex-shrink: 0;
                .logoWrapper {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 50px;
                    width: 50px;
                    transition: 0.1s;
                    border-radius: 50%;
                    &:hover {
                        background-color: $onHover;
                    }
                    img {
                        width: 75%;
                        height: 75%;
                        border-radius: 50%;
                    }
                }

                &:hover .mask {
                    background: rgba(0, 0, 0, 0.3);
                }
            }

            .searchPart {
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                justify-content: center;
                height: 100%;
                flex-grow: 1;
                /* background-color: green; */

                .search,
                .searchOnFocus {
                    display: flex;
                    overflow: hidden;
                    align-items: center;
                    //width: 600px;
                    flex-grow: 1;
                    height: 50px;
                    border-radius: 50px;
                    background-color: white;
                    border: 1px solid white;

                    button {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 50px;
                        width: 65px;
                        font-size: 25px;
                        border: 0px;
                        background-color: $onHover;
                        outline-style: none;
                        cursor: pointer;
                        flex-shrink: 0;
                    }

                    input {
                        padding-left: 40px;
                        height: 50px;
                        width: 100%;
                        outline-style: none;
                        border: 0px;
                        font-size: 20px;
                        background-color: $onHover;
                    }
                }

                .searchOnFocus {
                    border: 1px solid $brandColor;

                    button {
                        background: white;
                    }

                    input {
                        background: white;
                    }
                }
            }
            .navMenu {
                cursor: pointer;
                margin-left: 20px;
                margin-right: 20px;
                display: none;
                flex-shrink: 0;

                i {
                    font-size: 30px;
                }
                &:hover {
                    color: $brandColor;
                }
                @media (max-width: 817px) {
                    display: block;
                }
            }
        }
    }
}

.mask {
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0);
    border-radius: 50px;
    transition: 0.1s;
}
</style>
