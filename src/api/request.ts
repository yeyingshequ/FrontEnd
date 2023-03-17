import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError, AxiosPromise } from "axios";
import useLoginStore from '@/store/login'
import pinia from "@/store/store";
import useMainStore from '@/store/index'
const mainStore = useMainStore(pinia)
const loginStore = useLoginStore(pinia)
import storage from "@/tools/storage"

interface successType<T = any> {
    code: number,
    message: string,
    result: T,
    status: number,
}

declare module "axios" {
    interface AxiosResponse<T = any> {
        errorinfo: null;
        token: string;
        userId: string;
        username: string;
        message: string;
    }
    interface AxiosInstance {
        (config: AxiosRequestConfig): Promise<any>
    }
    export function create(config?: AxiosRequestConfig): AxiosInstance;
}

const request = axios.create({
    baseURL: '/api',
    timeout: 5000,
})
//请求拦截器
request.interceptors.request.use((config) => {
    //config:配置对象,对象里面有一个属性很重要,header请求头
    //console.log('请求拦截器')
    if (config && config.headers) {
        config.headers.Authorization = loginStore.getToken
    }
    //console.log(config.headers.Authorization)
    return config;
}, (error) => {
    console.log("在request拦截器显示错误：", error.response)
    return Promise.reject(error);
});

//响应拦截器
request.interceptors.response.use((res) => {
    console.log("响应拦截器:", res);
    console.log("message:", res.data.message);
    if (res.data.message == "身份认证失败") {
        storage.remove('token')



    }


    return res.data
}, (error) => {
    //回响应失败的会回调案例
    return Promise.reject(new Error('响应拦截器: faile'))
});

export default request

