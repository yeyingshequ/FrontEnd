<template>
  <div class="head">
    <div class="headNav">
      <div class="iconAndSearch">
        <div class="webicon">
          <div class="logoWrapper">
            <img src="./images/weblogo.png" alt="" />
          </div>
        </div>
        <div class="searchPart">
          <div class="search" :class="{searchOnFocus: searchOnFocus === true}">
            <input
              type="text"
              placeholder="游客无需注册也可以发帖喔~~"
              v-model="inputText"
              ref="searchInput"
              @focus="searchOnFocus = true"
              @blur="searchOnFocus = false"
            />
            <button @click="$refs.searchInput.focus()">
              <i class="el-icon-search"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

let inputText =  ref('')
let searchOnFocus = ref(false)
</script>

<style scoped lang="scss">
.head {
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  width: 102%;
  height: 60px;
  background-color: #ffffff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  z-index: 2;

  .headNav {
    width: 1000px;
    height: 100%;

    /* background-color:blueviolet; */
    .iconAndSearch {
      display: flex;
      align-items: center;
      width: 700px;
      height: 100%;

      .webicon {
        display: flex;
        justify-content: center;
        position: relative;
        width: 75px;
        height: 50px;
        line-height: 52px;
        cursor: pointer;
        /* background-color:purple; */
        transition: 0.5s;

        .logoWrapper {
          height: 50px;
          width: 50px;

          img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }

        &:hover .mask {
          background: rgba(0, 0, 0, 0.3);
        }
      }

      .searchPart {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 625px;
        height: 100%;

        /* background-color: green; */

        .search,
        .searchOnFocus {
          display: flex;
          overflow: hidden;
          align-items: center;
          width: 600px;
          height: 50px;
          border-radius: 50px;
          background-color: white;
          border: 1px solid white;

          button {
            height: 50px;
            flex: 2;
            font-size: 25px;
            border: 0px;
            background-color: $onHover;
            outline-style: none;
            cursor: pointer;
          }

          input {
            padding-left: 50px;
            height: 50px;
            flex: 15;
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
