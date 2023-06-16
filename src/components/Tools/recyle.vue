<template>
    <div></div>
</template>
<script setup lang="ts">
async function setLikeCount() {
    /* switch (father.value) {
        case 'postCard':
            switch (route.name) {
                case 'Home':
                    let iHome = postStore.homePostCardList.findIndex(
                        (item) => item.postId === postInfo.value.postId
                    )
                    if (!postInfo.value.isLiked) {
                        postInfo.value.isLiked = true
                        postInfo.value.likeCount++
                        //postStore.homePostCardList[iHome].likeCount++
                        await updateUserPost({
                            type: 'userPost',
                            request: 'like',
                            id: postInfo.value.postId
                        })
                    } else {
                        postInfo.value.isLiked = false
                        postStore.homePostCardList[iHome].likeCount--
                        await updateUserPost({
                            type: 'userPost',
                            request: 'unLike',
                            id: postInfo.value.postId
                        })
                    }
                    break
                case 'Discover':
                    let iDiscover = postStore.discoverPostCardList.findIndex(
                        (item) => item.postId === postInfo.value.postId
                    )
                    if (!postInfo.value.isLiked) {
                        postInfo.value.isLiked = true
                        postStore.discoverPostCardList[iDiscover].likeCount++
                        await updateUserPost({
                            type: 'userPost',
                            request: 'like',
                            id: postInfo.value.postId
                        })
                    } else {
                        postInfo.value.isLiked = false
                        postStore.discoverPostCardList[iDiscover].likeCount--
                        await updateUserPost({
                            type: 'userPost',
                            request: 'unLike',
                            id: postInfo.value.postId
                        })
                    }
                    break
                case 'CmtyHome':
                    let iCmty = postStore.cmtyPostCardList.findIndex(
                        (item) => item.postId === postInfo.value.postId
                    )
                    if (!postInfo.value.isLiked) {
                        postInfo.value.isLiked = true
                        postStore.cmtyPostCardList[iCmty].likeCount++
                        await updateUserPost({
                            type: 'userPost',
                            request: 'like',
                            id: postInfo.value.postId
                        })
                    } else {
                        postInfo.value.isLiked = false
                        postStore.cmtyPostCardList[iCmty].likeCount--
                        await updateUserPost({
                            type: 'userPost',
                            request: 'unLike',
                            id: postInfo.value.postId
                        })
                    }
                    break

                case 'UserHome':
                    let iUser = postStore.userPostCardList.findIndex(
                        (item) => item.postId === postInfo.value.postId
                    )
                    if (!postInfo.value.isLiked) {
                        postInfo.value.isLiked = true
                        postStore.userPostCardList[iUser].likeCount++
                        await updateUserPost({
                            type: 'userPost',
                            request: 'like',
                            id: postInfo.value.postId
                        })
                    } else {
                        postInfo.value.isLiked = false
                        postStore.userPostCardList[iUser].likeCount--
                        await updateUserPost({
                            type: 'userPost',
                            request: 'unLike',
                            id: postInfo.value.postId
                        })
                    }

                    break
                case 'Saved':
                    let iSaved = postStore.savedPostCardList.findIndex(
                        (item) => item.postId === postInfo.value.postId
                    )
                    if (!postInfo.value.isLiked) {
                        postInfo.value.isLiked = true
                        postStore.userPostCardList[iSaved].likeCount++
                        await updateUserPost({
                            type: 'userPost',
                            request: 'like',
                            id: postInfo.value.postId
                        })
                    } else {
                        postInfo.value.isLiked = false
                        postStore.userPostCardList[iSaved].likeCount--
                        await updateUserPost({
                            type: 'userPost',
                            request: 'unLike',
                            id: postInfo.value.postId
                        })
                    }

                    break
            }

        case 'postMain':
            if (!postInfo.value.isLiked) {
                postInfo.value.isLiked = true
                postStore.postInfo.likeCount++
                await updateUserPost({
                    type: 'userPost',
                    request: 'unLike',
                    id: postInfo.value.postId
                })
            } else {
                postInfo.value.isLiked = false
                postStore.postInfo.likeCount--
                await updateUserPost({
                    type: 'userPost',
                    request: 'unLike',
                    id: postInfo.value.postId
                })
            }

            //console.log(postStore.postInfo)
            break
        case 'comment':
            let iComment = postStore.postInfo.comment.findIndex(
                (item) => item.commentId === commentInfo.value.commentId
            )
            if (!postInfo.value.isLiked) {
                postInfo.value.isLiked = true
                postStore.postInfo.comment[iComment].likeCount++
            } else {
                postInfo.value.isLiked = false
                postStore.postInfo.comment[iComment].likeCount--
            }
            //console.log(postStore.postInfo.comment[iComment].likeCount)
            break
        case 'reply':
            switch (route.name) {
                case 'P':
                    let iReplyP = postStore.postInfo.comment.findIndex(
                        (item) => item.commentId === replyInfo.value.commentId
                    )
                    //console.log('jReplyP', iReplyP)
                    let jReplyP = postStore.postInfo.comment[iReplyP].reply.findIndex(
                        (item) => item.replyId === replyInfo.value.replyId
                    )
                    //console.log('jReplyP:', jReplyP)

                    postStore.postInfo.comment[iReplyP].reply[jReplyP].likeCount++
                    break
                case 'Comment':
                    let iReplyC = postStore.commentInfo.reply.findIndex(
                        (item) => item.replyId === replyInfo.value.replyId
                    )
                    postStore.commentInfo.reply[iReplyC].likeCount++
                    //console.log(postStore.commentInfo.reply[iReplyC].likeCount)
                    break
            }
        case 'commentMain':
            postStore.commentInfo.likeCount++
            //console.log(postStore.commentInfo.likeCount)
    } */
}
</script>
<style lang="scss" scoped></style>
