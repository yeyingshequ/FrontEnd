<template>
    <div>
        <PostCard :postList="postList" />
    </div>
</template>
<script>

export default {
    name: "",
    data() {
        return {
            postList: [
                { id: 1, icon: require("@/pages/Home/images/白夜茶会icon.jpg"), name: "月夜茶會", updateTime: "2022-04-04", title: "[月夜茶会] 美少女 萌妹 软萌 卡哇伊 壁纸 头像", bodyText: "", imgSrc: [{ imgId: 11, img: require("@/pages/Home/images/白色茶会2.jpg") }, { imgId: 12, img: require("@/pages/Home/images/白色茶会2.jpg") }] },
                { id: 2, icon: require("@/pages/Home/images/第二帖icon.jpg"), name: "萌萌的643", updateTime: "2022-07-02", title: "对战是ps上更难打上去还是实机ns更难？", bodyText: "总感觉ps上厉害的好多", imgSrc: [{ imgId: 15, img: require("@/images/魔道学者.jpg") },{ imgId: 17, img: require("@/images/二次元壁纸樱花.jpg") },{ imgId: 13, img: require("@/pages/Home/images/白色茶会2.jpg") }] },
                { id: 3, icon: require("@/pages/Home/images/第三贴icon.jpg"), name: "无奈ASL", updateTime: "2022-07-1", title: "大哥们动森怎么买", bodyText: "我去海鲜市场搜了下都搜不到，听说有事件被禁止了。这可怎么买卖？？？", imgSrc: [{ imgId: 13, img: require("@/pages/Home/images/白色茶会2.jpg") }] }
            ]
        };
    },
}
</script>

<style scoped lang="scss">
.post {
    border-bottom: 1px solid #f1f1f1;
    transition: .1s;
    cursor: pointer;

    &:hover {
        background-color: mix(#ff44aa, white, 10%);
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
                }
            }

            .updateTime {

                height: 25px;

                span {
                    line-height: 25px;
                    color: $regularFont;
                }
            }
        }
    }

    .content {
        padding-left: 20px;
        padding-right: 20px;
        height: 100%;
        width: 100%;

        /* background-color: firebrick; */
        .title {
            font-weight: bold;
        }

        .bodyText {
            margin-top: 10px;
        }

        .block {
            margin-top: 10px;
            .el-carousel__item h3 {
                color: #475669;
                font-size: 14px;
                opacity: 0.75;
                line-height: 150px;
                margin: 0;
                img{
                    width: 100%;
                }
            }

            .el-carousel__item:nth-child(2n) {
                background-color: #99a9bf;
            }

            .el-carousel__item:nth-child(2n+1) {
                background-color: #d3dce6;
            }

        }
    }

    .tools {
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 100%;
        height: 40px;
        /* background-color: hotpink; */

        div {
            color: $regularFont;

            i {
                font-size: 20px;
            }

            span {
                font-size: 16px;
                position: relative;
                top: -0.03rem;
                margin-left: 3px;
            }
        }
    }
}
</style>
