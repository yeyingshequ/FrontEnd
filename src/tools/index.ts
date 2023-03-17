//解决 元素隐式具有 “any“ 类型，因为类型为 “string“ 的表达式
//不能用于索引类型 “Object“。 
//在类型 “Object“ 上找不到具有类型为 “string“ 的参数的索引签名

import formatTime from "@/tools/formatTime";
import { ElMessage } from "element-plus";

export function showMessage(message: string, type: undefined) {
    ElMessage({
        grouping: true,
        message: message,
        type: type == 0 ? 'success' : 'error'
    })
}