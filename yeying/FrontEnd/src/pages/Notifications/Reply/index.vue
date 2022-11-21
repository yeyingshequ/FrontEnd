<template>
    <div>
        <div class="notification">
            <div class="userInfo">
                <div class="iconWrapper">
                    <div class="icon">
                        <img src="@/pages/Home/images/白夜茶会icon.jpg">
                    </div>
                </div>
                <div class="user">
                    <div class="userName">
                        <span>叶雨 <span style="color:$regularFont">回复了你的帖子</span></span>
                    </div>
                    <div class="updateTime">
                        <span>2027-11-22</span>
                    </div>
                </div>
            </div>
            <div class="reply">
                <div class="box">
                    <span>我去海鲜市场搜了下都搜不到，听说有事件被禁止了。这可怎么买卖？？？</span>
                </div>
            </div>
            <div class="replyto">
                <span>
                    对战是ps上更难打上去还是实机ns更难？对战是ps上更难打上去还是实机ns更难？对战是ps上更难打上去还是实机ns更难？对战是ps上更难打上去还是实机ns更难？
                </span>
            </div>
            <Tools/>
        </div>
    </div>
</template>
<script>

export default {
}
</script>
<style scoped lang="scss">
.notification {
    width: 100%;
    height: 100%;
    border-bottom: 1px #f1f1f1 solid;
    /* background-color: blueviolet; */
    &:hover{
        background-color: mix(#ff44aa, white, 10%);;
    }
    .userInfo {
        display: flex;
        align-items: center;
        height: 70px;
        width: 100%;

        /* background-color: chartreuse; */

        .iconWrapper {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 90px;
            height: 70px;

            /* background-color: pink; */
            .icon {

                width: 50px;
                height: 50px;

                img {
                    border-radius: 50%;
                    width: 100%;
                    height: 100%;
                }
            }
        }

        .user {
            height: 50px;

            /* background-color: blueviolet; */
            .userName {
                line-height: 25px;
                height: 25px;

                span {
                    font-weight: bold;
                    span{
                        font-weight:500;
                        color:$regularFont
                    }
                    
                }
            }

            .updateTime {

                height: 25px;

                span {
                    line-height: 25px;
                    color:$regularFont;
                }
            }
        }
    }
    .box{
        padding: 20px;
        padding-top: 0;
        padding-bottom: 15px;
    }
    .replyto{
        margin: 20px;
        margin-top: 0;
        padding: 7px;
        padding-left: 15px;
        background-color: $borderColor4;
        border-radius: 10px;
        span{
            color: $regularFont;
        }
    }
}
</style>