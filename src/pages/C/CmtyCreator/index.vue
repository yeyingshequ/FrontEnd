<template>
  <div class="cmtyCreatorContainer">
    <div class="wrapper">
      <div class="close" @click="close">
        <i class="iconfont icon-guanbi1"></i>
      </div>
      <div>
        <h1>创建社区</h1>
      </div>
      <div class="cmtyName">
        <input
          v-model="params.cmtyName"
          type="text"
          placeholder="社区名字"
          name=""
          id=""
        />
      </div>
      <div class="category">
        <select id="sel" name="category" v-model="params.cmtyCategory">
          <option
            v-for="category in categoryList"
            :key="category.value"
            :value="category.name"
          >
            {{ category.name }}
          </option>
        </select>
      </div>
      <div class="submit">
        <button type="submit" @click="createCmty(params)">创 建</button>
      </div>
      {{ message }}
    </div>
  </div>
</template>
<script setup lang="ts">
import scroll from '@/tools/scroll'
import {createCmty} from '@/api'
import { onMounted, reactive, ref } from 'vue';
import useMainStore from '@/store/index'
const mainStore = useMainStore()
const categoryList = [
 {value: 1,  name: '运动'},
 {value: 2,  name: '游戏'},
 {value: 3,  name: '数码'},
 {value: 4,  name: '科学'},
 {value: 5,  name: '动漫'},
 {value: 6,  name: '音乐'},
 {value: 7,  name: '休闲时尚'},
 {value: 8,  name: '文学'},
 {value: 9,  name: '校园'},
 {value: 10, name: '明星'},
 {value: 11, name: '网友俱乐部'},
 {value: 12, name: '个人社区'},
 {value: 13, name: '运动'},
 {value: 14, name: '游戏'},
 {value: 15, name: '数码'},
 {value: 16, name: '情感'},
]
let params= reactive({
  cmtyName: '',
  cmtyCategory: ''
})
let message = ref('') 

function close() {
  mainStore.showCmtyCreator=false
  scroll.move()
}
async function createCmty(params:{cmtyName:string,cmtyCategory:string}) {
  let result:any = await createCmty(params)
  message.value = result.message
  //关闭社区创建框
  if (result.status === 0) {
    setTimeout(() => {
      close()
      message.value = ''
    }, 1000)
  }
}
</script>

<style scoped lang="scss">
.cmtyCreatorContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(mix($brandColor, black, 10%), 0.5);
  z-index: 997;

  .wrapper {
    position: relative;
    -webkit-user-select: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 700px;
    height: 500px;
    background-color: white;
    border-radius: 20px;

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

    h1 {
      margin-top: 50px;
    }

    .cmtyName {
      width: 50%;

      input {
        padding-left: 20px;
        margin-top: 50px;
        height: 60px;
        width: 100%;
        font-size: 20px;
        color: $mainFont;
        outline: none;
        border: 1px solid $placeholderFont;
        border-radius: 5px;
      }
    }

    .category {
      width: 50%;
      select {
        padding-left: 20px;
        margin-top: 50px;
        height: 60px;
        width: 100%;
        font-size: 20px;
        color: $mainFont;
        outline: none;
        border: 1px solid $placeholderFont;
        border-radius: 5px;
        option {
          &:hover {
            background-color: $brandColor;
          }
        }
      }
    }

    .submit {
      margin-top: 50px;
      button {
        padding: 0;
        height: 50px;
        width: 190px;
        font-size: 20px;
        font-weight: bold;
        color: white;
        vertical-align: top;
        background-color: $brandColor;
        border-radius: 50px;
        cursor: pointer;
        border: 0;

        &:hover {
          background-color: mix($brandColor, black, 90%);
        }
      }
    }
  }
}
</style>
