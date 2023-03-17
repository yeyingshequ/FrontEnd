<template>
    <div>
        <div class="commentCard" v-for="comment in commentCardList">
            <div class="leftPart">
                <div class="iconWrapper">
                    <div class="icon">
                        <img
                            :src="post.postAuthor.avatar"
                            @click.stop="router.push(`/u/${post.postAuthorId}`)"
                        />
                    </div>
                </div>
            </div>
            <!-- 用户信息、帖子更新时间 -->
            <div class="rightPart">
                <div class="userInfo">
                    <PostMenu
                        class="postMenu"
                        :content="post.content"
                        father="post"
                        :postId="post.postId"
                        @click.stop
                    />
                    <div class="user">
                        <div class="userName">
                            <span>{{ post.postAuthor.username }}</span>
                        </div>
                        <div class="updateTime">
                            <span>{{ formatTime(post.updateTime) }}</span>
                        </div>
                    </div>
                </div>
                <!-- 标题和正文 -->
                <div class="Content">
                    <div class="title">
                        <h4>{{ post.postTitle }}</h4>
                    </div>
                    <div class="content">
                        <span v-html="post.content"></span>
                    </div>
                </div>
                <button
                    class="bar"
                    @click.stop="router.push(`/c/${post.cmtyId}`)"
                    v-if="route.matched[0].name != 'C'"
                >
                    <span> {{ post.community.cmtyName }}吧 </span>
                </button>
                <Tools :postInfo="post" father="postCard" style="padding-right: 20px" />
            </div>
        </div>
    </div>
</template>
<script setup lang="ts"></script>
<style lang="scss" scoped></style>
