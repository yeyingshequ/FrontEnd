import axios, { AxiosInstance } from "axios";

export class Interceptors {
    instance: AxiosInstance;

    constructor() {
        this.instance = axios.create({
            // baseURL: baseURL,
            // baseURL: "http://192.168.48.97:9999",
        });
    }

    // 初始化拦截器
    init() {
        // 请求接口拦截器
        this.instance.interceptors.request.use(
            (config) => {


                return config;
            },
            (err) => {
                console.error(err);
            }
        );

        // 响应拦截器
        this.instance.interceptors.response.use(
            (response) => {
                console.log("response:", response);

                return response;
            },
            (error) => {
                console.log("error:", error);

                return Promise.resolve(error);
            }
        );
    }

    // 返回一下
    getInterceptors() {
        this.init()
        return this.instance;
    }
}