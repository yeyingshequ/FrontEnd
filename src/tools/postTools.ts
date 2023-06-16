import { log } from "console";
import { showMessage } from ".";

export function toRichText(content: string, element?: string) {
    //console.log("content:", content)
    if (!content) return
    if (element == 'span') {
        content = content.replace(/\s+/g, ' ');
        content = `<span class="postStyle">${content}</span>`
        return content
    }
    let lines = content.split('\n')
    content = lines.map((line: any) => `<p class="postStyle">${line}</p>`).join('')
    content = content.replace(/\s{1,}/g, ' ')
    //console.log("content:", content)
    return content
}
//prisma中查询userPost表,然后查询post表,所以数据和正常的postCard有些不同,这个方法将其格式成普通的postCard的格式
export function formatUserPost(postCards: any[]) {
    return postCards.map((up: { post: any; isSaved: any; isLiked: any; isHidden: any; lastVisitTime: any; hiddenTime: any; likedTime: any; savedTime: any; }) => ({
        ...up.post,
        userPost: {
            isSaved: up.isSaved,
            isLiked: up.isLiked,
            isHidden: up.isHidden,
            lastVisitTime: up.lastVisitTime,
            hiddenTime: up.hiddenTime,
            likedTime: up.likedTime,
            savedTime: up.savedTime


        }
    }))
}
export function formatUserCmty(cmtyCards: any[]) {
    return cmtyCards.map((up) => ({
        ...up.community,
        userCmty: {
            isFavorite: up.isFavorite,
            isJoined: up.isJoined,
            lastVisitTime: up.lastVisitTime,
            joinedTime: up.joinedTime,
            rankTime: up.rankTime,
            favoriteTime: up.favoriteTime


        }
    }))
}

export function formatCommentCard(commentCards: any) {
    for (let i = 0; i < commentCards.length; i++) {
        if (commentCards[i].comment?.commentCardType == 'comment') {
            commentCards[i] = {
                ...commentCards[i].comment,
                userComment: {
                    isLiked: commentCards[i].isLiked,
                    isSaved: commentCards[i].isSaved,
                    lastVisitTime: commentCards[i].lastVisitTime,
                    isHidden: commentCards[i].isHidden,
                    hiddenTime: commentCards[i].hiddenTime,
                    likedTime: commentCards[i].likedTime,
                    savedTime: commentCards[i].savedTime

                }
            }
        } else if (commentCards[i].reply?.commentCardType == 'reply') {
            commentCards[i] = {
                ...commentCards[i].reply,
                userReply: {
                    isLiked: commentCards[i].isLiked,
                    isSaved: commentCards[i].isSaved,
                    //lastVisitTime: commentCards[i].lastVisitTime,
                    isHidden: commentCards[i].isHidden,
                    hiddenTime: commentCards[i].hiddenTime,
                    likedTime: commentCards[i].likedTime,
                    savedTime: commentCards[i].savedTime

                }
            }
        }
    }

    return commentCards;
}

export function setRelationShip(data: any, type?: string) {
    switch (type) {
        case "userPost":
            return data.userPost?.[0] || {
                isHidden: false,
                isSaved: false,
                lastVisitTime: '',
                isLiked: false,
                hiddenTime: '',
                likedTime: '',
                savedTime: ''
            }
        case "userComment":

            return data.userComment?.[0] || {
                isHidden: false,
                isSaved: false,
                lastVisitTime: '',
                isLiked: false,
                hiddenTime: '',
                likedTime: '',
                savedTime: ''
            }

        case "userReply":
            return data.userReply?.[0] || {
                isHidden: false,
                isSaved: false,
                //lastVisitTime: '',
                isLiked: false,
                hiddenTime: '',
                likedTime: '',
                savedTime: ''
            }
            break;
        case 'userCmty':
            return data.userCmty?.[0] || {
                isFavorite: false,
                isJoined: false,
                lastVisitTime: false,
                joinedTime: false,
                rankTime: false,
                favoriteTime: false
            }
            break

        default:
            break;
    }

}

export function checkCharLimit(data: any, type: any) {
    data = data.trim()
    console.log("data:", data);
    let maxCharNum
    let charNum
    switch (type) {
        case "postTitle":
            maxCharNum = 60
            charNum = getCharNum(data)
            if (charNum > maxCharNum) {
                showMessage("标题字数超出30字限制", 1)
                return false
            } else {
                return true
            }
            break;
        case "post":
            //console.log(1111111111);
            maxCharNum = 10000
            charNum = getCharNum(data)
            //console.log("charNum:", charNum);

            if (charNum > maxCharNum) {
                showMessage("帖子字数超出5000字限制", 1)
                return false
            } else if (charNum == 0) {
                showMessage("正文内容不能为空'来自前端'", 1)
                return false
            } else {
                return true
            }
            break

        case "comment":
            maxCharNum = 10000
            charNum = getCharNum(data)
            if (charNum > maxCharNum) {
                showMessage("评论字数超出5000字限制", 1)
                return false
            } else if (charNum == 0) {
                showMessage("正文内容不能为空'来自前端'", 1)
                return false
            } else {
                return true
            }
            break
        case "reply":
            maxCharNum = 600
            charNum = getCharNum(data)
            //console.log("charNum:", charNum);
            if (charNum > maxCharNum) {
                showMessage("回复字数超出300字限制", 1)
                return false
            } else if (charNum == 0) {
                showMessage("正文内容不能为空'来自前端'", 1)
                return false
            } else {
                return true
            }
            break
        default:
            break;
    }
    function getCharNum(str: string) {
        var len = str.length;
        var charNum = len;
        for (var i = 0; i < len; i++) {
            if (str.charCodeAt(i) > 255) {
                charNum++;
            }
        }
        return charNum;
    }
}

export function convertImageToBase64(file: Blob, callback: any) {
    const reader = new FileReader()
    reader.onload = function (event) {
        const base64 = event.target!.result
        callback(base64)
    }
    reader.readAsDataURL(file)
}

export function processPlainText(content: string, tag?: string) {
    let processedContent = content.trim()
    console.log(processedContent);

    // 转义内容中的 < 和 >
    processedContent = processedContent.replace(/</g, '&lt;').replace(/>/g, '&gt;')
    // 将多余的连续换行符替换为最多一个换行符
    processedContent = processedContent.replace(/\n{2,}/g, '\n')

    // 将多余的连续空格替换为最多一个空格
    processedContent = processedContent.replace(/( )+/g, ' ')

    return processedContent;
}

