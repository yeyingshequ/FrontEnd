<<<<<<< HEAD
import axios from "axios";
import store from "@/store";

const request = axios.create({
    baseURL:'/my',
    timeout:5000,
})
//请求拦截器
request.interceptors.request.use((config)=>{
    //config:配置对象,对象里面有一个属性很重要,header请求头
    config.headers.Authorization = store.getters.getToken
    return config;
},(error) => {
    console.log("在request拦截器显示错误：", error.response)
    return Promise.reject(error);
});

//响应拦截器
request.interceptors.response.use((res)=>{
    return res.data
},(error)=>{
    //回响应失败的会回调案例
    return Promise.reject(new Error('响应拦截器: faile'))
});

export default request
=======
import axios from 'axios'
import store from '@/store'

const request = axios.create({
  baseURL: '/api',
  timeout: 5000,
})
//请求拦截器
request.interceptors.request.use(
  (config) => {
    //config:配置对象,对象里面有一个属性很重要,header请求头
    config.headers.Authorization = store.getters.getToken
    return config
  },
  (error) => {
    console.log('在request拦截器显示错误：', error.response)
    return Promise.reject(error)
  }
)

//响应拦截器
request.interceptors.response.use(
  (res) => {
    return res.data
  },
  (error) => {
    //回响应失败的会回调案例
    return Promise.reject(new Error('响应拦截器: faile'))
  }
)

export default request
>>>>>>> 235c9f042e7a1074c9cef0bb3cddcb4f9c865708
