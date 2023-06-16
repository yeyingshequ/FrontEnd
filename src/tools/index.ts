//解决 元素隐式具有 “any“ 类型，因为类型为 “string“ 的表达式
//不能用于索引类型 “Object“。 
//在类型 “Object“ 上找不到具有类型为 “string“ 的参数的索引签名

import formatTime from "@/tools/formatTime";
import COS from "cos-js-sdk-v5";
import { ElMessage } from "element-plus";

export function showMessage(message: string, type: number) {
    ElMessage({
        grouping: true,
        message: message,
        type: type == 0 ? 'success' : 'error'
    })
}
export function formatNumber(num: number) {
    if (num < 10000) {
        return num.toString();
    } else if (num < 100000000) {
        return (num / 10000).toFixed(1) + '万';
    } else {
        return (num / 100000000).toFixed(1) + '亿';
    }
}

export function generateUniqueFileName() {
    const timestamp = new Date().getTime();
    const randomBytes = new Uint8Array(16); // 创建一个长度为16的Uint8Array
    crypto.getRandomValues(randomBytes); // 用随机数填充数组
    const randomString = Array.from(randomBytes, byte => byte.toString(36)).join('');
    const fileName = `${timestamp}_${randomString}`;
    return fileName;
}
export function convertImageToBase64(url: string, callback: { (base64: any): void; (arg0: string | null): void; }) {
    var img = new Image();
    img.src = url;
    img.onload = function () {
        var canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext('2d');
        if (ctx) { // 检查Canvas上下文对象是否存在
            ctx.drawImage(img, 0, 0);
            var base64 = canvas.toDataURL();
            callback(base64);
        } else {
            // 处理Canvas上下文对象不存在的情况
            console.error('Failed to get 2D context for Canvas.');
            callback(null);
        }
    };
}

export function uploadImgList(imgList: any) {
    const promises = imgList.map((img: any) => {
        return new Promise((resolve, reject) => {
            var cos = new COS({
                SecretId: 'AKIDJRRWLuGPJwKSLzOZtypPjpgKmzxf9tQi',
                SecretKey: '82h6GAoDNI97zgyCLHzUknfMo36uSltq'
            })
            cos.putObject(
                {
                    Bucket: 'yeying-1317878245',
                    Region: 'ap-nanjing',
                    Key: generateUniqueFileName(),
                    StorageClass: 'STANDARD',
                    Body: img,
                    onProgress: (progressData) => {
                        //console.log(progressData)
                    }
                },
                (err: any, data: any) => {
                    if (err) {
                        //console.log('err:', err)
                        reject(err)
                    } else {
                        //console.log('data:', data)
                        resolve(data.Location)
                    }
                }
            )
        })
    })

    return Promise.all(promises)
}
export function uploadImg(img: any) {
    return new Promise((resolve, reject) => {
        var cos = new COS({
            SecretId: 'AKIDJRRWLuGPJwKSLzOZtypPjpgKmzxf9tQi',
            SecretKey: '82h6GAoDNI97zgyCLHzUknfMo36uSltq'
        })
        cos.putObject(
            {
                Bucket: 'yeying-1317878245',
                Region: 'ap-nanjing',
                Key: generateUniqueFileName(),
                StorageClass: 'STANDARD',
                Body: img,
                onProgress: (progressData) => {
                    //console.log(progressData)
                }
            },
            (err: any, data: any) => {
                if (err) {
                    //console.log('err:', err)
                    reject(err)
                } else {
                    //console.log('data:', data)
                    resolve(data.Location)
                }
            }
        )
    })
}
export function base64ToFile(base64: string, fileName: string) {
    // 裁剪Base64字符串，仅保留编码数据部分 
    var base64Data = base64.split(',')[1];

    // 解码Base64编码
    var byteCharacters = window.atob(base64Data);

    // 转换为Uint8Array
    var byteArrays = new Uint8Array(byteCharacters.length);
    for (var i = 0; i < byteCharacters.length; i++) {
        byteArrays[i] = byteCharacters.charCodeAt(i);
    }

    // 创建Blob对象
    var blob = new Blob([byteArrays], { type: 'image/png' });

    // 创建File对象
    var file = new File([blob], fileName, { type: 'image/png' });

    return file;
}

