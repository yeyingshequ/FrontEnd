//解决 元素隐式具有 “any“ 类型，因为类型为 “string“ 的表达式
//不能用于索引类型 “Object“。 
//在类型 “Object“ 上找不到具有类型为 “string“ 的参数的索引签名

import rename from "@/tools/rename";
import formatTime from "@/tools/formatTime";
import { ElMessage } from "element-plus";

export function isValidKey(
    key: string | number | symbol,
    object: object
): key is keyof typeof object {
    return key in object;
}
export function formatPostCard(result: { status: number; data: any }, PostCardList: object) {
    if (result.status === 0) {
        for (let i = 0; i < result.data.length; i++) {
            result.data[i] = rename.toHump(result.data[i])
            result.data[i].updateTime = formatTime(result.data[i].updateTime)
        }
        PostCardList = result.data
        console.log(result.data)
    }
}
export function showMessage(message: string, type: undefined) {
    ElMessage({
        grouping: true,
        message: message,
        type: type == 0 ? 'success' : 'error'
    })
}