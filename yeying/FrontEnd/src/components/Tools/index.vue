<template>
  <!-- 回复、转发、收藏、点赞 -->
  <div class="tools">
    <div @click='showEditor=true'>
      <i class="iconfont icon-pinglun"></i><span><!--   {{ postInfo.commentCount || '回复' }}--></span>
    </div>
    <!-- <div>
        <i class="iconfont icon-lihe"></i><span></span>
    </div> -->
    <div>
      <i class="iconfont icon-fenxiang"></i><span><!-- {{postInfo.shareCount||'分享' }}--></span>
    </div>
    <div>
      <i class="iconfont icon-aixin"></i><span><!--{{postInfo.likeCount||'点赞' }}--></span>
    </div>
    <CommentEditor v-if="showEditor && father == 'post'" @closeEditor="closeEditor"
                   :postInfo="postInfo"
    />
    <ReplyEditor v-if="showEditor && father == 'Comment'" @closeEditor="closeEditor"
                   :postInfo="postInfo" :commentInfo="commentInfo"
    />
  </div>
</template>
<script>
import CommentEditor from "@/components/Tools/CommentEditor";
import ReplyEditor from "@/components/Tools/ReplyEditor";

export default {
  name: 'Tools',
  components: {CommentEditor,ReplyEditor},
  props: ['postInfo', 'father','commentInfo'],
  data() {
    return {
      showEditor: false
    }
  },
  methods: {
    closeEditor() {
      this.showEditor = false
    }
  },
  mounted() {
    setTimeout(() => {
      //console.log('tools', this.postInfo)
    }, 1000)
  }
}
</script>
<style scoped lang="scss">
.tools {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 40px;
  /* background-color: hotpink; */
  div {
    /* height: 40px; */
    color: $regularFont;

    i {
      margin-right: 5px;
      font-size: 20px;
      vertical-align: middle;
      line-height: 2rem;
      text-align: center
    }

    span {
      font-size: 13px;
      position: relative;
      vertical-align: middle;
      line-height: 2rem;

    }
  }
}
</style>